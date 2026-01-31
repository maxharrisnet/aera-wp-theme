import React, { Component } from 'react';
import Helmet from 'react-helmet';
import s from './GartnerMagicQuadrant.scss';
import Button from '../../components/button';
import Request from '../../components/request';
import gartnerHeroImage from '../../assets/images/gartner/aera-magic-quadrant-hero.png';

const StarIcon = () => (
	<svg
		width='20'
		height='20'
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M10 1.0835L12.8975 6.9535L19.375 7.89475L14.6875 12.4635L15.7938 18.916L10 15.8697L4.20625 18.916L5.3125 12.4635L0.625 7.89475L7.1025 6.9535L10 1.0835Z'
			fill='#FFC861'
		/>
	</svg>
);

const QuoteOpenIcon = () => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M24 0V3.70816C22.8122 4.0515 21.8341 4.70386 21.0655 5.66524C20.2969 6.62661 19.7031 7.86266 19.2838 9.37339C18.9345 10.8841 18.7598 12.5322 18.7598 14.3176H22.8472V24H13.9389V15.4506C13.9389 11.5365 14.4978 8.51502 15.6157 6.38627C16.7336 4.18884 18.0611 2.64378 19.5983 1.75107C21.1354 0.789702 22.6026 0.20601 24 0ZM10.0611 0V3.70816C8.80349 4.0515 7.79039 4.70386 7.02183 5.66524C6.32314 6.62661 5.76419 7.86266 5.34498 9.37339C4.99563 10.8841 4.82096 12.5322 4.82096 14.3176H8.9083V24H0V15.4506C0 11.5365 0.558952 8.51502 1.67686 6.38627C2.79476 4.18884 4.12227 2.64378 5.65939 1.75107C7.19651 0.789702 8.66376 0.20601 10.0611 0Z'
			fill='#BBE1FA'
		/>
	</svg>
);

const QuoteCloseIcon = () => (
	<svg
		width='24'
		height='25'
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M-1.90735e-06 24.4951L-1.57649e-06 20.7105C1.18777 20.3601 2.16594 19.6943 2.9345 18.7131C3.70306 17.7319 4.29694 16.4703 4.71616 14.9285C5.0655 13.3866 5.24018 11.7045 5.24018 9.88231L1.15284 9.88231L1.15284 0.000268846L10.0611 0.000269625L10.0611 8.7259C10.0611 12.7208 9.50218 15.8045 8.38428 17.9772C7.26637 20.2199 5.93886 21.7968 4.40174 22.7079C2.86463 23.6891 1.39738 24.2849 -1.90735e-06 24.4951ZM13.9389 24.4951L13.9389 20.7105C15.1965 20.3601 16.2096 19.6943 16.9782 18.7131C17.6769 17.7319 18.2358 16.4703 18.655 14.9285C19.0044 13.3866 19.179 11.7045 19.179 9.88231L15.0917 9.88231L15.0917 0.000270065L24 0.000270844L24 8.7259C24 12.7208 23.441 15.8045 22.3231 17.9772C21.2052 20.2199 19.8777 21.7968 18.3406 22.7079C16.8035 23.6891 15.3362 24.2849 13.9389 24.4951Z'
			fill='#BBE1FA'
		/>
	</svg>
);

