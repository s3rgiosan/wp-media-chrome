/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import { registerBlockExtension } from '@10up/block-components';

/**
 * Internal dependencies
 */
import './style.css';
import additionalAttributes from './attributes.js';
import MediaChromeInspectorControls from './inspector-controls.js';

// List of supported providers
const supportedProviders = ['youtube', 'vimeo', 'wistia'];

registerBlockExtension('core/embed', {
	extensionName: 'wp-media-chrome',
	attributes: additionalAttributes,
	classNameGenerator: () => null,
	inlineStyleGenerator: () => null,
	Edit: (props) => {
		const { attributes } = props;
		const { providerNameSlug } = attributes;

		if (!supportedProviders.includes(providerNameSlug)) {
			return null;
		}

		return <MediaChromeInspectorControls {...props} />;
	},
	order: 'before',
});
