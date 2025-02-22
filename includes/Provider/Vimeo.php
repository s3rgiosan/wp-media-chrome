<?php

namespace S3S\WP\MediaChrome\Provider;

use function S3S\WP\MediaChrome\build_attrs;

class Vimeo extends AbstractProvider {

	/**
	 * {@inheritDoc}
	 */
	public $provider_slug = 'vimeo';

	/**
	 * {@inheritDoc}
	 */
	public function get_markup( $url ) {
		return sprintf(
			'<vimeo-video src="%1$s" slot="media" %2$s></vimeo-video>',
			esc_url( $url ),
			build_attrs( $this->get_attributes() )
		);
	}
}
