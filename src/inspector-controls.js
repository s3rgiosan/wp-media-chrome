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
		displayPlayButton,
		displaySeekBackwardButton,
		displaySeekForwardButton,
		displayMuteButton,
		displayVolumeRange,
		displayTimeDisplay,
		displayTimeRange,
		// displayCaptionsButton,
		displayPlaybackRateButton,
		// displayPipButton,
		displayFullscreenButton,
		displayAirplayButton,
	} = attributes;

	const instanceId = useInstanceId(MediaChromeInspectorControls);

	const [settings] = useSettings('custom.mediaChrome') ?? [{}];

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
	} = settings;


	return (
		<InspectorControls>
			<PanelBody title={__('Media Chrome', 'wp-media-chrome')}>
				{mutedSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Muted', 'wp-media-chrome')}
							checked={muted}
							onChange={(value) => setAttributes({ muted: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{controlsSetting && (
					<PanelRow>
						<ToggleControl
							label={__('Playback controls', 'wp-media-chrome')}
							checked={controls}
							onChange={(value) => setAttributes({ controls: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{playsInlineSetting && (
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
				)}
				{preloadSetting && (
					<PanelRow>
						<SelectControl
							label={__('Preload')}
							value={preload}
							onChange={(value) => setAttributes({ preload: value })}
							options={[
								{ value: 'auto', label: __('Auto') },
								{ value: 'metadata', label: __('Metadata') },
								{ value: 'none', label: _x('None', 'Preload value') },
							]}
							hideCancelButton
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
				{posterSetting && (
					<PanelRow>
						<PosterImage
							poster={poster}
							setAttributes={setAttributes}
							instanceId={instanceId}
						/>
					</PanelRow>
				)}
			</PanelBody>
			{controlsSetting && controls && (
				<PanelBody
					title={__('Media Chrome — Controls', 'wp-media-chrome')}
					initialOpen={false}
				>
					{autohideSetting && (
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
					)}
					{playButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display play button', 'wp-media-chrome')}
								checked={!!displayPlayButton}
								onChange={(value) => setAttributes({ displayPlayButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{seekBackwardButtonSetting && (
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
					)}
					{seekForwardButtonSetting && (
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
					)}
					{muteButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display mute button', 'wp-media-chrome')}
								checked={!!displayMuteButton}
								onChange={(value) => setAttributes({ displayMuteButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{volumeRangeButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display volume range', 'wp-media-chrome')}
								checked={!!displayVolumeRange}
								onChange={(value) => setAttributes({ displayVolumeRange: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
					)}
					{timeDisplaySetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display time display', 'wp-media-chrome')}
								checked={!!displayTimeDisplay}
								onChange={(value) => setAttributes({ displayTimeDisplay: value })}
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
					)}
					{playbackRateButtonSetting && (
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
					)}
					{fullscreenButtonSetting && (
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
					)}
					{airplayButtonSetting && (
						<PanelRow>
							<ToggleControl
								label={__('Display airplay button', 'wp-media-chrome')}
								checked={!!displayAirplayButton}
								onChange={(value) => setAttributes({ displayAirplayButton: value })}
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
