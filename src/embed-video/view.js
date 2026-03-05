/* eslint-disable import/no-extraneous-dependencies */
import 'media-chrome';

document.addEventListener('DOMContentLoaded', () => {
	(async () => {
		if (document.querySelectorAll('.wp-block-embed media-controller youtube-video').length) {
			await import('youtube-video-element');
		}
		if (document.querySelectorAll('.wp-block-embed media-controller vimeo-video').length) {
			await import('vimeo-video-element');
		}
		if (document.querySelectorAll('.wp-block-embed media-controller wistia-video').length) {
			await import('wistia-video-element');
		}
	})();
});
