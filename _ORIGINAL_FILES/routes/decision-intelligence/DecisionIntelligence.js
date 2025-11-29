import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Page from 'components/page';

// import { TimelineLite } from "gsap";
// import { fadeSlideIn } from "utils/timelineAnimations";
//import WaypointEnter from "components/waypoint-enter";
import Intro, { Loading } from 'components/intro-pr';
import s from './DecisionIntelligence.scss';
import WDI from 'assets/images/decisionintelligence/Whatisdecisionintelligence.jpg';
import VennDiagram from 'assets/images/decisionintelligence/VennDiagramofDecisionIntelligence.png';
import VennDiagramMobile from 'assets/images/decisionintelligence/VennDiagramofDecisionIntelligenceMobile.jpg';
import AIColab from 'assets/images/decisionintelligence/TheSpectrumofAICollaborationinDigitizedDecisionMaking.jpg';
import AIColabMobile from 'assets/images/decisionintelligence/TheSpectrumofAICollaborationinDigitizedDecisionMakingMobile.jpg';
import useCases from 'assets/images/decisionintelligence/BenefitsCapabilitiesUseCases.png';
import useCasesMobile from 'assets/images/decisionintelligence/BenefitsCapabilitiesUseCasesMobile.jpg';
import softwareStocks from 'assets/images/decisionintelligence/softwarestocks.png';
import softwareStocksMobile from 'assets/images/decisionintelligence/softwarestocksMobile.jpg';

export default class DecisionIntelligence extends Component {
	// t = new TimelineLite();

