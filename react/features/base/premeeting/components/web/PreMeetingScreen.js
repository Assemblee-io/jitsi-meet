/* global interfaceConfig */

// @flow
import Page, { Grid, GridColumn } from '@atlaskit/page';
import React, { PureComponent } from 'react';

import { Watermarks } from '../../../../base/react';
import { AudioSettingsButton, VideoSettingsButton } from '../../../../toolbox/components/web';
import { Avatar } from '../../../avatar';

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
    videoTrack?: Object
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
        const { name, showAvatar, showConferenceInfo, title, videoMuted, videoTrack } = this.props;
        const { DEFAULT_WELCOME_PAGE_LOGO_URL } = interfaceConfig;

        return (
            <div
                className = 'premeeting-screen'
                id = 'lobby-screen'>
                <Watermarks defaultJitsiLogoURL = { DEFAULT_WELCOME_PAGE_LOGO_URL } />
                <ConnectionStatus />
                <Page>
                    <Grid
                        spacing = { 'comfortable' }>
                        <GridColumn medium = { 6 }>
                            <Preview
                                footer = { this.props.footer }
                                videoMuted = { videoMuted }
                                videoTrack = { videoTrack } />
                            {!videoMuted && <div className = 'preview-overlay' />}
                            <div className = 'media-btn-container'>
                                <AudioSettingsButton visible = { true } />
                                <VideoSettingsButton visible = { true } />
                            </div>
                        </GridColumn>
                        <GridColumn medium = { 6 }>
                            <div className = 'content'>
                                {showAvatar && videoMuted && (
                                    <Avatar
                                        className = 'premeeting-screen-avatar'
                                        displayName = { name }
                                        dynamicColor = { false }
                                        participantId = 'local'
                                        size = { 80 } />
                                )}
                                {showConferenceInfo && (
                                    <>
                                        <div className = 'title'>
                                            { title }
                                        </div>
                                        <CopyMeetingUrl />
                                    </>
                                )}
                                { this.props.children }
                                { this.props.skipPrejoinButton }
                            </div>
                        </GridColumn>
                    </Grid>
                </Page>
            </div>
        );
    }
}
