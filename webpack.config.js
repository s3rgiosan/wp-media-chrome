const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		'embed-video/index': './src/embed-video/edit.js',
		'embed-video/view': './src/embed-video/view.js',
		'embed-audio/index': './src/embed-audio/edit.js',
		'embed-audio/view': './src/embed-audio/view.js',
	},
};
