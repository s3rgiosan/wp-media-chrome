<?php

namespace S3S\WP\MediaChrome;

class MediaPosterImage {

	/**
	 * The poster image attributes.
	 *
	 * @var array
	 */
	public static $attributes = [
		'poster',
	];

	/**
	 * Generate the poster image markup.
	 *
	 * @param array $block_attrs Block attributes.
	 * @return string The HTML markup for the poster image. Empty string if no poster image is set.
	 */
	public static function generate_markup( $block_attrs ) {

		$global_settings = get_global_settings();
		$custom_settings = wp_parse_args( $block_attrs, $global_settings );

		$attributes = array_intersect_key( $custom_settings, array_flip( self::$attributes ) );

		/**
		 * Filters the poster image attributes.
		 *
		 * @param  array  $attributes      An array of HTML attributes.
		 * @param  array  $block_attrs     The block attributes.
		 * @param  array  $custom_settings The custom settings.
		 * @return array
		 */
		$attributes = apply_filters( 's3s_media_chrome_poster_image_attributes', $attributes, $block_attrs, $custom_settings );

		if ( empty( $attributes['poster'] ) ) {
			return '';
		}

		$poster_image = sprintf(
			'<media-poster-image slot="poster" %1$s></media-poster-image>',
			build_attrs( $attributes )
		);

		return $poster_image;
	}
}
