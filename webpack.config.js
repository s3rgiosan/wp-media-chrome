const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		'embed-video/index': './src/embed-video/edit.js',
		'embed-video/view': './src/embed-video/view.js',
	},
};
