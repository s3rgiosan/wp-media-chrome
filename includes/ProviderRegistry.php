<?php

namespace S3S\WP\MediaChrome;

use S3S\WP\MediaChrome\Provider\AbstractProvider;

class ProviderRegistry {

	/**
	 * Registered providers.
	 *
	 * @var AbstractProvider[]
	 */
	protected static $providers = [];

	/**
	 * Register a media provider.
	 *
	 * @param AbstractProvider $provider The provider instance.
	 */
	public static function register_provider( AbstractProvider $provider ) {
		static::$providers[ $provider->provider_slug ] = $provider;
	}

	/**
	 * Retrieve a provider by slug.
	 *
	 * @param string $slug The provider slug.
	 * @return AbstractProvider|null The provider instance or null if not found.
	 */
	public static function get_provider( $slug ) {
		return static::$providers[ $slug ] ?? null;
	}

	/**
	 * Check if a provider is registered.
	 *
	 * @param string $slug The provider slug.
	 * @return bool True if the provider is registered, false otherwise.
	 */
	public static function has_provider( $slug ) {
		return isset( static::$providers[ $slug ] );
	}
}
