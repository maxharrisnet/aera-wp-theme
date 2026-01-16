(function () {
	// Header navigation state management (replaces MobX)
	const uiState = {
		isNavigationOpen: false,
		openNavigation() {
			this.isNavigationOpen = true;
			updateNavigationState();
		},
		closeNavigation() {
			this.isNavigationOpen = false;
			updateNavigationState();
		},
		toggleNavigation(value) {
			if (value !== undefined) {
				this.isNavigationOpen = value;
			} else {
				this.isNavigationOpen = !this.isNavigationOpen;
			}
			updateNavigationState();
		},
	};

	const header = document.querySelector('[data-header]') || document.getElementById('headnav');
	const toggle = document.querySelector('[data-nav-toggle]') || document.getElementById('bugerMenu');
	const overlay = document.querySelector('[data-nav-overlay]') || document.querySelector('.header__overlay');
	const sidebar = document.querySelector('.header__navigation');
	const bgWave = sidebar ? sidebar.querySelector('.header__backgroundPath') : null;
	const toggleElement = toggle;
	const lineOne = toggle ? toggle.querySelector('.header__toggleLine:nth-child(1)') : null;
	const lineTwo = toggle ? toggle.querySelector('.header__toggleLine:nth-child(2)') : null;
	const lineThree = toggle ? toggle.querySelector('.header__toggleLine:nth-child(3)') : null;

	// SVG path constants
	const boxPath = 'M100,0L100,0H0c0,0,0,118,0,249c0,146,0,138,0,249c0,112.9,0,85,0,278c0,87.1,0,224,0,224h100V0';
	const wavePath = 'M100,0C100,0,0,118,0,249c0,146,34,150,65,249c33.7,107.8,35,85,35,278c0,87.1,0,224,0,224l0,0V0L100,0z';

	if (!header) {
		return;
	}

	// Debounce helper function
	function debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	// Check if GSAP is available
	const gsapAvailable = typeof gsap !== 'undefined';

	// Toggle animation functions
	function toggleIn() {
		if (window.matchMedia('(min-width: 1024px)').matches) {
			return;
		}
		if (!gsapAvailable || !toggleElement || !lineOne || !lineTwo || !lineThree) {
			return;
		}

		const t = gsap.timeline();
		const duration = 0.35;

		t.add('start').fromTo(toggleElement, { rotation: 0 }, { rotation: 45, duration }, 'start').fromTo(lineOne, { rotation: 0, y: 0 }, { rotation: 180, y: 0, duration }, 'start').fromTo(lineTwo, { opacity: 1 }, { opacity: 0, duration: 0.2 }, 'start').fromTo(lineThree, { rotation: 0, y: 0 }, { rotation: 90, y: 0, duration }, 'start');
	}

	function toggleOut() {
		if (!gsapAvailable || !toggleElement || !lineOne || !lineTwo || !lineThree) {
			return;
		}

		const t = gsap.timeline();
		const duration = 0.35;

		t.add('start').to(toggleElement, { rotation: 180, clearProps: 'all', duration }, 'start').to(lineOne, { rotation: 180, y: 0, clearProps: 'all', duration }, 'start').to(lineTwo, { opacity: 1, clearProps: 'all', duration: 0.25 }, 'start+=.15').to(lineThree, { rotation: 180, y: 0, clearProps: 'all', duration }, 'start');
	}

	function sidebarIn() {
		if (!gsapAvailable || !sidebar) {
			return;
		}

		const t = gsap.timeline();

		t.add('start').to(sidebar, { x: '0%', duration: 0.3 }, 'start');

		// MorphSVG animation (requires GSAP MorphSVG plugin - premium plugin)
		// Check if MorphSVG plugin is registered before using it
		if (bgWave && gsap.plugins && gsap.plugins.MorphSVGPlugin) {
			t.fromTo(bgWave, { morphSVG: { shape: wavePath, shapeIndex: 6 } }, { morphSVG: { shape: boxPath, shapeIndex: 6 }, duration: 0.4 }, 'start+=0.1');
		}
	}

	function sidebarOut() {
		if (!gsapAvailable || !sidebar) {
			return;
		}

		const t = gsap.timeline();
		t.add('start').to(sidebar, { x: '100%', duration: 0.3 }, 'start');
	}

	// Update navigation state and animations
	function updateNavigationState() {
		const isMobile = window.matchMedia('(max-width: 1023px)').matches;

		if (isMobile) {
			// Mobile: toggle based on isNavigationOpen state
			if (uiState.isNavigationOpen) {
				toggleIn();
				sidebarIn();
				header.classList.add('is-open');
				if (toggle) {
					toggle.setAttribute('aria-expanded', 'true');
					toggle.setAttribute('aria-label', 'close menu');
				}
			} else {
				toggleOut();
				sidebarOut();
				header.classList.remove('is-open');
				if (toggle) {
					toggle.setAttribute('aria-expanded', 'false');
					toggle.setAttribute('aria-label', 'open menu');
				}
			}
		} else {
			// Desktop: navigation is always visible, no overlay
			header.classList.remove('is-open');
			if (toggle) {
				toggle.setAttribute('aria-expanded', 'false');
				toggle.setAttribute('aria-label', 'open menu');
			}
		}
	}

	const closeNav = () => {
		if (window.matchMedia('(max-width: 1023px)').matches) {
			uiState.toggleNavigation(false);
		}
	};

	const openNav = () => {
		uiState.toggleNavigation(true);
	};

	const toggleNav = () => {
		uiState.toggleNavigation();
	};

	if (toggle) {
		toggle.addEventListener('click', toggleNav);
	}

	if (overlay) {
		overlay.addEventListener('click', toggleNav);
	}

	// Close navigation when clicking menu links on mobile (but not parent items with dropdowns)
	// Only close for direct links without children
	if (sidebar) {
		sidebar.addEventListener('click', (e) => {
			const isMobile = window.matchMedia('(max-width: 1023px)').matches;
			if (!isMobile) {
				return; // Desktop handles this differently
			}

			// Prevent clicks on navigation panel from bubbling to overlay
			e.stopPropagation();

			// Check if clicking on a navigation link
			const link = e.target.closest('a');
			if (link) {
				// Check if this link is inside a parent item with a dropdown
				const parentItem = link.closest('.menu-item-has-children');
				const hasSubmenu = parentItem && parentItem.querySelector('.sub-menu');

				// Don't close if:
				// 1. Clicking on the toggle button for submenu
				// 2. Clicking on a parent item that has a submenu (let the toggle handle it)
				const isToggleButton = e.target.closest('.navigation__submenuToggle');

				if (!isToggleButton && !hasSubmenu) {
					// Only close for direct links without children
					// Small delay to allow navigation to happen
					setTimeout(() => {
						closeNav();
					}, 100);
				}
			}
		});
	}

	window.addEventListener('keyup', (event) => {
		if (event.key === 'Escape') {
			closeNav();
		}
	});

	const handleResize = debounce(() => {
		if (window.matchMedia('(min-width: 1024px)').matches) {
			if (!uiState.isNavigationOpen) {
				uiState.openNavigation();
			}
		} else if (uiState.isNavigationOpen) {
			uiState.closeNavigation();
		}
	}, 100);

	window.addEventListener('resize', handleResize);

	// Pathname-based header visibility
	function checkHeaderVisibility() {
		const pathname = window.location.pathname;
		const hiddenPaths = ['/AI-for-decision-automation', '/aerahub-2024', '/aerahub-2025', '/aerahub-2025-london', '/aerahub'];

		if (hiddenPaths.indexOf(pathname) === -1) {
			if (header) {
				header.style.display = '';
			}
		}
	}

	checkHeaderVisibility();

	// Scroll-based header positioning (desktop only, >= 1000px)
	let scrollPosition = 0;
	let scrollHandler = null;

	function initScrollHandler() {
		if (!header) {
			return;
		}

		const windowWidth = window.innerWidth;
		if (windowWidth >= 1000) {
			scrollPosition = window.scrollY || window.pageYOffset;

			if (scrollHandler) {
				window.removeEventListener('scroll', scrollHandler);
			}

			scrollHandler = function () {
				const scroll = window.scrollY || window.pageYOffset;

				if (scroll <= 0 && scrollPosition <= 0) {
					header.style.backgroundColor = 'transparent';
					header.style.position = 'absolute';
					header.style.top = '0';
				} else if (scroll > scrollPosition && scroll !== 0) {
					header.style.backgroundColor = 'transparent';
					header.style.position = 'absolute';
					header.style.top = '-175px';
				} else if (scroll === 0) {
					header.style.backgroundColor = 'transparent';
					header.style.position = 'absolute';
					header.style.top = '0px';
				} else if (scroll <= 100) {
					header.style.backgroundColor = 'transparent';
					header.style.position = 'fixed';
					header.style.top = '0px';
				} else {
					header.style.backgroundColor = '#fff';
					header.style.position = 'fixed';
					header.style.top = '0px';
				}
				scrollPosition = scroll;
			};

			window.addEventListener('scroll', scrollHandler);
		} else if (scrollHandler) {
			window.removeEventListener('scroll', scrollHandler);
			scrollHandler = null;
		}
	}

	// Initialize scroll handler
	initScrollHandler();
	window.addEventListener('resize', initScrollHandler);

	// Simple scroll handler for header--scrolled class (fallback if jQuery scroll handler not used)
	const handleScroll = () => {
		if (window.scrollY > 40) {
			header.classList.add('header--scrolled');
		} else {
			header.classList.remove('header--scrolled');
		}
	};

	handleScroll();
	window.addEventListener('scroll', handleScroll);

	// Handle mobile submenu toggles
	// Add menu type classes and arrow elements to dropdowns
	document.querySelectorAll('.menu-item-has-children').forEach((item) => {
		const link = item.querySelector('a');
		if (!link) {
			return;
		}

		const href = link.getAttribute('href') || '';

		// Determine menu type based on href
		if (href.includes('skills')) {
			item.setAttribute('data-menu-type', 'skills');
		} else if (href.includes('about-us') || href.includes('partners') || href.includes('careers') || href.includes('contact')) {
			item.setAttribute('data-menu-type', 'company');
		} else if (href.includes('resources')) {
			item.setAttribute('data-menu-type', 'resources');
		} else if (href.includes('events') || href.includes('webinars')) {
			item.setAttribute('data-menu-type', 'events');
		}

		// Add arrow element to dropdown (desktop only)
		const submenu = item.querySelector('.sub-menu');
		if (submenu && window.matchMedia('(min-width: 1024px)').matches) {
			const arrow = document.createElement('div');
			arrow.className = 'navigation__arrowUp';
			submenu.insertBefore(arrow, submenu.firstChild);
		}

		// Create mobile toggle button (always create, will be shown/hidden via CSS)
		const trigger = document.createElement('button');
		trigger.className = 'navigation__submenuToggle';
		trigger.type = 'button';
		trigger.setAttribute('aria-expanded', 'false');
		trigger.innerHTML = '<span class="navigation__activeDropdown">+</span><span class="navigation__inactiveDropdown">-</span><span class="screen-reader-text">Toggle submenu</span>';

		trigger.addEventListener('click', (e) => {
			e.preventDefault();
			const isOpen = item.classList.toggle('is-open');
			trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});

		// Prevent parent link from navigating when it has a submenu on mobile
		link.addEventListener('click', (e) => {
			// Only prevent default if clicking the link itself (not the toggle button)
			if (!e.target.closest('.navigation__submenuToggle') && window.matchMedia('(max-width: 1023px)').matches) {
				// On mobile, parent links with submenus should toggle the submenu, not navigate
				e.preventDefault();
				const isOpen = item.classList.toggle('is-open');
				trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			}
		});

		link.after(trigger);
	});

	const filterContainer = document.querySelector('.resources-filter__controls');
	if (filterContainer) {
		filterContainer.querySelectorAll('.resources-filter__button').forEach((button) => {
			button.addEventListener('click', () => {
				closeNav();
			});
		});
	}

	document.querySelectorAll('[data-scroll-to]').forEach((trigger) => {
		trigger.addEventListener('click', () => {
			const target = document.querySelector(trigger.dataset.scrollTo);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});

	const technology = document.querySelector('[data-technology]');
	const desktopQuery = window.matchMedia('(min-width: 768px)'); // Match CSS breakpoint
	let teardownTechnology;

	const initTechnology = () => {
		if (teardownTechnology) {
			teardownTechnology();
			teardownTechnology = null;
		}

		if (!technology) {
			return;
		}

		const items = technology.querySelectorAll('[data-technology-item]');
		const scenes = technology.querySelectorAll('[data-technology-scene]');
		const sceneWrapper = technology.querySelector('[data-technology-scene-wrapper]');

		if (!items.length || !scenes.length) {
			return;
		}

		const setActiveScene = (activeIndex) => {
			items.forEach((item) => {
				const index = parseInt(item.dataset.technologyIndex, 10);
				if (Number.isNaN(index)) {
					return;
				}
				item.classList.toggle('isActive', index === activeIndex);
			});

			scenes.forEach((scene) => {
				const index = parseInt(scene.dataset.technologyScene, 10);
				if (Number.isNaN(index)) {
					return;
				}
				scene.classList.toggle('isVisible', index === activeIndex);
			});
		};

		// Only treat as mobile if sceneWrapper is hidden (max-width: 768px)
		const isMobile = window.matchMedia('(max-width: 767px)').matches;
		if (isMobile) {
			scenes.forEach((scene) => scene.classList.add('isVisible'));
			items.forEach((item, index) => {
				item.classList.toggle('isActive', index === 0);
			});

			if (sceneWrapper) {
				sceneWrapper.style.height = '';
			}
			return;
		}

		const setWrapperHeight = () => {
			if (!sceneWrapper) {
				return;
			}
			const minHeight = 520;
			const desiredHeight = Math.max(window.innerHeight * 0.75, minHeight);
			sceneWrapper.style.height = `${desiredHeight}px`;
		};

		const updateActiveFromScroll = () => {
			let closestIndex = 0;
			let closestDistance = Number.POSITIVE_INFINITY;
			const viewportCenter = window.innerHeight / 2;
			const triggerOffset = viewportCenter * 0.5; // Trigger when item is 50% up the viewport

			items.forEach((item) => {
				const index = parseInt(item.dataset.technologyIndex, 10);
				if (Number.isNaN(index)) {
					return;
				}
				const rect = item.getBoundingClientRect();
				const itemCenter = rect.top + rect.height / 2;
				// Check if item is in the upper portion of viewport (more lenient trigger)
				const isInTriggerZone = rect.top < viewportCenter + triggerOffset && rect.bottom > 0;
				const distance = Math.abs(itemCenter - viewportCenter);

				if (isInTriggerZone && distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});

			setActiveScene(closestIndex);
		};

		let ticking = false;
		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					updateActiveFromScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		const onResize = () => {
			setWrapperHeight();
			updateActiveFromScroll();
		};

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', onResize);

		setWrapperHeight();
		updateActiveFromScroll();

		teardownTechnology = () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			if (sceneWrapper) {
				sceneWrapper.style.height = '';
			}
		};
	};

	initTechnology();

	const mediaHandler = () => initTechnology();
	if (desktopQuery.addEventListener) {
		desktopQuery.addEventListener('change', mediaHandler);
	} else if (desktopQuery.addListener) {
		desktopQuery.addListener(mediaHandler);
	}

	// Loading overlay - hide when page is fully loaded
	// This ensures the loading screen shows during initial page load and hides when everything is ready
	const loadingOverlay = document.getElementById('loading-overlay');
	if (loadingOverlay) {
		// Prevent body scrolling when loading screen is visible
		const preventBodyScroll = () => {
			document.body.style.overflow = 'hidden';
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
			document.body.style.height = '100%';
			document.documentElement.style.overflow = 'hidden';
			document.body.classList.add('loading-active');
			document.documentElement.classList.add('loading-active');
		};

		const allowBodyScroll = () => {
			document.body.style.overflow = '';
			document.body.style.position = '';
			document.body.style.width = '';
			document.body.style.height = '';
			document.documentElement.style.overflow = '';
			document.body.classList.remove('loading-active');
			document.documentElement.classList.remove('loading-active');
		};

		// Ensure loading overlay is visible initially
		loadingOverlay.style.display = 'block';
		loadingOverlay.classList.remove('is-hidden');
		preventBodyScroll();

		const hideLoading = () => {
			loadingOverlay.classList.add('is-hidden');
			allowBodyScroll();
			// Remove from DOM after transition completes
			setTimeout(() => {
				if (loadingOverlay && loadingOverlay.parentNode) {
					loadingOverlay.remove();
				}
			}, 300);
		};

		// Hide loading overlay when page is fully loaded (including images, stylesheets, etc.)
		if (document.readyState === 'complete') {
			// Page already fully loaded, hide immediately
			setTimeout(hideLoading, 100);
		} else {
			// Wait for window load event (fires when all resources are loaded)
			window.addEventListener(
				'load',
				() => {
					// Small delay to ensure smooth transition
					setTimeout(hideLoading, 100);
				},
				{ once: true }
			);
		}
	}

	// WordPress Admin Bar - Ensure it stays at bottom
	// This handles WordPress's dynamic inline styles that try to position it at the top
	const fixAdminBarPosition = () => {
		const adminBar = document.getElementById('wpadminbar');
		const html = document.documentElement;
		const body = document.body;

		if (adminBar) {
			// Ensure admin bar is at bottom
			adminBar.style.top = 'auto';
			adminBar.style.bottom = '0';
			adminBar.style.position = 'fixed';

			// Remove top margin/padding WordPress adds
			if (html.classList.contains('admin-bar')) {
				html.style.marginTop = '0';
			}
			if (body.classList.contains('admin-bar')) {
				body.style.paddingTop = '0';
			}
		}
	};

	// Run on DOM ready and after window load (WordPress adds styles after load)
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', fixAdminBarPosition);
	} else {
		fixAdminBarPosition();
	}
	window.addEventListener('load', fixAdminBarPosition);

	// Also watch for any style changes WordPress might make
	if (window.MutationObserver) {
		const observer = new MutationObserver(() => {
			fixAdminBarPosition();
		});

		const adminBar = document.getElementById('wpadminbar');
		if (adminBar) {
			observer.observe(adminBar, {
				attributes: true,
				attributeFilter: ['style'],
			});
			observer.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['style', 'class'],
			});
			observer.observe(document.body, {
				attributes: true,
				attributeFilter: ['style', 'class'],
			});
		}
	}
})();
