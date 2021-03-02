/* global interfaceConfig */

// @flow
import Page, { Grid, GridColumn } from '@atlaskit/page';
import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { Watermarks } from '../../../../base/react';
import { AudioSettingsButton, VideoSettingsButton } from '../../../../toolbox/components/web';
import { Avatar } from '../../../avatar';
import { allowUrlSharing } from '../../functions';

import ConnectionStatus from './ConnectionStatus';
import CopyMeetingUrl from './CopyMeetingUrl';
import Preview from './Preview';

import './style.css';

type Props = {

    /**
     * Children component(s) to be rendered on the screen.
     */
    children: React$Node,

    /**
     * Footer to be rendered for the page (if any).
     */
    footer?: React$Node,

    /**
     * The name of the participant.
     */
    name?: string,

    /**
     * Indicates whether the avatar should be shown when video is off
     */
    showAvatar: boolean,

    /**
     * Indicates whether the label and copy url action should be shown
     */
    showConferenceInfo: boolean,

    /**
     * Title of the screen.
     */
    title: string,

    /**
     * The 'Skip prejoin' button to be rendered (if any).
     */
     skipPrejoinButton?: React$Node,

    /**
     * True if the preview overlay should be muted, false otherwise.
     */
    videoMuted?: boolean,

    /**
     * The video track to render as preview (if omitted, the default local track will be rendered).
     */
    videoTrack?: Object,

    /**
     * True if the preview overlay should be muted, false otherwise.
     */
    isLobby?: boolean
}

/**
 * Implements a pre-meeting screen that can be used at various pre-meeting phases, for example
 * on the prejoin screen (pre-connection) or lobby (post-connection).
 */
export default class PreMeetingScreen extends PureComponent<Props> {
    /**
     * Default values for {@code Prejoin} component's properties.
     *
     * @static
     */
    static defaultProps = {
        showAvatar: true,
        showConferenceInfo: true
    };

    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const { DEFAULT_WELCOME_PAGE_LOGO_URL } = interfaceConfig;
        const showSharingButton = allowUrlSharing();
        const { name, showAvatar, showConferenceInfo, title, videoMuted, videoTrack, isLobby } = this.props;

        return (
            <div
                className = 'premeeting-screen'
                id = 'lobby-screen'>
                <Watermarks defaultJitsiLogoURL = { DEFAULT_WELCOME_PAGE_LOGO_URL } />
                <ConnectionStatus />
                <Container>
                    <Row>
                        <Col
                            md = { 6 }
                            xs = { 12 }>
                            <Row>
                                <Preview
                                    footer = { this.props.footer }
                                    videoMuted = { videoMuted }
                                    videoTrack = { videoTrack } />
                                {!videoMuted && <div className = 'preview-overlay' />}
                                {showAvatar && videoMuted && (
                                    <div className = { 'prejoin-no-camera' }>
                                        <Avatar
                                            className = 'premeeting-screen-avatar'
                                            displayName = { name }
                                            dynamicColor = { false }
                                            participantId = 'local'
                                            size = { 80 } />
                                    </div>
                                )}
                                {isLobby && (
                                    <div className = { 'prejoin-no-camera' }>
                                        <Avatar
                                            className = 'premeeting-screen-avatar'
                                            displayName = { name }
                                            dynamicColor = { false }
                                            participantId = 'local'
                                            size = { 80 } />
                                    </div>
                                )}
                            </Row>
                            <Row>
                                {!isLobby && (
                                    <div className = 'media-btn-container'>
                                        <AudioSettingsButton visible = { true } />
                                        <VideoSettingsButton visible = { true } />
                                    </div>
                                )}
                            </Row>
                        </Col>
                        <Col
                            id = 'tist'
                            md = { 6 }
                            xs = { 12 }>
                            <div
                                className = 'content'
                                id = 'tist'>
                                <>
                                    <div className = 'title'>
                                        { title }
                                    </div>
                                </>
                                { this.props.children }
                                { this.props.skipPrejoinButton }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
