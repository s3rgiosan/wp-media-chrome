<?php

namespace S3S\WP\MediaChrome;

class MediaController {

	/**
	 * Generate the media controller markup based on block attributes.
	 *
	 * @param  array $block_attrs The block attributes.
	 * @return string The media controller markup. Empty string if the provider is not found.
	 */
	public static function generate_markup( $block_attrs ) {

		$provider_slug = $block_attrs['providerNameSlug'] ?? 'video';
		$provider      = ProviderRegistry::get_provider( $provider_slug );

		if ( empty( $provider ) ) {
			return '';
		}

		$provider_markup = $provider->get_markup( $block_attrs['url'] );

		if ( empty( $provider_markup ) ) {
			return '';
		}

		$controller = sprintf(
			'<media-controller %1$s>
				%2$s
				%3$s
				%4$s
			</media-controller>',
			self::get_media_controller_attrs( $block_attrs ),
			$provider_markup,
			MediaPosterImage::generate_markup( $block_attrs ),
			MediaControlBar::generate_markup( $block_attrs )
		);

		return $controller;
	}

	/**
	 * Get the media controller attributes.
	 *
	 * @param  array $block_attrs The block attributes.
	 * @return string The media controller attributes as a string.
	 */
	protected static function get_media_controller_attrs( $block_attrs ) {

		$controller_attrs = [
			'autohide'    => 2,
			'muted'       => false,
			'controls'    => true,
			'playsInline' => false,
			'preload'     => 'metadata',
		];

		if ( isset( $block_attrs['autohide'] ) ) {
			$controller_attrs['autohide'] = $block_attrs['autohide'];
		}

		if ( isset( $block_attrs['muted'] ) && true === $block_attrs['muted'] ) {
			$controller_attrs['muted'] = true;
		}

		if ( isset( $block_attrs['controls'] ) && false === $block_attrs['controls'] ) {
			$controller_attrs['controls'] = false;
		}

		if ( isset( $block_attrs['playsInline'] ) && true === $block_attrs['playsInline'] ) {
			$controller_attrs['playsInline'] = true;
		}

		if ( isset( $block_attrs['preload'] ) ) {
			$controller_attrs['preload'] = $block_attrs['preload'];
		}

		/**
		 * Filters the media controller attributes.
		 *
		 * @param  array  $controller_attrs An array of HTML attributes.
		 * @param  array  $block_attrs      The block attributes.
		 * @return array
		 */
		$controller_attrs = apply_filters( 's3s_media_chrome_controller_attrs', $controller_attrs, $block_attrs );
		$controller_attrs = build_attrs( $controller_attrs );

		return $controller_attrs;
	}
}
