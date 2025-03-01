<?php

namespace S3S\WP\MediaChrome;

class MediaController {

	/**
	 * The controller video attributes.
	 *
	 * @var array
	 */
	public static $video_attributes = [
		'muted',
		'controls',
		'preload',
		'playsInline',
		'autohide',
	];

	/**
	 * The controller audio attributes.
	 *
	 * @var array
	 */
	public static $audio_attributes = [
		'muted',
		'controls',
		'preload',
		'autohide',
	];

	/**
	 * Generate the controller markup.
	 *
	 * @param  array  $block_attrs The block attributes.
	 * @param  string $path        The path to the block settings.
	 * @return string The controller markup. Empty string if the provider is not found.
	 */
	public static function generate_markup( $block_attrs, $path ) {

		if ( empty( $block_attrs['providerNameSlug'] ) ) {
			return '';
		}

		$provider_slug = $block_attrs['providerNameSlug'];
		$provider      = ProviderRegistry::get_provider( $provider_slug );

		if ( empty( $provider ) ) {
			return '';
		}

		$provider_markup = $provider->get_markup( $block_attrs['url'] );

		if ( empty( $provider_markup ) ) {
			return '';
		}

		$controller = sprintf(
			'<media-controller %1$s %2$s>
				%3$s
				%4$s
				%5$s
			</media-controller>',
			self::get_attrs( $block_attrs, $path ),
			esc_attr( $provider->get_type() ),
			$provider_markup,
			MediaPosterImage::generate_markup( $block_attrs, $path ),
			MediaControlBar::generate_markup( $block_attrs, $path )
		);

		return $controller;
	}

	/**
	 * Get the controller attributes.
	 *
	 * @param  array  $block_attrs The block attributes.
	 * @param  string $path        The path to the block settings.
	 * @return string The controller attributes as a string.
	 */
	protected static function get_attrs( $block_attrs, $path ) {

		$global_settings = get_global_settings( $path );
		$custom_settings = wp_parse_args( $block_attrs, $global_settings );

		$attributes = [];
		if ( 'video' === $block_attrs['type'] ) {
			$attributes = self::$video_attributes;
		} elseif ( 'rich' === $block_attrs['type'] ) {
			$attributes = self::$audio_attributes;
		}

		$attributes = array_intersect_key( $custom_settings, array_flip( $attributes ) );

		/**
		 * Filters the controller attributes.
		 *
		 * @param  array  $attributes      An array of HTML attributes.
		 * @param  array  $block_attrs     The block attributes.
		 * @param  array  $custom_settings The custom settings.
		 * @return array
		 */
		$attributes = apply_filters( 's3s_media_chrome_controller_attributes', $attributes, $block_attrs, $custom_settings );
		$attributes = build_attrs( $attributes );

		return $attributes;
	}
}
