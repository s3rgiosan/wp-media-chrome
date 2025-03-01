<?php

namespace S3S\WP\MediaChrome;

class MediaControlBar {

	/**
	 * The control bar attributes.
	 *
	 * @var array
	 */
	public static $attributes = [
		'playButton',
		'seekBackwardButton',
		'seekForwardButton',
		'muteButton',
		'volumeRange',
		'timeDisplay',
		'timeRange',
		'playbackRateButton',
		'fullscreenButton',
		'airplayButton',
	];

	/**
	 * The control bar component setting map.
	 *
	 * @var array
	 */
	public static $component_setting_map = [
		'media-play-button'          => 'playButton',
		'media-seek-backward-button' => 'seekBackwardButton',
		'media-seek-forward-button'  => 'seekForwardButton',
		'media-mute-button'          => 'muteButton',
		'media-volume-range'         => 'volumeRange',
		'media-time-display'         => 'timeDisplay',
		'media-time-range'           => 'timeRange',
		'media-playback-rate-button' => 'playbackRateButton',
		'media-fullscreen-button'    => 'fullscreenButton',
		'media-airplay-button'       => 'airplayButton',
	];

	/**
	 * Generate the control bar markup.
	 *
	 * @param  array  $block_attrs Block attributes.
	 * @param  string $path        The path to the block settings.
	 * @return string The HTML markup for the media control bar. Empty string if the control bar is disabled.
	 */
	public static function generate_markup( $block_attrs, $path ) {

		$global_settings = get_global_settings( $path );
		$custom_settings = wp_parse_args( $block_attrs, $global_settings );

		if ( isset( $custom_settings['controls'] ) && false === $custom_settings['controls'] ) {
			return '';
		}

		$attributes = array_intersect_key( $custom_settings, array_flip( self::$attributes ) );

		/**
		 * Filters the components to display in the control bar.
		 *
		 * @param  array $components An array of components.
		 * @return array An array of allowed components.
		 */
		$components = apply_filters( 's3s_media_chrome_control_bar_allowed_components', self::get_components() );

		if ( empty( $components ) ) {
			return '';
		}

		/**
		 * Filters the allowed HTML tags and attributes.
		 *
		 * @param  array $allowed_tags An array of allowed HTML tags and attributes.
		 * @return array An array of allowed HTML tags and attributes.
		 */
		$allowed_tags = apply_filters( 's3s_media_chrome_allowed_tags', [] );

		$control_bar = '<media-control-bar>';

		foreach ( $components as $component_tag => $component_data ) {

			// Check if the component is supported.
			if ( ! array_key_exists( $component_tag, self::$component_setting_map ) ) {
				continue;
			}

			$setting = self::$component_setting_map[ $component_tag ];

			if ( ! isset( $attributes[ $setting ] ) ) {
				continue;
			}

			// Check if the component is enabled.
			if ( false === $attributes[ $setting ] ) {
				continue;
			}

			$parsed_slots = '';

			if ( isset( $component_data['slots'] ) && is_array( $component_data['slots'] ) ) {

				$filter_component_tag = str_replace( '-', '_', $component_tag );

				/**
				 * Filters the slots for the control bar component.
				 *
				 * @param  array $slots       An array of slots.
				 * @param  array $block_attrs The block attributes.
				 * @return array An array of slots.
				 */
				$slots = apply_filters( "s3s_media_chrome_control_bar_{$filter_component_tag}_slots", $component_data['slots'], $block_attrs );

				if ( ! empty( $slots ) && is_array( $slots ) ) {
					foreach ( $slots as $slot_key => $slot_content ) {

						if ( ! isset( $component_data['slots'][ $slot_key ] ) || empty( $slot_content ) ) {
							continue;
						}

						$parsed_slots .= sprintf(
							'<span slot="%s">%s</span>',
							esc_attr( $slot_key ),
							wp_kses( $slot_content, $allowed_tags )
						);
					}
				}
			}

			$control_bar .= sprintf( '<%1$s>%2$s</%1$s>', $component_tag, $parsed_slots );
		}

		$control_bar .= '</media-control-bar>';

		return $control_bar;
	}

	/**
	 * Get the components configuration.
	 *
	 * @return array
	 */
	protected static function get_components() {
		return [
			'media-play-button'          => [
				'slots' => [
					'play'  => '',
					'pause' => '',
					'icon'  => '',
				],
			],
			'media-seek-backward-button' => [
				'slots' => [
					'icon' => '',
				],
			],
			'media-seek-forward-button'  => [
				'slots' => [
					'icon' => '',
				],
			],
			'media-mute-button'          => [
				'slots' => [
					'off'    => '',
					'low'    => '',
					'medium' => '',
					'high'   => '',
					'icon'   => '',
				],
			],
			'media-volume-range'         => [
				'slots' => [
					'thumb' => '',
				],
			],
			'media-time-display'         => [],
			'media-time-range'           => [
				'slots' => [
					'preview'       => '',
					'preview-arrow' => '',
					'current'       => '',
					'thumb'         => '',
				],
			],
			'media-playback-rate-button' => [],
			'media-fullscreen-button'    => [
				'slots' => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
			'media-airplay-button'       => [
				'slots' => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
		];
	}
}
