<?php
/**
 * Plugin Name:       Media Chrome for Embeds
 * Description:       Custom web components for audio and video embeds powered by Media Chrome.
 * Plugin URI:        https://github.com/s3rgiosan/wp-media-chrome
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Sérgio Santos
 * Author URI:        https://s3rgiosan.dev/?utm_source=wp-plugins&utm_medium=wp-media-chrome&utm_campaign=author-uri
 * License:           GPL-3.0-or-later
 * License URI:       https://spdx.org/licenses/GPL-3.0-or-later.html
 * Text Domain:       wp-media-chrome
 *
 * @package           MediaChrome
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
