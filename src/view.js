/* eslint-disable import/no-extraneous-dependencies */
document.addEventListener('DOMContentLoaded', () => {
	(async () => {
		if (document.querySelectorAll('media-controller youtube-video')) {
			await import('youtube-video-element');
		}
		if (document.querySelectorAll('media-controller vimeo-video')) {
			await import('vimeo-video-element');
		}
		if (document.querySelectorAll('media-controller wistia-video')) {
			await import('wistia-video-element');
		}
	})();
});
