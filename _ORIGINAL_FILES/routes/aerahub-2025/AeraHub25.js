import React, { Component } from 'react';

import Helmet from 'react-helmet';
import Request from 'components/request';
import Page from 'components/page';
import s from './AeraHub25.scss';

import HeroImageOD from 'assets/images/aerahub2025/aeraHubHeroOD.webp';
import HeroLogo from 'assets/images/aerahub2025/AERAHUB25OD.png';
import keynoteFred from 'assets/images/aerahub2025/keynoteFred.png';
import keynoteNitin from 'assets/images/aerahub2025/keynoteNitin.png';
import keynoteDouglas from 'assets/images/aerahub2025/keynoteDouglas.png';
import keynoteSam from 'assets/images/aerahub2025/keynoteSam.png';
import keynoteEduardo from 'assets/images/aerahub2025/keynoteEduardo.png';
import keynoteMegha from 'assets/images/aerahub2025/keynoteMegha.png';
import keynoteDiego from 'assets/images/aerahub2025/keynoteDiego.png';
import keynoteLaurent from 'assets/images/aerahub2025/keynoteLaurent.png';
import keynoteJuliana from 'assets/images/aerahub2025/keynoteJuliana.png';
import keynoteFuller from 'assets/images/aerahub2025/keynoteFuller.png';
import keynotePaul from 'assets/images/aerahub2025/keynotePaul.png';
import keynoteJennie from 'assets/images/aerahub2025/keynoteJennie.png';
import keynoteLalitha from 'assets/images/aerahub2025/keynoteLalitha.png';
import keynoteMustafa from 'assets/images/aerahub2025/keynoteMustafa.png';
import keynoteElizabeth from 'assets/images/aerahub2025/speakers/keynoteElizabeth.png';
import keynoteKevin from 'assets/images/aerahub2025/speakers/keynoteKevin.png';
import keynoteHarrison from 'assets/images/aerahub2025/speakers/keynoteHarrison.png';
import keynoteGonzalo from 'assets/images/aerahub2025/speakers/keynoteGonzalo.png';
import onDemandSessions from 'assets/images/aerahub2025/onDemandSessions.webp';

import onDemandSessionKeynote from 'assets/images/aerahub2025/onDemandSessionKeynote.png';
import onDemandSessionHersheyGallo from 'assets/images/aerahub2025/onDemandSessionHersheyGallo.png';
import onDemandSessionDecisionIntelligence from 'assets/images/aerahub2025/onDemandSessionDecisionIntelligence.png';
import onDemandSessionAstraZeneca from 'assets/images/aerahub2025/onDemandSessionAstraZeneca.png';
import onDemandSessionHarvardWGU from 'assets/images/aerahub2025/onDemandSessionHarvardWGU02.png';

import onDemandSessionDIAgentsDemo from 'assets/images/aerahub2025/onDemandSessionDIAgentsDemo.png';
import onDemandSessionDecisionCloud from 'assets/images/aerahub2025/onDemandSessionDecisionCloud.png';
import onDemandSessionAeraProduct1 from 'assets/images/aerahub2025/onDemandSessionAeraProduct1.png';
import onDemandSessionAeraProduct2 from 'assets/images/aerahub2025/onDemandSessionAeraProduct2.png';

import onDemandSessionAccenture from 'assets/images/aerahub2025/onDemandSessionAccenture.png';
import onDemandSessionDeloitte from 'assets/images/aerahub2025/onDemandSessionDeloitte.png';
import onDemandSessionEY from 'assets/images/aerahub2025/onDemandSessionEY.png';

import accentureSponsor from 'assets/images/aerahub2024/Accenture_logo.png';
import Deloittesponsor from 'assets/images/aerahub2024/Deloittesponsor.png';
import zsLogo from 'assets/images/aerahub2025/zs_logo_sponsor.png';
import eylogosponsor from 'assets/images/aerahub2024/eylogosponsor.png';

