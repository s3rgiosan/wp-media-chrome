<?php

namespace S3S\WP\MediaChrome\Provider;

abstract class AbstractProvider {

	/**
	 * The provider slug.
	 *
	 * @var string
	 */
	public $provider_slug = '';

	/**
	 * The provider attributes.
	 *
	 * @var array
	 */
	public $provider_attributes = [];

	/**
	 * Get the provider markup.
	 *
	 * @param  string $url The media URL.
	 * @return string The provider HTML markup.
	 */
	abstract public function get_markup( $url );

	/**
	 * Get the provider slug.
	 *
	 * @return string The provider slug.
	 */
	public function get_slug() {
		return $this->provider_slug;
	}

	/**
	 * Get the provider attributes.
	 *
	 * @return array An array of provider attributes.
	 */
	public function get_attributes() {
		/**
		 * Filters the provider attributes.
		 *
		 * @param  array $attributes An array of HTML attributes.
		 * @param  string $slug      The provider slug.
		 * @return array
		 */
		return apply_filters( "s3s_media_chrome_{$this->get_slug()}_attributes", $this->provider_attributes, $this->get_slug() );
	}
}
