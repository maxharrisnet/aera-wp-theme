(function () {
	const header = document.querySelector('[data-header]');
	const toggle = document.querySelector('[data-nav-toggle]');
	const overlay = document.querySelector('[data-nav-overlay]');

	if (!header) {
		return;
	}

	const closeNav = () => {
		header.classList.remove('is-open');
		if (toggle) {
			toggle.setAttribute('aria-expanded', 'false');
		}
	};

	const openNav = () => {
		header.classList.add('is-open');
		if (toggle) {
			toggle.setAttribute('aria-expanded', 'true');
		}
	};

	const toggleNav = () => {
		if (header.classList.contains('is-open')) {
			closeNav();
		} else {
			openNav();
		}
	};

	if (toggle) {
		toggle.addEventListener('click', toggleNav);
	}

	if (overlay) {
		overlay.addEventListener('click', closeNav);
	}

	window.addEventListener('keyup', (event) => {
		if (event.key === 'Escape') {
			closeNav();
		}
	});

	window.addEventListener('resize', () => {
		if (window.matchMedia('(min-width: 1024px)').matches) {
			closeNav();
		}
	});

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
