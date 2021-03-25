// @flow

import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

import { translate } from '../../base/i18n';
import { JitsiModal } from '../../base/modal';
import { Text } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import styles, { PLACEHOLDER_TEXT_COLOR } from '../../welcome/components/styles';
import {
    AbstractJoinView,
    _mapStateToProps as _abstractMapStateToProps
} from '../AbstractJoinView';
import { JOIN_VIEW_MODAL_ID } from '../constants';

const DEFAULT_HELP_CENTRE_URL = 'https://web-cdn.jitsi.net/faq/meet-faq.html';


/**
 * Implements a page that renders the help content for the app.
 */
class JoinView extends AbstractJoinView {

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
                        Saisissez un nom de réunion valide
                    </Text>
                </View>
            );
        }
    }

    /**
     * Implements {@code PureComponent#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { t } = this.props;
        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';

        return (
            <JitsiModal
                headerProps = {{
                    headerLabelKey: 'helpView.header'
                }}
                modalId = { JOIN_VIEW_MODAL_ID }
                onClose = { this._onClose }>
                <View style = { styles.textModal }>
                    <Text style = { styles.enterRoomText }>
                        { t('welcomepage.roomname') }
                    </Text>
                </View>
                <KeyboardAvoidingView
                    behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
                    style = { styles.loginButtonSection }>
                    <TextInput
                        accessibilityLabel = { t(roomnameAccLabel) }
                        autoCapitalize = 'characters'
                        autoComplete = 'off'
                        autoCorrect = { false }
                        autoFocus = { false }
                        maxLength = { 8 }
                        onChangeText = { this._onRoomChange }
                        onSubmitEditing = { this._onJoin }
                        placeholderTextColor = { PLACEHOLDER_TEXT_COLOR }
                        returnKeyType = { 'go' }
                        style = { styles.textInput }
                        underlineColorAndroid = 'transparent'
                        value = { this.state.room } />
                </KeyboardAvoidingView>
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
            </JitsiModal>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _url: state['features/base/config'].helpCentreURL || DEFAULT_HELP_CENTRE_URL
    };
}

export default translate(connect(_mapStateToProps)(JoinView));