export default class AeraHub25 extends Component {
	componentDidUpdate() {
		if (window.location.pathname == '/aerahub-2025') {
			$('#headnav').hide();
			$('#aeraLogo').hide();
		}
	}

	componentDidMount() {
		const script2 = document.createElement('script');
		script2.src = 'https://js.hsforms.net/forms/embed/v2.js';
		document.body.appendChild(script2);

		// Gated Hubspot Form
		script2.addEventListener('load', () => {
			if (window.hbspt) {
				window.hbspt.forms.create({
					portalId: '4455954',
					formId: '097ee201-0440-4b59-a68e-d682966a8e08',
					target: '#stickyform',
					onFormSubmit: function ($form) {
						$('#hideMe').hide(300);
						$('#removeBlurr').css('filter', 'blur(0px)');
					},
				});
			}
		});

		if (window.location.pathname == '/aerahub-2025') {
			$('#headnav').hide();
			// $('#footer').hide();
		} else if (window.location.pathname != '/aerahub-2025') {
			$('#headnav').show();
			$('#footer').show();
		}

		// Form overlay logic
		let searchParams = new URLSearchParams(window.location.search);
		searchParams.has('access'); // true
		let paramId = searchParams.get('access');

		// Show the gated form overlay only when the "access=direct" param is NOT present.
		// To avoid a flash, the overlay is hidden by default in the markup and we
		// reveal it here when appropriate.
		const overlay = document.getElementById('hideMe');
		const removeBlurr = document.getElementById('removeBlurr');
		if (overlay) {
			if (paramId === 'direct') {
				// direct access: keep overlay hidden and un-blur the page
				overlay.style.display = 'none';
				if (removeBlurr) removeBlurr.style.filter = 'blur(0px)';
				document.body.style.height = '';
				document.body.style.overflowX = 'inherit';
			} else {
				// no direct param: show the gated overlay so users must submit the form
				overlay.style.display = 'block';
				if (removeBlurr) removeBlurr.style.filter = 'blur(8px)';
				document.body.style.height = '100vh';
				document.body.style.overflowX = 'hidden';
			}
		}

		// Video popup handlers — support multiple clickable speaker images
		// Select key elements and guard against missing nodes
		const closeBtn = document.getElementById('closePopup');
		const videoPopupEl = document.getElementById('videoPopup');
		const vimeoIframe = document.getElementById('vimeoVideo');

		// vimeo player instance (if API available)
		let vimeoPlayer = null;

		// Helper to open popup with a given src (adds autoplay)
		const openVideoPopup = (src) => {
			if (!vimeoIframe || !videoPopupEl) return;
			// normalize src: remove any existing autoplay then add autoplay=1
			let normalized = src.replace(/(&|\?)autoplay=1/g, '');
			normalized = normalized.replace(/&amp;/g, '&');
			normalized += normalized.includes('?') ? '&autoplay=1' : '?autoplay=1';
			vimeoIframe.src = normalized;
			videoPopupEl.style.display = 'flex';

			// Try to create a Vimeo Player instance so we can control playback programmatically.
			// The API script is included in the rendered markup; try now and then shortly after in case it hasn't loaded yet.
			const tryInitPlayer = () => {
				try {
					if (window.Vimeo && vimeoIframe) {
						vimeoPlayer = new window.Vimeo.Player(vimeoIframe);
						// ensure playback starts
						if (vimeoPlayer && typeof vimeoPlayer.play === 'function') {
							vimeoPlayer.play().catch(() => {});
						}
						return true;
					}
				} catch (err) {
					// ignore — we'll retry
				}
				return false;
			};

			if (!tryInitPlayer()) {
				setTimeout(tryInitPlayer, 300);
			}
		};

		// Close handler (hide and remove autoplay)
		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				if (videoPopupEl) videoPopupEl.style.display = 'none';
				// attempt to pause via the Player API, then clear the iframe src to fully stop playback
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
					// stop playback
					if (vimeoPlayer && typeof vimeoPlayer.pause === 'function') {
						vimeoPlayer.pause().catch(() => {});
					}
					if (vimeoIframe) vimeoIframe.src = '';
					vimeoPlayer = null;
				}
			});
		}

		// Attach click handlers to every speaker image inside the speaker-details blocks
		try {
			const selector = `.${s.ddm__keynoteCol1} img`;
			const speakerImgs = document.querySelectorAll(selector);
			speakerImgs.forEach((img) => {
				// make clickable
				img.style.cursor = 'pointer';
				// allow keyboard activation
				img.setAttribute('tabindex', '0');
				img.addEventListener('click', (ev) => {
					const src = img.getAttribute('data-vimeo-src') || img.getAttribute('data-src') || img.src;
					openVideoPopup(src);
				});
				img.addEventListener('keydown', (ev) => {
					if (ev.key === 'Enter' || ev.key === ' ') img.click();
				});
			});
		} catch (err) {
			// if for some reason selector or s isn't available, silently fail
			console.warn('Could not attach speaker image video handlers', err);
		}

		$('#onDemandBtn').click(function () {
			$('html, body').animate(
				{
					scrollTop: $('#onDemandSection').offset().top - 120,
				},
				1000
			);
		});

		if (window.location.pathname == '/aerahub-2025') {
			$('#headnav').hide();
			$('#aeraLogo').hide();
		}
	}

	recordAdRollSegment(segmentId, attempts = 0) {
		if (window.__adroll && window.__adroll.record_user) {
			try {
				window.__adroll.record_user({ adroll_segments: segmentId });
			} catch (err) {
				console.error('AdRoll tracking error:', err);
			}
		} else if (attempts < 10) {
			setTimeout(() => this.recordAdRollSegment(segmentId, attempts + 1), 300);
		} else {
			console.warn('⚠️ AdRoll not available after waiting');
		}
	}

	render() {
		return (
			<Page>
				<Helmet
					title='AeraHUB 2025 – Decision Intelligence Global Summit, NYC/Viritual'
					meta={[
						{
							name: 'description',
							content: 'Join AeraHUB in New York or virtually for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making.',
						},
						{
							property: 'og:description',
							content: 'Join AeraHUB in New York or virtually for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making.',
						},
						{
							name: 'twitter:description',
							content: 'Join AeraHUB in New York or virtually for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making.',
						},
						{
							property: 'twitter:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/uIDbKpfIdKzM0sXky9NJZ/a6bb4fcbfda747af71e5c4102a17e2c3/Open_graph_-_NYC.jpg',
						},
						{
							property: 'og:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/uIDbKpfIdKzM0sXky9NJZ/a6bb4fcbfda747af71e5c4102a17e2c3/Open_graph_-_NYC.jpg',
						},
					]}
				>
					<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'></script>
					<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'></script>
				</Helmet>

				<div className={s.ddm}>
					{/* Gated Form */}
					<div
						className={s.ddm__overlaywrapper}
						id='hideMe'
						style={{ display: 'none' }}
					>
						<div className={s.ddm__overlay}>
							<div className={s.ddm__overlayFormWrapper}>
								<div className={s.ddm__overlayForm}>
									<section className={s.ddm__overlayFormHeader}>
										<img
											alt='AeraHub Logo'
											src={HeroLogo}
											className={s.ddm__overlayLogo}
										/>
										<p>Enter your email below to receive full access to the complete library of AeraHub 25 video content.</p>
									</section>
									<div className={s.ddm__formBox}>
										<div id='stickyform'></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={s.ddm__bluroverlay}
						id='removeBlurr'
						style={{ filter: 'none' }}
					>
						<div
							className={s.ddm__header}
							id='aeraLogo'
						></div>

						<div
							className={s.ddm__section1}
							id='aboutSection'
						>
							<img
								src={HeroImageOD}
								alt='Hero Image'
								className={s.ddm__heroImage}
								fetchpriority='high'
							/>
							<div
								className={s.ddm__heroSection}
								id='hero-section'
							>
								<div className={s.ddm__heroRow}>
									<div className={s.ddm__herotagline}>
										<img
											alt='AeraHub Logo'
											src={HeroLogo}
											className={s.ddm__heroLogo}
											fetchpriority='high'
										/>
										<h1>The Decision Intelligence Global Summit</h1>
										<p>AeraHUB 25 brought together C-level executives, business leaders, and technology pioneers who are digitizing and transforming decisions at scale.</p>
										<div className={s.ddm__heroButtonWrapper}>
											<a
												href='javascript:;'
												className={s.ddm__heroButton}
												id='onDemandBtn'
											>
												Watch On-Demand
											</a>
										</div>
									</div>
									<div className={s.ddm__heroVideoWrapper}>
										<img
											src={onDemandSessions}
											alt='On-Demand Sessions'
											fetchpriority='high'
										/>
									</div>
								</div>
							</div>
						</div>

						<style>
							{`

                  #headnav {
                    display: none !imporant;
                  }
                  .hs_i_am_attending{
                    text-align:left;
                    font-size: 16px;
                  }
                  .hs_i_am_attending span {
                    font-size: 18px;
                    color:#5C6475;
                    font-family: "FreightSans Pro", sans-serif;
                    font-weight: 300;
                  }
                  ul.inputs-list.multi-container {
                    display: flex;
                    margin-top: 15px;
                  }

                  /* Custom Input */

                  .hs-form-field {
                   width: 50%;
                   padding: 0 20px;
                   margin-bottom: 0;
                  }

                  .hs-form-field.hs-recaptcha,
                  .hs-submit {
                    flex: 1 1 100%;
                    display: flex;
                    flex-direction: column;
                  }

                  .hs-form-field.hs-recaptcha {
                    margin-bottom: 0;
                  }

                  .hs-form-field.hs-recaptcha input,
                  .hs-submit input {
                    margin-bottom: 0;
                  }

                  ul.inputs-list.multi-container li.hs-form-radio label {
                    position: relative;
                    color: #5C6475;
                    font-family: "FreightSans Pro", sans-serif;
                  }
                  ul.inputs-list.multi-container li.hs-form-radio label span {
                    display: inline-block;
                    margin-left: 30px; /* Width of the new radio select and any additional spacing on the left */
                    margin-right: 30px; /* Additional spacing on the right */
                  }
                  /* Hide the original radio select */
                  ul.inputs-list.multi-container li.hs-form-radio label input {
                    height: 24px;
                    left: 0;
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    width: 24px;
                  }
                  /* Add new radio select */
                  ul.inputs-list.multi-container li.hs-form-radio label span::before {
                    border: 1px solid #5C6475;
                    content: "";
                    height: 24px;
                    left: 0;
                    position: absolute;
                    top: -8px;
                    width: 24px;
                    border-radius: 50%;
                  }
                  /* Style new checked item */
                  ul.inputs-list.multi-container li.hs-form-radio label span::after {
                    content: "";
                    opacity: 0;
                    border: 7px solid #5C6475;
                    border-radius: 50%;
                    position: absolute;
                    left: 5px;
                    top: -3px;
                    transition: opacity 0.2s ease-in-out;
                  }
                  /* Show when checked */
                  ul.inputs-list.multi-container li.hs-form-radio label input:checked + span::after {
                    opacity: 1;
                  }
                  /* Style when focused */
                  ul.inputs-list.multi-container li.hs-form-radio label input:focus + span::after {
                    box-shadow: 0 0 0 3px #4D90FE;
                    outline: 3px solid transparent; /* For Windows high contrast mode. */
                  }

                  @media screen and (max-width: 767px) {
                    ul.inputs-list.multi-container{
                      flex-direction: column;
                    }
                    ul.inputs-list.multi-container li{
                      margin-bottom: 10px;
                    }
                  }
                `}
						</style>
						<div
							className={s.ddm__featuredsession}
							id='onDemandSection'
						>
							<div className={s.ddm__container}>
								<div
									className={s.ddm__featuredboxwrapper}
									id='faeturedSessions'
								>
									<div className={s.ddm__featuredsessionbox}>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<div className={s.ddm__featuredsessiontitle}>
												<section className={s.ddm__sectionHeader}>
													<h2>Featured Sessions</h2>
													<p>Stories and perspectives on the impact of decision intelligence</p>
												</section>
												<div className={s.ddm__keynoteDetailsWrapper}>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionKeynote}
																data-vimeo-src='https://player.vimeo.com/video/1134741780?h=e9a826bb82&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
																style={{ cursor: 'pointer' }}
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Opening Keynote</h4>
															<p>Decision intelligence isn't coming — it's already here. Aera Technology Co-founder and CEO Fred Laluyaux reveals how leading enterprises are embedding decision intelligence at scale to transform performance, resilience, and the very nature of work. Get a front-row view of the operating model that will define the next decade.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img
																		src={keynoteFred}
																		alt='Fred Laluyaux'
																	/>
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Fred Laluyaux</h5>
																	<p>Co-Founder, President & CEO, Aera Technology</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionHersheyGallo}
																data-vimeo-src='https://player.vimeo.com/video/1134447794?h=a10b2155e9&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Hershey and Gallo’s Decision Intelligence Story</h4>
															<p>Sweet meets bold: discover how two iconic brands—The Hershey Company and Gallo—recently launched their decision intelligence journeys and are already realizing rapid ROI. In just a short time, they’ve achieved faster decision cycles, higher productivity, improved fulfillment, and reduced waste. Hear how quick wins are fueling momentum, what it takes to accelerate value from day one, and their vision for scaling decision intelligence to drive agility and growth.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteDouglas} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Douglas Guilherme</h5>
																	<p>Vice President, Global Supply Chain, The Hershey Company</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteNitin} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Nitin Murali</h5>
																	<p>Vice President of Supply Chain Excellence, Gallo</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionDecisionIntelligence}
																data-vimeo-src='https://player.vimeo.com/video/1134693238?h=e8ed87e1f8&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Decision Intelligence 2025: State of Decisions Today and What's Next?</h4>
															<p>IDC’s Megha Kumar—author of the IDC Decision Intelligence MarketScape —joins Fred Laluyaux to unveil brand-new survey insights on how enterprises are adopting decision intelligence. Gain insight into what's driving adoption trends, where most enterprise are today and where they are heading in their adoption of decision intelligence.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteMegha} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Megha Kumar</h5>
																	<p>Research Vice President - Analytics and AI, IDC</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionAstraZeneca}
																data-vimeo-src='https://player.vimeo.com/video/1134710413?h=43f8525d8f&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Pioneering Self-Healing Supply Chains at AstraZeneca</h4>
															<p>Imagine supply chains that fix themselves. AstraZeneca is making that a reality. Learn how decision intelligence is transforming the company’s clinical and commercial operations — accelerating timelines, expanding scope, and fueling efficiency. A glimpse into the self-healing supply chains of tomorrow happening today.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteEduardo} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Eduardo De La Calle</h5>
																	<p>Executive Director, Intelligent Supply Chain, AstraZeneca</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteSam} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Sam Mulligan</h5>
																	<p>Senior Director of Digital & Lean, Clinical Manufacturing & Supply, AstraZeneca</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionHarvardWGU}
																data-vimeo-src='https://player.vimeo.com/video/1134718201?h=909310683e&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Reinventing Work and Learning: Insights from Harvard Business School and Western Governors University</h4>
															<p>The workforce is being reshaped—fast. As technology and AI accelerate change, Western Governors University is demonstrating how decision intelligence can drive innovation in education—personalizing learning, aligning skills with workforce demand, and preparing talent for the jobs of tomorrow. In this session, Harvard’s Professor Joseph Fuller joins WGU leaders Jennie Sanders and Paul Bingham, moderated by Fred Laluyaux, to explore how decision intelligence is transforming both education and work. Together, they’ll share bold strategies for equipping people—and organizations—to thrive in the future of work.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteFuller} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Joseph Fuller</h5>
																	<p>Professor of Management Practice, Co-Director, Managing the Future of Work Project, Harvard Business School</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynotePaul} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Paul Bingham</h5>
																	<p>Senior Vice President, Executive Dean, Western Governors University</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteJennie} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Jennie Sanders</h5>
																	<p>Vice President, Experiential Product Management, Western Governors University</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={s.ddm__featuredsessionbox}>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<div className={s.ddm__featuredsessiontitle}>
												<section className={s.ddm__sectionHeader}>
													<h2>Product Sessions</h2>
													<p>Starting, scaling, and succeeding with the Aera Decision Cloud</p>
												</section>
												<div className={s.ddm__keynoteDetailsWrapper}>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionDIAgentsDemo}
																data-vimeo-src='https://player.vimeo.com/video/1134726806?h=46ab134b18&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Working Side by Side with Your Decision Intelligence Agent (Live Demo)</h4>
															<p>What does it look like to work with your decision intelligence agent? See how Aera simplifies daily work by automating decisions, orchestrating processes, and surfacing insights in real time. From anticipating demand shifts to optimizing supply and fulfillment, discover how to make faster, smarter, and more agile decisions every day.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteLaurent} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Laurent Lefouet</h5>
																	<p>Chief Strategy Officer, Aera Technology</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteJuliana} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Juliana Giraldo</h5>
																	<p>Client Partner, Aera Technology</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionDecisionCloud}
																data-vimeo-src='https://player.vimeo.com/video/1134753885?h=2e7addac35&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Powering Your Decision Intelligence Agent with Aera Decision Cloud</h4>
															<p>Step into the future of agentic AI. See how Aera Decision Cloud transforms decision-making by rapidly building, deploying, and scaling intelligent skills that learn, adapt, and act in real time.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteMustafa} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Mustafa Kabul</h5>
																	<p>Senior Vice President, Data Science, Machine Learning, and AI, Aera Technology</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteLalitha} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Lalitha Sundaramurthy</h5>
																	<p>Senior Vice President, Head of Product, Aera Technology</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionAeraProduct1}
																data-vimeo-src='https://player.vimeo.com/video/1134773659?h=72588db019&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Aera Product Session: From Idea to Impact — How to Build and Maintain Aera Skills That Delivers</h4>
															<p>Get a practical walkthrough of Aera Workspaces—your hub for building, testing, and refining Aera Skills. Discover how teams collaborate to transform decision processes into automated capabilities for any area of the business.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteLalitha} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Lalitha Sundaramurthy</h5>
																	<p>Senior Vice President, Head of Product, Aera Technology</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionAeraProduct2}
																data-vimeo-src='https://player.vimeo.com/video/1134769787?h=b4c0fd5287&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Aera Product Session: Build Faster with Agentic AI</h4>
															<p>See how Aera’s prebuilt agents and agentic capabilities make it easier than ever to design, deploy, and scale powerful decision-making skills. Learn how enterprises can accelerate skill development while maintaining flexibility and control—unlocking value with speed and precision.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteMustafa} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Mustafa Kabul</h5>
																	<p>Senior Vice President, Data Science, Machine Learning, and AI, Aera Technology</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className={s.ddm__featuredsessionbox}>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<div className={s.ddm__featuredsessiontitle}>
												<section className={s.ddm__sectionHeader}>
													<h2>Partner Sessions</h2>
													<p>Learn how to get the most out of your decision intelligence investments with our partners</p>
												</section>
												<div className={s.ddm__keynoteDetailsWrapper}>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionAccenture}
																data-vimeo-src='https://player.vimeo.com/video/1134748491?h=ccd7ec1fb0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>The Era of Autonomous Operations with Accenture</h4>
															<p>The future belongs to enterprises that can think and act for themselves. Autonomous operations—powered by AI and real-time data—are reshaping how businesses run, enabling intelligent systems that sense, decide, and adapt without human intervention. In this session, Accenture explores how autonomy is redefining resilience and agility in a world of constant disruption. Hear bold perspectives on what it takes to bring autonomy to life at scale and how leading organizations are already harnessing it to outpace change and seize competitive advantage.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteDiego} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Diego Pantoja-Navajas</h5>
																	<p>Managing Director, Enterprise AI Value Strategy, Accenture</p>
																</div>
															</div>
														</div>
													</div>
													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionDeloitte}
																data-vimeo-src='https://player.vimeo.com/video/1134757048?h=e592699668&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>The Value Roadmap: Building and Scaling Decision Intelligence with Deloitte</h4>
															<p>Where do you start? How do you scale? Deloitte reveals a value-first approach to decision intelligence—prioritizing the skills that deliver measurable impact. See how leading enterprises are building roadmaps that scale with confidence and unlock lasting value.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteElizabeth} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Elizabeth Baker</h5>
																	<p>Partner, Supply Chain & Network Operations and Aera Alliance Leader, Deloitte North America</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteKevin} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Kevin Overdulve</h5>
																	<p>Partner, Supply Chain & Network Operations and Aera Alliance Leader, Deloitte EMEA</p>
																</div>
															</div>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteGonzalo} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Gonzalo Benedit</h5>
																	<p>Chief Revenue Officer, Aera Technology</p>
																</div>
															</div>
														</div>
													</div>

													<div className={s.ddm__keywnoteDetailsRow}>
														<div className={s.ddm__keynoteCol1}>
															<img
																src={onDemandSessionEY}
																data-vimeo-src='https://player.vimeo.com/video/1134764962?h=7d6b887a46&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
															/>
														</div>
														<div className={s.ddm__keynoteCol2}>
															<h4>Orchestrating Material Planning Using Agentic AI with EY</h4>
															<p>EY will explore Aera’s agentic AI transformative capabilities in addressing supply chain disruptions. Learn about the business case for implementing agentic AI, and hear guidance on how organizations initiate their autonomous journey and measure its success. Also, EY will showcase a real-world example of how Aera identifies a supplier delay and autonomously reruns scenarios to mitigate material planning risks, using agentic AI.</p>
															<div className={s.ddm__keynoteSpeakerDetails}>
																<div>
																	<img src={keynoteHarrison} />
																</div>
																<div className={s.ddm__keynoteSpeaker}>
																	<h5>Harrison Wickman</h5>
																	<p>Senior Manager, Decision Intelligence, EY</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className={s.ddm__sponsors}>
							<div className={s.ddm__container}>
								<h2>Thank You to Our Sponsors</h2>
								<div className={s.ddm__sponsorswrapper}>
									<div className={s.ddm__sponsor}>
										<img
											src={accentureSponsor}
											alt='accentureSponsor'
										/>
									</div>
									<div className={s.ddm__sponsor}>
										<img
											src={Deloittesponsor}
											alt='Deloittelogo'
										/>
									</div>
									<div className={s.ddm__sponsor}>
										<img
											src={eylogosponsor}
											alt='EYlogo'
										/>
									</div>
									<div className={s.ddm__sponsor}>
										<img
											src={zsLogo}
											alt='zsLogo'
										/>
									</div>
								</div>
							</div>
						</div>
						<Request
							title='See Aera in action.'
							text='Request for Demo'
							link='/demo'
						/>
						<div className={s.ddm__clearfix}></div>
					</div>

					{/* Video Pop-Up */}
					<div
						className={s.ddm__videoPopup}
						id='videoPopup'
					>
						<div className={s.ddm__videoContainer}>
							<button
								className={s.ddm__closeBtn}
								id='closePopup'
							>
								&times;
							</button>
							<div className={s.ddm__videoContainer__videoWrapper}>
								<iframe
									id='vimeoVideo'
									name='vimeoVideo'
									src='https://player.vimeo.com/video/1134741780?h=e9a826bb82&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
									allow='autoplay; fullscreen; picture-in-picture'
									loading='lazy'
								></iframe>
							</div>
							<script src='https://player.vimeo.com/api/player.js'></script>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}
