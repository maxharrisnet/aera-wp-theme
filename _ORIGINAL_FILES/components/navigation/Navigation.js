import React, { Component, Children, cloneElement } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { NavLink, Link } from 'react-router-dom';

import { TimelineLite } from 'gsap';
import s from './Navigation.scss';

export default class Navigation extends Component {
	static propTypes = {
		ui: PropTypes.object,
		children: PropTypes.node,
	};

	constructor(props) {
		super(props);
		this._toggleResources = this._toggleResources.bind(this);
		this._toggleCompany = this._toggleCompany.bind(this);
		this._toggleCommunity = this._toggleCommunity.bind(this);
		this._toggleEvent = this._toggleEvent.bind(this);
		this._toggleSkills = this._toggleSkills.bind(this);
		this._toggleCOS = this._toggleCOS.bind(this);
		this._toggleCognitiveSkills = this._toggleCognitiveSkills.bind(this);
	}

	_togglePlatform() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-platform']).css('display') === 'none') {
				$(this.refs['plusPlatform']).hide();
				$(this.refs['minusPlatform']).show();
			} else {
				$(this.refs['plusPlatform']).show();
				$(this.refs['minusPlatform']).hide();
			}
			$(this.refs['plus']).show();
			$(this.refs['minus']).hide();
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusCommunity']).show();
			$(this.refs['minusCommunity']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['toggle-platform']).slideToggle();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['plusCOS']).show();
			$(this.refs['minusCOS']).hide();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['plusCognitiveSkills']).show();
			$(this.refs['minusCognitiveSkills']).hide();
			$(this.refs['toggle-cognitive-skills']).slideUp();
		}
	}

	_toggleCOS() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-cos']).css('display') === 'none' && $(this.refs['toggle-platform']).css('display') === 'block') {
				$(this.refs['plusCOS']).hide();
				$(this.refs['minusCOS']).show();
				$(this.refs['toggle-cos']).slideDown({
					start: function () {
						$(this).css({
							display: 'flex',
						});
					},
				});
				// $(this.refs["toggle-cos"]).css('display','flex');
			} else {
				$(this.refs['plusCOS']).show();
				$(this.refs['minusCOS']).hide();
				$(this.refs['toggle-cos']).slideUp();
			}
			$(this.refs['toggle-cognitive-skills']).slideUp();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['plus']).show();
			$(this.refs['minus']).hide();
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['plusCognitiveSkills']).show();
			$(this.refs['minusCognitiveSkills']).hide();
		}
	}

	_toggleCognitiveSkills() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-cognitive-skills']).css('display') === 'none') {
				$(this.refs['plusCognitiveSkills']).hide();
				$(this.refs['minusCognitiveSkills']).show();
				$(this.refs['toggle-cognitive-skills']).slideDown();
				//console.log('open1')
			} else {
				$(this.refs['plusCognitiveSkills']).show();
				$(this.refs['minusCognitiveSkills']).hide();
				$(this.refs['toggle-cognitive-skills']).slideUp();
				//console.log('closed1')
			}
			//$(this.refs["toggle-platform"]).show();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['plus']).show();
			$(this.refs['minus']).hide();
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['plusCOS']).show();
			$(this.refs['minusCOS']).hide();
		}
	}

	_toggleValues() {
		if ($(window).width() <= 1024) {
			if ($(this.refs['toggle-values']).css('display') === 'none') {
				$(this.refs['plusValues']).hide();
				$(this.refs['minusValues']).show();
			} else {
				$(this.refs['plusValues']).show();
				$(this.refs['minusValues']).hide();
			}
			$(this.refs['plus']).show();
			$(this.refs['minus']).hide();
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusPlatform']).show();
			$(this.refs['minusPlatform']).hide();
			$(this.refs['toggle-values']).slideToggle();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-platform']).slideUp();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['toggle-cognitive-skills']).slideUp();
		}
	}

	_toggleSkills() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-skills']).css('display') === 'none') {
				$(this.refs['plusSkills']).hide();
				$(this.refs['minusSkills']).show();
			} else {
				$(this.refs['plusSkills']).show();
				$(this.refs['minusSkills']).hide();
			}
			$(this.refs['plus']).show();
			$(this.refs['minus']).hide();
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusPlatform']).show();
			$(this.refs['minusPlatform']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['toggle-skills']).slideToggle();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-platform']).slideUp();
			$(this.refs['toggle-values']).slideUp();
		}
	}

	_toggleResources() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-resources']).css('display') === 'none') {
				$(this.refs['plusResource']).hide();
				$(this.refs['minusResource']).show();
			} else {
				$(this.refs['plusResource']).show();
				$(this.refs['minusResource']).hide();
			}
			$(this.refs['plus']).show();
			$(this.refs['minus']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusPlatform']).show();
			$(this.refs['minusPlatform']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['toggle-resources']).slideToggle();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-platform']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['toggle-cognitive-skills']).slideUp();
			$(this.refs['plusCOS']).show();
			$(this.refs['minusCOS']).hide();
			$(this.refs['plusCognitiveSkills']).show();
			$(this.refs['minusCognitiveSkills']).hide();
		}
	}

	_toggleCompany() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-company']).css('display') === 'none') {
				$(this.refs['plusCompany']).hide();
				$(this.refs['minusCompany']).show();
			} else {
				$(this.refs['plusCompany']).show();
				$(this.refs['minusCompany']).hide();
			}
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusPlatform']).show();
			$(this.refs['minusPlatform']).hide();
			$(this.refs['plusCommunity']).show();
			$(this.refs['minusCommunity']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['toggle-company']).slideToggle();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-platform']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['toggle-cognitive-skills']).slideUp();
			$(this.refs['plusCOS']).show();
			$(this.refs['minusCOS']).hide();
			$(this.refs['plusCognitiveSkills']).show();
			$(this.refs['minusCognitiveSkills']).hide();
		}
	}

	_toggleCommunity() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-community']).css('display') === 'none') {
				$(this.refs['plusCommunity']).hide();
				$(this.refs['minusCommunity']).show();
			} else {
				$(this.refs['plusCommunity']).show();
				$(this.refs['minusCommunity']).hide();
			}
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusCompany']).show();
			$(this.refs['minusCompany']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusPlatform']).show();
			$(this.refs['minusPlatform']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['toggle-community']).slideToggle();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-platform']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['toggle-cognitive-skills']).slideUp();
			$(this.refs['plusCOS']).show();
			$(this.refs['minusCOS']).hide();
			$(this.refs['plusCognitiveSkills']).show();
			$(this.refs['minusCognitiveSkills']).hide();
		}
	}

	_toggleEvent() {
		if ($(window).width() <= 1023) {
			if ($(this.refs['toggle-Event']).css('display') === 'none') {
				$(this.refs['plusEvent']).hide();
				$(this.refs['minusEvent']).show();
			} else {
				$(this.refs['plusEvent']).show();
				$(this.refs['minusEvent']).hide();
			}
			$(this.refs['plusResource']).show();
			$(this.refs['minusResource']).hide();
			$(this.refs['plusCompany']).show();
			$(this.refs['minusCompany']).hide();
			$(this.refs['plusSkills']).show();
			$(this.refs['minusSkills']).hide();
			$(this.refs['plusPlatform']).show();
			$(this.refs['minusPlatform']).hide();
			$(this.refs['plusValues']).show();
			$(this.refs['minusValues']).hide();
			$(this.refs['toggle-Event']).slideToggle();
			$(this.refs['toggle-company']).slideUp();
			$(this.refs['toggle-resources']).slideUp();
			$(this.refs['toggle-skills']).slideUp();
			$(this.refs['toggle-platform']).slideUp();
			$(this.refs['toggle-values']).slideUp();
			$(this.refs['toggle-cos']).slideUp();
			$(this.refs['toggle-cognitive-skills']).slideUp();
			$(this.refs['plusCOS']).show();
			$(this.refs['minusCOS']).hide();
			$(this.refs['plusCognitiveSkills']).show();
			$(this.refs['minusCognitiveSkills']).hide();
		}
	}

	handleClick() {
		this.setState({ visible: !this.state.visible });
	}

	componentDidMount() {
		const { ui } = this.props;

		reaction(
			() => ui.isNavigationOpen,
			(isNavigationOpen) => {
				if (isNavigationOpen) {
					this.staggerIn();
				}
			}
		);

		if (window.location.pathname == '/skills/logistics') {
			//console.log('hit')
			$('#logistics').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/demand') {
			//console.log('hit')
			$('#demand').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/inventory') {
			//console.log('hit')
			$('#inventory').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/order') {
			//console.log('hit')
			$('#order').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/controltower') {
			//console.log('hit')
			$('#controltower').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/procurement') {
			//console.log('hit')
			$('#procurement').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/finance') {
			//console.log('hit')
			$('#finance').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/skills/revenue') {
			//console.log('hit')
			$('#revenue').css('border-bottom', '2px solid #7dd4e8');
		}
		if (window.location.pathname == '/webinars') {
			//console.log('hit')
			$('#webinars').css('border-bottom', '2px solid #96b1d8');
		} else {
			$('#navigation a[href="/webinars"]').css('border-bottom', '2px solid transparent');
		}

		if (window.matchMedia('(min-width: 1024px)').matches) {
			$("#platformDropdown a, a[data-event-name='Aera Decision Cloud']").on('click', function () {
				$('#platformDropdown').hide();
			});
			$("#skillsDropdown a, a[data-event-name='Skills']").on('click', function () {
				$('#skillsDropdown').hide();
			});
			$("#companyDropdown a, a[data-event-name='Company']").on('click', function () {
				$('#companyDropdown').hide();
			});
			$("#communityDropdown a, a[data-event-name='Community']").on('click', function () {
				$('#communityDropdown').hide();
			});
			$("#eventDropdown a, a[data-event-name='Events']").on('click', function () {
				$('#eventDropdown').hide();
			});
			$("#resourceDropdown a, a[data-event-name='Resources']").on('click', function () {
				$('#resourceDropdown').hide();
			});

			$('html, body').on('mousemove', function () {
				$('#platformDropdown, #skillsDropdown, #companyDropdown, #resourceDropdown, #communityDropdown, #eventDropdown').css('display', '');
			});
		}

		$('#navigation a[href="/contact"], #navigation a[href="/test-drive"], #navigation a[href="/webinars"],#navigation a[href="/skills/logistics"],#navigation a[href="/skills/demand"],#navigation a[href="/skills/inventory"],#navigation a[href="/skills/order"],#navigation a[href="/skills/controltower"],#navigation a[href="/skills/procurement"],#navigation a[href="/skills/finance"],#navigation a[href="/skills/revenue"]').hover(
			function () {
				$(this).css('border-color', '#7dd4e8');
			},
			function () {
				$(this).css('border-color', 'transparent');
			}
		);
		$('#navigation a[href="/contact"], #navigation a[href="/test-drive"], #navigation a[href="/webinars"]').hover(
			function () {
				$(this).css('border-color', '#8ac4e8');
			},
			function () {
				$(this).css('border-color', 'transparent');
			}
		);

		//console.log(window.location.pathname);

		if (window.location.pathname === '/contact') {
			$('#navigation a[href="/contact"]').css('border-color', '#8ac4e8');
		} else if (window.location.pathname === '/test-drive') {
			$('#navigation a[href="/test-drive"]').css('border-color', '#8ac4e8');
		} else if (window.location.pathname === '/demo') {
			$('#navigation a[href="/demo]').css('border-color', '#8ac4e8');
		} else {
			$('#navigation a[href="/contact"], #navigation a[href="/test-drive"]').css('border-color', 'transparent');
		}
	}

	componentDidUpdate() {
		if (window.location.pathname === '/contact') {
			$('#navigation a[href="/contact"]').css('border-color', '#8ac4e8');
		}
		if (window.location.pathname === '/test-drive') {
			$('#navigation a[href="/test-drive"]').css('border-color', '#8ac4e8');
		}
		if (window.location.pathname === '/demo') {
			$('#navigation a[href="/demo"]').css('border-color', '#8ac4e8');
		} else {
			$('#navigation a[href="/contact"], #navigation a[href="/test-drive"], #navigation a[href="/skills/logistics"],#navigation a[href="/skills/demand"],#navigation a[href="/skills/inventory"],#navigation a[href="/skills/order"],#navigation a[href="/skills/controltower"],#navigation a[href="/skills/procurement"],#navigation a[href="/skills/finance"],#navigation a[href="/skills/revenue"]').css('border-color', 'transparent');
		}

		if (window.location.pathname == '/webinars') {
			//console.log('hit')
			$('#webinars').css('border-bottom', '2px solid #8ac4e8');
		} else {
			$('#navigation a[href="/webinars"]').css('border-bottom', '2px solid transparent');
		}
	}

	staggerIn = () => {
		if (window.matchMedia('(min-width: 1024px)').matches) return;

		const t = new TimelineLite();

		t.add('start').staggerFromTo(`.${s.navigation__item}`, 0.4, { x: 200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, clearProps: 'visibility, opacity, transform' }, 0.035, 'start+=0.1');
	};

	closeNav = () => {
		if (window.matchMedia('(max-width: 1023px)').matches) {
			this.props.ui.toggleNavigation(false);
		}
	};

	render() {
		const { children } = this.props;

		return (
			// navbar start
			<nav
				className={s.navigation}
				id='navigation'
			>
				<ul className={s.navigation__list}>
					<li
						className={s(
							s.navigation__item,
							s.navigation__link
							// s.navigation__dropdownShow
						)}
					>
						<NavLink
							to='/aera-decision-cloud'
							className={s(
								s.navigation__link,
								s.platform
								// s.navigation__dropdownLink
							)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Aera Decision Cloud'
						>
							Aera Decision Cloud™
						</NavLink>
						{/* <span className={s.navigation__activeDropdown} ref="plusPlatform" onClick={this._togglePlatform.bind(this)}>
              +
            </span>
            <span
              className={s.navigation__inactiveDropdown}
              ref="minusPlatform"
              onClick={this._togglePlatform.bind(this)}
            >
              -
            </span> */}
						{/* <ul
              className={s(
                
                s.navigation__dropdownPlatform
              )}
              ref="toggle-platform"
              id="platformDropdown"
            >
              <div className={s.navigation__arrowUpPlatform}></div>
              <li className={s.navigation__noLink} onClick={this._toggleCOS.bind(this)} style={{display:"inline-block"}}>
                <NavLink
                  to="/decision-cloud"
                  className={s(s.navigation__link, s.platform)}
                  activeClassName={s.active}
                  onClick={() => this.closeNav()}
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="Overview"
                >
                  Overview
                </NavLink>
                <span className={s.navigation__cosActiveDropdown} ref="plusCOS">
                    +
                  </span>
                  <span
                    className={s.navigation__cosInactiveDropdown}
                    ref="minusCOS"
                  >
                    -
                </span>
              </li>
              <div className={s.navigation__submenuwrapper}>
                <div className={s.navigation__platformmenuwrapper}>
                    <div className={s(s.navigation__cosnestedmenu)} id="cosnestedmenu" ref="toggle-cos">
                    <div className={s(s.navigation__subItemWrapper, s.navigation__noMarginbottom, s.navigation__minheight220)}>
                        <li className={s.navigation__subNoLink}>ENGAGEMENT</li>
                        <li>
                          <NavLink
                            to="/aera-chat"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="Aera Chat"
                          >
                            AERA CHAT
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/aera-workspaces"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="AERA WORKSPACES"
                          >
                            AERA WORKSPACES
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/aera-inbox"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="AERA INBOX"
                          >
                            AERA INBOX
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/aera-control-room"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="AERA CONTROL ROOM"
                          >
                            AERA CONTROL ROOM
                          </NavLink>
                        </li>
                        
                       
                        <li>
                          <NavLink
                            to="/decision-engagement"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="SEARCH, VOICE, MOBILE"
                          >
                            DECISION ENGAGEMENT
                          </NavLink>
                        </li>
                        
                        
                      </div> 
                      <div className={s(s.navigation__subItemWrapper, s.navigation__minheight220)}>
                      <li className={s.navigation__subNoLink}>AUTOMATION</li>
                      
                        <li>
                          <NavLink
                            to="/process-builder"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="PROCESS BUILDER"
                          >
                            PROCESS BUILDER
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/business-rules"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="BUSINESS RULES"
                          >
                            BUSINESS RULES
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/simulation-and-planning"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="SIMULATION & PLANNING"
                          >
                            SIMULATION &amp; PLANNING
                          </NavLink>
                        </li>
                        
                      </div>
                      <div className={s(s.navigation__subItemWrapper, s.navigation__noMarginbottom)}>
                      <li className={s.navigation__subNoLink}>INTELLIGENCE</li>
                      <li>
                          <NavLink
                            to="/agentic-AI"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="Agentic AI"
                          >
                            AGENTIC AI
                          </NavLink>
                        </li>
                        
                        <li>
                          <NavLink
                            to="/aera-discovery"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="Aera Discovery™"
                          >
                            AERA DISCOVERY™
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/cortex-ai-ml"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="AERA CORTEX"
                          >
                            Aera Cortex™
                          </NavLink>
                        </li>
                        
                      </div>
                      <div className={s.navigation__subItemWrapper}>
                      <li className={s.navigation__subNoLink}>DATA</li>
                      <li>
                          <NavLink
                            to="/decision-data-model"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="DECISION DATA MODEL"
                          >
                            DECISION DATA MODEL™
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/data-workbench"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="DATA Workbench"
                          >
                            DATA WORKBENCH
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/data-crawlers"
                            className={s(s.navigation__subNavItem, s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="DATA CRAWLERS"
                          >
                            DATA CRAWLERS
                          </NavLink>
                        </li>
                        
                        
                      </div>
                      <div className={s.navigation__subItemWrapper}>
                        <li className={s.navigation__noLink}>
                          <NavLink
                            to="/aera-developer"
                            className={s(s.navigation__link, s.platform)}
                            activeClassName={s.active}
                            onClick={() => this.closeNav()}
                            data-event-category="Header"
                            data-event-action="Click"
                            data-event-name="Aera Developer™"
                          >
                            Aera Developer™
                          </NavLink>
                        </li>
                      </div>
                    </div>
                </div>
              </div>
            </ul> */}
					</li>

					<li
						className={s(s.navigation__item, s.navigation__link, s.navigation__dropdownShow)}
						onClick={this._toggleSkills}
					>
						<NavLink
							to='/skills'
							className={s(s.navigation__link, s.skills, s.navigation__dropdownLink)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Company'
						>
							Aera Skills™
						</NavLink>
						<span
							className={s.navigation__activeDropdown}
							ref='plusSkills'
						>
							+
						</span>
						<span
							className={s.navigation__inactiveDropdown}
							ref='minusSkills'
						>
							-
						</span>

						<ul
							className={s(s.navigation__dropdown, s.navigation__dropdownSkills)}
							ref='toggle-skills'
							id='skillsDropdown'
						>
							<div className={s.navigation__arrowUp}></div>
							<li>
								<a
									href='/skills/logistics'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Logistics'
									id='logistics'
								>
									Logistics
								</a>
							</li>
							<li>
								<a
									href='/skills/demand'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Demand'
									id='demand'
								>
									Demand
								</a>
							</li>
							<li>
								<a
									href='/skills/inventory'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Inventory'
									id='inventory'
								>
									Inventory
								</a>
							</li>
							<li>
								<a
									href='/skills/order'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Order'
									id='order'
								>
									Order
								</a>
							</li>
							<li>
								<a
									href='/skills/controltower'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Control Tower'
									id='controltower'
								>
									Control Tower
								</a>
							</li>
							<li>
								<a
									href='/skills/procurement'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Procurement'
									id='procurement'
								>
									Procurement
								</a>
							</li>
							<li>
								<a
									href='/skills/finance'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Finance'
									id='finance'
								>
									Finance
								</a>
							</li>
							<li>
								<a
									href='/skills/revenue'
									className={s(s.navigation__link, s.skills, s.navigation__subNavItem)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Revenue'
									id='revenue'
								>
									Revenue
								</a>
							</li>
						</ul>
					</li>

					<li
						className={s(s.navigation__item, s.navigation__link, s.navigation__dropdownShow)}
						onClick={this._toggleCompany}
					>
						<NavLink
							to='/about-us'
							className={s(s.navigation__link, s.company, s.navigation__dropdownLink)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Company'
						>
							Company
						</NavLink>
						<span
							className={s.navigation__activeDropdown}
							ref='plusCompany'
						>
							+
						</span>
						<span
							className={s.navigation__inactiveDropdown}
							ref='minusCompany'
						>
							-
						</span>

						<ul
							className={s(s.navigation__dropdown, s.navigation__dropdownCompany)}
							ref='toggle-company'
							id='companyDropdown'
						>
							<div className={s.navigation__arrowUp}></div>
							<li>
								<NavLink
									to='/about-us'
									className={s(s.navigation__link, s.company)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='About Us'
								>
									About Us
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/partners'
									className={s(s.navigation__link, s.company)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Partners'
								>
									Partners
								</NavLink>
							</li>
							<li>
								<a
									href='https://members.aeratechnology.com/landing'
									className={s(s.navigation__link, s.company)}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Community'
								>
									Community
								</a>
							</li>
							<li>
								<NavLink
									to='/careers'
									className={s(s.navigation__link, s.company)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Careers'
								>
									Careers
								</NavLink>
							</li>
							<li>
								<a
									href='/contact'
									className={s(s.navigation__link, s.company)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Contact Us'
								>
									Contact Us
								</a>
							</li>
						</ul>
					</li>

					<li
						className={s(s.navigation__item, s.navigation__link, s.navigation__dropdownShow)}
						onClick={this._toggleResources}
					>
						<NavLink
							to='/resources'
							className={s(s.navigation__link, s.resources, s.navigation__dropdownLink)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Resources'
						>
							Resources
						</NavLink>
						<span
							className={s.navigation__activeDropdown}
							ref='plusResource'
						>
							+
						</span>
						<span
							className={s.navigation__inactiveDropdown}
							ref='minusResource'
						>
							-
						</span>
						<ul
							className={s(s.navigation__dropdown, s.navigation__dropdownResource)}
							id='resourceDropdown'
							ref='toggle-resources'
						>
							<div className={s.navigation__arrowUp}></div>
							<li>
								<NavLink
									to='/what-is-decision-intelligence'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='What is Decision Intelligence?'
								>
									What is Decision Intelligence?
								</NavLink>
							</li>

							<li>
								<NavLink
									to='/resources?category=news'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='News'
								>
									News
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/resources?category=press-release'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='News'
								>
									Press Releases
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/resources?category=videos'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Videos'
								>
									Videos
								</NavLink>
							</li>
							{/* <li>
                <NavLink
                  to="/resources?category=aerahub"
                  className={s(s.navigation__link, s.resources)}
                  activeClassName={s.active}
                  onClick={() => this.closeNav()}
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="aerahub"
                  
                >
                  AeraHub
                </NavLink>
              </li> */}

							<li>
								<NavLink
									to='/resources?category=whitepapers'
									className={s(s.navigation__link, s.action, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Whitepapers'
								>
									Whitepapers
								</NavLink>
							</li>

							{/* <li>
                <a
                  href="/webinars"
                  className={s(s.navigation__link, s.events)}
                  activeClassName={s.active}
                  onClick={() => this.closeNav()}
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="Webinars"
                  id="webinars"
                >
                  Webinars
                </a>
              </li> */}
							<li>
								<NavLink
									to='/resources?category=blogs'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Blogs'
								>
									Blogs
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/resources?category=case-studies'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='case studies'
								>
									Case Studies
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/resources?category=podcasts'
									className={s(s.navigation__link, s.resources)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Podcasts'
								>
									Podcasts
								</NavLink>
							</li>
						</ul>
					</li>
					{/* <li
            className={s(
              s.navigation__item,
              s.navigation__link,
              s.navigation__dropdownShow
            )}
            onClick={this._toggleCommunity}
          >
            <NavLink
              to="/community"
              className={s(
                s.navigation__link,
                s.company,
                s.navigation__dropdownLink
              )}
              activeClassName={s.active}
              onClick={() => this.closeNav()}
              data-event-category="Header"
              data-event-action="Click"
              data-event-name="Community"
            >
              Community
            </NavLink>
            <span className={s.navigation__activeDropdown} ref="plusCommunity">
              +
            </span>
            <span className={s.navigation__inactiveDropdown} ref="minusCommunity">
              -
            </span>

            <ul
              className={s(
                s.navigation__dropdown,
                s.navigation__dropdownCommunity
              )}
              ref="toggle-community"
              id="communityDropdown"
            >
              <div className={s.navigation__arrowUp}></div>
              <li>
                <NavLink
                  to="/customers"
                  className={s(s.navigation__link, s.company)}
                  activeClassName={s.active}
                  onClick={() => this.closeNav()}
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="Customers"
                >
                  Customers
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/partners"
                  className={s(s.navigation__link, s.company)}
                  activeClassName={s.active}
                  onClick={() => this.closeNav()}
                  data-event-category="Header"
                  data-event-action="Click"
                  data-event-name="Partners"
                >
                  Partners
                </NavLink>
              </li>
              
            </ul>
          </li> */}
					<li className={s(s.navigation__item, s.navigation__link)}>
						<NavLink
							to='/customers'
							className={s(s.navigation__link, s.careers)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Customers'
						>
							Customers
						</NavLink>
					</li>
					<li
						className={s(s.navigation__item, s.navigation__link, s.navigation__dropdownShow)}
						onClick={this._toggleEvent}
					>
						<NavLink
							to='/events'
							className={s(s.navigation__link, s.company, s.navigation__dropdownLink)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Events'
						>
							Events
						</NavLink>
						<span
							className={s.navigation__activeDropdown}
							ref='plusEvent'
						>
							+
						</span>
						<span
							className={s.navigation__inactiveDropdown}
							ref='minusEvent'
						>
							-
						</span>

						<ul
							className={s(s.navigation__dropdown, s.navigation__dropdownEvent)}
							ref='toggle-Event'
							id='eventDropdown'
						>
							<div className={s.navigation__arrowUp}></div>
							<li>
								<NavLink
									to='/events'
									className={s(s.navigation__link, s.company)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='In-Person Event'
								>
									In-Person Events
								</NavLink>
							</li>

							<li>
								<a
									href='/webinars'
									className={s(s.navigation__link, s.company)}
									activeClassName={s.active}
									onClick={() => this.closeNav()}
									data-event-category='Header'
									data-event-action='Click'
									data-event-name='Webinar'
									id='webinars'
								>
									Webinars
								</a>
							</li>
						</ul>
					</li>
					<li className={s(s.navigation__item, s.navigation__link)}>
						<a
							href='/test-drive'
							className={s(s.navigation__link, s.company)}
							activeClassName={s.active}
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Test Drive'
						>
							Test Drive
						</a>
					</li>

					{/* <div class="gcse-searchresults-only"></div> */}
					<li
						className={s(s.navigation__item, s.navigation__demo)}
						id='meetAera'
					>
						<a
							className={s(s.navigation__link, s.demo)}
							activeClassName={s.active}
							href='/demo'
							onClick={() => this.closeNav()}
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='SCHEDULE DEMO'
						>
							SCHEDULE DEMO
						</a>
					</li>
				</ul>
			</nav>
		);
	}
}
