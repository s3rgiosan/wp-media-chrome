/* eslint-disable import/no-extraneous-dependencies */
/**
 * External dependencies
 */
import { registerBlockExtension } from '@10up/block-components';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './style.css';
import additionalAttributes from './attributes.js';
import MediaChromeInspectorControls from './inspector-controls.js';

registerBlockExtension('core/embed', {
	extensionName: 'wp-media-chrome',
	attributes: additionalAttributes,
	classNameGenerator: () => null,
	inlineStyleGenerator: () => null,
	Edit: (props) => {
		const { attributes } = props;
		const { providerNameSlug } = attributes;

		const supportedProviders =
			applyFilters('mediaChrome.providers.video', ['youtube', 'vimeo', 'wistia']) || [];

		if (!supportedProviders.includes(providerNameSlug)) {
			return null;
		}

		return <MediaChromeInspectorControls {...props} />;
	},
	order: 'before',
});
