/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import PosterImage from './poster-image';

const MediaChromeInspectorControls = ({ attributes, setAttributes }) => {
	const {
		type,
		providerNameSlug,
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

	/**
	 * Filters whether to enable the media controls UI.
	 *
	 * @param {boolean} enableControlsUI Whether to enable the media controls UI. Default is `true`.
	 * @param {string}  type             The media type.
	 * @param {string}  providerNameSlug The provider name slug.
	 * @return {boolean} Whether to enable the media controls UI.
	 */
	const enableControlsUI = applyFilters(
		'mediaChrome.controls.ui.enable',
		true,
		type,
		providerNameSlug,
	);

	return (
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
				{enableControlsUI && (
					<PanelRow>
						<ToggleControl
							label={__('Playback controls', 'wp-media-chrome')}
							checked={controls}
							onChange={(value) => setAttributes({ controls: value })}
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				)}
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
			{enableControlsUI && controls && (
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
								onChange={(value) => setAttributes({ displayPlayButton: value })}
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
								onChange={(value) => setAttributes({ displayMuteButton: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__('Display volume range', 'wp-media-chrome')}
								checked={!!displayVolumeRange}
								onChange={(value) => setAttributes({ displayVolumeRange: value })}
								__nextHasNoMarginBottom
							/>
						</PanelRow>
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
						{/* <PanelRow>
								<ToggleControl
									label={__('Display captions button', 'wp-media-chrome')}
									checked={!!displayCaptionsButton}
									onChange={(value) =>
										setAttributes({ displayCaptionsButton: value })
									}
									__nextHasNoMarginBottom
								/>
							</PanelRow> */}
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
						{/* <PanelRow>
								<ToggleControl
									label={__('Display pip button', 'wp-media-chrome')}
									checked={!!displayPipButton}
									onChange={(value) => setAttributes({ displayPipButton: value })}
									__nextHasNoMarginBottom
								/>
							</PanelRow> */}
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
								onChange={(value) => setAttributes({ displayAirplayButton: value })}
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
	);
};

export default MediaChromeInspectorControls;
