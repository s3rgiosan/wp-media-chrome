/* eslint-disable import/no-extraneous-dependencies */
import 'media-chrome';

document.addEventListener('DOMContentLoaded', () => {
	(async () => {
		if (document.querySelectorAll('.wp-block-embed media-controller spotify-audio').length) {
			await import('spotify-audio-element');
		}
	})();
});
