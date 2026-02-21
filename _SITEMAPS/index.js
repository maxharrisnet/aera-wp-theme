import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import config from 'utils/config';
import ScrollManagement from 'utils/scroll-management';
import HubspotTracker from 'components/hubspot-tracker';

// Layout
import AppLayout, { Content } from 'components/app-layout';
import Background from 'components/background';
import Header from 'components/header';
import Navigation from 'components/navigation';
import Footer from 'components/footer';
import DevTools from 'components/devtools';

// Routes
import Home from './routes/home';
import Technology from './routes/technology';
// import Skillsv2 from "./routes/skillsv2";
//import Platform from "./routes/technology";
//import Skills from "./routes/skills";
// import Skillsnew from "./routes/skillsnew";
//import Resourcesnew from "./routes/resourcesnew";
import Eventsnew from './routes/eventsnew';
import OnDemand from './routes/on-demand';
import ResourcesNewTiles from './routes/resources-new-tiles';
import Company from './routes/company';
import AeraVision from './routes/aera-vision';
import Careers from './routes/careers';
import FredPage from './routes/fred-page';
import MediaKit from './routes/media-kit';
// import Resources from "./routes/resources";
import Newsupdates from './routes/newsupdates';
// import Aerainaction from "./routes/aerainaction";
import Skilldetails from './routes/skilldetails';
//import Platformnew from "./routes/platformnew";
import Promotions from './routes/promotions';
import Orders from './routes/orders';
import Inventory from './routes/inventory';
import Logistics from './routes/logistics';
import Partners from './routes/partners';
import AeraDecisionCloud from './routes/aera-decision-cloud';
// import AeraDecisionCloudExpand from "./routes/aera-decision-cloud-expand";
import Customers from './routes/customers';
import CustomersNew from './routes/customers-new';
import DecisionIntelligence from './routes/decision-intelligence';
import DecisionIntelligenceFAQ from './routes/decision-intelligence-faq';
import NewSkillset from './routes/new-skillset';

import CoMarketing from './routes/co-marketing';
import Community from './routes/community';
import ProductRelease from './routes/product-release';
import AeraCommunity from './routes/aera-community';

import Procurement from './routes/procurement';
// import Businessplanning from "./routes/businessplanning";
import Controltower from './routes/controltower';

// import EventsWebinar from "./routes/events-webinar";
import Leadership from './routes/leadership';
import Demo from './routes/demo';
import Thankyou from './routes/thankyou';
import Contact from './routes/contact';
// import WeeklyWebcast from "./routes/weeklywebcast";
import { PageOrNotFound } from './routes/not-found';
import { ArticleOrNotFound } from './routes/article-not-found';
import { PerspectiveOrNotFound } from './routes/perspective-not-found';
import { CommunityOrNotFound } from './routes/community-not-found';
import { ModuleOrNotFound } from './routes/module-not-found';
import { CustomerOrNotFound } from './routes/customer-not-found';
// import { SkillsOrNotFound } from "./routes/skills-not-found";
import { NewSkillsOrNotFound } from './routes/newskills-not-found';
// import CognitiveAutomation from "./routes/congnitive-automation-old";
import CognitiveAutomationNew from './routes/congnitive-automation-new';
import FutureOfDecisions from './routes/future-of-decisions';
import FutureOfDecisionsEnquire from './routes/future-of-decisions-enquire';
//import TimelineMilestone from "./routes/timeline-milestone";
// import DecisionCloud from "./routes/decision-cloud";
import AeraDeveloper from './routes/aera-developer';
import DemoForm from './routes/demo-form';
import ContactForm from './routes/contact-form';
import DataDecisionModel from './routes/data-decision-model';
import TestDrive from './routes/test-drive';
import AeraCortex from './routes/aera-cortex';
import DecisionModelingAutomation from './routes/decision-modeling-automation';
import DecisionEngagement from './routes/decision-engagement/DecisionEngagement';
import AeraDeveloperNew from './routes/aera-developer-new';

import AeraHub2024 from './routes/aerahub-2024';
import AeraHub25LondonOnDemand from './routes/aerahub-2025-london-ondemand';

import AeraHub2025 from './routes/aerahub-2025';
import AeraHub25NYandLondon from './routes/aerahub-2025-ny-and-london';

import AeraHub2025London from './routes/aerahub-2025-london';
import AllTerms from './routes/all-terms';
import GartnerMagicQuadrant from './routes/gartner-magic-quadrant-decision-intelligence-leader';
import GartnerCriticalCapabilities from './routes/gartner-critical-capabilities-decision-intelligence';
// import Community from "./routes/community";