const ArrowLeftIcon = () => (
	<svg
		width='28'
		height='21'
		viewBox='0 0 28 21'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M27.1667 10.5H0.5M0.5 10.5L10.5 20.5M0.5 10.5L10.5 0.5'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const ArrowRightIcon = () => (
	<svg
		width='25'
		height='25'
		viewBox='0 0 25 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M0.5 12.1667H23.8333M23.8333 12.1667L12.1667 0.5M23.8333 12.1667L12.1667 23.8333'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const testimonials = [
	{
		id: 1,
		stars: 5,
		platform: 'Aera Decision Cloud',
		quote: 'Flexible Platform Enables Integration of Advanced Technologies in Process Flows',
		subquote: 'Great Accelerator Skills/Use Cases. Highly Composable Platform. Very Reactive/Responsive Team.',
		title: 'Senior Director of the Center of Excellence',
		industry: 'Consumer Goods Industry',
		companySize: '3B - 10B USD Company Size',
	},
	{
		id: 2,
		stars: 5,
		platform: 'Aera Decision Cloud',
		quote: 'Early Results Meet Expectations With Strong Support and Return on Investment',
		subquote: 'Experience has been great and exceeding expectations. The early results and ROI have been in accordance with the plan and the engagement and support from Aera helps in addressing any need.',
		title: 'Supply Chain Global Vice President',
		industry: 'Consumer Goods Industry',
		companySize: '10B - 30B USD Company Size',
	},
	{
		id: 3,
		stars: 5,
		platform: 'Aera Decision Cloud',
		quote: 'Aera is leading in the Decision Intelligence space',
		subquote: "Aera's leadership team has been very engaged and supportive on our journey.",
		title: 'Senior Director Supply Chain Digital Transformation',
		industry: 'Consumer Goods Industry',
		companySize: ' 10B - 30B USD Company Size',
	},
	{
		id: 4,
		stars: 5,
		platform: 'Aera Decision Cloud',
		quote: 'Autonomously Decision making and with intelligence at scale',
		subquote: 'Aera delivers a powerful, intuitive platform for real-time decision-making and automation at scale. its cognitive intelligence layer empowers data to be pre-processed for precise micro and macro level decisions.. This enables fast, high quality decisions and builds trust n both data integration and decision outcomes by promoting a data-first decision making mindset, aera fosters confidence in the reliability and value of enterprise data.',
		title: 'Group Product Manager',
		industry: 'Transportation Industry',
		companySize: '30B+ USD Company Size',
	},
	{
		id: 5,
		stars: 5,
		platform: 'Aera Decision Cloud',
		quote: 'Aera Supports Faster Decision Making With Automated Write Back Functionality',
		subquote: 'Aera is delivering meaningful cost savings to our organization and expediting our journey towards decision intelligence.',
		title: 'Vice President, IT',
		industry: 'Consumer Goods Industry',
		companySize: '10B - 30B USD Company Size',
	},
];

export default class GartnerMagicQuadrant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTestimonialIndex: 1,
			isTransitioning: true,
			perView: 3,
			gapPx: 24,
		};
		this.carouselRef = React.createRef();
		this.touchStartX = 0;
		this.touchStartY = 0;
		this.formSectionRef = React.createRef();
	}

	componentDidMount() {
		this.updateCarouselLayout();
		window.addEventListener('resize', this.updateCarouselLayout);

		const script2 = document.createElement('script');
		script2.src = 'https://js.hsforms.net/forms/embed/v2.js';
		document.body.appendChild(script2);

		// Hubspot Form
		script2.addEventListener('load', () => {
			if (window.hbspt) {
				window.hbspt.forms.create({
					portalId: '4455954',
					formId: 'a3ab13fa-2ecb-4fed-9710-6612195978f5',
					region: 'na2',
					sfdcCampaignId: '701Rb00000deRRFIA2',
					target: '#gartner-hubspot-form',
					css: `
#gartner-hubspot-form .hs-form { width: 100%; }
#gartner-hubspot-form .hs-form .hs-form-iframe { width: 100%; }
body h3 { font-family: "Gilroy", sans-serif !important; font-weight: 700; font-size: 20px; }
#gartner-hubspot-form .hs-form .hs-form-iframe fieldset { margin-bottom: 20px; border: none; padding: 0; }
#gartner-hubspot-form .hs-form .hs-form-field { margin-bottom: 20px; }
#gartner-hubspot-form .hs-form .hs-form-field label { display: block; margin-bottom: 8px; font-weight: 350; font-size: 20px; color: #3e424c; }
#gartner-hubspot-form .hs-form .hs-form-field label span.hs-form-required { color: #e74c3c; margin-left: 4px; }
#gartner-hubspot-form .hs-form .hs-form-field .input { position: relative; }
#gartner-hubspot-form .hs-form input.hs-input,
#gartner-hubspot-form .hs-form select.hs-input { width: 100%; padding: 12px 15px; border: none; border-bottom: 1px solid #1a1a1a; border-radius: 0; font-size: 14px; background-color: transparent; color: #1a1a1a; transition: all 0.3s ease; box-sizing: border-box; }
#gartner-hubspot-form .hs-form input.hs-input:focus,
#gartner-hubspot-form .hs-form select.hs-input:focus { border-color: #00619e; outline: none; box-shadow: 0 0 0 3px rgba(0, 97, 158, 0.1); }
#gartner-hubspot-form .hs-form input.hs-input.error,
#gartner-hubspot-form .hs-form select.hs-input.error { border-color: #e74c3c; background-color: #fef5f5; }
#gartner-hubspot-form .hs-form input.hs-input::placeholder,
#gartner-hubspot-form .hs-form select.hs-input::placeholder { color: #999; }
#gartner-hubspot-form .hs-form .hs-error-msgs { list-style: none; padding: 0; margin: 4px 0 0 0; }
#gartner-hubspot-form .hs-form .hs-error-msgs .hs-error-msg { color: #e74c3c; font-size: 12px; font-family: "FreightSans Pro", sans-serif; margin: 0; }
#gartner-hubspot-form .hs-form .hs-richtext p { font-family: "FreightSans Pro", sans-serif; font-weight: 350; font-size: 10px; }
#gartner-hubspot-form .hs-form .hs_submit { margin-top: 20px; }
#gartner-hubspot-form .hs-form .hs_submit .actions { display: flex; gap: 10px; }
#gartner-hubspot-form .hs-form .hs_submit input[type='submit'].hs-button { appearance: none; display: inline-flex; justify-content: center; position: relative; padding: 0 2.85714em; height: 3.57143em; font-family: "Gilroy",sans-serif; font-weight: 600; line-height: 3.57143; letter-spacing: .025em; text-transform: uppercase; text-decoration: none; white-space: nowrap; border-radius: 999px; border: 1px solid #bee9f3; cursor: pointer; background: rgba(255,255,255,.5); transition: 180ms; transition-property: border-color,background-color,color,opacity; color: #1a1a1a; border-color: rgba(138,196,232,.5); }
#gartner-hubspot-form .hs-form .hs_submit input[type='submit'].hs-button:hover { background-color: #hawkesblue; border-color: #hawkesblue rgba(255,255,255,0) #oysterbay; background-image: linear-gradient(rgba(#oysterbay,0) 0%, #oysterbay 90%); }
#gartner-hubspot-form .hs-form .hs_submit input[type='submit'].hs-button:focus { outline: none; }
#gartner-hubspot-form .hs-form .legal-consent-container { margin-bottom: 20px; }
#gartner-hubspot-form .hs-form .legal-consent-container .hs-richtext p { font-family: "FreightSans Pro", sans-serif; font-weight: 350; font-size: 12px; color: #3e424c; line-height: 1.5; margin: 0; }
#gartner-hubspot-form .hs-form .legal-consent-container .hs-richtext p a { color: #00619e; text-decoration: none; }
#gartner-hubspot-form .hs-form .legal-consent-container .hs-richtext p a:hover { text-decoration: underline; }
#gartner-hubspot-form .hs-form .hs_recaptcha { margin-bottom: 20px; }
#gartner-hubspot-form .hs-form .hs_recaptcha .grecaptcha-badge { opacity: 0.8 !important; }
					`,
				});
			}
		});

		// Ad roll segment recording
		if (window.location.pathname == '/gartner-magic-quadrant-decision-intelligence-leader') {
			this.recordAdRollSegment('1234567890');
		}
	}

	scrollToForm = () => {
		const target = this.formSectionRef.current;
		if (!target) return;
		const isMobile = window.innerWidth <= 1080;
		const offset = isMobile ? -700 : 80;
		const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateCarouselLayout);
	}

	updateCarouselLayout = () => {
		const w = window.innerWidth || 1024;
		let perView = 3;
		let gapPx = 20;
		if (w <= 720) {
			perView = 1;
			gapPx = 15;
		} else if (w <= 960) {
			perView = 2;
			gapPx = 20;
		}
		this.setState((prev) => ({
			perView,
			gapPx,
			currentTestimonialIndex: prev.currentTestimonialIndex % testimonials.length,
		}));
	};

	recordAdRollSegment(segmentId, attempts = 0) {
		if (window.__adroll && window.__adroll.record_user) {
			window.__adroll.record_user({
				segment_ids: [segmentId],
				user_id: Math.random().toString(36).substring(7),
			});
		} else if (attempts < 5) {
			setTimeout(() => {
				this.recordAdRollSegment(segmentId, attempts + 1);
			}, 1000);
		}
	}

	handleNextTestimonial = () => {
		this.setState(
			(prevState) => ({
				currentTestimonialIndex: prevState.currentTestimonialIndex + 1,
				isTransitioning: true,
			}),
			() => {
				// Reset to the beginning when reaching the cloned items
				// We show 3 cards at a time, so reset when we've scrolled past the original array
				if (this.state.currentTestimonialIndex >= testimonials.length) {
					setTimeout(() => {
						this.setState({
							currentTestimonialIndex: 0,
							isTransitioning: false,
						});
					}, 500); // Match the CSS transition duration
				}
			}
		);
	};

	handlePrevTestimonial = () => {
		this.setState(
			(prevState) => {
				// If at the beginning, jump to the end without transition
				if (prevState.currentTestimonialIndex === 0) {
					return {
						currentTestimonialIndex: testimonials.length,
						isTransitioning: false,
					};
				}
				return {
					currentTestimonialIndex: prevState.currentTestimonialIndex - 1,
					isTransitioning: true,
				};
			},
			() => {
				// Re-enable transition after jumping and move back one more
				if (this.state.currentTestimonialIndex === testimonials.length && !this.state.isTransitioning) {
					setTimeout(() => {
						this.setState({
							currentTestimonialIndex: testimonials.length - 1,
							isTransitioning: true,
						});
					}, 50);
				}
			}
		);
	};

	handleTouchStart = (event) => {
		const touch = event.touches && event.touches[0];
		if (!touch) return;
		this.touchStartX = touch.clientX;
		this.touchStartY = touch.clientY;
	};

	handleTouchEnd = (event) => {
		const touch = event.changedTouches && event.changedTouches[0];
		if (!touch) return;
		const deltaX = touch.clientX - this.touchStartX;
		const deltaY = touch.clientY - this.touchStartY;

		// Guard against vertical scrolls; require horizontal intent and a reasonable swipe distance
		if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

		if (deltaX > 0) {
			this.handlePrevTestimonial();
		} else {
			this.handleNextTestimonial();
		}
	};

	render() {
		return (
			<div className={s.gmq}>
				<Helmet>
					<title>Gartner® Magic Quadrant™ for Decision Intelligence Platforms 2026</title>
					<meta
						name='description'
						content='Discover the first Gartner® Magic Quadrant™ for Decision Intelligence Platforms and why Aera Technology was named a Leader in this emerging category.'
					/>
					<meta
						property='og:title'
						content='Gartner® Magic Quadrant™ for Decision Intelligence Platforms 2026'
					/>
					<meta
						property='og:description'
						content='Discover the first Gartner® Magic Quadrant™ for Decision Intelligence Platforms and why Aera Technology was named a Leader in this emerging category.'
					/>
					<meta
						property='og:image'
						content='https://images.ctfassets.net/mh1amgo8m7ts/1xi9O6ktv0CkYOcWMAR36W/d48bfc5736dfb4147b000a7a684348be/aera-gartner-mq-page-thumbnail.png'
					/>
					<meta
						property='og:image:width'
						content='1200'
					/>
					<meta
						property='og:image:height'
						content='630'
					/>
					<meta
						property='og:type'
						content='website'
					/>
					<meta
						name='twitter:card'
						content='summary_large_image'
					/>
					<meta
						name='twitter:title'
						content='Gartner® Magic Quadrant™ for Decision Intelligence Platforms 2026'
					/>
					<meta
						name='twitter:description'
						content='Discover the first Gartner® Magic Quadrant™ for Decision Intelligence Platforms and why Aera Technology was named a Leader in this emerging category.'
					/>
					<meta
						name='twitter:image'
						content='https://images.ctfassets.net/mh1amgo8m7ts/2PGIjOLJ5qbLT9SeGAuiqC/318882e0b55dd204dbdb7837fd0b1c43/mq-page-thumbnail.jpg'
					/>
					<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'></script>
					<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'></script>
				</Helmet>

				{/* Hero Section */}
				<section className={s.gmq__hero}>
					<div className={s.gmq__heroContainer}>
						<div className={s.gmq__heroLeft}>
							<div className={s.gmq__eyebrow}>Report</div>
							<h1 className={s.gmq__heroTitle}>
								Aera Technology named a Leader in the Gartner<sup>®</sup> Magic Quadrant<sup>™</sup> for Decision Intelligence Platforms.
							</h1>
							<p className={s.gmq__heroSubtitle}>
								Get the first Gartner<sup>®</sup> Magic Quadrant<sup>™</sup> for Decision Intelligence Platforms for a clear, research-backed framework to optimize and automate decisions at scale.
							</p>
							<div className={s.gmq__heroCTA}>
								<Button
									type='solid'
									className={s.gmq__heroBtn}
									mobileFull
									onClick={this.scrollToForm}
								>
									Access the Report
								</Button>
							</div>
						</div>
						<div className={s.gmq__heroRight}>
							<div className={s.gmq__heroImage}>
								<img
									src={gartnerHeroImage}
									alt='Gartner Magic Quadrant Chart'
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Form Section */}
				<section
					className={s.gmq__formSection}
					ref={this.formSectionRef}
				>
					<div className={s.gmq__formContainer}>
						<div className={s.gmq__formLeft}>
							<h2 className={s.gmq__formTitle}>Why This Matters Now</h2>
							<h3 className={s.gmq__formSubtitle}>"By 2027, 50% of business decisions will have been augmented or automated by AI agents for decision intelligence."</h3>
							<p className={s.gmq__formDescription}>
								We believe the debut of the{' '}
								<strong>
									Gartner<sup>®</sup> Magic Quadrant<sup>™</sup> for Decision Intelligence Platforms
								</strong>{' '}
								signals accelerating demand for solutions that deliver measurable business outcomes through faster, more accurate decisions. 
							</p>
							<p className={s.gmq__formDescription}>Every enterprise is being asked to make timely, accurate decisions in volatile, uncertain, complex, and ambiguous conditions. Decision intelligence platforms increase the speed and accuracy of decisions, closing the gap between insight and action. By enabling decisions to be modeled, improved, and executed consistently, decision intelligence can reduce the risk of poor decisions, anticipate change more effectively, and respond faster to opportunities at scale.</p>
							<p className={s.gmq__formDescription}>
								The{' '}
								<strong>
									Gartner<sup>®</sup> Magic Quadrant<sup>™</sup> for Decision Intelligence Platforms
								</strong>{' '}
								provides a clear framework to compare providers as decision intelligence adoption expands across the enterprise.
							</p>
						</div>
						<div className={s.gmq__formRight}>
							<div
								id='gartner-hubspot-form'
								className='gartner-hubspot-form'
								style={{ width: '100%' }}
							/>
						</div>
					</div>
				</section>

				{/* Testimonials Carousel Section */}
				<section className={s.gmq__testimonialsSection}>
					<div className={s.gmq__testimonialsContainer}>
						<h2 className={s.gmq__sectionTitle}>
							Gartner Peer Insights<sup>™</sup> Review
						</h2>

						<div
							className={s.gmq__carouselWrapper}
							onTouchStart={this.handleTouchStart}
							onTouchEnd={this.handleTouchEnd}
						>
							<div
								ref={this.carouselRef}
								className={s.gmq__carousel}
								style={{
									transform: `translateX(calc(-${this.state.currentTestimonialIndex} * (100% / ${this.state.perView} + ${this.state.gapPx}px / ${this.state.perView})))`,
									transition: this.state.isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
								}}
							>
								{/* Render testimonials plus cloned first N items (perView) for seamless loop */}
								{[...testimonials, ...testimonials.slice(0, this.state.perView)].map((testimonial, index) => (
									<article
										key={`${testimonial.id}-${index}`}
										className={s.gmq__testimonialCard}
									>
										<div className={s.gmq__testimonialContent}>
											<header>
												<div className={s.gmq__testimonialStars}>
													{Array.from({ length: testimonial.stars }).map((_, i) => (
														<span
															key={i}
															className={s.gmq__starIcon}
														>
															<StarIcon />
														</span>
													))}
												</div>
												<div className={s.gmq__testimonialPlatform}>{testimonial.platform}</div>
											</header>
											<div className={s.gmq__quoteWrapper}>
												<span className={s.gmq__quoteIcon}>
													<QuoteOpenIcon />
												</span>
												<blockquote className={s.gmq__testimonialQuote}>
													<p>{testimonial.quote}</p>
												</blockquote>
												<p className={s.gmq__testimonialSubquote}>{testimonial.subquote}</p>

												<span className={s.gmq__quoteIcon}>
													<QuoteCloseIcon />
												</span>
											</div>
										</div>

										<footer className={s.gmq__testimonialAuthor}>
											<div className={s.gmq__authorTitle}>
												<strong>{testimonial.title}</strong>
											</div>
											<div className={s.gmq__authorMeta}>{testimonial.industry}</div>
											<div className={s.gmq__authorMeta}>{testimonial.companySize}</div>
										</footer>
									</article>
								))}
							</div>
						</div>

						<nav className={s.gmq__carouselControls}>
							<Button
								type='default'
								onClick={this.handlePrevTestimonial}
								aria-label='Previous testimonial'
								className={s.gmq__arrowButton}
							>
								<ArrowLeftIcon />
							</Button>
							<Button
								type='default'
								onClick={this.handleNextTestimonial}
								aria-label='Next testimonial'
								className={s.gmq__arrowButton}
							>
								<ArrowRightIcon />
							</Button>
						</nav>

						<div className={s.gmq__readAllReviews}>
							<Button
								type='default'
								to='https://www.gartner.com/reviews/market/decision-intelligence-platforms/vendor/aera-technology/reviews'
								target='_blank'
								rel='noopener noreferrer'
							>
								Read the Full Review
							</Button>
						</div>
					</div>
				</section>

				{/* See Aera in Action CTA */}
				<Request
					title='See Aera in action.'
					text='Book a Demo'
					link='/demo'
				/>
				<div className={s.ddm__clearfix}></div>

				{/* Disclaimer Section */}
				<section className={s.gmq__disclaimerSection}>
					<div className={s.gmq__disclaimerContainer}>
						<p className={s.gmq__disclaimerText}>Gartner, Magic Quadrant for Decision Intelligence Platforms,  David Pidsley, Carlie Idoine, Gareth Herschel, Kevin Quinn, Kjell Carlsson, 26 January 2026</p>

						<p className={s.gmq__disclaimerText}>Gartner, Magic Quadrant, Peer Insights are trademarks of Gartner, Inc., and/or its affiliates.</p>

						<p className={s.gmq__disclaimerText}>Gartner does not endorse any company, vendor, product or service depicted in its publications, and does not advise technology users to select only those vendors with the highest ratings or other designation. Gartner publications consist of the opinions of Gartner’s business and technology insights organization and should not be construed as statements of fact. Gartner disclaims all warranties, expressed or implied, with respect to this publication, including any warranties of merchantability or fitness for a particular purpose.</p>

						<p className={s.gmq__disclaimerText}>Gartner Peer Insights content consists of the opinions of individual end users based on their own experiences, and should not be construed as statements of fact, nor do they represent the views of Gartner or its affiliates. Gartner does not endorse any vendor, product or service depicted in this content nor makes any warranties, expressed or implied, with respect to this content, about its accuracy or completeness, including any warranties of merchantability or fitness for a particular purpose.</p>
					</div>
				</section>
			</div>
		);
	}
}
