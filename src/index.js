/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './style.css';
import MediaChromeInspectorControls from './inspector-controls';

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
				// displayCaptionsButton: {
				// 	type: 'boolean',
				// 	default: false,
				// },
				displayPlaybackRateButton: {
					type: 'boolean',
					default: true,
				},
				// displayPipButton: {
				// 	type: 'boolean',
				// 	default: false,
				// },
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
	const { name } = props;

	if (name !== 'core/embed') {
		return <BlockEdit {...props} />;
	}

	return (
		<>
			<BlockEdit {...props} />
			<MediaChromeInspectorControls {...props} />
		</>
	);
};

addFilter('editor.BlockEdit', 'wp-media-chrome/addInspectorControls', addInspectorControls);