class App extends Component {
	static propTypes = {
		location: PropTypes.object,
	};

	componentWillReceiveProps(newProps) {
		if (newProps.location.pathname !== this.props.location.pathname) {
			if (window.twq) window.twq('track', 'PageView');
			if (window.fbq) window.fbq('track', 'PageView');
		}
	}

	render() {
		return (
			<AppLayout>
				<Helmet {...config('helmet')} />

				<Route component={Background} />
				<Route component={ScrollManagement} />
				<Route component={HubspotTracker} />

				<Header>
					<Navigation>
						<NavLink
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Technology'
							to='/technology'
						>
							Technology
						</NavLink>
						<NavLink
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Skills'
							to='/skills'
						>
							Skills
						</NavLink>
						<NavLink
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Company'
							to='/company'
						>
							Company
						</NavLink>
						<NavLink
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Careers'
							to='/careers'
						>
							Careers
						</NavLink>
						<NavLink
							data-event-category='Header'
							data-event-action='Click'
							data-event-name='Resources'
							to='/resources'
						>
							Resources
						</NavLink>
					</Navigation>
				</Header>

				<Route
					render={({ location }) => (
						<Content>
							<Switch
								key={location.key}
								location={location}
							>
								<Route
									exact
									path='/'
									component={Home}
								/>

								{/* React Router redirects: source of truth for importing into WordPress (e.g. .htaccess / Redirection plugin) later */}
								<Redirect
									status={301}
									path='/technology'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/platform'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/cognitive-operating-system'
									to='/aera-decision-cloud'
								/>

								{/* <Redirect status={301} path="/technology" to="/decision-cloud" />
                <Redirect path="/platform" to="/decision-cloud"/>
                <Redirect path="/cognitive-operating-system" to="/decision-cloud"/> */}
								{/* <Route exact path="/cognitive-operating-system" component={Technology} />*/}

								{/* <Redirect path="/skills" to="/cognitive-skills" /> */}
								{/* <Route exact path="/skills" component={Skillsv2} /> */}
								<Route
									exact
									path='/skills'
									component={NewSkillset}
								/>
								{/* <Route exact path="/decision-data-model-new" component={DataDecisionModel} />
                <Route exact path="/aera-cortex-new" component={AeraCortex} />
                <Route exact path="/modeling-new" component={DecisionModelingAutomation} />
                <Route exact path="/decision-engagement-new" component={DecisionEngagement} />
                <Route exact path="/aera-developer-new" component={AeraDeveloperNew} />
                 */}
								{/* <Route exact path="/decision-data-model-new" component={DataDecisionModel} />
                <Route exact path="/decision-cloud-new" component={AeraDecisionCloud} /> */}
								{/* <Route
									exact
									path='/test-drive'
									component={TestDrive}
								/> */}
								{/* <Route exact path="/skills" component={Skills} /> */}
								<Redirect
									path='/company'
									to='/about-us'
								/>
								<Route
									exact
									path='/about-us'
									component={Company}
								/>
								<Route
									path='/careers'
									component={Careers}
								/>
								<Redirect
									path='/newsroom'
									to='/'
								/>
								<Redirect
									path='/weeklywebcast'
									to='/'
								/>
								<Redirect
									path='/news/self-driving-supply-chains-are-within-reach'
									to='/'
								/>
								<Redirect
									path='/news/perfecting-the-balancing-act-of-inventory-management'
									to='/'
								/>
								<Redirect
									path='/news/supply-chain-startup-enabling-the-self-driving-supply-chain'
									to='/'
								/>
								{/* <Redirect path="/news/imagining-the-self-driving-enterprise" to="/" /> */}

								<Redirect
									path='/perspectives/c-suite-strategies-to-build-supply-chain-resilience-in-the-wake-of-covid-19'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/c-suite-strategies-to-build-supply-chain-resilience-in-the-wake-of-covid-19'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/keeping-an-eye-and-ear-on-patients-needs-where-ai-meets-supply-chain'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/can-ai-really-help-the-digital-economy'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/bringing-lean-up-to-speed'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/taming-the-retail-supply-chain-beast'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/the-future-of-planning-from-high-touch-to-touchless'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/15-down-and-dirty-ways-to-get-green-now'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/how-cognitive-tech-can-prevent-a-food-crisis'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/how-cognitive-technologies-can-help-managers-during-the-covid-19-crisis'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/conquering-the-endless-quest-for-supply-chain-visibility'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/covid-19-crisis-shows-supply-chains-need-to-embrace-new-technologies'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/how-cognitive-automation-can-stop-the-insanity-of-unprofitable-trade-promotions'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/connecting-the-dots-with-decision-intelligence'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/aera-uses-decision-intelligence-to-forge-the-future-of-work'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/how-cognitive-technologies-can-help-managers-during-the-covid-19-crisis'
									to='/resources'
								/>
								<Redirect
									path='/perspectives/aera-and-aws-decision-intelligence-drives-supply-chain-decision-agility'
									to='/blogs/aera-and-aws-decision-intelligence-drives-supply-chain-decision-agility'
								/>
								<Redirect
									path='/blogs/blogs/how-ai-is-shaping-the-future-of-work'
									to='/blogs/how-ai-is-shaping-the-future-of-work'
								/>
								<Redirect
									path='/perspectives/the-ey-aera-technology-alliance'
									to='/news/the-ey-aera-technology-alliance'
								/>
								<Redirect
									path='/blogs/aera-and-aws-decision-intelligence-drives-supply-chain-decision-agility'
									to='/resources'
								/>
								<Redirect
									path='/blogs/the-ey-aera-technology-alliance'
									to='/resources'
								/>

								<Redirect
									path='/news/c-suite-strategies-to-build-supply-chain-resilience-in-the-wake-of-covid-19'
									to='/perspectives/c-suite-strategies-to-build-supply-chain-resilience-in-the-wake-of-covid-19'
								/>
								<Redirect
									path='/news/keeping-an-eye-and-ear-on-patients-needs-where-ai-meets-supply-chain'
									to='/perspectives/keeping-an-eye-and-ear-on-patients-needs-where-ai-meets-supply-chain'
								/>
								<Redirect
									path='/news/can-ai-really-help-the-digital-economy'
									to='/perspectives/can-ai-really-help-the-digital-economy'
								/>
								<Redirect
									path='/news/bringing-lean-up-to-speed'
									to='/perspectives/bringing-lean-up-to-speed'
								/>
								<Redirect
									path='/news/taming-the-retail-supply-chain-beast'
									to='/perspectives/taming-the-retail-supply-chain-beast'
								/>
								<Redirect
									path='/news/the-future-of-planning-from-high-touch-to-touchless'
									to='/perspectives/the-future-of-planning-from-high-touch-to-touchless'
								/>
								<Redirect
									path='/news/15-down-and-dirty-ways-to-get-green-now'
									to='/perspectives/15-down-and-dirty-ways-to-get-green-now'
								/>
								<Redirect
									path='/news/how-cognitive-tech-can-prevent-a-food-crisis'
									to='/perspectives/how-cognitive-tech-can-prevent-a-food-crisis'
								/>
								<Redirect
									path='/news/how-cognitive-technologies-can-help-managers-during-the-covid-19-crisis'
									to='/perspectives/how-cognitive-technologies-can-help-managers-during-the-covid-19-crisis'
								/>
								<Redirect
									path='/news/conquering-the-endless-quest-for-supply-chain-visibility'
									to='/perspectives/conquering-the-endless-quest-for-supply-chain-visibility'
								/>
								<Redirect
									path='/news/covid-19-crisis-shows-supply-chains-need-to-embrace-new-technologies'
									to='/perspectives/covid-19-crisis-shows-supply-chains-need-to-embrace-new-technologies'
								/>

								<Redirect
									path='news/whats-next-after-digitization'
									to='/'
								/>
								<Redirect
									path='news/aera-unveils-cognitive-operating-system-worlds-first-cloud-platform-for-cognitive-automation'
									to='/'
								/>
								<Redirect
									path='news/supply-chain-startup-enabling-the-self-driving-supply-chain'
									to='/'
								/>
								<Redirect
									path='news/plan-adapt-survive-the-case-for-cognitive-automation-in-a-time-of-crisis'
									to='/'
								/>
								<Redirect
									path='news/cognitive-automation-helps-processes-run-on-their-own'
									to='/'
								/>
								<Redirect
									path='news/aera-launches-cognitive-business-brain-operating-system'
									to='/'
								/>
								<Redirect
									path='news/automation-as-self-driving-glass-box'
									to='/'
								/>
								<Redirect
									path='news/this-will-impact-the-way-work-is-being-done'
									to='/'
								/>
								<Redirect
									path='news/aera-unveils-cognitive-operating-system-worlds-first-cloud-platform-for-cognitive-automation'
									to='/'
								/>
								<Redirect
									path='news/rise-of-the-cognitive-enterprise-in-a-post-digital-transformation-world'
									to='/'
								/>
								<Redirect
									path='news/push-is-on-for-more-artificial-intelligence-in-supply-chains'
									to='/'
								/>

								<Redirect
									path='/announcements/transform-fest-2022-the-global-supply-chain-transformation-event'
									to='/news/transform-fest-2022-the-global-supply-chain-transformation-event'
								/>
								<Redirect
									path='/announcements/aera-technology-named-a-procuretech100-company'
									to='/news/aera-technology-named-a-procuretech100-company'
								/>
								<Redirect
									path='/announcements/aera-technology-debuts-aera-decision-cloud'
									to='/news/aera-technology-debuts-aera-decision-cloud'
								/>
								<Redirect
									path='/announcements/aera-technology-debuts-webinar-series-on-decision-intelligence'
									to='/news/aera-technology-debuts-webinar-series-on-decision-intelligence'
								/>
								<Redirect
									path='/announcements/aera-technology-showcases-cognitive-automation-in-action'
									to='/news/aera-technology-showcases-cognitive-automation-in-action'
								/>
								<Redirect
									path='/announcements/aera-technology-selected-by-world-economic-forum-as-a-global-innovator'
									to='/news/aera-technology-selected-by-world-economic-forum-as-a-global-innovator'
								/>
								<Redirect
									path='/announcements/aera-technology-named-to-constellation-shortlist-for-ai-driven-cognitive-applications'
									to='/news/aera-technology-named-to-constellation-shortlist-for-ai-driven-cognitive-applications'
								/>
								<Redirect
									path='/announcements/aera-technology-appoints-pascal-bornet-as-chief-data-officer'
									to='/news/aera-technology-appoints-pascal-bornet-as-chief-data-officer'
								/>
								<Redirect
									path='/announcements/aera-technology-to-integrate-microsoft-azure-digital-twins-with-aera-cognitive-operating-system'
									to='/news/aera-technology-to-integrate-microsoft-azure-digital-twins-with-aera-cognitive-operating-system'
								/>
								<Redirect
									path='/announcements/bristlecone-and-aera-partnership-accelerates-the-journey-to-the-cognitive-supply-chain'
									to='/news/bristlecone-and-aera-partnership-accelerates-the-journey-to-the-cognitive-supply-chain'
								/>
								<Redirect
									path='/announcements/kearney-partners-with-aera-technology-to-drive-agility-and-resilience-in-supply-chains'
									to='/news/kearney-partners-with-aera-technology-to-drive-agility-and-resilience-in-supply-chains'
								/>
								<Redirect
									path='/announcements/aera-technology-announces-the-general-release-of-its-cognitive-operating-system-at-global-customer-summit'
									to='/news/aera-technology-announces-the-general-release-of-its-cognitive-operating-system-at-global-customer-summit'
								/>

								<Redirect
									path='/announcements/aera-technology-named-a-representative-vendor-in-the-gartner-market-guide-for-analytics-and-decision-intelligence-platforms-in-supply-chain'
									to='/news/aera-technology-named-a-representative-vendor-in-the-gartner-market-guide-for-analytics-and-decision-intelligence-platforms-in-supply-chain'
								/>

								<Redirect
									path='/announcements/aera-technology-recognized-as-a-2023-green-technology-partner-for-supply-chains'
									to='/news/aera-technology-recognized-as-a-2023-green-technology-partner-for-supply-chains'
								/>

								<Redirect
									path='/announcements/aera-technology-to-deploy-decision-intelligence-at-colgate-palmolive'
									to='/news/aera-technology-to-deploy-decision-intelligence-at-colgate-palmolive'
								/>
								<Redirect
									path='/announcements/worlds-largest-tequila-producer-partners-with-aera-technology-to-deploy-decision-intelligence'
									to='/news/worlds-largest-tequila-producer-partners-with-aera-technology-to-deploy-decision-intelligence'
								/>
								<Redirect
									path='/announcements/worlds-leading-tofu-producer-partners-with-aera-technology-to-deploy-decision-intelligence'
									to='/news/worlds-leading-tofu-producer-partners-with-aera-technology-to-deploy-decision-intelligence'
								/>
								<Redirect
									path='/announcements/aera-technology-named-a-2022-cnbc-top-startup-for-the-enterprise'
									to='/news/aera-technology-named-a-2022-cnbc-top-startup-for-the-enterprise'
								/>
								<Redirect
									path='/announcements/aera-technology-recognized-as-one-of-50-providers-to-watch-by-spend-matters'
									to='/news/aera-technology-recognized-as-one-of-50-providers-to-watch-by-spend-matters'
								/>
								<Redirect
									path='/announcements/sustainable-steel-producer-deacero-chooses-aera-decision-cloud-to-automate-decision-making-and-create-customer-centric-business'
									to='/news/sustainable-steel-producer-deacero-chooses-aera-decision-cloud-to-automate-decision-making-and-create-customer-centric-business'
								/>
								<Redirect
									path='/announcements/aera-technology-named-to-constellation-shortlist-for-ai-driven-cognitive-applications'
									to='/news/aera-technology-named-to-constellation-shortlist-for-ai-driven-cognitive-applications'
								/>
								<Redirect
									path='/announcements/aera-technology-named-a-100-great-supply-chain-partner'
									to='/news/aera-technology-named-a-100-great-supply-chain-partner'
								/>
								<Redirect
									path='/announcements/aera-technology-wins-ai-breakthrough-award-for-decision-intelligence-innovation'
									to='/news/aera-technology-wins-ai-breakthrough-award-for-decision-intelligence-innovation'
								/>
								<Redirect
									path='/announcements/aera-technology-releases-new-capabilities-to-accelerate-decision-intelligence-adoption'
									to='/news/aera-technology-releases-new-capabilities-to-accelerate-decision-intelligence-adoption'
								/>
								<Redirect
									path='/announcements/aera-technology-to-present-at-gartner-supply-chain-symposium-xpo-2022'
									to='/news/aera-technology-to-present-at-gartner-supply-chain-symposium-xpo-2022'
								/>
								<Redirect
									path='/announcements/ey-announces-alliance-with-aera-technology-to-unlock-the-power-of-decision-intelligence-in-supply-chain-transformation'
									to='/news/ey-announces-alliance-with-aera-technology-to-unlock-the-power-of-decision-intelligence-in-supply-chain-transformation'
								/>
								<Redirect
									path='/announcements/aera-technology-named-winner-in-2022-artificial-intelligence-excellence-awards'
									to='/news/aera-technology-named-winner-in-2022-artificial-intelligence-excellence-awards'
								/>
								<Redirect
									path='/announcements/aera-technology-to-present-at-gartner-supply-chain-symposium-xpo-2022-in-london'
									to='/resources'
								/>
								<Redirect
									path='/announcements/transform-fest-2022-the-global-supply-chain-transformation-event'
									to='/news/transform-fest-2022-the-global-supply-chain-transformation-event'
								/>
								<Redirect
									path='/announcements/aera-technology-debuts-aera-decision-cloud'
									to='/news/aera-technology-debuts-aera-decision-cloud'
								/>
								<Redirect
									path='/announcements/aera-technology-named-a-procuretech100-company'
									to='/news/aera-technology-named-a-procuretech100-company'
								/>
								<Redirect
									path='/announcements/aera-technology-debuts-webinar-series-on-decision-intelligence'
									to='/news/aera-technology-debuts-webinar-series-on-decision-intelligence'
								/>
								<Redirect
									path='/announcements/aera-technology-selected-by-world-economic-forum-as-a-global-innovator'
									to='/news/aera-technology-selected-by-world-economic-forum-as-a-global-innovator'
								/>
								<Redirect
									path='/announcements/aera-technology-showcases-cognitive-automation-in-action'
									to='/news/aera-technology-showcases-cognitive-automation-in-action'
								/>
								<Redirect
									path='/announcements/aera-technology-named-to-constellation-shortlist-for-ai-driven-cognitive-applications'
									to='/news/aera-technology-named-to-constellation-shortlist-for-ai-driven-cognitive-applications'
								/>
								<Redirect
									path='/announcements/bristlecone-and-aera-partnership-accelerates-the-journey-to-the-cognitive-supply-chain'
									to='/news/bristlecone-and-aera-partnership-accelerates-the-journey-to-the-cognitive-supply-chain'
								/>
								<Redirect
									path='/announcements/aera-technology-to-integrate-microsoft-azure-digital-twins-with-aera-cognitive-operating-system'
									to='/news/aera-technology-to-integrate-microsoft-azure-digital-twins-with-aera-cognitive-operating-system'
								/>

								<Redirect
									path='/announcements/aera-technology-appoints-pascal-bornet-as-chief-data-officer'
									to='/news/aera-technology-appoints-pascal-bornet-as-chief-data-officer'
								/>

								<Redirect
									path='/announcements/kearney-partners-with-aera-technology-to-drive-agility-and-resilience-in-supply-chains'
									to='/news/kearney-partners-with-aera-technology-to-drive-agility-and-resilience-in-supply-chains'
								/>

								<Redirect
									path='/announcements/aera-technology-announces-the-general-release-of-its-cognitive-operating-system-at-global-customer-summit'
									to='/news/aera-technology-announces-the-general-release-of-its-cognitive-operating-system-at-global-customer-summit'
								/>

								<Redirect
									path='/announcements/leading-market-research-firm-finds-75percent-of-enterprises-expect-to-gain-significant-benefits-from-ai-enabled-decision-intelligence'
									to='/news/leading-market-research-firm-finds-75percent-of-enterprises-expect-to-gain-significant-benefits-from-ai-enabled-decision-intelligence'
								/>

								<Redirect
									path='/announcements/aera-technology-recognized-once-again-as-one-of-50-providers-to-watch-by-spend-matters-adds-to-aera-procurement-skills'
									to='/news/aera-technology-recognized-once-again-as-one-of-50-providers-to-watch-by-spend-matters-adds-to-aera-procurement-skills'
								/>

								<Route
									exact
									path='/news/:articleOrNotFound/'
									component={ArticleOrNotFound}
								/>

								<Route
									exact
									path='/perspectives/:perspectiveOrNotFound/'
									component={PerspectiveOrNotFound}
								/>

								<Route
									exact
									path='/blogs/:communityOrNotFound/'
									component={CommunityOrNotFound}
								/>

								<Redirect
									path='/news'
									to='/resources'
								/>

								{/* <Route exact path="/news" component={Newsupdates} /> */}

								{/* <Redirect path="/events" to="/resources" /> */}
								<Redirect
									path='/events-webinars'
									to='/resources'
								/>
								<Redirect
									path='/webinar'
									to='/webinars'
								/>

								<Route
									path='/events'
									component={Eventsnew}
								/>
								<Route
									path='/webinars'
									component={OnDemand}
								/>
								{/* <Route path="/events" component={Events} /> */}
								{/* <Route path="/events-webinars" component={EventsWebinar} />  */}

								<Redirect
									path='/aera-in-action'
									to='/resources'
								/>
								{/* <Route path="/aera-in-action" component={Aerainaction} /> */}
								{/* <Route path="/team" component={Leadership} /> */}
								{/* <Route path="/platformnew" component={Platformnew} /> */}

								<Route
									path='/thankyou'
									component={Thankyou}
								/>
								<Redirect
									path='/aera-forecast'
									to='/skills'
								/>
								<Redirect
									path='/aera-promotions'
									to='/skills'
								/>
								<Redirect
									path='/aera-order'
									to='/skills/order'
								/>
								<Redirect
									path='/aera-inventory'
									to='/skills/inventory'
								/>
								<Redirect
									path='/aera-logistics'
									to='/skills/logistics'
								/>
								<Redirect
									path='/aera-procurement'
									to='/skills/procurement'
								/>
								<Redirect
									path='/aera-digital-control-tower'
									to='/skills/controltower'
								/>

								{/* <Route path="/aera-forecast" component={Skilldetails} /> */}
								<Route
									path='/partners'
									component={Partners}
								/>
								<Route
									path='/aera-decision-cloud'
									component={AeraDecisionCloud}
								/>
								{/* <Route path="/aera-decision-cloud-expand" component={AeraDecisionCloudExpand} /> */}
								{/* <Route path="/customers-old" component={Customers} /> */}
								<Route
									path='/customers'
									component={CustomersNew}
								/>
								<Route
									path='/what-is-decision-intelligence'
									component={DecisionIntelligence}
								/>
								<Route
									path='/decision-intelligence-faq'
									component={DecisionIntelligenceFAQ}
								/>

								<Route
									path='/AI-for-decision-automation'
									component={CoMarketing}
								/>
								<Route
									path='/community'
									component={Community}
								/>
								<Redirect
									path='/product-release'
									to='/'
								/>
								{/* <Redirect path="/aerahub-2024" to="https://events.zoom.us/ev/AmG3EvdRVeDSVnhXJs8q4a4S7WM67oKSsCq_w0E4SBKI4E7f3a6z~Amxs2MOpLnvKIh255hmU4LIu85EN7IyZFEWVPAG2od9ji7HAB0SfAXC67Q" /> */}

								<Redirect
									path='/aerahub'
									to='/aerahub-2025'
								/>
								<Route
									path='/aerahub-2024'
									component={AeraHub2024}
								/>
								<Route
									path='/aerahub-2025'
									component={AeraHub2025}
								/>
								<Route
									path='/aerahub-2025-london-old'
									component={AeraHub2025London}
								/>
								<Route
									path='/aerahub-2025-london'
									component={AeraHub25LondonOnDemand}
								/>

								<Route
									path='/aerahub'
									component={AeraHub25NYandLondon}
								/>
								<Route
									path='/gartner-magic-quadrant-decision-intelligence-leader'
									component={GartnerMagicQuadrant}
								/>
								<Redirect
									status={301}
									path='/gartner-magic-quadrant'
									to='/gartner-magic-quadrant-decision-intelligence-leader'
								/>
								<Route
									path='/gartner-critical-capabilities-decision-intelligence'
									component={GartnerCriticalCapabilities}
								/>
								{/* <Route path="/community" component={Community} /> */}

								{/* <Route path="/product-release" component={ProductRelease} /> */}
								{/* <Route path="/aera-promotions" component={Promotions} />
                <Route path="/aera-order" component={Orders} />
                <Route path="/aera-inventory" component={Inventory} />
                <Route path="/aera-logistics" component={Logistics} /> */}
								{/* <Route path="/aera-production" component={Production} /> */}
								{/* <Route path="/aera-procurement" component={Procurement} /> */}
								{/* <Route
                  path="/aera-integrated-business-planning"
                  component={Businessplanning}
                /> */}
								{/* <Route
                  path="/aera-digital-control-tower"
                  component={Controltower}
                /> */}

								{/* <Route exact path="/resources" component={Resources} /> */}
								{/* <Route exact path="/resources" component={Resourcesnew} /> */}
								{/* <Redirect path="/resources?category=aerahub" to="/resources" /> */}
								<Route
									exact
									path='/resources'
									component={ResourcesNewTiles}
								/>

								{/* <Route exact path="/platform" component={Platform} /> */}
								{/* <Route exact path="/skills" component={Skillsnew} /> */}

								<Route
									exact
									path='/demo'
									component={DemoForm}
								/>
								<Route
									exact
									path='/contact'
									component={ContactForm}
								/>
								<Route
									exact
									path='/terms'
									component={AllTerms}
								/>
								<Redirect
									path='/aera-community'
									to='/'
								/>

								{/* <Route exact path="/aera-community" component={AeraCommunity} /> */}
								{/* <Route exact path="/demo" component={Demo} /> */}
								{/* <Redirect status={301} path="/contact" to="/demo" /> */}
								{/* <Route exact path="/contact" component={Contact} /> */}
								{/* <Route exact path="/weeklywebcast" component={WeeklyWebcast} /> */}
								{/* <Route
                  exact
                  path="/cognitive-automation-old"
                  component={CognitiveAutomation}
                /> */}

								{/* <Route
                  exact
                  path="/cognitive-automation"
                  component={CognitiveAutomationNew}
                /> */}
								<Redirect
									path='/cognitive-automation'
									to='/'
								/>
								<Redirect
									path='/fred-laluyaux'
									to='/'
								/>

								{/* <Route
                  exact
                  path="/fred-laluyaux"
                  component={FredPage}
                /> */}
								<Route
									exact
									path='/media-kit'
									component={MediaKit}
								/>
								{/* <Route
                  exact
                  path="/timeline-milestone"
                  component={TimelineMilestone}
                /> */}

								<Route
									exact
									path='/futureofdecisions'
									component={FutureOfDecisions}
								/>

								<Route
									exact
									path='/futureofdecisions-learn'
									component={FutureOfDecisionsEnquire}
								/>

								<Route
									exact
									path='/videos/aera-vision'
									component={AeraVision}
								/>

								{/* <Route
                  exact
                  path="/decision-cloud"
                  component={DecisionCloud}
                /> */}

								<Route
									exact
									path='/aera-developer'
									component={AeraDeveloper}
								/>

								<Redirect
									path='/add-aera-technologys-cognitive-decision-board-to-your-team'
									to='/page/add-aera-technologys-cognitive-decision-board-to-your-team'
								/>
								<Redirect
									path='/ccpa-candidate-privacy-notice'
									to='/page/ccpa-candidate-privacy-notice'
								/>
								<Redirect
									path='/gdpr-european-candidates'
									to='/page/gdpr-european-candidates'
								/>
								<Redirect
									path='/spotlight-report-striving-toward-self-driving-supply-chains'
									to='/page/spotlight-report-striving-toward-self-driving-supply-chains'
								/>
								<Redirect
									path='/page/spotlight-report-striving-toward-self-driving-supply-chains'
									to='/'
								/>
								<Redirect
									path='/introducing-aeras-cognitive-technology-enabling-the-self-driving-enterprise'
									to='/page/introducing-aeras-cognitive-technology-enabling-the-self-driving-enterprise'
								/>
								<Redirect
									path='/ai-in-supply-chain-separating-hype-from-reality'
									to='/page/ai-in-supply-chain-separating-hype-from-reality'
								/>
								<Redirect
									path='/cognitive_automation'
									to='/page/cognitive_automation'
								/>
								<Redirect
									path='/selfdrivingsupplychain_webcast_offer'
									to='/page/selfdrivingsupplychain_webcast_offer'
								/>
								<Redirect
									path='/weeklywebcast'
									to='/page/weeklywebcast'
								/>
								<Redirect
									path='/terms-and-conditions'
									to='/page/terms-and-conditions'
								/>
								<Redirect
									path='/artificial_intelligence_tech'
									to='/page/artificial_intelligence_tech'
								/>
								<Redirect
									path='/AI-and-the-future-of-decisions'
									to='/page/AI-and-the-future-of-decisions'
								/>
								<Redirect
									path='/practical-steps-to-getting-started-with-supply-chain-ai'
									to='/page/practical-steps-to-getting-started-with-supply-chain-ai'
								/>
								<Redirect
									path='/striving-towards-self-driving-supply-chains'
									to='/page/striving-towards-self-driving-supply-chains'
								/>
								<Redirect
									path='/aera-technology-turns-data-into-decisions-and-actions'
									to='/page/aera-technology-turns-data-into-decisions-and-actions'
								/>
								<Redirect
									path='/privacy-shield-policy'
									to='/page/privacy-shield-policy'
								/>
								<Redirect
									path='/aera-security-and-privacy-documentation'
									to='/page/aera-security-and-privacy-documentation'
								/>
								<Redirect
									path='/pflichtangaben-mandatory-disclosure-statements'
									to='/page/pflichtangaben-mandatory-disclosure-statements'
								/>
								<Redirect
									path='/imagining-the-self-driving-enterprise'
									to='/page/imagining-the-self-driving-enterprise'
								/>
								<Redirect
									path='/page/msa/v2021.1'
									to='/page/msa-v2021.1'
								/>

								<Redirect
									path='/search-voice-mobile'
									to='/decision-engagement'
								/>
								<Redirect
									path='/cognitive-data-layer'
									to='/decision-data-model'
								/>
								<Redirect
									path='/analytics'
									to='/aera-discovery'
								/>
								<Redirect
									path='/modeling'
									to='/simulation-and-planning'
								/>
								<Redirect
									path='/automation-rules'
									to='/business-rules'
								/>
								<Redirect
									path='/write-backs'
									to='/'
								/>
								<Redirect
									path='/actions'
									to='/'
								/>
								<Redirect
									path='/cognitive-decision-board'
									to='/decision-board'
								/>
								<Redirect
									path='/cognitive-workbench'
									to='/decision-workbench'
								/>
								<Redirect
									path='/ui-voice-builder'
									to='/'
								/>
								<Redirect
									path='/data-science'
									to='/'
								/>
								<Redirect
									path='/data-streams'
									to='/'
								/>
								<Redirect
									path='/customer/deacero'
									to='/case-study/deacero'
								/>
								<Redirect
									path='/customer/fmcg1'
									to='/case-study/fmcg1'
								/>
								<Redirect
									path='/customer/gstco'
									to='/case-study/gstco'
								/>
								<Redirect
									path='/customer/petrochemical'
									to='/case-study/petrochemical'
								/>
								<Redirect
									path='/customer/ahp1'
									to='/case-study/ahp1'
								/>
								<Redirect
									path='/customer/fmcg2'
									to='/case-study/fmcg2'
								/>
								<Redirect
									path='/customer/pharmaceutical'
									to='/case-study/pharmaceutical'
								/>
								<Redirect
									path='/customer/fmcg3'
									to='/case-study/fmcg3'
								/>
								<Redirect
									path='/customer/ahp2'
									to='/case-study/ahp2'
								/>
								<Redirect
									path='/agentic-AI'
									to='/agentic-ambient-orchestration'
								/>
								<Redirect
									path='/business-rules'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/simulation-and-planning'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/data-crawlers'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/decision-cloud'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/aera-developer'
									to='/aera-decision-cloud'
								/>
								<Redirect
									path='/test-drive'
									to='/demo'
								/>

								<Route
									exact
									path='/skills/:newskillsOrNotFound'
									component={NewSkillsOrNotFound}
								/>
								<Route
									exact
									path='/:moduleOrNotFound'
									component={ModuleOrNotFound}
								/>

								<Route
									exact
									path='/case-study/:customerOrNotFound'
									component={CustomerOrNotFound}
								/>

								{/* <Route
                  exact
                  path="/skills/:skillsOrNotFound"
                  component={SkillsOrNotFound}
                /> */}

								<Route
									exact
									path='/page/:pageOrNotFound'
									component={PageOrNotFound}
								/>

								{/* <Route exact path="*" component={PageOrNotFound} /> */}
							</Switch>
						</Content>
					)}
				/>
				<Footer />
				<DevTools />
			</AppLayout>
		);
	}
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
