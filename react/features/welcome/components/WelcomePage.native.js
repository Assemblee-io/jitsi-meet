import React, { createRef } from 'react';
import {
    Animated,
    Keyboard,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
    Image,
    Linking,
} from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';

import { getName } from '../../app/functions';
import { ColorSchemeRegistry } from '../../base/color-scheme';
import { translate } from '../../base/i18n';
import { Icon, IconMenu, IconWarning } from '../../base/icons';
import { MEDIA_TYPE } from '../../base/media';
import { Header, LoadingIndicator, Text } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import {
    createDesiredLocalTracks,
    destroyLocalDesktopTrackIfExists,
    destroyLocalTracks
} from '../../base/tracks';
import { HelpView } from '../../help';
import { DialInSummary } from '../../invite';
import { SettingsView } from '../../settings';
import { setSideBarVisible } from '../actions';

import {
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import LocalVideoTrackUnderlay from './LocalVideoTrackUnderlay';
import WelcomePageSideBar from './WelcomePageSideBar';
import styles, { PLACEHOLDER_TEXT_COLOR } from './styles';

const FEMME_ORDI = require('../../../../images/femme-ordi.png');
const DEFAULT_AVATAR = require('../../../../images/logo_assemblee.png');
const panelRef = createRef(null);


/**
 * The native container rendering the welcome page.
 *
 * @extends AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage {
    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        this.state.modalVisible = false;
        this.state._fieldFocused = false;
        this.state.hintBoxAnimation = new Animated.Value(0);

        // Bind event handlers so they are only bound once per instance.
        this._onFieldFocusChange = this._onFieldFocusChange.bind(this);
        this._onShowSideBar = this._onShowSideBar.bind(this);
        this._renderHintBox = this._renderHintBox.bind(this);

        // Specially bind functions to avoid function definition on render.
        this._onFieldBlur = this._onFieldFocusChange.bind(this, false);
        this._onFieldFocus = this._onFieldFocusChange.bind(this, true);
    }

    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        super.componentDidMount();

        this._updateRoomname();

        const { dispatch } = this.props;

        if (this.props._settings.startAudioOnly) {
            dispatch(destroyLocalTracks());
        } else {
            dispatch(destroyLocalDesktopTrackIfExists());

            // Make sure we don't request the permission for the camera from
            // the start. We will, however, create a video track iff the user
            // already granted the permission.
            navigator.permissions.query({ name: 'camera' }).then(response => {
                response === 'granted'
                    && dispatch(createDesiredLocalTracks(MEDIA_TYPE.VIDEO));
            });
        }
    }

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        // We want to have the welcome page support the reduced UI layout,
        // but we ran into serious issues enabling it so we disable it
        // until we have a proper fix in place. We leave the code here though, because
        // this part should be fine when the bug is fixed.
        //
        // NOTE: when re-enabling, don't forget to uncomment the respective _mapStateToProps line too

        /*
        const { _reducedUI } = this.props;

        if (_reducedUI) {
            return this._renderReducedUI();
        }
        */

        return this._renderFullUI();
    }

    /**
     * Renders the insecure room name warning.
     *
     * @inheritdoc
     */
    _doRenderInsecureRoomNameWarning() {
        return (
            <View
                style = { [
                    styles.messageContainer,
                    styles.insecureRoomNameWarningContainer
                ] }>
                <Icon
                    src = { IconWarning }
                    style = { styles.insecureRoomNameWarningIcon } />
                <Text style = { styles.insecureRoomNameWarningText }>
                    { this.props.t('security.insecureRoomNameWarning') }
                </Text>
            </View>
        );
    }

    /**
     * Constructs a style array to handle the hint box animation.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getHintBoxStyle() {
        return [
            styles.messageContainer,
            styles.hintContainer,
            {
                opacity: this.state.hintBoxAnimation
            }
        ];
    }


    _onHandleClick = () => {
        Linking.canOpenURL('https://assemblee.io/app/login').then(supported => {
            if (supported) {
                Linking.openURL('https://assemblee.io/app/login');
            } else {
                console.log('Don\'t know how to open URI: https://assemblee.io/app/login');
            }
        });
    };

    _onCreateAccount = () => {
        Linking.canOpenURL('https://assemblee.io/app/signup').then(supported => {
            if (supported) {
                Linking.openURL('https://assemblee.io/app/signup');
            } else {
                console.log('Don\'t know how to open URI: https://assemblee.io/app/signup');
            }
        });
    };

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} visible - The focused state of the field.
     * @returns {void}
     */
    _onClicksetModalVisible(visible) {
        this.setState({
            modalVisible: visible
        });
    }

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} focused - The focused state of the field.
     * @returns {void}
     */
    _onFieldFocusChange(focused) {
        focused
            && this.setState({
                _fieldFocused: true
            });

        Animated.timing(
            this.state.hintBoxAnimation,
            {
                duration: 300,
                toValue: focused ? 1 : 0
            })
            .start(animationState =>
                animationState.finished
                    && !focused
                    && this.setState({
                        _fieldFocused: false
                    }));
    }

    /**
     * Toggles the side bar.
     *
     * @private
     * @returns {void}
     */
    _onShowSideBar() {
        Keyboard.dismiss();
        this.props.dispatch(setSideBarVisible(true));
    }

    /**
     * Renders the hint box if necessary.
     *
     * @private
     * @returns {React$Node}
     */
    _renderHintBox() {
        if (this.state._fieldFocused) {
            const { t } = this.props;

            return (
                <Animated.View style = { this._getHintBoxStyle() }>
                    <View style = { styles.hintTextContainer } >
                        <Text style = { styles.hintText }>
                            { t('welcomepage.roomnameHint') }
                        </Text>
                    </View>
                    <View style = { styles.hintButtonContainer } >
                        { this._renderJoinButton() }
                    </View>
                </Animated.View>
            );
        }

        return null;
    }

    /**
     * Renders the join button.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderJoinButton() {
        const { t } = this.props;
        let children;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            children = (
                <View>
                    <LoadingIndicator
                        color = { styles.buttonText.color }
                        size = 'small' />
                </View>
            );
        } else {
            children = (
                <Text style = { styles.buttonText }>
                    { this.props.t('welcomepage.join') }
                </Text>
            );
        }

        return (
            <TouchableHighlight
                accessibilityLabel =
                    { t('welcomepage.accessibilityLabel.join') }
                onPress = { this._onJoin }
                style = { styles.button }
                underlayColor = { ColorPalette.white }>
                { children }
            </TouchableHighlight>
        );
    }

    /**
     * Renders the full welcome page.
     *
     * @returns {ReactElement}
     */
    _renderFullUI() {
        const { _headerStyles, t } = this.props;

        return (
            <LocalVideoTrackUnderlay style = { styles.welcomePage }>
                <View style = { _headerStyles.page }>
                    <Header style = { styles.header }>
                        <TouchableOpacity onPress = { this._onShowSideBar } >
                            <Icon
                                src = { IconMenu }
                                style = { _headerStyles.headerButtonIcon } />
                        </TouchableOpacity>
                    </Header>
                    <SafeAreaView style = { styles.roomContainer } >
                        <View style = { styles.imageContainer }>
                            <Image
                                resizeMode = 'contain'
                                source = { DEFAULT_AVATAR }
                                style = { styles.imageDisplay } />
                            <Image
                                resizeMode = 'contain'
                                source = { FEMME_ORDI }
                                style = { styles.imageFemmeDisplay } />
                        </View>
                        <View style = { styles.joinControls } >
                            <View style = { styles.loginButtonSection }>
                                <TouchableOpacity
                                    onPress = { this._onHandleClick }
                                    style = { styles.buttonWhite } >
                                    <View >
                                        <Text style = { styles.textCenter }> { t('toolbar.login') }</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style = { styles.loginButtonSection }>
                                <TouchableHighlight
                                    accessibilityLabel =
                                        { t('welcomepage.accessibilityLabel.join') }
                                    onPress = { () => panelRef.current.togglePanel() }
                                    style = { styles.button }
                                    underlayColor = { ColorPalette.white }>
                                    <Text style = { styles.buttonText }>
                                        { this.props.t('welcomepage.join') }
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <View style = { styles.loginButtonSection }>
                                <TouchableOpacity
                                    accessibilityLabel =
                                        { t('welcomepage.accessibilityLabel.signup') }
                                    onPress = { this._onCreateAccount }
                                    style = { styles.signupText } >
                                    <Text style = { styles.signupText }>
                                        { this.props.t('welcomepage.signup') }
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                    { this._renderRoomModal() }
                </View>
                <WelcomePageSideBar />
                { this._renderWelcomePageModals() }

            </LocalVideoTrackUnderlay>
        );
    }

    /**
     * Renders a "reduced" version of the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderReducedUI() {
        const { t } = this.props;

        return (
            <View style = { styles.reducedUIContainer }>
                <Text style = { styles.reducedUIText }>
                    { t('welcomepage.reducedUIText', { app: getName() }) }
                </Text>
            </View>
        );
    }

    /**
     * Renders JitsiModals that are supposed to be on the welcome page.
     *
     * @returns {Array<ReactElement>}
     */
    _renderWelcomePageModals() {
        return [
            <HelpView key = 'helpView' />,
            <DialInSummary key = 'dialInSummary' />,
            <SettingsView key = 'settings' />
        ];
    }

    /**
     * Renders JitsiModals that are supposed to be on the welcome page.
     *
     * @returns {Array<ReactElement>}
     */
    _renderErrorModal() {
        if (this.state.error) {
            return (
                <View style = { styles.textModal }>
                    <Text style = { styles.errorText }>
                        SAISISSEZ UN NOM DE REUNION VALIDE
                    </Text>
                </View>
            );
        }
    }


    /**
     * Renders JitsiModals that are supposed to be on the welcome page.
     *
     * @returns {Array<ReactElement>}
     */
    _renderRoomModal() {
        const { t } = this.props;
        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';

        return (
            <BottomSheet
                isOpen = { false }
                ref = { ref => panelRef.current = ref }
                sliderMinHeight = { '0' }>
                <View style = { styles.modalViewHeight }>
                    <View style = { styles.textModal }>
                        <Text style = { styles.enterRoomText }>
                            { t('welcomepage.roomname') }
                        </Text>
                    </View>
                    <View style = { styles.loginButtonSection }>
                        <TextInput
                            accessibilityLabel = { t(roomnameAccLabel) }
                            autoCapitalize = 'characters'
                            autoComplete = 'off'
                            autoCorrect = { false }
                            autoFocus = { false }
                            maxLength = { 8 }
                            onBlur = { this._onFieldBlur }
                            onChangeText = { this._onRoomChange }
                            onFocus = { this._onFieldFocus }
                            onSubmitEditing = { this._onJoin }
                            placeholderTextColor = { PLACEHOLDER_TEXT_COLOR }
                            returnKeyType = { 'go' }
                            style = { styles.textInput }
                            underlineColorAndroid = 'transparent'
                            value = { this.state.room } />
                    </View>
                    { this._renderErrorModal() }
                    <View style = { styles.loginButtonSection }>
                        <TouchableHighlight
                            accessibilityLabel =
                                { t('welcomepage.accessibilityLabel.join') }
                            onPress = { this._onJoin }
                            style = { styles.button }
                            underlayColor = { ColorPalette.white }>
                            <Text style = { styles.buttonText }>
                                { this.props.t('welcomepage.join') }
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </BottomSheet>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Object}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')

        // _reducedUI: state['features/base/responsive-ui'].reducedUI
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
