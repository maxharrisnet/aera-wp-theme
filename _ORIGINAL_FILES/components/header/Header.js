import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { TimelineLite } from 'gsap';
import Button from 'components/button';
import { Social } from 'components/navigation';
import AeraLogo from 'assets/images/aera-logo.svg';
import AeraLogo1 from 'assets/images/AeraLogo_Full-Black_H_RGBnew.png';

import s from './Header.scss';
import $ from 'jquery';

const boxPath = 'M100,0L100,0H0c0,0,0,118,0,249c0,146,0,138,0,249c0,112.9,0,85,0,278c0,87.1,0,224,0,224h100V0';
const wavePath = 'M100,0C100,0,0,118,0,249c0,146,34,150,65,249c33.7,107.8,35,85,35,278c0,87.1,0,224,0,224l0,0V0L100,0z';

@inject('ui')
@observer
export default class Header extends Component {
	static propTypes = {
		ui: PropTypes.object,
		children: PropTypes.node,
	};

	timeout = null;
	state = {
		isScrolling: false,
	};

	componentDidMount() {
		if (window.location.pathname != '/AI-for-decision-automation' && window.location.pathname != '/aerahub-2024' && window.location.pathname != '/aerahub-2025-london') {
			$('#headnav').show();
		}

		window.addEventListener('resize', this.handleResize);

		if ($(window).width() >= 1000) {
			var position = $(window).scrollTop();
			$(window).scroll(function () {
				var scroll = $(window).scrollTop();
				// console.log(position +" position");

				// console.log(scroll +" scroll");

				if (scroll <= 0 && position <= 0) {
					// console.log('scroll minus');
					//$('#headnav').removeClass('headerfixed')
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'absolute');
					$('#headnav').css('top', '0');
					// $('#content').css('padding', '55px 0 20px');
					//$('#meetAera-desktop').css('top','65px');
					//$('#logo').css('top','75px');
				} else if (scroll > position && scroll != 0) {
					// console.log('scrollDown');
					//$('#headnav').removeClass('headerfixed')
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'absolute');
					$('#headnav').css('top', '-175px');
					// $('#content').css('padding', '55px 0 20px');
					// $('#meetAera-desktop').css('top','65px');
					// $('#logo').css('top','75px');
				} else if (scroll == 0) {
					// console.log('atTop')
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'absolute');
					$('#headnav').css('top', '0px');
					// $('#content').css('padding', '55px 0 20px');
					//$('#meetAera-desktop').css('top','65px');
					//$('#logo').css('top','75px');
				} else if (scroll <= 100) {
					// console.log('atTop')
					$('#headnav').css('background-color', 'transparent');
					$('#headnav').css('position', 'fixed');
					$('#headnav').css('top', '0px');
					// $('#content').css('padding', '55px 0 20px');
					//$('#meetAera-desktop').css('top','65px');
					//$('#logo').css('top','75px');
				} else {
					// console.log('scrollUp');
					//$('#headnav').addClass('headerfixed')
					$('#headnav').css('background-color', '#fff');
					$('#headnav').css('position', 'fixed');
					$('#headnav').css('top', '0px');
					// $('#content').css('padding', '55px 0 20px');
					// $('#meetAera-desktop').css('top','65px');
					// $('#logo').css('top','75px');
				}
				position = scroll;
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	componentDidUpdate() {
		if (window.location.pathname != '/AI-for-decision-automation' && window.location.pathname != '/aerahub-2024' && window.location.pathname != '/aerahub-2025' && window.location.pathname != '/aerahub-2025-london' && window.location.pathname != '/aerahub' && window.location.pathname != '/aerahub-2025-london') {
			$('#headnav').show();
		}

		// if(window.location.pathname != '/AI-for-decision-automation'){
		//   if (window.matchMedia("(max-width: 1024px)").matches) {
		//     console.log('in mobile show 2');
		//     $('#bugerMenu').show();
		//   }
		// }

		if (window.matchMedia('(max-width: 1023px)').matches && !this.props.ui.isNavigationOpen) {
			this.toggleOut();
			this.sidebarOut();
		} else {
			this.toggleIn();
			this.sidebarIn();
		}
	}

	handleResize = _debounce(() => {
		const { ui } = this.props;
		if (window.matchMedia('(min-width: 1024px)').matches) {
			if (!ui.isNavigationOpen) {
				this.props.ui.openNavigation();
			}
		} else if (ui.isNavigationOpen) {
			this.props.ui.closeNavigation();
		}
	}, 100);

	handleToggleClick = () => {
		this.props.ui.toggleNavigation();
	};

	toggleIn = () => {
		if (window.matchMedia('(min-width: 1024px)').matches) return;

		const t = new TimelineLite();
		const toggle = this.toggle;
		const lineOne = this.lineOne;
		const lineTwo = this.lineTwo;
		const lineThree = this.lineThree;
		const duration = 0.35;

		t.add('start').fromTo(toggle, duration, { rotation: 0 }, { rotation: 45 }).fromTo(lineOne, duration, { rotation: 0, y: 0 }, { rotation: 180, y: 5 }, 'start').fromTo(lineTwo, 0.2, { opacity: 1 }, { opacity: 0 }, 'start').fromTo(lineThree, duration, { rotation: 0, y: 0 }, { rotation: 90, y: -5 }, 'start');
	};

	toggleOut = () => {
		const t = new TimelineLite();
		const toggle = this.toggle;
		const lineOne = this.lineOne;
		const lineTwo = this.lineTwo;
		const lineThree = this.lineThree;
		const duration = 0.35;

		t.add('start').to(toggle, duration, { rotation: 180, clearProps: 'all' }, 'start').to(lineOne, duration, { rotation: 180, y: 0, clearProps: 'all' }, 'start').to(lineTwo, 0.25, { opacity: 1, clearProps: 'all' }, 'start+=.15').to(lineThree, duration, { rotation: 180, y: 0, clearProps: 'all' }, 'start');
	};

	sidebarIn = () => {
		const t = new TimelineLite();

		t.add('start')
			.to(this.sidebar, 0.3, { x: '0%' })
			.fromTo(this.bgWave, 0.4, { morphSVG: { shape: wavePath, shapeIndex: 6 } }, { morphSVG: { shape: boxPath, shapeIndex: 6 } }, 'start+=0.1');
	};

	sidebarOut = () => {
		const t = new TimelineLite();

		t.add('start').to(this.sidebar, 0.3, { x: '100%' });
	};

	closeNav = () => {
		if (window.matchMedia('(max-width: 1023px)').matches) {
			this.props.ui.toggleNavigation(false);
		}
	};

	render() {
		const {
			ui,
			ui: { isNavigationOpen },
			children,
		} = this.props;

		return (
			<header
				className={s(s.header, { isOpen: isNavigationOpen })}
				id='headnav'
			>
				{/* <div className={s.header__topBanner}>
          <span>
            <b>
            AeraHUB 25 - The Decision Intelligence Summit |
            </b>
          </span>



          <span><b>&nbsp;New York - Nov 4, 2025</b>
          <a href="/aerahub-2025" target="_blank">
            Learn More
          </a>
          </span>

        </div> */}
				{/* <div className={s.header__fixedButton}>
          <a
            href="/demo"
            data-event-category="Header"
            data-event-action="Click"
            data-event-name="Request For Demo"
          >
            Request A Demo
          </a>
        </div> */}
				<div className={s.header__container}>
					<div
						className={s.header__content}
						id='content'
					>
						<div
							className={s.header__bar}
							id='logo'
						>
							<Link
								to='/'
								className={s.header__logo}
								onClick={this.closeNav}
								aria-label='Aera'
							>
								{/* <AeraLogo className={s.header__logoImage} /> */}
								<img
									src={AeraLogo1}
									className={s.header__logoImage}
									alt='Aera Logo'
								/>
							</Link>

							<button
								className={s.header__toggle}
								ref={(el) => (this.toggle = el)}
								onClick={this.handleToggleClick}
								aria-label={isNavigationOpen ? 'close menu' : 'open menu'}
								id='bugerMenu'
							>
								<span
									ref={(el) => (this.lineOne = el)}
									className={s.header__toggleLine}
								/>
								<span
									ref={(el) => (this.lineTwo = el)}
									className={s.header__toggleLine}
								/>
								<span
									ref={(el) => (this.lineThree = el)}
									className={s.header__toggleLine}
								/>
							</button>
						</div>
						{/* <div className={s.header__demo} id="meetAera-desktop">
                <a
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="SCHEDULE DEMO"
                  href="/demo"
                >
                  SCHEDULE DEMO
                </a>
              </div> */}

						{/* { //Check if message failed
              (this.state.location !== '/futureofdecisions')
                ? <div className={s.header__demo} id="meetAera-desktop">
                <Button
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="Meet Aera"
                  to="/demo"
                >
                  Meet Aera
                </Button>
              </div>
                : null
            } */}

						<div
							className={s.header__overlay}
							onClick={this.handleToggleClick}
						/>

						<div
							ref={(el) => (this.sidebar = el)}
							className={s.header__navigation}
						>
							<div className={s.header__navBackground}>
								<svg
									className={s.svg}
									x='0'
									y='0'
									width='100%'
									height='100%'
									viewBox='0 0 100 1000'
									preserveAspectRatio='none'
								>
									<path
										ref={(el) => (this.bgWave = el)}
										className={s.bg}
										fill='#f7f9fa'
										d={wavePath}
									/>
								</svg>
							</div>
							<div className={s.header__navlist}>{Children.map(children, (child) => cloneElement(child, { ui }))}</div>
							<div className={s.header__social}>
								<Social />
							</div>
						</div>
						<div
							className={s.header__demo}
							id='meetAera-desktop'
						>
							<a
								data-event-category='Header'
								data-event-action='Click'
								data-event-name='SCHEDULE DEMO'
								href='/demo'
							>
								SCHEDULE DEMO
							</a>
						</div>
					</div>
				</div>
			</header>
		);
	}
}
