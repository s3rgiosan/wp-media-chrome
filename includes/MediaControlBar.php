<?php

namespace S3S\WP\MediaChrome;

class MediaControlBar {

	/**
	 * Generate the control bar markup based on block attributes.
	 *
	 * @param  array $block_attrs Block attributes.
	 * @return string The HTML markup for the media control bar. Empty string if the control bar is disabled.
	 */
	public static function generate_markup( $block_attrs ) {

		if ( isset( $block_attrs['controls'] ) && false === $block_attrs['controls'] ) {
			return '';
		}

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

		foreach ( $components as $tag => $data ) {

			if ( ! in_array( $tag, $allowed_components, true ) ) {
				continue;
			}

			if ( isset( $block_attrs[ $data['block_attr'] ] ) && false === $block_attrs[ $data['block_attr'] ] ) {
				continue;
			}

			if ( ! isset( $block_attrs[ $data['block_attr'] ] ) && ! $data['default_value'] ) {
				continue;
			}

			$parsed_slots = '';

			if ( isset( $data['slots'] ) && is_array( $data['slots'] ) ) {

				$filter_tag = str_replace( '-', '_', $tag );

				/**
				 * Filters the slots for the control bar component.
				 *
				 * @param  array $slots       An array of slots.
				 * @param  array $block_attrs The block attributes.
				 * @return array An array of slots.
				 */
				$slots = apply_filters( "s3s_media_chrome_control_bar_{$filter_tag}_slots", $data['slots'], $block_attrs );

				if ( ! empty( $slots ) && is_array( $slots ) ) {
					foreach ( $slots as $slot_key => $slot_content ) {

						if ( ! isset( $data['slots'][ $slot_key ] ) || empty( $slot_content ) ) {
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
				'default_value' => true,
				'block_attr'    => 'showPlayButton',
				'slots'         => [
					'play'  => '',
					'pause' => '',
					'icon'  => '',
				],
			],
			'media-seek-backward-button' => [
				'default_value' => true,
				'block_attr'    => 'showSeekBackwardButton',
				'slots'         => [
					'icon' => '',
				],
			],
			'media-seek-forward-button'  => [
				'default_value' => true,
				'block_attr'    => 'showSeekForwardButton',
				'slots'         => [
					'icon' => '',
				],
			],
			'media-mute-button'          => [
				'default_value' => true,
				'block_attr'    => 'showMuteButton',
				'slots'         => [
					'off'    => '',
					'low'    => '',
					'medium' => '',
					'high'   => '',
					'icon'   => '',
				],
			],
			'media-volume-range'         => [
				'default_value' => true,
				'block_attr'    => 'showVolumeRange',
				'slots'         => [
					'thumb' => '',
				],
			],
			'media-time-display'         => [
				'default_value' => true,
				'block_attr'    => 'showTimeDisplay',
			],
			'media-time-range'           => [
				'default_value' => true,
				'block_attr'    => 'showTimeRange',
				'slots'         => [
					'preview'       => '',
					'preview-arrow' => '',
					'current'       => '',
					'thumb'         => '',
				],
			],
			'media-captions-button'      => [
				'default_value' => false,
				'block_attr'    => 'showCaptionsButton',
				'slots'         => [
					'on'   => '',
					'off'  => '',
					'icon' => '',
				],
			],
			'media-playback-rate-button' => [
				'default_value' => true,
				'block_attr'    => 'showPlaybackRateButton',
			],
			'media-pip-button'           => [
				'default_value' => false,
				'block_attr'    => 'showPipButton',
				'slots'         => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
			'media-fullscreen-button'    => [
				'default_value' => true,
				'block_attr'    => 'showFullscreenButton',
				'slots'         => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
			'media-airplay-button'       => [
				'default_value' => false,
				'block_attr'    => 'showAirplayButton',
				'slots'         => [
					'enter' => '',
					'exit'  => '',
					'icon'  => '',
				],
			],
		];
	}
}
