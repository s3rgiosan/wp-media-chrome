/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 *  Internal dependencies
 */
import './style.css';

const addAttributes = (settings, name) => {
	if (name !== 'core/embed') {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			...{
				// Media Controller
				autohide: {
					type: 'integer',
					default: 2,
				},
				// Media Control Bar
				displayControlBar: {
					type: 'boolean',
					default: false,
				},
				displayPlayButton: {
					type: 'boolean',
					default: false,
				},
				displaySeekBackwardButton: {
					type: 'boolean',
					default: false,
				},
				displaySeekForwardButton: {
					type: 'boolean',
					default: false,
				},
				displayMuteButton: {
					type: 'boolean',
					default: false,
				},
				displayVolumeRange: {
					type: 'boolean',
					default: false,
				},
				displayTimeDisplay: {
					type: 'boolean',
					default: false,
				},
				displayTimeRange: {
					type: 'boolean',
					default: false,
				},
				displayCaptionsButton: {
					type: 'boolean',
					default: false,
				},
				displayPlaybackRateButton: {
					type: 'boolean',
					default: false,
				},
				displayPipButton: {
					type: 'boolean',
					default: false,
				},
				displayFullscreenButton: {
					type: 'boolean',
					default: false,
				},
				displayAirplayButton: {
					type: 'boolean',
					default: false,
				},
			},
		},
	};
};

addFilter('blocks.registerBlockType', 'wp-media-chrome/addAttributes', addAttributes);

const addInspectorControls = (BlockEdit) => (props) => {
	const { name, attributes, setAttributes } = props;
	const {
		autohide,
		displayControlBar,
		displayPlayButton,
		displaySeekBackwardButton,
		displaySeekForwardButton,
		displayMuteButton,
		displayVolumeRange,
		displayTimeDisplay,
		displayTimeRange,
		displayCaptionsButton,
		displayPlaybackRateButton,
		displayPipButton,
		displayFullscreenButton,
		displayAirplayButton,
	} = attributes;

	if (name !== 'core/embed') {
		return <BlockEdit {...props} />;
	}

	return (
		<>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody title={__('Media Chrome', 'wp-media-chrome')} initialOpen={false}>
					<PanelRow>
						<RangeControl
							label={__('Autohide', 'wp-media-chrome')}
							value={autohide}
							onChange={(value) => setAttributes({ autohide: value })}
							min={-1}
							max={60}
							help={__(
								'Autohide all controls after n seconds of inactivity, unless the media is paused. To disable autohide, set the value to -1.',
								'wp-media-chrome',
							)}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={__('Media Chrome — Control Bar', 'wp-media-chrome')}
					initialOpen={false}
				>
					<PanelRow>
						<ToggleControl
							label={__('Display control bar', 'wp-media-chrome')}
							checked={displayControlBar}
							onChange={(value) => setAttributes({ displayControlBar: value })}
						/>
					</PanelRow>
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display play button', 'wp-media-chrome')}
								checked={displayPlayButton}
								onChange={(value) => setAttributes({ displayPlayButton: value })}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display seek backward button', 'wp-media-chrome')}
								checked={displaySeekBackwardButton}
								onChange={(value) =>
									setAttributes({ displaySeekBackwardButton: value })
								}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display seek forward button', 'wp-media-chrome')}
								checked={displaySeekForwardButton}
								onChange={(value) =>
									setAttributes({ displaySeekForwardButton: value })
								}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display mute button', 'wp-media-chrome')}
								checked={displayMuteButton}
								onChange={(value) => setAttributes({ displayMuteButton: value })}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display volume range', 'wp-media-chrome')}
								checked={displayVolumeRange}
								onChange={(value) => setAttributes({ displayVolumeRange: value })}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display time display', 'wp-media-chrome')}
								checked={displayTimeDisplay}
								onChange={(value) => setAttributes({ displayTimeDisplay: value })}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display time range', 'wp-media-chrome')}
								checked={displayTimeRange}
								onChange={(value) => setAttributes({ displayTimeRange: value })}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display captions button', 'wp-media-chrome')}
								checked={displayCaptionsButton}
								onChange={(value) =>
									setAttributes({ displayCaptionsButton: value })
								}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display playback rate button', 'wp-media-chrome')}
								checked={displayPlaybackRateButton}
								onChange={(value) =>
									setAttributes({ displayPlaybackRateButton: value })
								}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display pip button', 'wp-media-chrome')}
								checked={displayPipButton}
								onChange={(value) => setAttributes({ displayPipButton: value })}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display fullscreen button', 'wp-media-chrome')}
								checked={displayFullscreenButton}
								onChange={(value) =>
									setAttributes({ displayFullscreenButton: value })
								}
							/>
						</PanelRow>
					)}
					{displayControlBar && (
						<PanelRow>
							<ToggleControl
								label={__('Display airplay button', 'wp-media-chrome')}
								checked={displayAirplayButton}
								onChange={(value) => setAttributes({ displayAirplayButton: value })}
							/>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
};

addFilter('editor.BlockEdit', 'wp-media-chrome/addInspectorControls', addInspectorControls);
