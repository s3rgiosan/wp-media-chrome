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
	 * Generate the control bar markup.
	 *
	 * @param  array $block_attrs Block attributes.
	 * @return string The HTML markup for the media control bar. Empty string if the control bar is disabled.
	 */
	public static function generate_markup( $block_attrs ) {

		$global_settings = get_global_settings();
		$custom_settings = wp_parse_args( $block_attrs, $global_settings );

		if ( isset( $custom_settings['controls'] ) && false === $custom_settings['controls'] ) {
			return '';
		}

		$attributes = array_intersect_key( $custom_settings, array_flip( self::$attributes ) );

		$components = self::get_components();

		/**
		 * Filters the allowed components to display in the control bar.
		 *
		 * @param  array $allowed_components An array of allowed components. The keys are the component tags.
		 * @return array An array of allowed components.
		 */
		$allowed_components = apply_filters( 's3s_media_chrome_control_bar_allowed_components', array_keys( $components ) );

		if ( empty( $allowed_components ) ) {
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

		foreach ( $components as $tag => $component ) {

			if ( ! in_array( $tag, $allowed_components, true ) ) {
				continue;
			}

			if ( false === $attributes[ $component['setting'] ] ) {
				continue;
			}

			$parsed_slots = '';

			if ( isset( $component['slots'] ) && is_array( $component['slots'] ) ) {

				$filter_tag = str_replace( '-', '_', $tag );

				/**
				 * Filters the slots for the control bar component.
				 *
				 * @param  array $slots       An array of slots.
				 * @param  array $block_attrs The block attributes.
				 * @return array An array of slots.
				 */
				$slots = apply_filters( "s3s_media_chrome_control_bar_{$filter_tag}_slots", $component['slots'], $block_attrs );

				if ( ! empty( $slots ) && is_array( $slots ) ) {
					foreach ( $slots as $slot_key => $slot_content ) {

						if ( ! isset( $component['slots'][ $slot_key ] ) || empty( $slot_content ) ) {
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

			$control_bar .= sprintf( '<%1$s>%2$s</%1$s>', $tag, $parsed_slots );
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
				'setting' => 'playButton',
				'slots'   => [
					'play'  => '',
					'pause' => '',
					'icon'  => '',
				],
			],
			'media-seek-backward-button' => [
				'setting' => 'seekBackwardButton',
				'slots'   => [
					'icon' => '',
				],
			],
			'media-seek-forward-button'  => [
				'setting' => 'seekForwardButton',
				'slots'   => [
					'icon' => '',
				],
			],
			'media-mute-button'          => [
				'setting' => 'muteButton',
				'slots'   => [
					'off'    => '',
					'low'    => '',
					'medium' => '',
					'high'   => '',
					'icon'   => '',
				],
			],
			'media-volume-range'         => [
				'setting' => 'volumeRange',
				'slots'   => [
					'thumb' => '',
				],
			],
			'media-time-display'         => [
				'setting' => 'timeDisplay',
			],
			'media-time-range'           => [
				'setting' => 'timeRange',
				'slots'   => [
					'preview'       => '',
					'preview-arrow' => '',
					'current'       => '',
					'thumb'         => '',
				],
			],
			'media-playback-rate-button' => [
				'setting' => 'playbackRateButton',
			],
			'media-fullscreen-button'    => [
				'setting' => 'fullscreenButton',
				'slots'   => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
			'media-airplay-button'       => [
				'setting' => 'airplayButton',
				'slots'   => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
		];
	}
}
