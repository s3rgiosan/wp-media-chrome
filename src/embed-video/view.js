/* eslint-disable import/no-extraneous-dependencies */
import 'media-chrome';

document.addEventListener('DOMContentLoaded', () => {
	(async () => {
		if (document.querySelectorAll('.wp-block-embed media-controller youtube-video').length) {
			await import('youtube-video-element');
		}
		const vimeoEls = document.querySelectorAll('.wp-block-embed media-controller vimeo-video');
		if (vimeoEls.length) {
			await import('vimeo-video-element');
			vimeoEls.forEach((el) => {
				if (!el.hasAttribute('muted')) {
					return;
				}
				el.loadComplete?.then(() => {
					el.api?.setMuted(true)?.catch(() => {});
					el.api?.setVolume(0)?.catch(() => {});
				});
			});
		}
		if (document.querySelectorAll('.wp-block-embed media-controller wistia-video').length) {
			await import('wistia-video-element');
		}
	})();
});
