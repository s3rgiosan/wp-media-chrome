<?php

namespace S3S\WP\MediaChrome\Provider;

use function S3S\WP\MediaChrome\build_attrs;

class YouTube extends AbstractProvider {

	/**
	 * {@inheritDoc}
	 */
	public $provider_slug = 'youtube';

	/**
	 * {@inheritDoc}
	 */
	public function get_markup( $url ) {
		return sprintf(
			'<youtube-video src="%1$s" slot="media" %2$s></youtube-video>',
			esc_url( $url ),
			build_attrs( $this->get_attrs() )
		);
	}
}
