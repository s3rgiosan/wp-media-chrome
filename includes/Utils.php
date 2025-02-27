<?php

namespace S3S\WP\MediaChrome;

/**
 * Builds a string of HTML attributes.
 *
 * Supports both single attributes and key/value pairs.
 *
 * @param  array $attributes Optional. An array of HTML attribute key/value pairs.
 * @return string A string of HTML attributes.
 */
function build_attrs( $attributes = [] ) {

	if ( empty( $attributes ) ) {
		return '';
	}

	$parsed_attributes = [];

	foreach ( $attributes as $key => $value ) {

		// Skip false values.
		if ( $value === false ) {
			continue;
		}

		$key = esc_attr( $key );

		// Output key only when no value or true.
		if ( $value === '' || $value === true ) {
			$parsed_attributes[] = $key;
		} elseif ( is_scalar( $value ) ) {

			switch ( $key ) {
				case 'src':
				case 'href':
				case 'poster':
					$value = esc_url( $value );
					break;
				default:
					$value = esc_attr( $value );
					break;
			}

			$parsed_attributes[] = sprintf( '%s="%s"', $key, $value );
		}
	}

	$parsed_attributes = implode( ' ', $parsed_attributes );

	return $parsed_attributes;
}

/**
 * Retrieves the global Media Chrome settings.
 *
 * This function merges core defaults with theme-level and user-defined settings
 * retrieved via `wp_get_global_settings()`.
 *
 * @uses wp_get_global_settings()
 *
 * @return array The merged Media Chrome settings.
 */
function get_global_settings() {

	$defaults = [
		'autohide'           => 2,
		'muted'              => false,
		'controls'           => true,
		'playsInline'        => false,
		'preload'            => 'metadata',
		'poster'             => '',
		'playButton'         => true,
		'seekBackwardButton' => true,
		'seekForwardButton'  => true,
		'muteButton'         => true,
		'volumeRange'        => true,
		'timeDisplay'        => true,
		'timeRange'          => true,
		'playbackRateButton' => true,
		'fullscreenButton'   => true,
		'airplayButton'      => false,
	];

	$presets = wp_get_global_settings( [ 'custom', 'mediaChrome', 'presets' ] );

	if ( empty( $presets ) ) {
		return $defaults;
	}

	$settings = wp_parse_args( $presets, $defaults );

	return $settings;
}
