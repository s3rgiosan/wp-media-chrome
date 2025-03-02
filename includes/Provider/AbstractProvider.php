<?php

namespace S3S\WP\MediaChrome\Provider;

abstract class AbstractProvider {

	/**
	 * The provider type.
	 *
	 * @var string
	 */
	public $provider_type = '';

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
	public $provider_attrs = [];

	/**
	 * Get the provider markup.
	 *
	 * @param  string $url The media URL.
	 * @return string The provider HTML markup.
	 */
	abstract public function get_markup( $url );

	/**
	 * Get the provider type.
	 *
	 * @return string The provider type.
	 */
	public function get_type() {
		return $this->provider_type;
	}

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
	public function get_attrs() {
		/**
		 * Filters the provider attributes.
		 *
		 * @param  array  $attributes An array of HTML attributes.
		 * @param  string $slug       The provider slug.
		 * @return array
		 */
		return apply_filters( "media_chrome_{$this->get_slug()}_provider_attributes", $this->provider_attrs, $this->get_slug() );
	}
}
