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
import PosterImage from '../embed-video/poster-image';
import { updateAttribute } from '../utils';

const DEFAULT_PRESETS = {
	video: {
		muted: false,
		controls: true,
		preload: 'metadata',
		playsInline: false,
		poster: '',
		autohide: 2,
		playButton: true,
		seekBackwardButton: true,
		seekForwardButton: true,
		muteButton: true,
		volumeRange: true,
		timeDisplay: true,
		timeRange: true,
		playbackRateButton: true,
		fullscreenButton: true,
		airplayButton: false,
	},
	audio: {
		muted: false,
		controls: true,
		preload: 'metadata',
		autohide: 2,
		playButton: true,
		seekBackwardButton: true,
		seekForwardButton: true,
		timeDisplay: true,
		timeRange: true,
	},
};

const MediaChromeInspectorControls = ({ attributes, setAttributes, mediaType }) => {
	const isVideo = mediaType === 'video';
	const fallbackPresets = DEFAULT_PRESETS[mediaType];

	const instanceId = useInstanceId(MediaChromeInspectorControls);

	const [settings] = useSettings(`custom.mediaChrome.ui.embed.${mediaType}`) ?? [{}];
	const [themePresets] = useSettings(`custom.mediaChrome.presets.embed.${mediaType}`) ?? [{}];

	const presets = { ...fallbackPresets, ...(themePresets ?? {}) };

	const uiEnabled = (key) => (settings ?? {})[key] ?? true;

	if (settings === false) {
		return null;
	}

	const isControlsEnabled = uiEnabled('controls') && (attributes.controls ?? presets.controls);

	const renderToggle = (key, label, help) => {
		if (!uiEnabled(key)) {
			return null;
		}
		return (
			<PanelRow>
				<ToggleControl
					label={label}
					checked={attributes[key] ?? presets[key]}
					onChange={(value) =>
						updateAttribute(
							{ [key]: value },
							{ [key]: presets[key] },
							setAttributes,
							attributes,
						)
					}
					help={help}
					__nextHasNoMarginBottom
				/>
			</PanelRow>
		);
	};

	return (
		<InspectorControls>
			<PanelBody title={__('Media Chrome', 'wp-media-chrome')}>
				{renderToggle('muted', __('Muted', 'wp-media-chrome'))}
				{renderToggle('controls', __('Playback controls', 'wp-media-chrome'))}
				{isVideo &&
					renderToggle(
						'playsInline',
						__('Play inline', 'wp-media-chrome'),
						__(
							'When enabled, videos will play directly within the webpage on mobile browsers, instead of opening in a fullscreen player.',
						),
					)}
				{uiEnabled('preload') && (
					<PanelRow>
						<SelectControl
							label={__('Preload')}
							value={attributes.preload ?? presets.preload}
							onChange={(value) =>
								updateAttribute(
									{ preload: value },
									{ preload: presets.preload },
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
				{isVideo && uiEnabled('poster') && (
					<PanelRow>
						<PosterImage
							poster={attributes.poster ?? presets.poster}
							setAttributes={(newValues) =>
								updateAttribute(
									newValues,
									{ poster: presets.poster },
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
					{uiEnabled('autohide') && (
						<PanelRow>
							<RangeControl
								label={__('Autohide', 'wp-media-chrome')}
								value={attributes.autohide ?? presets.autohide}
								onChange={(value) =>
									updateAttribute(
										{ autohide: value },
										{ autohide: presets.autohide },
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
					{renderToggle('playButton', __('Display play button', 'wp-media-chrome'))}
					{renderToggle(
						'seekBackwardButton',
						__('Display seek backward button', 'wp-media-chrome'),
					)}
					{renderToggle(
						'seekForwardButton',
						__('Display seek forward button', 'wp-media-chrome'),
					)}
					{isVideo &&
						renderToggle('muteButton', __('Display mute button', 'wp-media-chrome'))}
					{isVideo &&
						renderToggle(
							'volumeRange',
							__('Display volume range', 'wp-media-chrome'),
						)}
					{renderToggle('timeDisplay', __('Display time', 'wp-media-chrome'))}
					{renderToggle('timeRange', __('Display time range', 'wp-media-chrome'))}
					{isVideo &&
						renderToggle(
							'playbackRateButton',
							__('Display playback rate button', 'wp-media-chrome'),
						)}
					{isVideo &&
						renderToggle(
							'fullscreenButton',
							__('Display fullscreen button', 'wp-media-chrome'),
						)}
					{isVideo &&
						renderToggle(
							'airplayButton',
							__('Display airplay button', 'wp-media-chrome'),
							__(
								'Note: AirPlay is only available in Safari browsers.',
								'wp-media-chrome',
							),
						)}
				</PanelBody>
			)}
		</InspectorControls>
	);
};

export default MediaChromeInspectorControls;
