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

	const filterContainer = document.querySelector('.resources-filter__controls');
	if (filterContainer) {
		filterContainer.querySelectorAll('.resources-filter__button').forEach((button) => {
			button.addEventListener('click', () => {
				closeNav();
			});
		});
	}
})();
