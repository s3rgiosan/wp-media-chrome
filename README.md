# Media Chrome for Embed Blocks

> Enhance your audio and video block embeds with custom web components from Media Chrome.

## Description

Media Chrome for Embed Blocks brings the power of [Media Chrome](https://www.media-chrome.org/) to your WordPress embed blocks.
This plugin upgrades the default audio and video embeds by integrating custom web components for improved player controls and an enhanced media experience.

## Roadmap

| Embed | Status |
|---------------|--------|
| [YouTube](https://wordpress.org/documentation/article/youtube-embed/) | ✅ |
| [Vimeo](https://wordpress.org/documentation/article/vimeo-embed/) | ✅ |
| [Wistia](https://github.com/s3rgiosan/wistia-embed-block) | ✅ |
| Video | 🚧 |
| Audio | 🚧 |

## Requirements

* PHP 7.4+
* WordPress 6.4

## Installation

### Manual Installation:

1. Download the plugin ZIP file from the GitHub repository.
2. Go to Plugins > Add New > Upload Plugin in your WordPress admin area.
3. Upload the ZIP file and click Install Now.
4. Activate the plugin.

### Install with Composer:

To include this plugin as a dependency in your Composer-managed WordPress project:

1. Add the plugin to your project using the following command:

```bash
composer require s3rgiosan/wp-media-chrome
```

2. Run `composer install` to install the plugin.
3. Activate the plugin from your WordPress admin area or using WP-CLI.

## Settings

### UI Customization (Block Editor)

The settings below, defined in the `theme.json` file, control which customization options appear in the block editor when configuring the media player.
They do not directly affect the frontend but determine which settings users can modify.
By default, all options are visible in the block editor.

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 2,
  "settings": {
    "custom": {
      "mediaChrome": {
        "ui": {
          "muted": false,
          "controls": false,
          "playsInline": false,
          "preload": false,
          "poster": false,
          "autohide": false,
          "playButton": false,
          "seekBackwardButton": false,
          "seekForwardButton": false,
          "muteButton": false,
          "volumeRangeButton": false,
          "timeDisplay": false,
          "timeRange": false,
          "playbackRateButton": false,
          "fullscreenButton": false,
          "airplayButton": false
        }
      }
    }
  }
}
```

## Options

### `autohide`

Number of seconds after which controls auto-hide when inactive. Set to `-1` to disable auto-hide.

Default: `2`

### `muted`

Determines if media starts muted.

Default: `false`

### `controls`

Toggles the display of media controls.

Default: `true`

### `playsInline`

When enabled, videos play inline on mobile devices rather than opening in fullscreen.

Default: `false`

### `preload`

Defines the content that is preloaded. Options include `'auto'`, `'metadata'`, and `'none'`.

Default: `'metadata'`

### `poster`

URL for the poster image displayed before playback starts.

Default: `''`

### `displayPlayButton`

Whether to display the play/pause button in the control bar.

Default: `true`

### `displaySeekBackwardButton`

Whether to display the button for seeking backward.

Default: `true`

### `displaySeekForwardButton`

Whether to display the button for seeking forward.

Default: `true`

### `displayMuteButton`

Whether to display the mute/unmute button.

Default: `true`

### `displayVolumeRange`

Whether to show the volume slider.

Default: `true`

### `displayTimeDisplay`

Whether to show the current time and duration of the media.

Default: `true`

### `displayTimeRange`

Whether to display the timeline or progress bar.

Default: `true`

### `displayPlaybackRateButton`

Whether to include a control for adjusting playback speed.

Default: `true`

### `displayFullscreenButton`

Whether to display the fullscreen toggle button.

Default: `true`

### `displayAirplayButton`

Whether to display the AirPlay button (only supported in Safari).

Default: `false`

## Styling

See [Media Chrome styling](https://www.media-chrome.org/docs/en/styling) section.

## Changelog

A complete listing of all notable changes to this project are documented in [CHANGELOG.md](https://github.com/s3rgiosan/wp-media-chrome/blob/main/CHANGELOG.md).
