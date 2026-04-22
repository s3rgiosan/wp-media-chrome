# Changelog

All notable changes to this project will be documented in this file, per [the Keep a Changelog standard](http://keepachangelog.com/).

## [1.4.0] - 2026-04-22

### Changed

- Defer plugin setup to the `plugins_loaded` hook.

### Fixed

- Fix Vimeo videos playing with sound when the `muted` block attribute is enabled. Propagate `muted` to the provider element and force `setMuted(true)` after the Vimeo player loads, working around the `vimeo-video-element` not forwarding the `muted` attribute to the player API.

## [1.3.0] - 2026-03-05

### Changed

- Refactor inspector controls into a shared component for video and audio.
- Remove unused RTL stylesheet registration.
- Add Requirements section and Hooks documentation to README.
- Add `includes` directory to package.json distribution files.

### Fixed

- Fix conditional loading of provider element libraries in view scripts.
- Fix audio embed block class sanitization to match video embed block.
- Fix asset version fallback when asset file is missing.
- Fix `$path` parameter docblock types.

## [1.2.0] - 2025-10-26

### Changed

- Change plugin update checker to look for tags.
- Update dependencies.

## [1.1.0] - 2025-08-15

### Changed

- Update dependencies.

### Fixed

- Fix poster image selection.
- Fix `<media-poster-image>` component `src` attribute.
- Fix "Display time" label.

## [1.0.1] - 2025-05-30

### Fixed

- Fix block wrapper classes.

## 1.0.0 - 2025-03-02

- Initial release.
