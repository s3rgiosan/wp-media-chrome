<?php
/**
 * Plugin Name:       Media Chrome for Embed Blocks
 * Description:       Enhance your audio and video block embeds with custom web components from Media Chrome.
 * Plugin URI:        https://github.com/s3rgiosan/wp-media-chrome
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Version:           1.1.0
 * Author:            Sérgio Santos
 * Author URI:        https://s3rgiosan.dev/?utm_source=wp-plugins&utm_medium=wp-media-chrome&utm_campaign=author-uri
 * License:           MIT
 * License URI:       https://opensource.org/license/mit/
 * Update URI:        https://s3rgiosan.dev/
 * GitHub Plugin URI: https://github.com/s3rgiosan/wp-media-chrome
 * Text Domain:       wp-media-chrome
 */

namespace S3S\WP\MediaChrome;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'S3S_MEDIA_CHROME_PATH', plugin_dir_path( __FILE__ ) );
define( 'S3S_MEDIA_CHROME_URL', plugin_dir_url( __FILE__ ) );

if ( file_exists( S3S_MEDIA_CHROME_PATH . 'vendor/autoload.php' ) ) {
	require_once S3S_MEDIA_CHROME_PATH . 'vendor/autoload.php';
}

PucFactory::buildUpdateChecker(
	'https://github.com/s3rgiosan/wp-media-chrome/',
	__FILE__,
	'wp-media-chrome'
)->setBranch( 'main' );

( Plugin::get_instance() )->setup();