	componentDidMount() {
		const sections = document.querySelectorAll('section');

		const navLinks = document.querySelectorAll('.nav a');
		const mainLinks = document.querySelectorAll('.nav li.main > a');
		const toggles = document.querySelectorAll('.toggle-btn');
		const toggleIcon = document.getElementById('toggleIcon');
		const hamburgerToggle = document.getElementById('hamburgerToggle');
		const accordionMenu = document.querySelector('.accordion');
		const menuList = document.getElementById('menu');
		const progressBar = document.getElementById('progressBar');
		const navHeight = document.getElementById('menu').scrollHeight;
		const targetDiv = document.getElementById('sectionWrapper');
		const outerSection = document.getElementById('outerSection');
		const navMobile = document.getElementById('navMobile');
		const leftWrapper = document.getElementById('leftWrapper');

		function updateProgressLine() {
			const scrollPosition = leftWrapper.scrollTop;

			// console.log('scrollPos '+scrollPosition)
			const totalHeight = leftWrapper.scrollHeight - window.innerHeight;
			// console.log('tH '+totalHeight);
			// const rect = leftWrapper.getBoundingClientRect();
			// console.log("top "+rect.top);

			const scrollPercent = scrollPosition / totalHeight;
			// console.log("scrollPercent "+scrollPercent);
			const menu = document.getElementById('menu');
			const barHeight = scrollPercent * menu.clientHeight;
			// console.log("barHeight "+barHeight);
			const styleEl = document.getElementById('dynamic-bar-style') || document.createElement('style');
			styleEl.id = 'dynamic-bar-style';
			styleEl.innerHTML = `
            .nav ul#menu::after {
            height: ${barHeight}px !important;
            }
        `;
			document.head.appendChild(styleEl);
			if (window.innerWidth > 780) {
				if (barHeight == 0) {
					$('.nav a[href="#section1"]').removeClass('active');
					$('.nav a[href="#section1"]').removeClass('filled');
				}
			}
		}

		toggles.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const parent = btn.parentElement;
				parent.classList.toggle('open');
				btn.textContent = parent.classList.contains('open') ? '▲' : '▼';
			});
		});

		hamburgerToggle.addEventListener('click', () => {
			accordionMenu.classList.toggle('show');
			toggleIcon.textContent = accordionMenu.classList.contains('show') ? '▲' : '▼';
		});

		navLinks.forEach((link) => {
			link.addEventListener('click', () => {
				if (window.innerWidth < 768) {
					accordionMenu.classList.remove('show');
					toggleIcon.textContent = accordionMenu.classList.contains('show') ? '▲' : '▼';
				}
			});
		});

		window.addEventListener('scroll', () => {
			// const section6 = document.getElementById('section6');
			// const scrollPositionWindow = window.screenY;
			// if(window.innerWidth < 780){
			//     console.log(section6.scrollTop);
			//     if (scrollPositionWindow >= section6.scrollTop) {
			//         navLinks.forEach((link) => {
			//             link.classList.remove("active");
			//             if (link.getAttribute("href") === `#section6`) {
			//                 link.classList.add("active");
			//             }
			//         })
			//         //console.log('Top of the window has reached the div top!');
			//     }
			// }
		});

		leftWrapper.addEventListener('scroll', () => {
			// const leftWrapper1 = leftWrapper.scrollTop;
			// console.log('scrollPos '+leftWrapper1);
			// const totalHeight1 = leftWrapper.scrollHeight - window.innerHeight;
			// console.log('left-totalHeight '+totalHeight1);
			const section6 = document.getElementById('section6');
			const divTop = section6.getBoundingClientRect().top;
			const scrollPosition = document.getElementById('leftWrapper').scrollTop;

			let current = '';
			sections.forEach((section) => {
				const sectionTop = section.offsetTop - 150;

				if (leftWrapper.scrollTop >= sectionTop) {
					current = section.getAttribute('id');
				}
			});
			navLinks.forEach((link) => {
				link.classList.remove('active');
				if (link.getAttribute('href') === `#${current}`) {
					link.classList.add('active');
				}
				if (window.innerWidth > 780) {
					if (scrollPosition >= 13500) {
						link.classList.remove('active');
						if (link.getAttribute('href') === `#section6`) {
							link.classList.add('active');
						}
						//console.log('Top of the window has reached the div top!');
					}
				} else if (window.innerWidth < 780) {
					// console.log(section6.scrollTop);
					if (scrollPosition >= 18800) {
						link.classList.remove('active');
						if (link.getAttribute('href') === `#section6`) {
							link.classList.add('active');
						}
						//console.log('Top of the window has reached the div top!');
					}
				}
			});
			let anyFilled = false;
			mainLinks.forEach((mainLink) => {
				const sectionId = mainLink.getAttribute('href').substring(1);
				const section = document.getElementById(sectionId);
				if (section && leftWrapper.scrollTop >= section.offsetTop - 150) {
					mainLink.classList.add('filled');
					anyFilled = true;
				} else {
					mainLink.classList.remove('filled');
				}

				if (window.innerWidth > 780) {
					if ($('.nav li.main > a[href="#section6"]').hasClass('active')) {
						$('.nav li.main > a[href="#section6"]').addClass('filled');
						//console.log('hit2')
					} else {
						$('.nav li.main > a[href="#section6"]').removeClass('filled');
					}
				}
			});

			if (window.innerWidth >= 768) {
				if (anyFilled) {
					menuList.classList.add('filled');
				} else {
					menuList.classList.remove('filled');
				}
			} else {
				menuList.classList.remove('filled');
			}
			updateProgressLine();
		});

		window.addEventListener('scroll', () => {
			if (window.innerWidth <= 720) {
				const offsetTop = outerSection.offsetTop;

				if (window.scrollY >= offsetTop) {
					navMobile.classList.add('navfixed');
				} else {
					navMobile.classList.remove('navfixed');
				}
			}
		});
		window.addEventListener('load', updateProgressLine);
		window.addEventListener('resize', updateProgressLine);
	}

	// animate = () => {
	//     fadeSlideIn(this.t, this.el);
	// };

	render() {
		return (
			<Page>
				<Helmet
					title='Aera Decision Intelligence - What is Decision Intelligence????'
					meta={[
						{
							name: 'description',
							content: 'Learn how decision intelligence integrates AI, automation, and analytics to enhance business decisions with agentic AI, predictive insights, and enterprise strategy.',
						},
						{
							property: 'og:description',
							content: 'Learn how decision intelligence integrates AI, automation, and analytics to enhance business decisions with agentic AI, predictive insights, and enterprise strategy.',
						},
						{
							name: 'twitter:description',
							content: 'Learn how decision intelligence integrates AI, automation, and analytics to enhance business decisions with agentic AI, predictive insights, and enterprise strategy.',
						},
						{
							property: 'twitter:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/6WGDKKAWfZudYDeXuEd120/e4ae2d6ac1abf0fb119ad7310f7a3000/What_is_DI_-_thumbnail.jpg',
						},
						{
							property: 'og:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/6WGDKKAWfZudYDeXuEd120/e4ae2d6ac1abf0fb119ad7310f7a3000/What_is_DI_-_thumbnail.jpg',
						},
						{
							property: 'og:url',
							content: 'https://www.aeratechnology.com/what-is-decision-intelligence',
						},
					]}
				/>
				<Intro
					title='What is Decision Intelligence?'
					text='This guide introduces decision intelligence — what it does, why it’s different, and where it delivers value across the enterprise.'
					fullheight
				/>
				<div
					className={s.di}
					id='outerSection'
				>
					<style>
						{`

                        body, html{
                            scroll-behavior: smooth;
                        }
                        .borderBottom{
                            border-bottom: 1px solid #eee
                        }
                        //.subSectionPadding{padding:10px 0}
                        .nav {
                            background-color: #fff;
                            z-index: 999;
                            font-family: Gilroy, sans-serif;
                            font-size: 16px;
                        }

                        #hamburgerToggle {
                            display: flex;
                            color: #000;
                            justify-content: space-between;
                            align-items: center;
                            padding: 10px 20px;
                            background-color: #fff;
                            border-top: 1px solid #ddd;
                            cursor: pointer;
                            font-size: 16px;
                            display: none;
                        }

                        .accordion {
                            max-height: 100%;
                            // overflow-y: auto;
                            padding-left: 20px;
                            position: relative;
                        }

                        .nav ul {
                            list-style: none;
                            margin: 0;
                            padding: 0;
                            padding-right: 15px;
                        }

                        .nav ul#menu::before {
                            content: "";
                            position: absolute;
                            top: 0;
                            left: 13px;
                            width: 2px;
                            height: 100%;
                            background: repeating-linear-gradient(to bottom, #ccc, #ccc 4px, transparent 4px, transparent 8px);
                            z-index: 0;
                        }

                        .nav ul#menu::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 13px;
                        width: 2px;
                        background: #00619E;
                        z-index: 1;
                        transition: height 0.3s ease;
                        height: 0;
                    }
                    .listTitle{
                        font-family: Gilroy, sans-serif;
                        font-weight: 700;
                        font-size: 16px;
                        margin-bottom: 15px;
                        margin-top: 15px;
                        color: #000;
                    }
                    .contentLink{
                        font-family: "FreightSans Pro", sans-serif;
                        font-weight: 700;
                        font-size: 18px;
                    }
                    .sectionTitle{
                        font-family: Gilroy, sans-serif;
                        font-weight: 700;
                        font-size: 32px;
                        //margin-top: 10px;
                    }
                    .sectionImg{
                        width: 100%;
                    }
                    .sectionSubTitle{
                        font-family: Gilroy, sans-serif;
                        font-weight: 700;
                        font-size: 24px;
                    }
                    .tableWrapper{
                        width: 100%;
                        background-color: #F5F7FA;
                        border-collapse: collapse;
                        overflow-x: auto;
                    }
                    .tableWrapper th{
                        color: #000;
                        padding: 25px;
                    }
                    .tableWrapper td{
                        text-align: center;
                        padding: 25px;
                        position: relative;
                    }
                    .tableWrapper td:after{
                        content:'';
                        width: 100%;
                        height: 1px;
                        background-color:#B2BCCC;
                        position: absolute;
                        left:0;
                        top:0;
                    }
                    .colorBlack{
                        color:#000
                    }
                    .fontFreight{
                        font-family: "FreightSans Pro", sans-serif;
                        font-weight:200;
                    }
                    // #outerSection{
                    //     padding: 100px 0;
                    // }
                    .contentRow{
                        width: 100%;
                        display: flex;
                        margin: 0 auto;
                        justify-content: space-around;
                        align-items: flex-start;
                    }


                        @media screen and (min-width: 768px) {
                            /* nav ul.filled::before {
                            border-left: 2px solid #9AE6B4;
                            } */
                        }

                        .contentRow{

                        }

                        .nav li {
                            padding-bottom: 10px;
                            position: relative;
                        }

                        .nav li a {
                            text-decoration: none;
                            color: #000;
                            margin-left: 30px;
                            position: relative;
                            z-index: 2;
                            display: block;
                            font-weight: bold;
                        }

                        .nav li.main > a::before {
                            content: "";
                            position: absolute;
                            left: -21px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            border: 2px solid #5C6475;
                            background-color: #5C6475;
                            z-index: 3;
                            transition: background-color 0.3s, border-color 0.3s;
                        }

                        .nav li.main > a.filled::before {
                            background-color: #00619E;
                            border-color: #00619E;
                        }

                        .nav a.active {
                            font-weight: bold;
                            color: #00619E;
                        }

                        .submenu {
                            padding-left: 20px;
                            transition: max-height 0.3s ease-out;
                            overflow: hidden;
                            padding-top: 20px;
                        }
                        .submenu li a{
                            font-family: "FreightSans Pro", sans-serif;
                            font-weight: 400;
                            font-size: 16px;
                            margin-left: 40px;
                        }

                        .main.open .submenu {
                            max-height: 1000px;
                        }
                        .submenu a.active {
                            color: #00619E;
                            font-weight: 400;
                        }

                        .main .submenu {
                            max-height: 0;
                            margin: 15px 0;
                        }

                        .toggle-btn {
                            display: none;
                            margin-left: 10px;
                            cursor: pointer;
                        }

                        .mainLeft {
                            margin-top: 300px;
                            padding: 20px;
                            font-family: "FreightSans Pro", sans-serif;
                            font-weight: 400;

                        }
                        .mainLeft b{
                            color: #000;
                        }

                        section {
                            padding: 30px 0;
                            //border-bottom: 1px solid #eee;
                        }

                        h2, h3 {
                            margin-bottom: 10px;
                        }

                        .progress-indicator {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 0%;
                            height: 4px;
                            background-color: #9AE6B4;
                            z-index: 1000;
                            transition: width 0.25s ease-out;
                        }
                        .imgHiddenXs{
                            display: block;
                        }
                        .imgShowXs{
                            display: none;
                        }

                        @media screen and (min-width: 768px) {
                            // body {
                            // display: flex;
                            // }
                            .mainLeft{
                                overflow-y: auto;
                                height: 100vh;
                                scroll-behavior: smooth;
                            }


                            .nav {
                            width: 30%;
                            height: 100%;
                            position: sticky;
                            top: 0;
                            left: 0;
                            //border-right: 1px solid #eee;
                            overflow-y: auto;
                            padding: 0 30px 0 50px;
                            max-height: 100vh;
                            }

                            #hamburgerToggle {
                            display: none !important;
                            }

                            .accordion {
                            display: block !important;
                            }

                            .submenu {
                            max-height: none !important;
                            display: block !important;
                            }

                            .toggle-btn {
                            display: none !important;
                            }

                            .mainLeft {
                            //margin-left: 280px;
                            margin-top: 0;
                            padding: 0 50px;
                            width: 70%;

                            }
                        }

                        @media screen and (max-width: 1024px) {
                            .nav{
                                padding: 0 30px 0 30px;
                            }
                        }

                        @media screen and (max-width: 767px) {
                            .imgHiddenXs{
                                display: none;
                            }
                            .imgShowXs{
                                display: block;
                            }
                            .tableResponsive{
                                width: 100%;
                                overflow-x:scroll;
                            }
                            .submenu li{
                                padding-top: 5px;
                                padding-bottom: 5px;
                            }
                            .nav ul#menu::before, .nav ul#menu::after{
                                background:none;
                            }
                            .main .submenu{
                                margin:0
                            }
                            .nav li a{
                                display: inline-block;
                                font-size: 14px;
                                margin-left: 20px;
                                margin-right: 20px;
                            }
                            .nav li{
                                padding-top: 10px;
                            }
                            .nav li.main > a::before{
                                display: none;
                            }

                            .contentRow{
                                width: 100%;
                                display: flex;
                                margin: 0 auto;
                                justify-content: space-around;
                                align-items: flex-start;
                                flex-direction: column;
                            }
                            .listTitle{
                                display:none;
                            }
                            .nav {
                            position: sticky;
                            width: 100%;
                            top: 0;
                            left: 0;
                            padding: 0;
                            //border-bottom: 1px solid #ddd;
                            }
                            .navfixed{
                                position: fixed;
                                background-color: #fff;
                                padding: 0 20px;
                            }
                            #hamburgerToggle {
                            display: flex;
                            border-bottom: 1px solid #ddd;
                            }

                            nav ul::before {
                            display: none;
                            }

                            .toggle-btn {
                            display: inline-block;
                            position: absolute;
                            right: 7px;
                            top: 13px;
                            font-size: 12px;
                            color: #5C6475;
                            }
                            #toggleIcon{
                                font-size: 12px;
                                color: #5C6475;
                            }

                            .accordion {
                            display: none;
                            background-color: #fff;
                            //border-top: 1px solid #ddd;
                            }

                            .accordion.show {
                            display: block;
                            border-bottom: 1px solid #ddd;
                            }

                            .mainLeft {
                                margin-top: 0px;
                                width: 100%;
                                padding: 0 0;
                                height: 100vh;
                                overflow-y: scroll;
                                scroll-behavior: smooth;

                            }
                            .sectionTitle{
                                font-size: 28px;
                                line-height: 38px;
                            }
                            .sectionSubTitle{
                                font-size: 21px;
                                line-height: 31px;
                            }
                            #footer{
                                z-index:auto;
                            }
                        }
                        `}
					</style>
					<div
						className={s.di__section}
						id='sectionWrapper'
					>
						<div className={s.di__scrollWrapper}>
							<div class='contentRow'>
								<div
									className='nav'
									id='navMobile'
								>
									<div id='hamburgerToggle'>
										<div id='tableTitle'>Table of Contents</div>
										<div id='toggleIcon'>▼</div>
									</div>
									<div class='listTitle'>Table of Contents</div>
									<ul
										id='menu'
										className='accordion'
									>
										<li className='main'>
											<a href='#section1'>What is decision intelligence?</a>
										</li>
										<li className='main'>
											<a href='#section2'>Benefits, Capabilities, Use Cases</a>
											<span className='toggle-btn'>▼</span>
											<ul className='submenu'>
												<li>
													<a href='#section2'>Why is decision intelligence important? What are its benefits?</a>
												</li>
												<li>
													<a href='#section2-1'>What is a decision intelligence platform? </a>
												</li>
												<li>
													<a href='#section2-2'>What are the key capabilities of a decision intelligence platform?</a>
												</li>
												<li>
													<a href='#section2-3'>Who uses decision intelligence, and what problems does it solve across industries?</a>
												</li>
											</ul>
										</li>
										<li className='main'>
											<a href='#section3'>Differences from Other Tools & Disciplines</a>
											<span className='toggle-btn'>▼</span>
											<ul className='submenu'>
												<li>
													<a href='#section3'>How is decision intelligence different from other analytical tools?</a>
												</li>
												<li>
													<a href='#section3-1'>How are planning solutions different from decision intelligence platforms? </a>
												</li>
												<li>
													<a href='#section3-2'>What is the difference between decision intelligence and data science? </a>
												</li>
											</ul>
										</li>
										<li className='main'>
											<a href='#section4'>The Role of Artificial Intelligence in Decision Intelligence</a>
											<span className='toggle-btn'>▼</span>
											<ul className='submenu'>
												<li>
													<a href='#section4'>How is artificial intelligence related to decision intelligence?</a>
												</li>
												<li>
													<a href='#section4-1'>What is agentic AI, and how does it enhance decision intelligence beyond other AI methods?</a>
												</li>
											</ul>
										</li>
										<li className='main'>
											<a href='#section5'>Deploying Decision Intelligence with a Platform</a>
											<span className='toggle-btn'>▼</span>
											<ul className='submenu'>
												<li>
													<a href='#section5'>How can companies get started with decision intelligence?</a>
												</li>
												<li>
													<a href='#section5-1'>What is a decision intelligence skill?</a>
												</li>
												<li>
													<a href='#section5-2'>What is self-service decision intelligence?</a>
												</li>
												<li>
													<a href='#section5-3'>Where does decision intelligence fit in the enterprise stack?</a>
												</li>
											</ul>
										</li>
										<li className='main'>
											<a href='#section6'>Ready to Make Smarter Decisions?</a>
										</li>
									</ul>
								</div>
								<div
									className='mainLeft'
									id='leftWrapper'
								>
									<section
										id='section1'
										class='borderBottom'
									>
										<div>
											<img
												src={WDI}
												class='sectionImg'
												alt='What is decision intelligence'
											/>
										</div>
										<h2 class='sectionTitle'>What is decision intelligence?</h2>
										<p>Decision intelligence (DI) is the optimization and orchestration of decision-making across an enterprise value chain. DI understands how decisions are made and uses data, analytics, AI, and automation to create a feedback-driven process that refines decisions over time — enhancing both decision quality and business impact through recommendations or autonomous action. In effect, DI shifts decision-making from people making decisions supported by machines to machines making decisions guided by people, allowing human oversight while dramatically increasing scale and speed.</p>
										<p>
											Industry analyst{' '}
											<a
												href='https://my.idc.com/getdoc.jsp?containerId=US51047423'
												target='_blank'
												class='contentLink'
											>
												IDC
											</a>{' '}
											defines decision intelligence as being “a discipline and technology that helps organizations design, engineer, and orchestrate decisions by fully or partially automating all the steps in the decision-making process.” Similarly,{' '}
											<a
												href='https://www.gartner.com/en/information-technology/glossary/decision-intelligence#:~:text=Decision%20intelligence%20is%20a%20practical,tune%20decision%20models%20and%20processes.'
												target='_blank'
												class='contentLink'
											>
												Gartner
											</a>{' '}
											has defined it as “the practical discipline used to improve decision making by explicitly understanding and engineering how decisions are made, and how outcomes are evaluated, managed and improved by feedback.”
										</p>
										<img
											src={VennDiagram}
											class='sectionImg imgHiddenXs'
											alt='Venn diagram showing decision intelligence at the center of three overlapping areas: artificial intelligence, data and analytics, and automation — representing the integration required for intelligent decision-making.'
										/>
										<img
											src={VennDiagramMobile}
											class='sectionImg imgShowXs'
											alt='Venn diagram showing decision intelligence at the center of three overlapping areas: artificial intelligence, data and analytics, and automation — representing the integration required for intelligent decision-making.'
										/>
										<p>Traditional decision-making, reliant on human interpretation of data, can’t keep pace with today’s speed and complexity. What businesses need now is decision intelligence — an intelligent, scalable solution to continuously optimize decisions. DI not only recommends the best course of action but learns from outcomes and executes decisions in real time. The result: faster, more consistent, and more governed decision-making across the enterprise.</p>
										<p>Key aspects of decision intelligence:</p>
										<ul>
											<li>
												<b>Data-driven decisions:</b> Uses real-time, historical, structured, and unstructured data to inform actions.
											</li>
											<li>
												<b>AI and automation:</b> Applies logic and rules to automate decisions, reducing manual work and improving speed.
											</li>
											<li>
												<b>Context-aware intelligence:</b> Considers business goals, constraints, and environments in each recommendation.
											</li>
											<li>
												<b>Scenario planning:</b> Enables simulation of multiple outcomes to support smarter choices.
											</li>
											<li>
												<b>Continuous learning:</b> Improves decision quality through feedback loops.
											</li>
										</ul>
										<p>Decision intelligence repositions humans as decision architects who design how decisions are made. It operates at three levels of AI involvement, depending on the type of data:</p>
										<ul>
											<li>
												<b>Decision support (human in the loop):</b> AI provides insights and performs simulations with alternative paths (e.g., scenario modeling for pricing decisions)
											</li>
											<li>
												<b>Decision augmentation (human on the loop):</b> AI provides recommendations with full context and possible impact, and a human makes the final call to execute, change or reject the decision (e.g., recommendations for supplier sourcing)
											</li>
											<li>
												<b>Decision automation (human out of the loop):</b> AI autonomously makes decisions and takes action within predefined constraints, with full auditability of actions (e.g., fully executed logistics optimization).
											</li>
										</ul>
										<img
											src={AIColab}
											class='sectionImg imgHiddenXs'
											alt='Chart illustrating three levels of AI collaboration in decision-making: human in the loop for decision support, human on the loop for decision augmentation, and human out of the loop for full automation — mapped across automation level and decision type.'
										/>
										<img
											src={AIColabMobile}
											class='sectionImg imgShowXs'
											alt='Chart illustrating three levels of AI collaboration in decision-making: human in the loop for decision support, human on the loop for decision augmentation, and human out of the loop for full automation — mapped across automation level and decision type.'
										/>
										<p>At every level, transparency and feedback improve decision quality. DI turns decision-making into a structured, scalable process that drives measurable business results.</p>
									</section>
									<section id='section2'>
										<h2 class='sectionTitle'>Benefits, Capabilities, Use Cases</h2>
										<h3 class='sectionSubTitle'>Why is decision intelligence important? What are its benefits?</h3>
										<p>Decision intelligence is essential for businesses facing a surge in decision volume and complexity in today’s fast-moving environment. It enables smarter, synchronized decision-making at scale by linking data, recommendations, and actions — optimizing decisions across the value chain and helping organizations stay agile and competitive.</p>
										<p>Key benefits include:</p>
										<ul>
											<li>
												<b>Improved decision accuracy and granularity.</b> DI analyzes all data — structured and unstructured — and applies analytics and AI to improve decision quality. It supports, augments, or automates decision-making at a level of detail and accuracy human judgment alone can’t achieve.
											</li>
											<li>
												<b>Increased decision speed and efficiency.</b> DI reduces manual effort by providing real-time recommendations and automating routine decisions, scaling decision velocity across the organization.
											</li>
											<li>
												<b>Reduced risk and uncertainty.</b> DI simulates scenarios, surfaces potential risks, and helps implement proactive strategies — leading to better compliance, fewer surprises, and smarter investments.
											</li>
											<li>
												<b>Consistency and enhanced collaboration.</b> DI provides a single version of the truth, accessible to all teams via dashboards and natural language interfaces, ensuring aligned and consistent decision logic.
											</li>
											<li>
												<b>Connected decisions and continuous learning.</b> DI links decisions across functions and continuously learns, optimizing decision-making at scale.
											</li>
										</ul>
										<p>Decision intelligence is AI designed to drive tangible business value and measurable ROI. In supply chains, for instance, it cuts costs, reduces waste, boosts efficiency, improves inventory control, and increases service levels — all through more intelligent, automated decision-making: </p>
										<img
											src={useCases}
											class='sectionImg imgHiddenXs'
											alt='Diagram highlighting five benefits of decision intelligence in supply chain optimization: cost reduction, waste reduction, increased efficiency, improved inventory performance, and revenue growth — all enabled by real-time visibility, automation, and smarter decisions.'
										/>
										<img
											src={useCasesMobile}
											class='sectionImg imgShowXs'
											alt='Diagram highlighting five benefits of decision intelligence in supply chain optimization: cost reduction, waste reduction, increased efficiency, improved inventory performance, and revenue growth — all enabled by real-time visibility, automation, and smarter decisions.'
										/>
										<p>In short, DI enables faster, better decisions by fusing AI’s scale with human judgment — helping organizations shift from reactive choices to proactive strategy execution.</p>
										<p>
											<a
												href='https://www.aeratechnology.com/customers'
												target='_blank'
												class='contentLink'
											>
												Learn more about how Aera customers are using decision intelligence.
											</a>
										</p>
									</section>
									{/* <section id="section2-1">

                                    </section> */}
									<section
										id='section2-1'
										class='subSectionPadding'
									>
										<h3 class='sectionSubTitle'>What is a decision intelligence platform? </h3>
										<p>
											<a
												href='https://www.gartner.com/reviews/market/decision-intelligence-platforms'
												target='_blank'
												class='contentLink'
											>
												Gartner defines decision intelligence platforms
											</a>{' '}
											(DIPs) as "software used to create solutions that support, automate and augment decision making of humans or machines, powered by the composition of data, analytics, knowledge, and artificial intelligence (AI) techniques." These platforms bridge data and execution, transforming insights into timely action.
										</p>
										<p>
											At a minimum, a <b>true</b> decision intelligence platform should incorporate all of these crucial components:
										</p>
										<ul>
											<li>
												<b>Data.</b> It aggregates and harmonizes data from multiple sources — structured databases, unstructured text, IoT devices, cloud apps — to provide a comprehensive view. It extracts and unifies billions of transactions from enterprise systems and external sources into an open, composable, transactional decision data model.
											</li>
											<li>
												<b>Automation.</b> It mirrors the dynamic thinking behind human decisions by applying transparent business rules and AI-driven logic. The platform can automate execution where appropriate, while still allowing humans to review and control as needed.
											</li>
											<li>
												<b>Composability.</b> It’s modular, flexible, and configurable — enabling businesses to adapt quickly without overhauling systems. It allows organizations to assemble decision flows, integrate AI models, and build custom interfaces for specific needs.
											</li>
										</ul>
										<p>
											In addition, an <b>advanced</b> decision intelligence platform incorporates these components:
										</p>
										<ul>
											<li>
												<b>Intelligence.</b> It leverages AI to forecast outcomes using historical and real-time data. It supports decision automation, augmentation, and support by continuously sensing conditions, analyzing shifts, and learning from outcomes. Over time, this creates a self-improving, real-time learning loop that evolves decision models with changing business needs.
											</li>
											<li>
												<b>Engagement.</b> Leveraging agentic AI, it engages users through natural language and interactive UX. It explains its reasoning, provides full data traceability, and fosters trust by showing the “why” behind every recommendation — down to the transaction level.
											</li>
										</ul>
										<p>In addition to these attributes, many decision intelligence platforms provide intuitive dashboards, visual analytics, and interactive reports that make data insights accessible to business users without requiring deep technical expertise.</p>
										<p>
											Read more in the{' '}
											<a
												href='https://www.aeratechnology.com/blogs/aera-technology-featured-in-gartner-market-guide-for-cutting-edge-decision-intelligence-platforms'
												class='contentLink'
												target='_blank'
											>
												{' '}
												Gartner Market Guide for Decision Intelligence Platforms
											</a>
											.
										</p>
									</section>
									<section
										id='section2-2'
										class='subSectionPadding'
									>
										<h3 class='sectionSubTitle'>What are the key capabilities of a decision intelligence platform?</h3>
										<p>A robust DI platform combines capabilities across data, AI, workflow automation, and user interaction:</p>
										<ul>
											<li>
												Data Integration & Real-Time Processing
												<ul>
													<li>Structured and unstructured data ingestion</li>
													<li>Data integration and streaming from multiple sources</li>
													<li>Data harmonization</li>
												</ul>
											</li>
											<li>
												Decision Composibility
												<ul>
													<li>Decision modeling and orchestration design</li>
													<li>Advanced analytics and composite AI/ML capabilities</li>
													<li>Simulation and modeling capabilities to test potential decisions</li>
													<li>AI agents for decision reasoning</li>
													<li>Recommendation engines to suggest optimal choices</li>
												</ul>
											</li>
											<li>
												Decision-Centric Engagement
												<ul>
													<li>Decision-centric interfaces</li>
													<li>Natural language processing for conversational insights</li>
													<li>Simulation and modeling capabilities to test potential decisions</li>
													<li>Visualization techniques to provide contextual information</li>
												</ul>
											</li>
											<li>
												Learning & Auditability
												<ul>
													<li>Continuous learning from every decision made</li>
													<li>Transparency and auditing of decision types, number of decisions, outcomes, and approvals</li>
												</ul>
											</li>
											<li>
												Enterprise-Scale Deployment & Security
												<ul>
													<li>Assurance of data governance, regulatory compliance, and role-based access control</li>
													<li>Scaling to handle complex, multi-layered decision processes across global operations</li>
												</ul>
											</li>
										</ul>
										<p>Together, these capabilities help companies standardize and scale decision-making across functions and time horizons. DI platforms create consistent, repeatable processes that allow organizations to adapt quickly, simulate outcomes effectively, and track performance with clarity. By relying on data and logic rather than intuition, they reduce bias and improve objectivity. This results in a more agile, transparent, and measurable system of intelligence — one that aligns strategy and action to accelerate enterprise-wide transformation.</p>
										<p>
											<a
												href='https://www.aeratechnology.com/decision-cloud'
												target='_blank'
												class='contentLink'
											>
												Learn more about Aera Decision Cloud
											</a>
											.
										</p>
									</section>
									<section
										id='section2-3'
										class='borderBottom subSectionPadding'
									>
										<h3 class='sectionSubTitle'>Who uses decision intelligence, and what problems does it solve across industries?</h3>
										<p>Decision intelligence platforms are used across a wide variety of sectors — especially those that rely on high volumes of data, rapid decision cycles, and complex value chains.</p>
										<p>
											<b>All Manufacturing</b>
										</p>
										<ul>
											<li>
												<b>Demand Forecasting:</b> Predicting demand fluctuations and adjusting inventory levels accordingly.
											</li>
											<li>
												<b>Inventory Waste Management:</b> Reducing waste and markdowns by identifying slow-moving or expiring products and recommending mitigations.
											</li>
											<li>
												<b>Logistics Optimization:</b> Determining the most efficient transportation routes to reduce costs, delivery times and carbon emissions.
											</li>
											<li>
												<b>Warehouse Management:</b> Automating restocking and optimizing warehouse space utilization.
											</li>
											<li>
												<b>Control Tower Visibility:</b> Providing real-time insights to manage disruptions proactively.
											</li>
										</ul>
										<p>
											<b>Retail & Consumer Goods</b>
										</p>
										<ul>
											<li>
												<b>Price Optimization:</b> Dynamically adjusting pricing based on demand, competition, and inventory levels.
											</li>
											<li>
												<b>Inventory Replenishment:</b> Ensuring products are available when and where they are needed.
											</li>
											<li>
												<b>Claims Management:</b> Extracting unstructured claims data, validating claims, and automating claims processing.
											</li>
										</ul>
										<p>
											<b>LifeSciences & Pharmaceuticals</b>
										</p>
										<ul>
											<li>
												<b>Drug Supply Chain Management:</b> Ensuring the timely distribution of medications.
											</li>
											<li>
												<b>Clinical Trial Optimization:</b> Identifying the best patient cohorts and trial locations.
											</li>
										</ul>
										<p>
											<b>Energy & Utilities</b>
										</p>
										<ul>
											<li>
												<b>Sustainability Planning:</b> Helping businesses meet carbon reduction goals efficiently.
											</li>
										</ul>
										<p>
											<b>Financial Services & Banking</b>
										</p>
										<ul>
											<li>
												<b>Fraud Detection:</b> Identifying fraudulent transactions in real time.
											</li>
											<li>
												<b>Risk Assessment:</b> Automating credit and loan approval processes.
											</li>
										</ul>
										<p>In particular, large companies with massively complex operations provide excellent use cases for decision intelligence — both to harmonize all the data they generate across multiple systems, and to digitize, augment, and automate decision-making at scale. By addressing inefficiencies, improving forecasting, and mitigating risks, decision intelligence platforms enable organizations across these industries to enhance performance, reduce costs, and drive better strategic outcomes.</p>
										<p>
											<a
												href='https://www.aeratechnology.com/customers'
												target='_blank'
												class='contentLink'
											>
												Learn more about how Aera customers are using decision intelligence.
											</a>
										</p>
									</section>
									<section id='section3'>
										<h2 class='sectionTitle'>Differences from Other Tools & Disciplines</h2>
										<h3 class='sectionSubTitle'>How is decision intelligence different from other analytical tools?</h3>
										<p>Decision intelligence goes beyond traditional analytics. While business intelligence (BI) tools focus on describing what happened — through reports, dashboards, and historical trends — DI integrates predictive and prescriptive analytics to guide what should happen next.</p>
										<p>And unlike static BI dashboards that require human interpretation, DI platforms use AI to adapt in real time. They simulate scenarios, optimize recommendations, and align decisions with strategic goals — making them more dynamic and actionable. Finally, DI transforms data into intelligent decision-making that learns and improves continuously.</p>
										<p>How decision intelligence (DI) differs from business intelligence (BI):</p>
										<div class='tableResponsive'>
											<table
												width='100%'
												border='0'
												cellpadding='0'
												cellspacing='0'
												class='tableWrapper'
											>
												<thead>
													<tr>
														<th></th>
														<th>Business Intelligence (BI)</th>
														<th>Decision Intelligence (DI)</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class='colorBlack'>
															<strong>Focus</strong>
														</td>
														<td>Provides reporting and analytics</td>
														<td>Provides decision support, augmentation and automation</td>
													</tr>
													<tr>
														<td class='colorBlack'>
															<strong>Output</strong>
														</td>
														<td>Presents data visualizations</td>
														<td>Gives predictions, recommendations, and automated actions</td>
													</tr>
													<tr>
														<td class='colorBlack'>
															<strong>Scope</strong>
														</td>
														<td>Is descriptive and diagnostic</td>
														<td>Is prescriptive and proactive</td>
													</tr>
													<tr>
														<td class='colorBlack'>
															<strong>Learning</strong>
														</td>
														<td>Generates static reports without learning</td>
														<td>Learns continuously from decision outcomes</td>
													</tr>
												</tbody>
											</table>
										</div>

										<p>
											<b>In brief:</b> DI platforms don’t just analyze data — they act on it. They automate routine decisions and support strategic ones, all in real time.
										</p>
									</section>
									{/* <section id="section3-1">

                                    </section> */}
									<section
										id='section3-1'
										class='subSectionPadding'
									>
										<h3 class='sectionSubTitle'>How are planning solutions different from decision intelligence platforms? </h3>
										<p>Planning tools and DI platforms both support decisions — but differ in adaptability, intelligence, and execution.</p>
										<p>How DI platforms differ from planning solutions:</p>
										<div class='tableResponsive'>
											<table
												width='100%'
												border='0'
												cellpadding='0'
												cellspacing='0'
												class='tableWrapper'
											>
												<thead>
													<tr>
														<th></th>
														<th>Planning Solutions</th>
														<th>DI Platforms</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td class='colorBlack'>Primary goal</td>
														<td>Build static plans using historical data, assumptions, and forecasting models</td>
														<td>Enable real-time decision-making, automation, and continuous learning from outcomes</td>
													</tr>
													<tr>
														<td class='colorBlack'>Scope</td>
														<td>Support structured, periodic planning cycles and scenario analysis</td>
														<td>Cover end-to-end execution of decisions – from strategic to operational and situational.</td>
													</tr>
													<tr>
														<td class='colorBlack'>Time Horizon</td>
														<td>Focused on long-term and periodic planning cycles.</td>
														<td>Designed for real-time, near-term, and long-range decisions.</td>
													</tr>
													<tr>
														<td class='colorBlack'>Execution of Plans</td>
														<td>Generate plans that require manual implementation and tracking.</td>
														<td>Recommend optimal decisions and take autonomous action when needed.</td>
													</tr>
													<tr>
														<td class='colorBlack'>Adaptability</td>
														<td>Plans often become outdated quickly as conditions change.</td>
														<td>Dynamically adjust to real-time data, events, and signals.</td>
													</tr>
													<tr>
														<td class='colorBlack'>Data Processing</td>
														<td>Use historical and structured data for forecasting</td>
														<td>Process real-time, structured, and unstructured data from diverse sources</td>
													</tr>
													<tr>
														<td class='colorBlack'>AI & Machine Learning</td>
														<td>Often limited to forecasting and optimization models</td>
														<td>Use AI for continuous learning, automation, and contextual decision-making</td>
													</tr>
													<tr>
														<td class='colorBlack'>Decision Learning</td>
														<td>Do not learn from past plans or decisions</td>
														<td>Continuously learn from decisions and outcomes, improving over time</td>
													</tr>
													<tr>
														<td class='colorBlack'>Tech Stack Integration</td>
														<td>Typically require manual integration with execution systems.</td>
														<td>Seamlessly connect with ERP, CRM, SCM, and external platforms.</td>
													</tr>
													<tr>
														<td class='colorBlack'>Human & AI Collaboration</td>
														<td>Mostly human-driven, requiring analysts to interpret and act on plans</td>
														<td>Enable human–AI collaboration, with AI augmenting or automating decisions</td>
													</tr>
												</tbody>
											</table>
										</div>

										<p>
											<b>In brief:</b> Planning tools simply forecast. DI platforms recommend and act — in real time, across the enterprise, with intelligence that evolves.
										</p>
									</section>
									<section
										id='section3-2'
										class='borderBottom subSectionPadding'
									>
										<h3 class='sectionSubTitle'>What is the difference between decision intelligence and data science? </h3>
										<p>Decision intelligence and data science work together but serve different goals. Data science focuses on extracting insights from data using statistics, machine learning, and AI. It identifies patterns, predicts trends, and builds models to explain complex datasets. DI takes those insights and turns them into action — integrating them into decision-making to deliver optimized outcomes.</p>
										<p>Key distinctions include:</p>
										<ul>
											<li>
												<b>Objective.</b> Data science generates insights; DI uses them to improve decisions.
											</li>
											<li>
												<b>Scope.</b> Data science centers on analysis and modeling; DI embeds insights into workflows, automation, and strategy.
											</li>
											<li>
												<b>End-User Impact.</b> Data science supports analysts; DI empowers decision-makers and systems across the business.
											</li>
											<li>
												<b>Automation.</b> DI emphasizes real-time, AI-driven action; data science often requires human interpretation.
											</li>
										</ul>
										<p>Data science builds understanding. Decision intelligence ensures that understanding drives real-world decisions that matter.</p>
										{/* <p><b>In brief:</b> Planning tools simply forecast. DI platforms recommend and act — in real time, across the enterprise, with intelligence that evolves.</p> */}
									</section>
									<section id='section4'>
										<h2 class='sectionTitle'>The Role of Artificial Intelligence in Decision Intelligence</h2>
										<h3 class='sectionSubTitle'>How is artificial intelligence related to decision intelligence? </h3>
										<p>Decision intelligence applies artificial intelligence to optimize decision-making. AI is the broader field — machines that learn, reason, and predict — while DI is a targeted application of those capabilities.</p>
										<p>Here’s how AI powers DI:</p>
										<ul>
											<li>
												<b>Predictive Capabilities.</b> AI analyzes past and present data to forecast outcomes and recommend next steps.
											</li>
											<li>
												<b>Decision Automation.</b> AI handles routine and complex choices, cutting manual work and boosting speed.
											</li>
											<li>
												<b>Continuous Learning.</b> Machine learning models improve over time through feedback and outcomes.
											</li>
											<li>
												<b>Cognitive Augmentation.</b> AI delivers insights, flags anomalies, and explains itself — fostering trust and transparency.
											</li>
											<li>
												<b>Real-Time Data Processing.</b> From structured to unstructured inputs, AI enables instant analysis and response.
											</li>
										</ul>
										<p>
											AI includes machine learning, optimization, rules engines, NLP, and graph technologies. DI blends these into <i>composite AI</i> — a powerful stack that enhances accuracy, adaptability, and impact. AI is the engine; decision intelligence makes it drive with purpose, aligning actions with strategy and human judgment.
										</p>
									</section>
									{/* <section id="section4-1">

                                    </section> */}
									<section
										id='section4-1'
										class='borderBottom subSectionPadding'
									>
										<h3 class='sectionSubTitle'>What is agentic AI, and how does it enhance decision intelligence beyond other AI methods?</h3>
										<p>Agentic AI is the next leap forward. It doesn’t replace predictive or generative AI — it amplifies them. It creates a more cohesive, capable decision-making system.</p>
										<ul>
											<li>
												<b>Predictive AI</b> offers foresight with forecasts and scenario models.
											</li>
											<li>
												<b>Generative AI</b> enables intuitive interaction and produces clear, user-friendly content.
											</li>
											<li>
												<b>Agentic AI</b> fuses these strengths with autonomous reasoning and execution.
											</li>
										</ul>
										<p>Designed to make complex decisions and adapt on its own, agentic AI becomes an engine of self-optimization. It doesn’t just recommend — it acts. It’s ideal for domains like supply chains, pricing, and operations, where fast, fine-tuned decisions are critical. With agentic AI, DI platforms evolve from reactive systems into proactive, self-improving ecosystems that drive innovation and efficiency.</p>
										<p>Take this example: predictive AI spots a demand surge; generative AI helps users interpret the data; agentic AI assesses the impact, reallocates inventory, and initiates action — keeping humans informed along the way. When combined with decision intelligence, agentic AI empowers enterprises to build intelligent, adaptive systems that move with the market, not behind it. Agility becomes built-in.</p>
									</section>
									<section id='section5'>
										<h2 class='sectionTitle'>Deploying Decision Intelligence with a Platform</h2>
										<h3 class='sectionSubTitle'>How can companies get started with decision intelligence?</h3>
										<p>To deploy decision intelligence effectively, companies should take a structured approach:</p>
										<ul>
											<li>
												<b>Identify Decision-Making Challenges.</b> Pinpoint where decisions are slow, error-prone, or overly reliant on gut feel.
											</li>
											<li>
												<b>Assess Data Availability & Quality.</b> Ensure access to clean, relevant, and comprehensive data.
											</li>
											<li>
												<b>Implement a Decision Intelligence Platform.</b> Choose a platform that integrates with existing systems and supports analytics, automation, and AI-based decision support.
											</li>
											<li>
												<b>Train Teams & Build a Data-Driven Culture.</b> Upskill employees and promote a mindset that values data over intuition.
											</li>
											<li>
												<b>Start with High-Impact Use Cases.</b> Focus on areas like forecasting, risk, or supply chain to demonstrate early value.
											</li>
											<li>
												<b>Monitor, Measure & Refine.</b> Track outcomes, fine-tune models, and continuously improve.
											</li>
										</ul>
										<p>This approach helps organizations shift to faster, smarter, and more efficient decision-making.</p> <p>Here are real-world examples of companies starting with a clear business challenge, applying DI, and achieving stronger outcomes:</p>
										<ul>
											<li>
												A global <b>steel manufacturer</b> uses DI to identify root causes of late shipments, recommend actions, and improve communications and customer service when delays occur.
											</li>
											<li>
												A <b>petrochemical company</b> deploys DI for better shipping performance, gaining real-time visibility across its supply chain, including third-party operations.
											</li>
											<li>
												A global <b>pharmaceutical company</b> uses DI to generate ATP (available-to-promise) estimates across diverse products by syncing data from multiple ERP systems — helping customers know when an order has been received, when it will be shipped, and when to expect it to be delivered.
											</li>
										</ul>
										<p>
											<a
												href='https://www.aeratechnology.com/customers'
												target='_blank'
												class='contentLink'
											>
												Learn more about how Aera customers are using decision intelligence
											</a>
											.
										</p>
									</section>
									{/* <section id="section5-1">

                                    </section> */}
									<section
										id='section5-1'
										class='subSectionPadding'
									>
										<h3 class='sectionSubTitle'>What is a decision intelligence skill?</h3>
										<p>A decision intelligence skill is a modular capability built into a decision intelligence platform. It automates or assists decision-making in a specific area, functioning like AI skills in virtual assistants — offering contextual recommendations with transparency and ongoing learning.</p>
										<p>Each skill delivers a targeted solution with four core capabilities:</p>
										<ul>
											<li>
												<b>Data Integration.</b> Pulls and harmonizes data into a common model.
											</li>
											<li>
												<b>Analytics & Modeling.</b> Applies ML, simulations, and other calculations tailored to the decision at hand.
											</li>
											<li>
												<b>Digitized Logic & Flow.</b> Encodes business rules and user interactions.
											</li>
											<li>
												<b>Execution.</b> Pushes decisions back into operational systems.
											</li>
										</ul>
										<p>Examples include:</p>
										<ul>
											<li>
												<b>Logistics.</b> Optimizes routes and modes for cost, speed, service, and sustainability.
											</li>
											<li>
												<b>Demand Forecasting.</b> Predicts trends using historical patterns and external variables.
											</li>
											<li>
												<b>Inventory Balancing.</b> Minimizes stockouts and aging inventory, adjusting to real-time supply-demand shifts.
											</li>
											<li>
												<b>Availability to Promise.</b> Analyzes inventory and lead times to offer accurate delivery commitments.
											</li>
											<li>
												<b>Tariff Impact Mitigation.</b> Models trade scenarios and finds lower-cost sourcing alternatives.
											</li>
										</ul>
										<p>Skills enhance DI platforms by allowing businesses to customize decision-making capabilities according to their needs. As you add more skills, you can reuse common core elements and exchange information, making skills smarter and more efficient over time.</p>
										<p>
											<a
												href='https://www.aeratechnology.com/skills'
												target='_blank'
												class='contentLink'
											>
												Learn more about Aera Skills
											</a>
											.
										</p>
									</section>
									<section
										id='section5-2'
										class='subSectionPadding'
									>
										<h3 class='sectionSubTitle'>What is self-service decision intelligence?</h3>
										<p>Self-service decision intelligence puts DI tools in the hands of business users — no deep technical expertise required. With intuitive interfaces and low-code or no-code setup, non-technical teams can act on insights faster.</p>
										<p>Self-service DI enables users to:</p>
										<ul>
											<li>Build and test decision models without coding.</li>
											<li>Understand AI-driven recommendations via clear dashboards.</li>
											<li>Run scenarios and compare decision paths.</li>
											<li>Automate decisions with minimal IT involvement.</li>
										</ul>
										<p>This accessibility broadens adoption and drives a culture of data-backed decision-making, enhancing agility across the organization.</p>
									</section>
									<section
										id='section5-3'
										class='borderBottom subSectionPadding'
									>
										<h3 class='sectionSubTitle'>Where does decision intelligence fit in the enterprise stack?</h3>
										<p>Decision intelligence forms a crucial layer in the enterprise technology stack. It connects raw data, AI insights, and execution — bridging analytics, automation, and operational systems.</p>
										<p>As organizations embrace DI, the stack will evolve into something simpler and more streamlined:</p>
										<ul>
											<li>
												<b>Systems of Record</b> (ERP, CRM, POS, etc.) become more automated, reducing manual work.
											</li>
											<li>
												<b>A System of Intelligence</b> emerges to coordinate decisions across functions, blending AI insights with human input.
											</li>
										</ul>
										<p>With this shift, decision-making will become fluid and dynamic, allowing humans to operate in, on, or out of the loop, depending on the level of automation required.</p>
										<img
											src={softwareStocks}
											class='sectionImg imgHiddenXs'
											alt='Diagram showing how decision intelligence simplifies the enterprise software stack. On the left, three layers — systems of record, differentiation, and intelligence — are connected to multiple point solutions. On the right, these layers are unified into a streamlined stack powered by a decision intelligence platform and skills, integrating with core systems like ERP, CRM, and POS.'
										/>
										<img
											src={softwareStocksMobile}
											class='sectionImg imgShowXs'
											alt='Diagram showing how decision intelligence simplifies the enterprise software stack. On the left, three layers — systems of record, differentiation, and intelligence — are connected to multiple point solutions. On the right, these layers are unified into a streamlined stack powered by a decision intelligence platform and skills, integrating with core systems like ERP, CRM, and POS.'
										/>
										<p>This integration shifts decision-making from rigid and reactive to fluid and dynamic. Humans can stay in the loop, step out, or oversee as needed.</p>
										<p>By integrating across the stack, decision intelligence enables faster, more accurate, and automated decisions — empowering organizations to boost performance, reduce risk, and stay competitive in a fast-moving world.</p>
									</section>
									<section id='section6'>
										<h2 class='sectionTitle'>Ready to Make Smarter Decisions?</h2>
										<p>
											The way businesses make decisions is evolving. Will your company lead the change or lag behind? Decision intelligence offers a clear path to more strategic, data-driven, and automated decision-making. Explore how{' '}
											<a
												href='https://www.aeratechnology.com/skills'
												target='_blank'
												class='contentLink'
											>
												decision intelligence can transform your business
											</a>
											.
										</p>
									</section>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}
