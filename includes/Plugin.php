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

		$provider_slug = $block['attrs']['providerNameSlug'] ?? 'video';
		$provider      = ProviderRegistry::get_provider( $provider_slug );

		if ( ! $provider ) {
			return $block_content;
		}

		$provider_markup = $provider->get_markup( $block['attrs']['url'] );

		if ( empty( $provider_markup ) ) {
			return $block_content;
		}

		$block_content = sprintf(
			'<media-controller %1$s>
				%3$s
				%2$s
			</media-controller>',
			$this->get_media_controller_attrs( $block['attrs'] ),
			$provider_markup,
			$this->get_media_control_bar_markup( $block['attrs'] )
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
	}

	/**
	 * Get the media controller attributes.
	 *
	 * @param  array $block_attrs The block attributes.
	 * @return string The media controller attributes as a string.
	 */
	protected function get_media_controller_attrs( $block_attrs ) {

		$controller_attrs = [];

		if ( isset( $block_attrs['className'] ) ) {
			$controller_attrs['class'] = $block_attrs['className'];
		}

		if ( isset( $block_attrs['autohide'] ) ) {
			$controller_attrs['autohide'] = $block_attrs['autohide'];
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

	/**
	 * Get the media control bar markup.
	 *
	 * @param  array $block_attrs The block attributes.
	 * @return string The control bar markup.
	 */
	protected function get_media_control_bar_markup( $block_attrs ) {

		if ( empty( $block_attrs['displayControlBar'] ) ) {
			return '';
		}

		$control_bar = '<media-control-bar>';

		$components = [
			'displayPlayButton'         => 'media-play-button',
			'displaySeekBackwardButton' => 'media-seek-backward-button',
			'displaySeekForwardButton'  => 'media-seek-forward-button',
			'displayMuteButton'         => 'media-mute-button',
			'displayVolumeRange'        => 'media-volume-range',
			'displayTimeDisplay'        => 'media-time-display',
			'displayTimeRange'          => 'media-time-range',
			'displayCaptionsButton'     => 'media-captions-button',
			'displayPlaybackRateButton' => 'media-playback-rate-button',
			'displayPipButton'          => 'media-pip-button',
			'displayFullscreenButton'   => 'media-fullscreen-button',
			'displayAirplayButton'      => 'media-airplay-button',
		];

		/**
		 * Filters the allowed components to display in the control bar.
		 *
		 * @param  array  $allowed_components An array of allowed components.
		 * @return array An array of allowed components.
		 */
		$allowed_components = apply_filters( 's3s_media_chrome_control_bar_components', array_values( $components ) );

		foreach ( $components as $attr => $component ) {
			if ( ! empty( $block_attrs[ $attr ] ) && in_array( $component, $allowed_components, true ) ) {
				$control_bar .= "<$component></$component>";
			}
		}

		$control_bar .= '</media-control-bar>';

		return $control_bar;
	}
}
