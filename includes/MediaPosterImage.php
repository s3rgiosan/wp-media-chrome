<?php

namespace S3S\WP\MediaChrome;

class MediaPosterImage {

	/**
	 * Generate the poster image markup based on block attributes.
	 *
	 * @param array $block_attrs Block attributes.
	 * @return string The HTML markup for the poster image. Empty string if no poster image is set.
	 */
	public static function generate_markup( $block_attrs ) {

		if ( empty( $block_attrs['poster'] ) ) {
			return '';
		}

		$poster_image = sprintf(
			'<media-poster-image slot="poster" src="%s"></media-poster-image>',
			esc_url( $block_attrs['poster'] )
		);

		return $poster_image;
	}
}
