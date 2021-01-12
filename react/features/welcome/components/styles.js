// @flow

import { colorPalette } from '@atlaskit/theme/dist/cjs/colors';
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { BoxModel, ColorPalette } from '../../base/styles';

export const PLACEHOLDER_TEXT_COLOR = 'rgba(0, 0, 0, 0.5)';

export const SIDEBAR_AVATAR_SIZE = 100;

const SIDEBAR_HEADER_HEIGHT = 150;

export const SWITCH_THUMB_COLOR = ColorPalette.blueHighlight;

export const SWITCH_UNDER_COLOR = 'rgba(0, 0, 0, 0.4)';

/**
 * The default color of text on the WelcomePage.
 */
const TEXT_COLOR = ColorPalette.black;

/**
 * The styles of the React {@code Components} of the feature welcome including
 * {@code WelcomePage} and {@code BlankPage}.
 */
export default {

    /**
     * The audio-video switch itself.
     */
    audioVideoSwitch: {
        marginHorizontal: 5
    },

    /**
     * View that contains the audio-video switch and the labels.
     */
    audioVideoSwitchContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },

    /**
     * View that is rendered when there is no welcome page.
     */
    blankPageWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    /**
     * Join button style.
     */
    button: {
        margin: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        width: '90%',
        backgroundColor: ColorPalette.blue,
        borderColor: ColorPalette.blue,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    /**
     * Join button text style.
     */
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: ColorPalette.white
    },

    errorText: {
        textAlign: 'center',
        fontSize: 18,
        padding: 4,
        marginBottom: BoxModel.margin,
        color: ColorPalette.red
    },

    /**
     * Join button text style.
     */
    buttonTextModal: {
        marginTop: 3,
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: ColorPalette.white
    },


    /**
     * The style of the display name label in the side bar.
     */
    displayName: {
        color: ColorPalette.white,
        fontSize: 16,
        marginTop: BoxModel.margin,
        textAlign: 'center'
    },

    enterRoomText: {
        marginLeft: wp(5),
        textAlign: 'left',
        color: '#8B959A',
        fontSize: 18,
        marginBottom: BoxModel.margin
    },

    /**
     * The welcome screen header style.
     */
    header: {
        justifyContent: 'space-between'
    },

    /**
     * Container for the button on the hint box.
     */
    hintButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    /**
     * Container for the hint box.
     */
    hintContainer: {
        flexDirection: 'column',
        overflow: 'hidden'
    },

    /**
     * The text of the hint box.
     */
    hintText: {
        textAlign: 'center'
    },

    /**
     * Container for the text on the hint box.
     */
    hintTextContainer: {
        marginBottom: 2 * BoxModel.margin
    },

    /**
     * Container for the items in the side bar.
     */
    itemContainer: {
        flexDirection: 'column',
        paddingTop: 10
    },

    /**
     * A view that contains the field and hint box.
     */
    joinControls: {
        padding: BoxModel.padding
    },

    messageContainer: {
        backgroundColor: ColorPalette.white,
        borderColor: ColorPalette.white,
        borderRadius: 4,
        borderWidth: 1,
        marginVertical: 5,
        paddingHorizontal: BoxModel.padding,
        paddingVertical: 2 * BoxModel.padding
    },

    /**
     * The style of the top-level container/{@code View} of
     * {@code LocalVideoTrackUnderlay}.
     */
    localVideoTrackUnderlay: {
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        flex: 1
    },

    /**
     * Top-level screen style.
     */
    page: {
        flex: 1,
        flexDirection: 'column'
    },

    /**
     * The styles for reduced UI mode.
     */
    reducedUIContainer: {
        alignItems: 'center',
        backgroundColor: ColorPalette.blue,
        flex: 1,
        justifyContent: 'center'
    },

    reducedUIText: {
        color: TEXT_COLOR,
        fontSize: 12
    },

    /**
     * Container for room name input box and 'join' button.
     */
    roomContainer: {
        backgroundColor: 'white',
        alignSelf: 'stretch',
        flexDirection: 'column'
    },

    /**
     * Container of the side bar.
     */
    sideBar: {
        width: 250
    },

    /**
     * The body of the side bar where the items are.
     */
    sideBarBody: {
        backgroundColor: ColorPalette.white,
        flex: 1
    },

    /**
     * The style of the side bar header.
     */
    sideBarHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        height: SIDEBAR_HEADER_HEIGHT,
        justifyContent: 'center',
        padding: BoxModel.padding
    },

    /**
     * Style of the menu items in the side bar.
     */
    sideBarItem: {
        padding: 13
    },

    /**
     * The View inside the side bar buttons (icon + text).
     */
    sideBarItemButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    /**
     * The icon in the side bar item touchables.
     */
    sideBarItemIcon: {
        color: ColorPalette.blueHighlight,
        fontSize: 20,
        marginRight: 15
    },

    /**
     * The label of the side bar item touchables.
     */
    sideBarItemText: {
        color: ColorPalette.black,
        fontWeight: 'bold'
    },

    /**
     * The container of the label of the audio-video switch.
     */
    switchLabel: {
        paddingHorizontal: 3
    },

    /**
     * Room input style.
     */
    textInput: {
        backgroundColor: 'transparent',
        borderColor: '#333',
        borderRadius: 10,
        borderWidth: 1,
        color: TEXT_COLOR,
        fontSize: 23,
        height: 50,
        padding: 4,
        textAlign: 'center',
        marginBottom: 20,
        width: '90%'
    },

    /**
     * Application title style.
     */
    title: {
        color: TEXT_COLOR,
        fontSize: 25,
        marginBottom: 2 * BoxModel.margin,
        textAlign: 'center'
    },

    insecureRoomNameWarningContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5
    },

    insecureRoomNameWarningIcon: {
        color: ColorPalette.warning,
        fontSize: 24,
        marginRight: 10
    },

    insecureRoomNameWarningText: {
        color: ColorPalette.warning,
        flex: 1
    },

    /**
     * The style of the top-level container of {@code WelcomePage}.
     */
    welcomePage: {
        backgroundColor: ColorPalette.white,
        overflow: 'hidden'
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageDisplay: {
        width: wp(100),
        height: hp(5)
    },

    imageFemmeDisplay: {
        height: hp(45),
        width: '100%',
        marginBottom: hp(3)
    },


    buttonWhite: {
        margin: 'auto',
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        width: '90%',
        backgroundColor: ColorPalette.lightNewGrey,
        borderColor: ColorPalette.lightNewGrey,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20
    },

    buttonBlue: {
        backgroundColor: ColorPalette.blue,
        borderColor: ColorPalette.blue,
        height: 30,
        justifyContent: 'center',
        paddingHorizontal: 20,
        margin: 'auto',
        padding: 17,
        borderRadius: 10,
        marginBottom: 30,
        color: '#333',
        borderWidth: 1,
        width: '90%'
    },

    loginButtonSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    textCenter: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center'
    },

    signupButton: {

    },

    signupText: {
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#909AA4'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modalViewHeight: {
        height: hp(25)
    },

    textModal: {
        width: wp(90),
        textAlign: 'center',
        color: '#FFFFFF'
    },

    exitModalbutton: {
        marginLeft: wp(80),
        backgroundColor: ColorPalette.lightGrey,
        borderRadius: 30,
        width: 30,
        height: 30
    },

    exitModalbuttonView: {
        alignContent: 'flex-end'
    }
};
