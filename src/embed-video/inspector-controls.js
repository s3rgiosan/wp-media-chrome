/**
 * WordPress dependencies
 */
import { InspectorControls, useSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import PosterImage from './poster-image';
import { updateAttribute } from '../utils';

const MediaChromeInspectorControls = ({ attributes, setAttributes }) => {
	const {
		muted,
		controls,
		preload,
		playsInline,
		poster,
		autohide,
		playButton,
		seekBackwardButton,
		seekForwardButton,
		muteButton,
		volumeRange,
		timeDisplay,
		timeRange,
		playbackRateButton,
		fullscreenButton,
		airplayButton,
	} = attributes;

	const instanceId = useInstanceId(MediaChromeInspectorControls);

	const [settings] = useSettings('custom.mediaChrome.ui.embed.video') ?? [{}];
	const [presets] = useSettings('custom.mediaChrome.presets.embed.video') ?? [{}];

	const {
		muted: mutedSetting = true,
		controls: controlsSetting = true,
		preload: preloadSetting = true,
		playsInline: playsInlineSetting = true,
		poster: posterSetting = true,
		autohide: autohideSetting = true,
		playButton: playButtonSetting = true,
		seekBackwardButton: seekBackwardButtonSetting = true,
		seekForwardButton: seekForwardButtonSetting = true,
		muteButton: muteButtonSetting = true,
		volumeRange: volumeRangeSetting = true,
		timeDisplay: timeDisplaySetting = true,
		timeRange: timeRangeSetting = true,
		playbackRateButton: playbackRateButtonSetting = true,
		fullscreenButton: fullscreenButtonSetting = true,
		airplayButton: airplayButtonSetting = true,
	} = settings ?? {};

	const {
		muted: mutedPreset = false,
		controls: controlsPreset = true,
		preload: preloadPreset = 'metadata',
		playsInline: playsInlinePreset = false,
		poster: posterPreset = '',
		autohide: autohidePreset = 2,
		playButton: playButtonPreset = true,
		seekBackwardButton: seekBackwardButtonPreset = true,
		seekForwardButton: seekForwardButtonPreset = true,
		muteButton: muteButtonPreset = true,
		volumeRange: volumeRangePreset = true,
		timeDisplay: timeDisplayPreset = true,
		timeRange: timeRangePreset = true,
		playbackRateButton: playbackRateButtonPreset = true,
		fullscreenButton: fullscreenButtonPreset = true,
		airplayButton: airplayButtonPreset = false,
	} = presets ?? {};

	if (settings === false) {
		return null;
	}

	const isControlsEnabled = controlsSetting && (controls ?? controlsPreset);

	return (
		<InspectorControls>
			<PanelBody title={__('Media Chrome', 'wp-media-chrome')}>
				{mutedSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Muted', 'wp-media-chrome')}
							checked={muted ?? mutedPreset}
							onChange={(value) =>
								updateAttribute(
									{ muted: value },
									{ muted: mutedPreset },
									setAttributes,
									attributes,
								)
							}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{controlsSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Playback controls', 'wp-media-chrome')}
							checked={controls ?? controlsPreset}
							onChange={(value) =>
								updateAttribute(
									{ controls: value },
									{ controls: controlsPreset },
									setAttributes,
									attributes,
								)
							}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{playsInlineSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Play inline', 'wp-media-chrome')}
							checked={playsInline ?? playsInlinePreset}
							onChange={(value) =>
								updateAttribute(
									{ playsInline: value },
									{ playsInline: playsInlinePreset },
									setAttributes,
									attributes,
								)
							}
							help={__(
								'When enabled, videos will play directly within the webpage on mobile browsers, instead of opening in a fullscreen player.',
							)}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{preloadSetting && (
					<PanelRow>
						<SelectControl
							label={__('Preload')}
							value={preload ?? preloadPreset}
							onChange={(value) =>
								updateAttribute(
									{ preload: value },
									{ preload: preloadPreset },
									setAttributes,
									attributes,
								)
							}
							options={[
								{ value: 'auto', label: __('Auto') },
								{ value: 'metadata', label: __('Metadata') },
								{ value: 'none', label: _x('None', 'Preload value') },
							]}
							hideCancelButton
							__next40pxPresetSize
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{posterSetting && (
					<PanelRow>
						<PosterImage
							poster={poster ?? posterPreset}
							setAttributes={(newValues) =>
								updateAttribute(
									newValues,
									{ poster: posterPreset },
									setAttributes,
									attributes,
								)
							}
							instanceId={instanceId}
						/>
					</PanelRow>
				)}
			</PanelBody>
			{isControlsEnabled && (
				<PanelBody
					title={__('Media Chrome — Controls', 'wp-media-chrome')}
					initialOpen={false}
				>
					{autohideSetting && (
						<PanelRow>
							<RangeControl
								label={__('Autohide', 'wp-media-chrome')}
								value={autohide ?? autohidePreset}
								onChange={(value) =>
									updateAttribute(
										{ autohide: value },
										{ autohide: autohidePreset },
										setAttributes,
										attributes,
									)
								}
								min={-1}
								max={60}
								help={__(
									'Autohide all controls after n seconds of inactivity, unless the media is paused. To disable autohide, set the value to -1.',
									'wp-media-chrome',
								)}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{playButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display play button', 'wp-media-chrome')}
								checked={playButton ?? playButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ playButton: value },
										{ playButton: playButtonPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{seekBackwardButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display seek backward button', 'wp-media-chrome')}
								checked={seekBackwardButton ?? seekBackwardButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ seekBackwardButton: value },
										{ seekBackwardButton: seekBackwardButtonPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{seekForwardButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display seek forward button', 'wp-media-chrome')}
								checked={seekForwardButton ?? seekForwardButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ seekForwardButton: value },
										{ seekForwardButton: seekForwardButtonPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{muteButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display mute button', 'wp-media-chrome')}
								checked={muteButton ?? muteButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ muteButton: value },
										{ muteButton: muteButtonPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{volumeRangeSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display volume range', 'wp-media-chrome')}
								checked={volumeRange ?? volumeRangePreset}
								onChange={(value) =>
									updateAttribute(
										{ volumeRange: value },
										{ volumeRange: volumeRangePreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{timeDisplaySetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display time', 'wp-media-chrome')}
								checked={timeDisplay ?? timeDisplayPreset}
								onChange={(value) =>
									updateAttribute(
										{ timeDisplay: value },
										{ timeDisplay: timeDisplayPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{timeRangeSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display time range', 'wp-media-chrome')}
								checked={timeRange ?? timeRangePreset}
								onChange={(value) =>
									updateAttribute(
										{ timeRange: value },
										{ timeRange: timeRangePreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{playbackRateButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display playback rate button', 'wp-media-chrome')}
								checked={playbackRateButton ?? playbackRateButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ playbackRateButton: value },
										{ playbackRateButton: playbackRateButtonPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{fullscreenButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display fullscreen button', 'wp-media-chrome')}
								checked={fullscreenButton ?? fullscreenButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ fullscreenButton: value },
										{ fullscreenButton: fullscreenButtonPreset },
										setAttributes,
										attributes,
									)
								}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{airplayButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display airplay button', 'wp-media-chrome')}
								checked={airplayButton ?? airplayButtonPreset}
								onChange={(value) =>
									updateAttribute(
										{ airplayButton: value },
										{ airplayButton: airplayButtonPreset },
										setAttributes,
										attributes,
									)
								}
								help={__(
									'Note: AirPlay is only available in Safari browsers.',
									'wp-media-chrome',
								)}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
				</PanelBody>
			)}
		</InspectorControls>
	);
};

export default MediaChromeInspectorControls;
