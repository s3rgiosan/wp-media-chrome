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
