(function () {
	// Header navigation state management (replaces MobX)
	const uiState = {
		isNavigationOpen: false,
		openNavigation: function () {
			this.isNavigationOpen = true;
			updateNavigationState();
		},
		closeNavigation: function () {
			this.isNavigationOpen = false;
			updateNavigationState();
		},
		toggleNavigation: function (value) {
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
	const TimelineLite = gsapAvailable ? gsap.timeline : null;

	// Toggle animation functions
	function toggleIn() {
		if (window.matchMedia('(min-width: 1024px)').matches) return;
		if (!gsapAvailable || !toggleElement || !lineOne || !lineTwo || !lineThree) return;

		const t = gsap.timeline();
		const duration = 0.35;

		t.add('start').fromTo(toggleElement, duration, { rotation: 0 }, { rotation: 45 }, 'start').fromTo(lineOne, duration, { rotation: 0, y: 0 }, { rotation: 180, y: 5 }, 'start').fromTo(lineTwo, 0.2, { opacity: 1 }, { opacity: 0 }, 'start').fromTo(lineThree, duration, { rotation: 0, y: 0 }, { rotation: 90, y: -5 }, 'start');
	}

	function toggleOut() {
		if (!gsapAvailable || !toggleElement || !lineOne || !lineTwo || !lineThree) return;

		const t = gsap.timeline();
		const duration = 0.35;

		t.add('start').to(toggleElement, duration, { rotation: 180, clearProps: 'all' }, 'start').to(lineOne, duration, { rotation: 180, y: 0, clearProps: 'all' }, 'start').to(lineTwo, 0.25, { opacity: 1, clearProps: 'all' }, 'start+=.15').to(lineThree, duration, { rotation: 180, y: 0, clearProps: 'all' }, 'start');
	}

	function sidebarIn() {
		if (!gsapAvailable || !sidebar) return;

		const t = gsap.timeline();

		t.add('start').to(sidebar, 0.3, { x: '0%' }, 'start');

		// MorphSVG animation (requires GSAP MorphSVG plugin)
		if (bgWave && typeof gsap.registerPlugin !== 'undefined') {
			// Check if MorphSVG plugin is available
			try {
				t.fromTo(bgWave, 0.4, { morphSVG: { shape: wavePath, shapeIndex: 6 } }, { morphSVG: { shape: boxPath, shapeIndex: 6 } }, 'start+=0.1');
			} catch (e) {
				// MorphSVG plugin not available, skip morph animation
				console.warn('GSAP MorphSVG plugin not available');
			}
		}
	}

	function sidebarOut() {
		if (!gsapAvailable || !sidebar) return;

		const t = gsap.timeline();
		t.add('start').to(sidebar, 0.3, { x: '100%' }, 'start');
	}

	// Update navigation state and animations
	function updateNavigationState() {
		const isMobile = window.matchMedia('(max-width: 1023px)').matches;

		if (isMobile && !uiState.isNavigationOpen) {
			toggleOut();
			sidebarOut();
			header.classList.remove('is-open');
			if (toggle) {
				toggle.setAttribute('aria-expanded', 'false');
				toggle.setAttribute('aria-label', 'open menu');
			}
		} else {
			toggleIn();
			sidebarIn();
			header.classList.add('is-open');
			if (toggle) {
				toggle.setAttribute('aria-expanded', 'true');
				toggle.setAttribute('aria-label', 'close menu');
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
			if (typeof $ !== 'undefined' && $('#headnav').length) {
				$('#headnav').show();
			} else if (header) {
				header.style.display = '';
			}
		}
	}

	checkHeaderVisibility();

	// Scroll-based header positioning (desktop only, >= 1000px)
	let scrollPosition = 0;
	let scrollHandler = null;

	function initScrollHandler() {
		if (typeof $ === 'undefined' || !$('#headnav').length) return;

		const windowWidth = $(window).width();
		if (windowWidth >= 1000) {
			scrollPosition = $(window).scrollTop();

			if (scrollHandler) {
				$(window).off('scroll', scrollHandler);
			}

			scrollHandler = function () {
				const scroll = $(window).scrollTop();

				if (scroll <= 0 && scrollPosition <= 0) {
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'absolute');
					$('#headnav').css('top', '0');
				} else if (scroll > scrollPosition && scroll != 0) {
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'absolute');
					$('#headnav').css('top', '-175px');
				} else if (scroll == 0) {
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'absolute');
					$('#headnav').css('top', '0px');
				} else if (scroll <= 100) {
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'fixed');
					$('#headnav').css('top', '0px');
				} else {
					$('#headnav').css('background-color', '#fff');
					$('#headnav').css('position', 'fixed');
					$('#headnav').css('top', '0px');
				}
				scrollPosition = scroll;
			};

			$(window).on('scroll', scrollHandler);
		} else {
			if (scrollHandler) {
				$(window).off('scroll', scrollHandler);
				scrollHandler = null;
			}
		}
	}

	// Initialize scroll handler if jQuery is available
	if (typeof $ !== 'undefined') {
		initScrollHandler();
		$(window).on('resize', initScrollHandler);
	}

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
	const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

	// Add menu type classes and arrow elements to dropdowns
	document.querySelectorAll('.menu-item-has-children').forEach((item) => {
		const link = item.querySelector('a');
		if (!link) return;

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
		if (submenu && isDesktop) {
			const arrow = document.createElement('div');
			arrow.className = 'navigation__arrowUp';
			submenu.insertBefore(arrow, submenu.firstChild);
		}
	});
	if (!isDesktop) {
		document.querySelectorAll('.menu-item-has-children').forEach((item) => {
			const trigger = document.createElement('button');
			trigger.className = 'navigation__submenuToggle';
			trigger.type = 'button';
			trigger.setAttribute('aria-expanded', 'false');
			trigger.innerHTML = '<span class="screen-reader-text">Toggle submenu</span>';

			trigger.addEventListener('click', () => {
				const isOpen = item.classList.toggle('is-open');
				trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			});

			const link = item.querySelector('a');
			if (link) {
				link.after(trigger);
			}
		});
	}

	// Close desktop dropdowns when clicking a link
	if (isDesktop) {
		document.querySelectorAll('.menu-item-has-children a').forEach((link) => {
			link.addEventListener('click', () => {
				const submenu = link.closest('.menu-item-has-children')?.querySelector('.sub-menu');
				if (submenu) {
					// Small delay to allow navigation
					setTimeout(() => {
						submenu.style.display = '';
					}, 100);
				}
			});
		});
	}

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
	const desktopQuery = window.matchMedia('(min-width: 1024px)');
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

		if (!desktopQuery.matches) {
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

			items.forEach((item) => {
				const index = parseInt(item.dataset.technologyIndex, 10);
				if (Number.isNaN(index)) {
					return;
				}
				const rect = item.getBoundingClientRect();
				const itemCenter = rect.top + rect.height / 2;
				const distance = Math.abs(rect.top - viewportCenter);
				if (distance < closestDistance && rect.top < viewportCenter + 200) {
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
})();
