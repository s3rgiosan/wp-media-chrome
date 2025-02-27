const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

module.exports = {
	...defaultConfig,
	entry: {
		...getWebpackEntryPoints(),
		'embed/index': './src/embed/edit.js',
		'embed/view': './src/embed/view.js',
		'video/index': './src/embed/edit.js',
		'video/view': './src/embed/view.js',
	},
};
