import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Social from 'components/social';

import AeraLogo from 'assets/images/aera-logo.svg';

import s from './Footer.scss';

export default class Footer extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	render() {
		const links = [
			{ name: 'Technology', url: '/technology' },
			{ name: 'Skills', url: '/skills' },
			{ name: 'Company', url: '/about-us' },
			{ name: 'Careers', url: '/careers' },
			{ name: 'Resources', url: '/resources' },
			{ name: 'Contact', url: '/contact' },
			{ name: 'News', url: '/news' },
			{ name: 'Aerainaction', url: '/aera-in-action' },
			{ name: 'Leadership', url: '/leadership' },
			{ name: 'Events', url: '/events' },
		];

		return (
			<footer
				className={s.footer}
				id='footer'
			>
				<div className={s.footer__container}>
					<div className={s.footer__row}>
						<div className={s.footer__logo}>
							<Link
								to='/'
								className={s.footer__logoLink}
								aria-label='Aera'
							>
								<AeraLogo className={s.footer__logoImage} />
							</Link>
						</div>
					</div>
					<div className={s.footer__row}>
						<div className={s.footer__navigation}>
							<div className={s.footer__navigationCol}>
								<ul>
									<li>
										<Link
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Aera Decision Cloud'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											to='/aera-decision-cloud'
										>
											AERA DECISION CLOUD™
											{/* THE AERA PLATFORM */}
										</Link>
									</li>
									{/* <li className={s(s.footer__noLinkTitle)}>
                    <Link
                      data-event-category="Footer"
                      data-event-action="Click"
                      data-event-name="AERA DEVELOPER"
                      className={s(s.footer__link, s.footer__bold)}
                      to="/aera-developer"
                    >
                      AERA DEVELOPER™
                    </Link>
                  </li> */}
								</ul>
								<ul className={s.footer__w15}>
									<li>
										<Link
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Company'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											to='/skills'
										>
											AERA SKILLS™
										</Link>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/logistics'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Logistics'
										>
											Logistics
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/demand'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Demand
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/inventory'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Inventory
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/order'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Order
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/controltower'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Control Tower
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/procurement'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Procurement
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/finance'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Finance
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/skills/revenue'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Demand'
										>
											Revenue
										</a>
									</li>
								</ul>
								<ul className={s.footer__w15}>
									<li>
										<Link
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Company'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											to='/about-us'
										>
											COMPANY
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/about-us'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='About Us'
										>
											ABOUT US
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/partners'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='partners'
										>
											PARTNERS
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/careers'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Careers'
										>
											CAREERS
										</Link>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/aera-security-and-privacy-documentation'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Aera Security & Privacy Documentation'
										>
											Security & Privacy
										</a>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/contact'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Contact Us'
										>
											CONTACT US
										</a>
									</li>
								</ul>
								<ul className={s.footer__w15}>
									<li>
										<Link
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Resources'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											to='/resources'
										>
											RESOURCES
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/what-is-decision-intelligence'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='WHAT IS DECISION INTELLIGENCE?'
										>
											WHAT IS DECISION INTELLIGENCE?
										</Link>
									</li>

									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=news'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='News'
										>
											NEWS
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=press-release'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='News'
										>
											Press Releases
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=videos'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Videos'
										>
											VIDEOS
										</Link>
									</li>
									{/* <li>
                    <Link
                      className={s.footer__link}
                      to="/resources?category=aerahub"
                      data-event-category="Footer"
                      data-event-action="Click"
                      data-event-name="aera hub"
                    >
                      AERAHUB
                    </Link>
                  </li> */}

									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=whitepapers'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Whitepapers'
										>
											WHITEPAPERS
										</Link>
									</li>

									{/* <li>
                    <a
                      className={s.footer__link}
                      href="/webinars"
                      data-event-category="Footer"
                      data-event-action="Click"
                      data-event-name="Webinars"
                    >
                      Webinars
                    </a>
                  </li> */}
									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=blogs'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Blogs'
										>
											Blogs
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=case-studies'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='case studies'
										>
											Case Studies
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/resources?category=podcasts'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='podcasts'
										>
											Podcasts
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/decision-intelligence-faq'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Decision Intelligence FAQs'
										>
											Decision Intelligence FAQs
										</Link>
									</li>
								</ul>
								<ul className={s.footer__w15}>
									<li>
										<Link
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Customers'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											to='/customers'
										>
											CUSTOMERS
										</Link>
									</li>
									{/* <li>
                    <Link
                      className={s.footer__link}
                      to="/customers"
                      data-event-category="Footer"
                      data-event-action="Click"
                      data-event-name="Customers"
                    >
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={s.footer__link}
                      to="/partners"
                      data-event-category="Footer"
                      data-event-action="Click"
                      data-event-name="Partners"
                    >
                      Partners
                    </Link>
                  </li> */}

									{/* <li>
                    <Link
                      className={s(
                        s.footer__parentLink,
                        s.footer__parentLinkHover
                      )}
                      to="/events"
                      data-event-category="Footer"
                      data-event-action="Click"
                      data-event-name="Events"
                    >
                      EVENTS
                    </Link>
                  </li> */}
								</ul>
								<ul className={s.footer__w15}>
									<li>
										<Link
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='events'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											to='/events'
										>
											EVENTS
										</Link>
									</li>
									<li>
										<Link
											className={s.footer__link}
											to='/events'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='IN-PERSON EVENTS'
										>
											IN-PERSON EVENTS
										</Link>
									</li>
									<li>
										<a
											className={s.footer__link}
											href='/webinars'
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='WEBINARS'
										>
											WEBINARS
										</a>
									</li>
								</ul>
								<ul className={s.footer__w15}>
									<li>
										<a
											data-event-category='Footer'
											data-event-action='Click'
											data-event-name='Test Drive'
											className={s(s.footer__parentLink, s.footer__parentLinkHover)}
											href='/test-drive'
										>
											TEST DRIVE
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className={s.footer__social}>
							<Social />
						</div>
					</div>
					<p className={s.footer__copyright}>&copy; {new Date().getFullYear()} Aera Technology&reg; &middot; All Rights Reserved.</p>
				</div>
			</footer>
		);
	}
}
