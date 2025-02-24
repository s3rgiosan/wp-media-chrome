<?php

namespace S3S\WP\MediaChrome;

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
		add_filter( 'render_block_core/embed', [ $this, 'render_embed_video_block' ], 10, 2 );
		add_filter( 'block_type_metadata', [ $this, 'embed_block_type_metadata' ] );
		add_filter( 'enqueue_block_assets', [ $this, 'register_assets' ] );

		// Register providers.
		ProviderRegistry::register_provider( new Vimeo() );
		ProviderRegistry::register_provider( new Wistia() );
		ProviderRegistry::register_provider( new YouTube() );
	}

	/**
	 * Render embed video blocks.
	 *
	 * Wraps video embed blocks with a custom media controller.
	 *
	 * @param  string $block_content The block content.
	 * @param  array  $block         The full block, including name and attributes.
	 * @return string The modified block content.
	 */
	public function render_embed_video_block( $block_content, $block ) {

		if ( empty( $block['attrs']['type'] ) || 'video' !== $block['attrs']['type'] ) {
			return $block_content;
		}

		$provider_slug = $block_attrs['providerNameSlug'] ?? 'video';

		$block_wrapper_classes = [
			'wp-block-embed',
			'is-type-video',
			'is-provider-' . $provider_slug,
			'wp-block-embed-' . $provider_slug,
			$block['attrs']['className'] ?? '',
			'has-media-chrome',
		];

		$block_content = sprintf(
			'<figure class="%1$s">
				<div class="wp-block-embed__wrapper">
					%2$s
				</div>
			</figure>',
			esc_attr( implode( ' ', $block_wrapper_classes ) ),
			MediaController::generate_markup( $block['attrs'] )
		);

		return $block_content;
	}

	/**
	 * Updates the Embed block type metadata.
	 *
	 * @param  array $metadata Metadata for registering a block type.
	 * @return array
	 */
	public function embed_block_type_metadata( $metadata ) {

		if ( empty( $metadata['name'] ) ) {
			return $metadata;
		}

		if ( 'core/embed' !== $metadata['name'] ) {
			return $metadata;
		}

		$field_mappings = [
			'editorScript' => 'editor-script',
			'viewScript'   => 'view-script',
			'style'        => 'style',
		];

		foreach ( $field_mappings as $field_name => $asset_handle ) {

			if ( ! isset( $metadata[ $field_name ] ) ) {
				$metadata[ $field_name ] = [];
			}

			if ( ! is_array( $metadata[ $field_name ] ) ) {
				$metadata[ $field_name ] = [ $metadata[ $field_name ] ];
			}

			$metadata[ $field_name ][] = "media-chrome-$asset_handle";
		}

		return $metadata;
	}

	/**
	 * Register assets.
	 *
	 * @return void
	 */
	public function register_assets() {

		$scripts = [
			'editor-script' => 'index',
			'view-script'   => 'view',
		];

		foreach ( $scripts as $asset_handle => $filename ) {

			$asset_file = sprintf(
				'%s/build/%s.asset.php',
				untrailingslashit( S3S_MEDIA_CHROME_PATH ),
				$filename
			);

			$asset        = file_exists( $asset_file ) ? require $asset_file : null;
			$dependencies = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];
			$version      = isset( $asset['version'] ) ? $asset['version'] : filemtime( $asset_file );

			wp_register_script(
				"media-chrome-$asset_handle",
				sprintf(
					'%s/build/%s.js',
					untrailingslashit( S3S_MEDIA_CHROME_URL ),
					$filename
				),
				$dependencies,
				$version,
				true
			);
		}

		$styles = [
			'style' => 'style-index',
		];

		foreach ( $styles as $asset_handle => $filename ) {

			$asset_file = sprintf(
				'%s/build/%s.css',
				untrailingslashit( S3S_MEDIA_CHROME_PATH ),
				$filename
			);

			wp_register_style(
				"media-chrome-$asset_handle",
				sprintf(
					'%s/build/%s.css',
					untrailingslashit( S3S_MEDIA_CHROME_URL ),
					$filename
				),
				[],
				filemtime( $asset_file )
			);
		}
	}
}
