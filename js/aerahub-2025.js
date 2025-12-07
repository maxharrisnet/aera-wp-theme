/**
 * AeraHub 2025 Page Scripts
 * Handles HubSpot form, video popup, and form overlay logic
 */

(function () {
	'use strict';

	// Wait for DOM to be ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	function init() {
		setupHubSpotForm();
		setupFormOverlay();
		setupVideoPopup();
		setupSmoothScroll();
		hideNavigation();
	}

	/**
	 * Initialize HubSpot form
	 */
	function setupHubSpotForm() {
		const script = document.createElement('script');
		script.src = 'https://js.hsforms.net/forms/embed/v2.js';
		document.body.appendChild(script);

		script.addEventListener('load', () => {
			if (window.hbspt) {
				window.hbspt.forms.create({
					portalId: '4455954',
					formId: '097ee201-0440-4b59-a68e-d682966a8e08',
					target: '#stickyform',
					onFormSubmit: function ($form) {
						const overlay = document.getElementById('hideMe');
						const removeBlurr = document.getElementById('removeBlurr');
						if (overlay) {
							overlay.style.display = 'none';
						}
						if (removeBlurr) {
							removeBlurr.style.filter = 'blur(0px)';
						}
					},
				});
			}
		});
	}

	/**
	 * Setup form overlay based on URL parameter
	 */
	function setupFormOverlay() {
		const searchParams = new URLSearchParams(window.location.search);
		const paramId = searchParams.get('access');
		const overlay = document.getElementById('hideMe');
		const removeBlurr = document.getElementById('removeBlurr');

		if (overlay) {
			if (paramId === 'direct') {
				// Direct access: keep overlay hidden and un-blur the page
				overlay.style.display = 'none';
				if (removeBlurr) {
					removeBlurr.style.filter = 'blur(0px)';
				}
				document.body.style.height = '';
				document.body.style.overflowX = 'inherit';
			} else {
				// No direct param: show the gated overlay
				overlay.style.display = 'block';
				if (removeBlurr) {
					removeBlurr.style.filter = 'blur(8px)';
				}
				document.body.style.height = '100vh';
				document.body.style.overflowX = 'hidden';
			}
		}
	}

	/**
	 * Setup video popup functionality
	 */
	function setupVideoPopup() {
		const closeBtn = document.getElementById('closePopup');
		const videoPopupEl = document.getElementById('videoPopup');
		const vimeoIframe = document.getElementById('vimeoVideo');

		if (!videoPopupEl || !vimeoIframe) {
			return;
		}

		let vimeoPlayer = null;

		// Load Vimeo Player API script if not already loaded
		if (!window.Vimeo) {
			const vimeoScript = document.createElement('script');
			vimeoScript.src = 'https://player.vimeo.com/api/player.js';
			document.body.appendChild(vimeoScript);
		}

		// Helper to open popup with a given src
		window.openVideoPopup = function (src) {
			if (!vimeoIframe || !videoPopupEl) {
				return;
			}

			// Normalize src: remove any existing autoplay then add autoplay=1
			let normalized = src.replace(/(&|\?)autoplay=1/g, '');
			normalized = normalized.replace(/&amp;/g, '&');
			normalized += normalized.includes('?') ? '&autoplay=1' : '?autoplay=1';
			vimeoIframe.src = normalized;
			videoPopupEl.style.display = 'flex';

			// Try to create a Vimeo Player instance
			const tryInitPlayer = () => {
				try {
					if (window.Vimeo && vimeoIframe) {
						vimeoPlayer = new window.Vimeo.Player(vimeoIframe);
						if (vimeoPlayer && typeof vimeoPlayer.play === 'function') {
							vimeoPlayer.play().catch(() => {});
						}
						return true;
					}
				} catch (err) {
					// Ignore - we'll retry
				}
				return false;
			};

			if (!tryInitPlayer()) {
				setTimeout(tryInitPlayer, 300);
			}
		};

		// Close handler
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				if (videoPopupEl) {
					videoPopupEl.style.display = 'none';
				}
				if (vimeoPlayer && typeof vimeoPlayer.pause === 'function') {
					vimeoPlayer.pause().catch(() => {});
				}
				if (vimeoIframe) {
					vimeoIframe.src = '';
				}
				vimeoPlayer = null;
			});
		}

		// Click outside to close
		if (videoPopupEl) {
			videoPopupEl.addEventListener('click', (e) => {
				if (e.target === videoPopupEl) {
					videoPopupEl.style.display = 'none';
					if (vimeoPlayer && typeof vimeoPlayer.pause === 'function') {
						vimeoPlayer.pause().catch(() => {});
					}
					if (vimeoIframe) {
						vimeoIframe.src = '';
					}
					vimeoPlayer = null;
				}
			});
		}

		// Attach click handlers to speaker images
		try {
			const speakerImgs = document.querySelectorAll(
				'.aerahub-2025__keynoteCol1 img[data-vimeo-src]'
			);
			speakerImgs.forEach((img) => {
				img.style.cursor = 'pointer';
				img.setAttribute('tabindex', '0');
				img.setAttribute('role', 'button');
				img.setAttribute('aria-label', 'Play video');

				img.addEventListener('click', (ev) => {
					const src =
						img.getAttribute('data-vimeo-src') ||
						img.getAttribute('data-src') ||
						img.src;
					if (src && window.openVideoPopup) {
						window.openVideoPopup(src);
					}
				});

				img.addEventListener('keydown', (ev) => {
					if (ev.key === 'Enter' || ev.key === ' ') {
						ev.preventDefault();
						img.click();
					}
				});
			});
		} catch (err) {
			console.warn('Could not attach speaker image video handlers', err);
		}
	}

	/**
	 * Setup smooth scroll for "Watch On-Demand" button
	 */
	function setupSmoothScroll() {
		const onDemandBtn = document.getElementById('onDemandBtn');
		const onDemandSection = document.getElementById('onDemandSection');

		if (onDemandBtn && onDemandSection) {
			onDemandBtn.addEventListener('click', (e) => {
				e.preventDefault();
				const offset = 120;
				const elementPosition = onDemandSection.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});
			});
		}
	}

	/**
	 * Hide navigation on AeraHub page
	 */
	function hideNavigation() {
		const headnav = document.getElementById('headnav');
		const aeraLogo = document.getElementById('aeraLogo');
		if (headnav) {
			headnav.style.display = 'none';
		}
		if (aeraLogo) {
			aeraLogo.style.display = 'none';
		}
	}
})();
