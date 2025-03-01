<?php

namespace S3S\WP\MediaChrome;

use S3S\WP\MediaChrome\Provider\Spotify;
use S3S\WP\MediaChrome\Provider\Vimeo;
use S3S\WP\MediaChrome\Provider\Wistia;
use S3S\WP\MediaChrome\Provider\YouTube;
use S3S\WP\MediaChrome\ProviderRegistry;

class Plugin {

	/**
	 * Plugin singleton instance.
	 *
	 * @var Plugin
	 */
	public static $instance = null;

	/**
	 * Retrieve the plugin instance.
	 *
	 * @return Plugin The plugin instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Setup hooks and register providers.
	 */
	public function setup() {
		add_filter( 'block_type_metadata', [ $this, 'update_embed_block_metadata' ] );

		// Register video providers.
		ProviderRegistry::register_provider( new Vimeo() );
		ProviderRegistry::register_provider( new Wistia() );
		ProviderRegistry::register_provider( new YouTube() );

		add_filter( 'render_block_core/embed', [ $this, 'render_embed_video_block' ], 10, 2 );
		add_filter( 'enqueue_block_assets', [ $this, 'register_embed_video_block_assets' ] );

		// Register audio providers.
		ProviderRegistry::register_provider( new Spotify() );

		add_filter( 'render_block_core/embed', [ $this, 'render_embed_audio_block' ], 10, 2 );
		add_filter( 'enqueue_block_assets', [ $this, 'register_embed_audio_block_assets' ] );
	}

	/**
	 * Updates the Embed block type metadata.
	 *
	 * @param  array $metadata Metadata for registering a block type.
	 * @return array
	 */
	public function update_embed_block_metadata( $metadata ) {

		if ( empty( $metadata['name'] ) || 'core/embed' !== $metadata['name'] ) {
			return $metadata;
		}

		$field_mappings = [
			'editorScript' => 'editor-script',
			'viewScript'   => 'view-script',
			'style'        => [
				'style',
				'style-rtl',
			],
		];

		$variations = [
			'embed-video',
			'embed-audio',
		];

		foreach ( $variations as $variation ) {
			foreach ( $field_mappings as $field_name => $asset_handle ) {

				if ( ! isset( $metadata[ $field_name ] ) ) {
					$metadata[ $field_name ] = [];
				}

				if ( ! is_array( $metadata[ $field_name ] ) ) {
					$metadata[ $field_name ] = [ $metadata[ $field_name ] ];
				}

				if ( is_array( $asset_handle ) ) {
					foreach ( $asset_handle as $handle ) {
						$metadata[ $field_name ][] = "media-chrome-$variation-$handle";
					}
				} else {
					$metadata[ $field_name ][] = "media-chrome-$variation-$asset_handle";
				}
			}
		}

		return $metadata;
	}

	/**
	 * Render Embed video block.
	 *
	 * @param  string $block_content The block content.
	 * @param  array  $block         The full block, including name and attributes.
	 * @return string The modified block content.
	 */
	public function render_embed_video_block( $block_content, $block ) {

		if ( empty( $block['attrs']['type'] ) || 'video' !== $block['attrs']['type'] ) {
			return $block_content;
		}

		$provider_slug = 'video';
		if ( ! empty( $block['attrs']['providerNameSlug'] ) ) {
			$provider_slug = $block['attrs']['providerNameSlug'];
		}

		if ( ! ProviderRegistry::has_provider( $provider_slug ) ) {
			return $block_content;
		}

		$block_wrapper_classes = [
			'wp-block-embed',
			'is-type-video',
			'is-provider-' . $provider_slug,
			'wp-block-embed-' . $provider_slug,
			$block['attrs']['className'] ?? '',
		];

		$block_content = sprintf(
			'<figure class="%1$s">
				<div class="wp-block-embed__wrapper">
					%2$s
				</div>
			</figure>',
			esc_attr( implode( ' ', $block_wrapper_classes ) ),
			MediaController::generate_markup( $block['attrs'], [ 'embed', 'video' ] )
		);

		return $block_content;
	}

