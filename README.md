# Media Chrome for Media Blocks

> Enhance your audio and video blocks with custom web components from Media Chrome.

## Description

Media Chrome for Media Blocks brings the power of [Media Chrome](https://www.media-chrome.org/) to WordPress media blocks.
It enhances built-in video and audio blocks with custom web components, improving player controls, accessibility, and user experience.
No setup required — just activate the plugin to enhance media blocks with better controls, improved accessibility, and a modernized playback experience.

## Supported Blocks

|     | Block                                                                       |
| --- | --------------------------------------------------------------------------- |
| ✅   | [YouTube Embed](https://wordpress.org/documentation/article/youtube-embed/) |
| ✅   | [Vimeo Embed](https://wordpress.org/documentation/article/vimeo-embed/)     |
| ✅   | [Wistia Embed](https://github.com/s3rgiosan/wistia-embed-block)             |
| ✅   | [Spotify Embed](https://wordpress.org/documentation/article/spotify-embed/) |
| 🚧   | [Video](https://wordpress.org/documentation/article/video-block/)           |

## Requirements

* PHP 7.4+
* WordPress 6.4

## Installation

### Manual Installation

1. Download the plugin ZIP file from the GitHub repository.
2. Go to Plugins > Add New > Upload Plugin in your WordPress admin area.
3. Upload the ZIP file and click Install Now.
4. Activate the plugin.

### Install with Composer

To include this plugin as a dependency in your Composer-managed WordPress project:

1. Add the plugin to your project using the following command:

```bash
composer require s3rgiosan/wp-media-chrome
```

2. Run `composer install` to install the plugin.
3. Activate the plugin from your WordPress admin area or using WP-CLI.

## Quick Start

Once activated, the plugin automatically improves supported media blocks. No additional setup is required.

To customize a media player:

1. Insert a supported media block
2. Select the block to reveal its settings in the block editor sidebar
3. Open the Media Chrome settings panel in the sidebar to enable or disable autoplay, playback speed adjustments, or fullscreen mode.

## Block Editor

### UI Settings

> What options users see in the editor.

UI settings control which customization options are available in the block editor. These settings do not change how the media player behaves on the frontend — they only determine which settings users can modify in the editor.
By default, all customization options are enabled.
To limit available options, add the following to your `theme.json` (example shows all options enabled for the video embed block):

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 2,
  "settings": {
    "custom": {
      "mediaChrome": {
        "ui": {
          "embed": {
            "video": {
              "muted": true,
              "controls": true,
              "playsInline": true,
              "preload": true,
              "poster": true,
              "autohide": true,
              "playButton": true,
              "seekBackwardButton": true,
              "seekForwardButton": true,
              "muteButton": true,
              "volumeRange": true,
              "timeDisplay": true,
              "timeRange": true,
              "playbackRateButton": true,
              "fullscreenButton": true,
              "airplayButton": true
            }
          }
        }
      }
    }
  }
}
```

### Preset Settings

> What default values are used when no user preference is set.

Preset settings define the default values for media player options when no user preference is set. If a user customizes a setting in the block editor, that value takes precedence over the preset. If no preset is defined in `theme.json`, the plugin uses its built-in defaults (listed in the [Options](#options) section).

Example video embed preset configuration for your `theme.json`:

```json
{
  "$schema": "https://schemas.wp.org/wp/6.5/theme.json",
  "version": 2,
  "settings": {
    "custom": {
      "mediaChrome": {
        "presets": {
          "embed": {
            "video": {
              "autohide": 2,
              "muted": false,
              "controls": true,
              "playsInline": false,
              "preload": "metadata",
              "poster": "",
              "playButton": true,
              "seekBackwardButton": true,
              "seekForwardButton": true,
              "muteButton": true,
              "volumeRange": true,
              "timeDisplay": true,
              "timeRange": true,
              "playbackRateButton": true,
              "fullscreenButton": true,
              "airplayButton": false
            }
          }
        }
      }
    }
  }
}
```

## Options

### Embed

#### `autohide`

Number of seconds after which controls auto-hide when inactive. Set to `-1` to disable auto-hide.

Default: `2`

#### `muted`

Determines if media starts muted.

Default: `false`

#### `controls`

Toggles the display of media controls.

Default: `true`

#### `playsInline`

When enabled, videos play inline on mobile devices rather than opening in fullscreen.

Default: `false`

#### `preload`

Defines the content that is preloaded. Options include `'auto'`, `'metadata'`, and `'none'`.

Default: `'metadata'`

#### `poster`

URL for the poster image displayed before playback starts.

Default: `''`

#### `playButton`

Whether to display the play/pause button in the control bar.

Default: `true`

#### `seekBackwardButton`

Whether to display the button for seeking backward.

Default: `true`

#### `seekForwardButton`

Whether to display the button for seeking forward.

Default: `true`

#### `muteButton`

Whether to display the mute/unmute button.

Default: `true`

#### `volumeRange`

Whether to show the volume slider.

Default: `true`

#### `timeDisplay`

Whether to show the current time and duration of the media.

Default: `true`

#### `timeRange`

Whether to display the timeline or progress bar.

Default: `true`

#### `playbackRateButton`

Whether to include a control for adjusting playback speed.

Default: `true`

#### `fullscreenButton`

Whether to display the fullscreen toggle button.

Default: `true`

#### `airplayButton`

Whether to display the AirPlay button (only supported in Safari).

Default: `false`

## Styling

Media Chrome components can be fully styled with CSS to match your site's design. For complete styling documentation, see the [Media Chrome styling documentation](https://www.media-chrome.org/docs/en/styling).

Example of basic styling customization:

```css
/* Change the color of the media controls */
media-control-bar {
  --media-control-background: rgba(0, 0, 0, 0.7);
  --media-control-hover-background: rgba(0, 0, 0, 0.9);
}

/* Style the play button */
media-play-button {
  --media-button-icon-width: 24px;
  --media-button-icon-height: 24px;
  --media-button-icon-transform: scale(1.2);
}
```

## Changelog

A complete listing of all notable changes to this project are documented in [CHANGELOG.md](https://github.com/s3rgiosan/wp-media-chrome/blob/main/CHANGELOG.md).

## License and Attribution

This plugin is licensed under MIT.

This project incorporates [Media Chrome](https://www.media-chrome.org/), which is licensed under the [MIT License](https://github.com/muxinc/media-chrome/blob/main/LICENSE).
