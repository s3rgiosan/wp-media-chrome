/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import { registerBlockExtension } from '@10up/block-components';

/**
 * Internal dependencies
 */
import './style.css';
import attributes from './attributes.js';
import MediaChromeInspectorControls from './inspector-controls.js';

registerBlockExtension('core/embed', {
	extensionName: 'wp-media-chrome',
	attributes,
	classNameGenerator: () => null,
	inlineStyleGenerator: () => null,
	Edit: (props) => {
		return <MediaChromeInspectorControls {...props} />;
	},
	order: 'before',
});
