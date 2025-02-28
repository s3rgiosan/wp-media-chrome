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

const MediaChromeInspectorControls = ({ attributes, setAttributes }) => {
	const {
		autohide,
		muted,
		controls,
		playsInline,
		preload,
		poster,
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

	const [settings = {}] = useSettings('custom.mediaChrome') ?? [];

	const {
		ui: {
			muted: mutedSetting = true,
			controls: controlsSetting = true,
			playsInline: playsInlineSetting = true,
			preload: preloadSetting = true,
			poster: posterSetting = true,
			autohide: autohideSetting = true,
			playButton: playButtonSetting = true,
			seekBackwardButton: seekBackwardButtonSetting = true,
			seekForwardButton: seekForwardButtonSetting = true,
			muteButton: muteButtonSetting = true,
			volumeRangeButton: volumeRangeButtonSetting = true,
			timeDisplay: timeDisplaySetting = true,
			timeRange: timeRangeSetting = true,
			playbackRateButton: playbackRateButtonSetting = true,
			fullscreenButton: fullscreenButtonSetting = true,
			airplayButton: airplayButtonSetting = true,
		} = {},
		presets: {
			autohide: autohidePreset = 2,
			muted: mutedPreset = false,
			controls: controlsPreset = true,
			playsInline: playsInlinePreset = false,
			preload: preloadPreset = 'metadata',
			poster: posterPreset = '',
			playButton: playButtonPreset = true,
			seekBackwardButton: seekBackwardButtonPreset = true,
			seekForwardButton: seekForwardButtonPreset = true,
			muteButton: muteButtonPreset = true,
			volumeRangeButton: volumeRangeButtonPreset = true,
			timeDisplay: timeDisplayPreset = true,
			timeRange: timeRangePreset = true,
			playbackRateButton: playbackRateButtonPreset = true,
			fullscreenButton: fullscreenButtonPreset = true,
			airplayButton: airplayButtonPreset = false,
		} = {},
	} = settings;

	const isControlsEnabled = controlsSetting && (controls ?? controlsPreset);

	return (
		<InspectorControls>
			<PanelBody title={__('Media Chrome', 'wp-media-chrome')}>
				{mutedSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Muted', 'wp-media-chrome')}
							checked={muted ?? mutedPreset}
							onChange={(value) => setAttributes({ muted: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{controlsSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Playback controls', 'wp-media-chrome')}
							checked={controls ?? controlsPreset}
							onChange={(value) => setAttributes({ controls: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{playsInlineSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Play inline', 'wp-media-chrome')}
							checked={playsInline ?? playsInlinePreset}
							onChange={(value) => setAttributes({ playsInline: value })}
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
							onChange={(value) => setAttributes({ preload: value })}
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
							setAttributes={setAttributes}
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
					)}
					{playButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display play button', 'wp-media-chrome')}
								checked={playButton ?? playButtonPreset}
								onChange={(value) => setAttributes({ playButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{seekBackwardButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display seek backward button', 'wp-media-chrome')}
								checked={seekBackwardButton ?? seekBackwardButtonPreset}
								onChange={(value) => setAttributes({ seekBackwardButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{seekForwardButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display seek forward button', 'wp-media-chrome')}
								checked={seekForwardButton ?? seekForwardButtonPreset}
								onChange={(value) => setAttributes({ seekForwardButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{muteButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display mute button', 'wp-media-chrome')}
								checked={muteButton ?? muteButtonPreset}
								onChange={(value) => setAttributes({ muteButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{volumeRangeButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display volume range', 'wp-media-chrome')}
								checked={volumeRange ?? volumeRangeButtonPreset}
								onChange={(value) => setAttributes({ volumeRange: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{timeDisplaySetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display time ', 'wp-media-chrome')}
								checked={timeDisplay ?? timeDisplayPreset}
								onChange={(value) => setAttributes({ timeDisplay: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{timeRangeSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display time range', 'wp-media-chrome')}
								checked={timeRange ?? timeRangePreset}
								onChange={(value) => setAttributes({ timeRange: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{playbackRateButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display playback rate button', 'wp-media-chrome')}
								checked={playbackRateButton ?? playbackRateButtonPreset}
								onChange={(value) => setAttributes({ playbackRateButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{fullscreenButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display fullscreen button', 'wp-media-chrome')}
								checked={fullscreenButton ?? fullscreenButtonPreset}
								onChange={(value) => setAttributes({ fullscreenButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{airplayButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display airplay button', 'wp-media-chrome')}
								checked={airplayButton ?? airplayButtonPreset}
								onChange={(value) => setAttributes({ airplayButton: value })}
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
