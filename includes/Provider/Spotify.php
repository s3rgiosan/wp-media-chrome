<?php

namespace S3S\WP\MediaChrome\Provider;

use function S3S\WP\MediaChrome\build_attrs;

class Spotify extends AbstractProvider {

	/**
	 * {@inheritDoc}
	 */
	public $provider_type = 'audio';

	/**
	 * {@inheritDoc}
	 */
	public $provider_slug = 'spotify';

	/**
	 * {@inheritDoc}
	 */
	public function get_markup( $url ) {
		return sprintf(
			'<spotify-audio src="%1$s" slot="media" %2$s></spotify-audio>',
			esc_url( $url ),
			build_attrs( $this->get_attrs() )
		);
	}
}
