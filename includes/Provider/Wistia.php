<?php

namespace S3S\WP\MediaChrome\Provider;

use function S3S\WP\MediaChrome\build_attrs;

class Wistia extends AbstractProvider {

	/**
	 * {@inheritDoc}
	 */
	public $provider_slug = 'wistia';

	/**
	 * {@inheritDoc}
	 */
	public function get_markup( $url ) {
		return sprintf(
			'<wistia-video src="%1$s" slot="media" %2$s></wistia-video>',
			esc_url( $url ),
			build_attrs( $this->get_attributes() )
		);
	}
}
