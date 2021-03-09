// @flow

import { Component } from 'react';
import type { Dispatch } from 'redux';
import axios from 'axios';
import { createWelcomePageEvent, sendAnalytics } from '../analytics';
import { appNavigate } from '../app/actions';


/**
 * The type of the React {@code Component} props of
 * {@link AbstractSettingsView}.
 */
export type Props = {

    /**
     * Room name to join to.
     */
    _room: string,

   /**
     * Redux store dispatch function.
     */
    dispatch: Dispatch<any>,


    /**
     * The i18n translate function.
     */
    t: Function
};

/**
 * Base (abstract) class for container component rendering the app settings
 * page.
 *
 * @abstract
 */
export class AbstractJoinView extends Component<Props, *> {

    /**
     * Initializes a new {@code AbstractSettingsView} instance.
     *
     * @param {P} props - The React {@code Component} props to initialize
     * the component.
     */
    /**
     * Save room name into component's local state.
     *
     * @type {Object}
     * @property {number|null} animateTimeoutId - Identifier of the letter
     * animation timeout.
     * @property {string} generatedRoomname - Automatically generated room name.
     * @property {string} room - Room name.
     * @property {string} roomPlaceholder - Room placeholder that's used as a
     * placeholder for input.
     * @property {nubmer|null} updateTimeoutId - Identifier of the timeout
     * updating the generated room name.
     */
    state = {
        room: '',
        error: false
    };

    /**
     * Initializes a new {@code AbstractWelcomePage} instance.
     *
     * @param {Props} props - The React {@code Component} props to initialize
     * the new {@code AbstractWelcomePage} instance with.
     */
    constructor(props: Props) {
        super(props);

        // Bind event handlers so they are only bound once per instance.
        this._onRoomChange = this._onRoomChange.bind(this);
        this._onJoin = this._onJoin.bind(this);
    }


    _onRoomChange: (string) => void;

    /**
     * Handles 'change' event for the room name text input field.
     *
     * @param {string} value - The text typed into the respective text input
     * field.
     * @protected
     * @returns {void}
     */
    _onRoomChange(value: string) {
        this.setState({
            room: value
        });
    }

    _onJoin: () => void;

    /**
     * Handles joining. Either by clicking on 'Join' button
     * or by pressing 'Enter' in room name input field.
     *
     * @protected
     * @returns {void}
     */
    _onJoin() {
        const room = this.state.room || this.state.generatedRoomname;

        axios.get(`https://api.assemblee.io/api/v2/room/join/${room}`)
            .then(res => {
                sendAnalytics(
                    createWelcomePageEvent('clicked', 'joinButton', {
                        isGenerated: !this.state.room,
                        room
                    }));
                console.log('ICI',room);

                if (room) {
                    this.setState({ joining: true });

                    // By the time the Promise of appNavigate settles, this component
                    // may have already been unmounted.
                    const onAppNavigateSettled
                        = () => this._mounted && this.setState({ joining: false });

                    this.props.dispatch(appNavigate(room))
                        .then(onAppNavigateSettled, onAppNavigateSettled);
                }
            })
            .catch(err => {
                console.log('ERROR', err);
                this.setState({ error: true });
            });

    }

}

/**
 * Maps (parts of) the redux state to the React {@code Component} props of
 * {@code AbstractSettingsView}.
 *
 * @param {Object} state - The redux state.
 * @protected
 * @returns {{
 *     _serverURL: string,
 *     _settings: Object,
 *     _visible: boolean
 * }}
 */
export function _mapStateToProps(state: Object) {
    return {
        _room: state['features/base/conference'].room
    };
}
