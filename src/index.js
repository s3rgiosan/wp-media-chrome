/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
} from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import PosterImage from './poster-image';
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
				muted: {
					type: 'boolean',
					default: false,
				},
				controls: {
					type: 'boolean',
					default: true,
				},
				playsInline: {
					type: 'boolean',
					default: false,
				},
				preload: {
					type: 'string',
					default: 'metadata',
				},
				poster: {
					type: 'string',
					default: '',
				},
				// Media Controls
				displayPlayButton: {
					type: 'boolean',
					default: true,
				},
				displaySeekBackwardButton: {
					type: 'boolean',
					default: true,
				},
				displaySeekForwardButton: {
					type: 'boolean',
					default: true,
				},
				displayMuteButton: {
					type: 'boolean',
					default: true,
				},
				displayVolumeRange: {
					type: 'boolean',
					default: true,
				},
				displayTimeDisplay: {
					type: 'boolean',
					default: true,
				},
				displayTimeRange: {
					type: 'boolean',
					default: true,
				},
				displayCaptionsButton: {
					type: 'boolean',
					default: false,
				},
				displayPlaybackRateButton: {
					type: 'boolean',
					default: true,
				},
				displayPipButton: {
					type: 'boolean',
					default: false,
				},
				displayFullscreenButton: {
					type: 'boolean',
					default: true,
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
		muted,
		controls,
		playsInline,
		preload,
		poster,
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
	const instanceId = useInstanceId(addInspectorControls);

	if (name !== 'core/embed') {
		return <BlockEdit {...props} />;
	}

	console.log(props);

	return (
		<>
			<BlockEdit {...props} />
			<InspectorControls>
				<PanelBody title={__('Media Chrome', 'wp-media-chrome')}>
					<PanelRow>
						<ToggleControl
							label={__('Muted', 'wp-media-chrome')}
							checked={muted}
							onChange={(value) => setAttributes({ muted: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Playback controls', 'wp-media-chrome')}
							checked={controls}
							onChange={(value) => setAttributes({ controls: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={__('Play inline', 'wp-media-chrome')}
							checked={playsInline}
							onChange={(value) => setAttributes({ playsInline: value })}
							help={__(
								'When enabled, videos will play directly within the webpage on mobile browsers, instead of opening in a fullscreen player.',
							)}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Preload')}
							value={preload}
							onChange={(value) => setAttributes({ preload: value })}
							options={[
								{ value: 'auto', label: __('Auto') },
								{ value: 'metadata', label: __('Metadata') },
								{ value: 'none', label: _x('None', 'Preload value') },
							]}
							hideCancelButton
						/>
					</PanelRow>
					<PanelRow>
						<PosterImage
							poster={poster}
							setAttributes={setAttributes}
							instanceId={instanceId}
						/>
					</PanelRow>
				</PanelBody>
				{controls && (
					<>
						<PanelBody
							title={__('Media Chrome — Controls', 'wp-media-chrome')}
							initialOpen={false}
						>
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
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display play button', 'wp-media-chrome')}
									checked={!!displayPlayButton}
									onChange={(value) =>
										setAttributes({ displayPlayButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display seek backward button', 'wp-media-chrome')}
									checked={!!displaySeekBackwardButton}
									onChange={(value) =>
										setAttributes({ displaySeekBackwardButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display seek forward button', 'wp-media-chrome')}
									checked={!!displaySeekForwardButton}
									onChange={(value) =>
										setAttributes({ displaySeekForwardButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display mute button', 'wp-media-chrome')}
									checked={!!displayMuteButton}
									onChange={(value) =>
										setAttributes({ displayMuteButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display volume range', 'wp-media-chrome')}
									checked={!!displayVolumeRange}
									onChange={(value) =>
										setAttributes({ displayVolumeRange: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display time display', 'wp-media-chrome')}
									checked={!!displayTimeDisplay}
									onChange={(value) =>
										setAttributes({ displayTimeDisplay: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display time range', 'wp-media-chrome')}
									checked={!!displayTimeRange}
									onChange={(value) => setAttributes({ displayTimeRange: value })}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display captions button', 'wp-media-chrome')}
									checked={!!displayCaptionsButton}
									onChange={(value) =>
										setAttributes({ displayCaptionsButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display playback rate button', 'wp-media-chrome')}
									checked={!!displayPlaybackRateButton}
									onChange={(value) =>
										setAttributes({ displayPlaybackRateButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display pip button', 'wp-media-chrome')}
									checked={!!displayPipButton}
									onChange={(value) => setAttributes({ displayPipButton: value })}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display fullscreen button', 'wp-media-chrome')}
									checked={!!displayFullscreenButton}
									onChange={(value) =>
										setAttributes({ displayFullscreenButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label={__('Display airplay button', 'wp-media-chrome')}
									checked={!!displayAirplayButton}
									onChange={(value) =>
										setAttributes({ displayAirplayButton: value })
									}
									help={__(
										'Note: AirPlay is only available in Safari browsers.',
										'wp-media-chrome',
									)}
									__nextHasNoMarginBottom
								/>
							</PanelRow>
						</PanelBody>
					</>
				)}
			</InspectorControls>
		</>
	);
};

addFilter('editor.BlockEdit', 'wp-media-chrome/addInspectorControls', addInspectorControls);