	/**
	 * Register Embed video block assets.
	 *
	 * @return void
	 */
	public function register_embed_video_block_assets() {

		$scripts = [
			'editor-script' => 'index',
			'view-script'   => 'view',
		];

		foreach ( $scripts as $asset_handle => $filename ) {
			$this->register_script( 'embed-video', $asset_handle, $filename );
		}

		$styles = [
			'style' => 'index',
		];

		foreach ( $styles as $asset_handle => $filename ) {
			$this->register_style( 'embed-video', $asset_handle, $filename );
		}
	}

	/**
	 * Render Embed audio block.
	 *
	 * @param  string $block_content The block content.
	 * @param  array  $block         The full block, including name and attributes.
	 * @return string The modified block content.
	 */
	public function render_embed_audio_block( $block_content, $block ) {

		if ( empty( $block['attrs']['type'] ) || 'rich' !== $block['attrs']['type'] ) {
			return $block_content;
		}

		$provider_slug = 'rich';
		if ( ! empty( $block['attrs']['providerNameSlug'] ) ) {
			$provider_slug = $block['attrs']['providerNameSlug'];
		}

		if ( ! ProviderRegistry::has_provider( $provider_slug ) ) {
			return $block_content;
		}

		$block_wrapper_classes = [
			'wp-block-embed',
			'is-type-rich',
			'is-provider-' . $provider_slug,
			'wp-block-embed-' . $provider_slug,
			$block['attrs']['className'] ?? '',
		];

		$block_content = sprintf(
			'<figure class="%1$s">
				<div class="wp-block-embed__wrapper">
					%2$s
				</div>
			</figure>',
			esc_attr( implode( ' ', $block_wrapper_classes ) ),
			MediaController::generate_markup( $block['attrs'], [ 'embed', 'audio' ] )
		);

		return $block_content;
	}

	/**
	 * Register Embed audio block assets.
	 *
	 * @return void
	 */
	public function register_embed_audio_block_assets() {

		$scripts = [
			'editor-script' => 'index',
			'view-script'   => 'view',
		];

		foreach ( $scripts as $asset_handle => $filename ) {
			$this->register_script( 'embed-audio', $asset_handle, $filename );
		}

		$styles = [
			'style' => 'index',
		];

		foreach ( $styles as $asset_handle => $filename ) {
			$this->register_style( 'embed-audio', $asset_handle, $filename );
		}
	}

	/**
	 * Register a script.
	 *
	 * @param  string $block_name The block name.
	 * @param  string $handle     The script handle.
	 * @param  string $filename   The script filename.
	 * @return void
	 */
	public function register_script( $block_name, $handle, $filename ) {

		$asset_file = sprintf(
			'%s/build/%s/%s.asset.php',
			untrailingslashit( S3S_MEDIA_CHROME_PATH ),
			$block_name,
			$filename
		);

		$asset        = file_exists( $asset_file ) ? require $asset_file : null;
		$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];
		$version      = isset( $asset['version'] ) ? $asset['version'] : filemtime( $asset_file );

		wp_register_script(
			"media-chrome-$block_name-$handle",
			sprintf(
				'%s/build/%s/%s.js',
				untrailingslashit( S3S_MEDIA_CHROME_URL ),
				$block_name,
				$filename
			),
			$dependencies,
			$version,
			true
		);
	}

	/**
	 * Register a style.
	 *
	 * @param  string $block_name The block name.
	 * @param  string $handle     The style handle.
	 * @param  string $filename   The style filename.
	 * @return void
	 */
	public function register_style( $block_name, $handle, $filename ) {

		$asset_file = sprintf(
			'%s/build/%s/%s.asset.php',
			untrailingslashit( S3S_MEDIA_CHROME_PATH ),
			$block_name,
			$filename
		);

		$asset   = file_exists( $asset_file ) ? require $asset_file : null;
		$version = isset( $asset['version'] ) ? $asset['version'] : filemtime( $asset_file );

		wp_register_style(
			"media-chrome-$block_name-$handle",
			sprintf(
				'%s/build/%s/style-%s.css',
				untrailingslashit( S3S_MEDIA_CHROME_URL ),
				$block_name,
				$filename
			),
			[],
			$version
		);

		wp_register_style(
			"media-chrome-$block_name-$handle-rtl",
			sprintf(
				'%s/build/%s/style-%s.css',
				untrailingslashit( S3S_MEDIA_CHROME_URL ),
				$block_name,
				$filename
			),
			[],
			$version
		);
	}
}
