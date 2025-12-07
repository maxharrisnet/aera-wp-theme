import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Page from 'components/page';
import s from './AeraHub25.scss';
import AeraLogo1 from 'assets/images/aerahub2025/AERAHUB24_LOGO.png';
import HeroVideo from 'assets/images/aerahub2025/aerahub2025video.mp4';
import HeroLogo from 'assets/images/aerahub2025/AERAHUB25.png';
import aipowerinnovation from 'assets/images/aerahub2025/aipowerinnovation.jpg';
import businessimpact from 'assets/images/aerahub2025/businessimpact.jpg';
import techdemos from 'assets/images/aerahub2025/techdemos.jpg';
import successtories from 'assets/images/aerahub2025/successtories.jpg';
import map from 'assets/images/aerahub2025/map.jpg';
import brewery from 'assets/images/aerahub2025/brewery.jpg';
import Fred from 'assets/images/aerahub2025/FredLaluyaux.png';
import GrahamSommer from 'assets/images/aerahub2025/GrahamSommer.png';
import MatthewBurton from 'assets/images/aerahub2025/MatthewBurton.png';
import MattYork from 'assets/images/aerahub2025/MattYork.jpeg';
import JPlebudel from 'assets/images/aerahub2025/JPlebudel.jpeg';
import GualtieroCerrato from 'assets/images/aerahub2025/gualtiero.jpg';
import accenturelogo from 'assets/images/aerahub2024/Accenture_logo.png';
import kris from 'assets/images/aerahub2025/kris.jpeg';
import castrol from 'assets/images/aerahub2025/CastrolLogo.png';
import AeraLogo from 'assets/images/aerahub2025/AeraLogo.png';
import SamMulligan from 'assets/images/aerahub2025/SamMulligan.jpg';
import AstraZeneca from 'assets/images/aerahub2025/AstraZeneca.png';
import Pragati from 'assets/images/aerahub2025/pragatiLodha.jpg';
import zsLogo from 'assets/images/aerahub2025/zs_logo.png';

import GregoryLera from 'assets/images/aerahub2025/GregoryLera.jpeg';
import ArchanaRavi from 'assets/images/aerahub2025/ArchanaRavi.jpeg';
import MahendraGadiyar from 'assets/images/aerahub2025/Mahendra_Gadiyar_Mars.jpeg';
import Jeroen_Nysen from 'assets/images/aerahub2025/Jeroen_Nysen_Deloitte.jpg';
import MarsLogo from 'assets/images/aerahub2025/MarsLogo.png';
import DeloitteLogo from 'assets/images/aerahub2024/deloittelogo.png';
import asterzenecaFeat from 'assets/images/aerahub2025/asterzeneca.png';
import castrolFeat from 'assets/images/aerahub2025/castrol.png';
import smalldownicon from 'assets/images/aerahub2025/smalldownicon.png';
import accentureSession from 'assets/images/aerahub2025/accentureSession.png';
import unileverSession from 'assets/images/aerahub2025/unileverSession.png';
import astrazenacaSession from 'assets/images/aerahub2025/astrazenacaSession.png';
import PMIsession from 'assets/images/aerahub2025/PMIsession.png';
import marsSession from 'assets/images/aerahub2025/marsSession.png';
import castrolSession from 'assets/images/aerahub2025/castrolSession.png';
import KevinOverdulve from 'assets/images/aerahub2025/KevinOverdulve.jpeg';
import Lalitha from 'assets/images/company/lalitha.jpg';
import Mustafa from 'assets/images/company/Mustafa.jpg';
import LarissaSliwinski from 'assets/images/aerahub2025/LarissaSliwinski.jpg';

import Fred3x from 'assets/images/aerahub2025/FredLaluyaux3x.png';
import GrahamSommer3x from 'assets/images/aerahub2025/GrahamSommer3x.png';
import MatthewBurton3x from 'assets/images/aerahub2025/MatthewBurton3x.png';

import eylogo from 'assets/images/aerahub2024/eylogo.png';
import UNILEVER from 'assets/images/aerahub2024/UNILEVER.png';
import unileverFeatImg from 'assets/images/aerahub2025/unileverFeatImg.jpg';
import PhilipMorrisLogo from 'assets/images/aerahub2024/PhilipMorrisLogo.png';
import KarlBougue from 'assets/images/aerahub2025/KarlBougue.jpg';
import Gonzalo from 'assets/images/company/gonzolo.jpg';
import Laurent from 'assets/images/company/laurent.jpg';

import LinkedinIcon from 'assets/images/aerahub2024/LinkedIn.png';
import TwitterIcon from 'assets/images/aerahub2024/Twitter.png';
import YoutubeIcon from 'assets/images/aerahub2024/Youtube.png';

export default class AeraHub25London extends Component {
	componentDidUpdate() {
		if (window.location.pathname == '/aerahub-2025-london') {
			$('#headnav').hide();
			$('#aeraLogo').hide();
			//$('#footer').hide();
		}
		// else if(window.location.pathname != '/aerahub-2025'){
		//   $('#headnav').show();
		//   $('#footer').show();
		// }
	}

	componentDidMount() {
		$('div[data-accordian="sessionAccenture"]').on('click', function () {
			$('div[data-description="sessionDescriptionAccenture"] p').slideToggle(100);
			if ($('div[data-accordian="sessionAccenture"] img').hasClass('rotateArrow')) {
				$('div[data-accordian="sessionAccenture"] img').removeClass('rotateArrow');
			} else {
				$('div[data-accordian="sessionAccenture"] img').addClass('rotateArrow');
			}
		});

		$('div[data-accordian="sessionUnilever"]').on('click', function () {
			$('div[data-description="sessionDescriptionUnilever"] p').slideToggle(100);
			if ($('div[data-accordian="sessionUnilever"] img').hasClass('rotateArrow')) {
				$('div[data-accordian="sessionUnilever"] img').removeClass('rotateArrow');
			} else {
				$('div[data-accordian="sessionUnilever"] img').addClass('rotateArrow');
			}
		});

		$('div[data-accordian="sessionAstra"]').on('click', function () {
			$('div[data-description="sessionDescriptionAstra"] p').slideToggle(100);
			if ($('div[data-accordian="sessionAstra"] img').hasClass('rotateArrow')) {
				$('div[data-accordian="sessionAstra"] img').removeClass('rotateArrow');
			} else {
				$('div[data-accordian="sessionAstra"] img').addClass('rotateArrow');
			}
		});

		$('div[data-accordian="sessionPMI"]').on('click', function () {
			$('div[data-description="sessionDescriptionPMI"] p').slideToggle(100);
			if ($('div[data-accordian="sessionPMI"] img').hasClass('rotateArrow')) {
				$('div[data-accordian="sessionPMI"] img').removeClass('rotateArrow');
			} else {
				$('div[data-accordian="sessionPMI"] img').addClass('rotateArrow');
			}
		});

		$('div[data-accordian="sessionCastrol"]').on('click', function () {
			$('div[data-description="sessionDescriptionCastrol"] p').slideToggle(100);
			if ($('div[data-accordian="sessionCastrol"] img').hasClass('rotateArrow')) {
				$('div[data-accordian="sessionCastrol"] img').removeClass('rotateArrow');
			} else {
				$('div[data-accordian="sessionCastrol"] img').addClass('rotateArrow');
			}
		});

		$('div[data-accordian="sessionMars"]').on('click', function () {
			$('div[data-description="sessionDescriptionMars"] p').slideToggle(100);
			if ($('div[data-accordian="sessionMars"] img').hasClass('rotateArrow')) {
				$('div[data-accordian="sessionMars"] img').removeClass('rotateArrow');
			} else {
				$('div[data-accordian="sessionMars"] img').addClass('rotateArrow');
			}
		});

		$(function () {
			var slider = $('#bx-featuredslider').bxSlider({
				auto: true,
				pause: 6000,
				controls: false,
				pager: true,
				adaptiveHeight: $(window).width() < 720 ? true : true,
				moveSlides: 1,
				pagerCustom: '#bx-featuredpager',
				touchEnabled: false,
				onSlideAfter: function () {
					//$('#bx-featuredpager a').css('backgroundColor','#DFE8EE');
					var thumbIndex = $('#bx-featuredpager a').attr('data-slide-index');
					console.log(thumbIndex);
				},
			});
		});
		//$('#bx-featuredpager a[data-slide-index="0"]').css('backgroundColor','#5C6475');
		//$('#bx-featuredpager a[data-slide-index="0"]').css('backgroundImage','linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)');

		$('#bx-featuredpager a').on('click touchstart', function () {
			var thumbIndex = $('#bx-featuredpager a').index(this);
			//console.log(thumbIndex);

			$('#bx-featuredpager a').css('backgroundColor', '#DFE8EE');
			// $('#bx-featuredpager a').css('border','2px solid #bee9f3');
			// $('#bx-featuredpager a').css('borderColor','rgba(138,196,232,.5)');
			// $('#bx-featuredpager a').css('backgroundImage','linear-gradient(white, white)');

			$(this).css('backgroundColor', '#5C6475');
			//$(this).css('borderColor','#dee8fb');
			//$(this).css('backgroundImage','linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)');
		});

		var aChildren = $('#navLinks a'); // find the a children of the list items
		var gap = 100; //Navigation height
		var aArray = []; // create the empty aArray
		for (var i = 0; i < aChildren.length; i++) {
			var aChild = aChildren[i];
			if (!$(aChild).hasClass('extLink')) {
				if ($(aChild).attr('rel')) {
					var ahref = $(aChild).attr('rel');
					aArray.push(ahref);
				}
			}
		}

		//On Scroll - Add class active to active tab
		$(window).scroll(function () {
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();
			for (i = 0; i < aArray.length; i++) {
				var theID = aArray[i];
				var divPos = $('#' + theID).offset().top; // get the offset of the div from the top of page
				var divHeight = $('#' + theID).outerHeight(); // get the height of the div in question
				if (windowPos >= divPos - gap && windowPos < divPos - gap + divHeight) {
					// $("a[rel='" + theID + "']").addClass("active");
					$("a[rel='" + theID + "']").css('border-bottom', '2px solid #85daca');
				} else {
					// $("a[rel='" + theID + "']").removeClass("active");
					$("a[rel='" + theID + "']").css('border-bottom', '2px solid transparent');
				}
			}

			//If document has scrolled to the end. Add active class to the last navigation menu
			if (windowPos + windowHeight == docHeight) {
				if (!$('#navLinks a:last-child').hasClass('active')) {
					var navActiveCurrent = $('.active').attr('rel');
					$("a[rel='" + navActiveCurrent + "']").removeClass('active');
					$('#navLinks a:last-child').addClass('active');
				}
			}
		});

		//On Click
		$('#navLinks a').on('click', function () {
			if (!$(this).hasClass('extLink')) {
				var href = $(this).attr('rel');
				var gap = 0; //Navigation height

				$('html,body').animate(
					{
						scrollTop: $('#' + href).offset().top - 80,
					},
					1000
				);
			}
		});

		const openPopup = document.getElementById('openPopup');
		const closePopup = document.getElementById('closePopup');
		const videoPopup = document.getElementById('videoPopup');
		const videoPlayer = document.getElementById('videoPlayer');
		const toggleMenu = document.getElementById('toggleMenu');

		openPopup.addEventListener('click', () => {
			//videoPopup.classList.add("active");
			document.getElementById('videoPopup').style.display = 'flex';
			// videoPlayer.play();
			document.getElementById('vimeoVideo').src += '&autoplay=1';
		});

		closePopup.addEventListener('click', () => {
			document.getElementById('videoPopup').style.display = 'none';
			// videoPlayer.pause();
			document.getElementById('vimeoVideo').src = document.getElementById('vimeoVideo').src.replace('&autoplay=1', '');
			//document.getElementById("vimeoVideo").src += "&autoplay=0";
		});

		videoPopup.addEventListener('click', (e) => {
			if (e.target === videoPopup) {
				document.getElementById('videoPopup').style.display = 'none';
				// videoPlayer.pause();
				document.getElementById('vimeoVideo').src = document.getElementById('vimeoVideo').src.replace('&autoplay=1', '');
				//document.getElementById("vimeoVideo").src += "&autoplay=0";
			}
		});

		// toggleMenu.addEventListener("click", () => {
		//   document.getElementById("navLinks").style.display = "flex";
		// });
		if ($(window).width() < 768) {
			$('#toggleMenu, #navLinks a').on('click', function () {
				$('#navLinks').slideToggle();
			});
		}

		// $("#testdrivebtn, #register, #registertoday, #saveseat").click(function() {
		//   $('html, body').animate({
		//       scrollTop: $("#ddmslider").offset().top
		//   }, 1000);
		// })

		$('#registerbtn, #heroButton, #footercta').click(function () {
			$('html, body').animate(
				{
					scrollTop: $('#scrollForm').offset().top - 120,
				},
				1000
			);
		});
		// function toggleMenu() {
		//         document.getElementById("#navLinks").slide();
		//     }

		//   $("#hideMe").on("contextmenu",function(e){
		//     return false;
		//  });

		// const script = document.createElement('script');
		//   script.src = 'https://js.hsforms.net/forms/embed/v2.js';
		//   document.body.appendChild(script);

		//   script.addEventListener('load', () => {
		//       if(window.hbspt) {
		//         window.hbspt.forms.create({
		//         portalId: '4455954',
		//         formId: 'f3905e25-4190-48d3-8fdf-2ed25e839c7c',
		//         target: '#testdriveForm',
		//       })
		//     }
		//   });

		const script2 = document.createElement('script');
		script2.src = 'https://js.hsforms.net/forms/embed/v2.js';
		document.body.appendChild(script2);

		script2.addEventListener('load', () => {
			if (window.hbspt) {
				hbspt.forms.create({
					portalId: '4455954',
					formId: '5348ec0a-1785-4bdf-a47a-fe7e779a4e1a',
					region: 'na1',
					sfdcCampaignId: '701Rb00000Oi4BvIAJ',
					target: '#stickyform',
				});
				//   window.hbspt.forms.create({
				//   portalId: '4455954',
				//   formId: 'f3905e25-4190-48d3-8fdf-2ed25e839c7c',
				//   target: '#stickyform',
				//   onFormSubmit: function($form) {
				//     $('#hideMe').hide(300);
				//     $('#removeBlurr').css('filter','blur(0px)')
				//   }
				// })
			}
		});

		if (window.location.pathname == '/aerahub-2025-london') {
			$('#headnav').hide();
			$('#aeraLogo').hide();
			//$('#footer').hide();
		}
		// else if(window.location.pathname != '/aerahub-2025'){
		//   $('#headnav').show();
		//   //$('#footer').show();
		// }

		// let searchParams = new URLSearchParams(window.location.search)
		// searchParams.has('access') // true
		// let paramId = searchParams.get('access');
		// if(paramId == 'direct'){
		//   $('#hideMe').hide();
		//   $('#removeBlurr').css('filter','blur(0px)')
		// }

		// window.addEventListener("resize", this.handleResize);

		//   var position = $(window).scrollTop();
		//   $(window).scroll(function() {
		//     var scroll = $(window).scrollTop();
		//       if(scroll <=0 && position <=0){
		//           $("#aeraLogo").css("background-color", "transparent");
		//       }
		//       else if(scroll > position && scroll != 0) {
		//           $("#aeraLogo").css("background-color", "#fff");
		//           $("#white").hide();
		//           $("#black").show();
		//       }
		//       else if(scroll == 0){
		//         $("#aeraLogo").css("background-color", "transparent");
		//         $("#white").show();
		//         $("#black").hide();
		//       }
		//       else if(scroll <= 100){
		//         $("#aeraLogo").css("background-color", "transparent");
		//         $("#white").show();
		//         $("#black").hide();
		//       }
		//       else {
		//           $("#aeraLogo").css("background-color", "#fff");
		//           $("#black").show();
		//           $("#white").hide();
		//       }
		//       position = scroll;
		//   });
	}

	render() {
		return (
			<Page>
				<Helmet
					title='AeraHUB 2025 – Decision Intelligence Summit, London'
					meta={[
						{
							name: 'description',
							content: 'Join AeraHUB in London for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making.',
						},
						{
							property: 'og:description',
							content: 'Join AeraHUB in London for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making.',
						},
						{
							name: 'twitter:description',
							content: 'Join AeraHUB in London for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making.',
						},
						{
							property: 'twitter:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/2I5nnhZvK5g5NGjQ80xa9s/67639712269523c55098b0cdd7abd5a8/Open_graph_-_London.png',
						},
						{
							property: 'og:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/2I5nnhZvK5g5NGjQ80xa9s/67639712269523c55098b0cdd7abd5a8/Open_graph_-_London.png',
						},
					]}
				/>

				<div className={s.ddm}>
					<style>
						{`
                          .active{
                            background-color: #5C6475 !important;
                          }
                          .bx-viewport{
                            border-radius: 10px;
                            box-shadow: 0 0 16px 0 #00619e29;
                          }
                          .rotateArrow{
                            transform: rotate(180deg) !important;
                          }
                        `}
					</style>
					{/* <div className={s.ddm__overlaywrapper} id="hideMe">

            <div className={s.ddm__overlay}>
              <div className={s.ddm__overlayFormWrapper}>
                <div className={s.ddm__overlayForm}>
                    <p>
                      Enter your email below to receive full access to the complete library of AeraHub 24 video content.
                    </p>
                    <div className={s.ddm__formBox}>
                      <div id="stickyform"></div>
                    </div>
                </div>
              </div>
            </div>
          </div> */}

					<div
						className={s.ddm__header}
						id='aeraLogo'
					>
						<div className={s.ddm__headerContainer}>
							<div className={s(s.ddm__row, s.ddm__headerRow)}>
								<div>
									<nav className={s.ddm__navbar}>
										<Link
											to='/'
											className={s.ddm__logo}
											onClick={this.closeNav}
											aria-label='Aera'
										>
											<img
												alt='aera logo white'
												src={AeraLogo1}
												className={s.header__logoImage}
												id='white'
											/>
											<span>
												London, UK
												<br /> 11 June 2025
											</span>
										</Link>
										<ul
											className={s.ddm__navLinks}
											id='navLinks'
										>
											<li>
												<a
													href='javascript:;'
													rel='speakerSection'
												>
													Speakers
												</a>
											</li>
											<li>
												<a
													href='javascript:;'
													rel='aboutSection'
												>
													About
												</a>
											</li>
											<li>
												<a
													href='javascript:;'
													rel='agendaSection'
												>
													Agenda
												</a>
											</li>
											<li>
												<a
													href='javascript:;'
													rel='venueSection'
												>
													Venue
												</a>
											</li>
										</ul>
									</nav>
								</div>

								<div className={s.ddm__toggleMenuWrapper}>
									<a
										href='javascript:;'
										className={s.ddm__registerbtn}
										id='registerbtn'
									>
										Register Now
									</a>
									<div
										className={s.ddm__menuToggle}
										id='toggleMenu'
									>
										<div></div>
										<div></div>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className={s(s.ddm__section1)}>
						<video
							autoPlay
							muted
							loop
							id='myVideo'
							width='100%'
							className={s.ddm__heroVideo}
						>
							<source
								src={HeroVideo}
								type='video/mp4'
							/>
						</video>
						<div className={s.ddm__herotaglineContainer}>
							<div className={s.ddm__herotagline}>
								<img
									alt='hero logo'
									src={HeroLogo}
								/>
								<h3>Wednesday, 11 June 2025 | London</h3>
								<h1>The Decision Intelligence Summit</h1>
								<p>AeraHUB is the premier gathering of innovators, thought leaders, and business champions who are deploying AI to digitize and automate business decision making.</p>
								<div className={s.ddm__heroButtonWrapper}>
									<a
										href='javascript:;'
										className={s.ddm__heroButton}
										id='openPopup'
									>
										Watch 2024 recap
									</a>
									<a
										href='javascript:;'
										className={s.ddm__heroButtonFill}
										id='heroButton'
									>
										Save your seat
									</a>
								</div>
							</div>
						</div>
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
								<iframe
									id='vimeoVideo'
									src='https://player.vimeo.com/video/1032056280?h=683572b24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
									frameborder='0'
									allow='autoplay; fullscreen; picture-in-picture'
									allowfullscreen
								></iframe>
								<script src='https://player.vimeo.com/api/player.js'></script>
							</div>
						</div>
					</div>
					<div className={s.ddm__section2}>
						<div className={s.ddm__container}>
							<div className={s.ddm__section2div1}>
								<div
									className={s.ddm__formWrapper}
									id='scrollForm'
								>
									{/* <h3>Pre-register now.</h3>
                    <p>Secure your spot for the virtual experience and be first in line for in-person registration when it opens.</p> */}
									<div className={s.ddm__formBox}>
										<div id='stickyform'></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={s.ddm__industryExpertWrapper}
						id='speakerSection'
					>
						<div className={s(s.ddm__container)}>
							<div className={s.ddm__industryExpertBox}>
								<div className={s.ddm__copy}>
									<h3>Hear from Industry Experts.</h3>
									<p>Meet the technology experts, industry leaders, and business executives leading the revolution in AI-powered decision making and automation.</p>
								</div>
								<div className={s.ddm__speakersWrapper}>
									<div className={s.ddm__speaker}>
										<img
											alt='Fred'
											src={Fred3x}
										/>
										<p>
											<span>Fred Laluyaux</span>
											<br />
											President & CEO
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Kris Timmermans '
											src={kris}
										/>
										<p>
											<span>Kris Timmermans</span>
											<br />
											Global Lead for Supply Chain & Operations
										</p>
										<div>
											<img
												alt='accenturelogo'
												src={accenturelogo}
												className={s.ddm__companylogo30}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Graham Sommer'
											src={GrahamSommer3x}
										/>
										<p>
											<span>Graham Sommer</span>
											<br />
											Executive VP, <br /> Head of Customer Operations
											<br />
										</p>
										<div>
											<img
												alt='UNILEVER'
												src={UNILEVER}
												className={s.ddm__companylogo35}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='JP Lebudel'
											src={JPlebudel}
										/>
										<p>
											<span>JP Lebudel</span>
											<br />
											{/* Transformational Leader - <br/>M&A - Operations Builder<br/> */}
											Chief Supply Chain Officer
										</p>
										<div>
											<img
												alt='castrol'
												src={castrol}
												className={s.ddm__companylogo30}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Sam Mulligan'
											src={SamMulligan}
										/>
										<p>
											<span>Sam Mulligan</span>
											<br />
											Senior Director of Digital & Lean,
											<br /> Clinical Manufacturing & Supply
										</p>
										<div>
											<img
												alt='AstraZeneca'
												src={AstraZeneca}
												className={s.ddm__companylogo30}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='GualtieroCerrato'
											src={GualtieroCerrato}
										/>
										<p>
											<span>Gualtiero Cerrato</span>
											<br />
											Supply Chain Director
											<br />
										</p>
										<div>
											<img
												alt='PhilipMorrisLogo'
												src={PhilipMorrisLogo}
												className={s.ddm__companylogo35}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Karl Bougue'
											src={KarlBougue}
										/>
										<p>
											<span>Karl Bougue</span>
											<br />
											Senior Manager, Data & Analytics
										</p>
										<div>
											<img
												alt='Philip Morris International'
												src={PhilipMorrisLogo}
												className={s.ddm__companylogo35}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Mahendra Gadiyar'
											src={MahendraGadiyar}
										/>
										<p>
											<span>Mahendra Gadiyar</span>
											<br />
											Senior Product Lead
										</p>
										<div>
											<img
												alt='MarsLogo'
												src={MarsLogo}
												className={s.ddm__companylogo20}
											/>
										</div>
									</div>

									<div className={s.ddm__speaker}>
										<img
											alt='Pragati Lodha '
											src={Pragati}
										/>
										<p>
											<span>Pragati Lodha</span>
											<br />
											Principal
										</p>
										<div>
											<img
												alt='ZS'
												src={zsLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									{/* <div className={s.ddm__speaker}>
                      <img alt="Jeroen Nysen" src={Jeroen_Nysen}/>
                      <p>
                        <span>Jeroen Nysen</span><br/>
                        Senior Manager, EMEA Supply Chain Decision Intelligence Lead
                      </p>
                      <div><img alt="deloittelogo" src={DeloitteLogo} className={s.ddm__companylogo20}/></div>
                    </div> */}
									<div className={s.ddm__speaker}>
										<img
											alt='Kevin Overdulv'
											src={KevinOverdulve}
										/>
										<p>
											<span>Kevin Overdulve</span>
											<br />
											Partner, Supply Chain & Network Operations
										</p>
										<div>
											<img
												alt='deloittelogo'
												src={DeloitteLogo}
												className={s.ddm__companylogo20}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Gonzalo Benedit'
											src={Gonzalo}
										/>
										<p>
											<span>Gonzalo Benedit</span>
											<br />
											Chief Revenue Officer <br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Laurent Lefouet'
											src={Laurent}
										/>
										<p>
											<span>Laurent Lefouet</span>
											<br />
											Chief Strategy Officer
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>

									<div className={s.ddm__speaker}>
										<img
											alt='Matt York'
											src={MattYork}
										/>
										<p>
											<span>Matt York</span>
											<br />
											Regional VP, UK
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Archana Ravi'
											src={ArchanaRavi}
										/>
										<p>
											<span>Archana Ravi</span>
											<br />
											Director, Solution Engineering
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>

									<div className={s.ddm__speaker}>
										<img
											alt='Gregory Lera'
											src={GregoryLera}
										/>
										<p>
											<span>Gregory Lera</span>
											<br />
											Director, Solution Engineering
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Lalitha Sundaramurthy'
											src={Lalitha}
										/>
										<p>
											<span>Lalitha Sundaramurthy</span>
											<br />
											SVP Head of Product
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Mustafa Kabul'
											src={Mustafa}
										/>
										<p>
											<span>Mustafa Kabul</span>
											<br />
											VP, Data Science and Machine Learning
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
									<div className={s.ddm__speaker}>
										<img
											alt='Larissa Sliwinski'
											src={LarissaSliwinski}
										/>
										<p>
											<span>Larissa Sliwinski</span>
											<br />
											VP, Customer Engagement
											<br /> EMEA
											<br />
										</p>
										<div>
											<img
												alt='Aera Logo'
												src={AeraLogo}
												className={s.ddm__companylogo40}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={s.ddm__featuredsessionNew}
						id='aboutSection'
					>
						<div className={s.ddm__container}>
							<h2>Featured Sessions</h2>
							<div
								className={s.ddm__featuredboxwrapper}
								id='bx-featuredslider'
							>
								<div className={s.ddm__featuredboxFull}>
									<div className={s.ddm__featImg}>
										<img
											alt='unileverFeatImg'
											src={unileverFeatImg}
											className={s.ddm__featImage}
										/>
									</div>
									<div className={s.ddm__featuredsessionboxNew}>
										<div className={s.ddm__featuredsessiontitlewrapperNew}>
											{/* <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span> */}
											<div className={s.ddm__featuredsessiontitleNew}>Revolutionizing Demand with Decision Intelligence at Unilever</div>
											<p>Unilever is redefining what it means to be a digital enterprise, unlocking the full potential of its workforce and elevating customer satisfaction. In partnership with Aera Technology, Unilever is using Decision Intelligence to transform its value chain—generating over 8 million daily SKU-store forecasts and achieving 97% on-shelf availability. Learn how shifting from traditional planning to real-time demand sensing is driving resilience, operational excellence, and industry leadership.</p>
										</div>
										<div className={s.ddm__featuredspeakerwrapperNew}>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={GrahamSommer}
													alt='GrahamSommer'
												/>
												<p>
													<span className={s.ddm__speakerName}>Graham Sommer</span>
													<br /> Executive VP, Head of Customer Operations
													<br /> Unilever
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={Fred}
													alt='Fred'
												/>
												<p>
													<span className={s.ddm__speakerName}>Fred Laluyaux</span>
													<br /> President & CEO
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={s.ddm__featuredboxFull}>
									<div className={s.ddm__featImg}>
										<img
											alt='castrolFeat'
											src={castrolFeat}
											className={s.ddm__featImage}
										/>
									</div>
									<div className={s.ddm__featuredsessionboxNew}>
										<div className={s.ddm__featuredsessiontitlewrapperNew}>
											{/* <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span> */}
											<div className={s.ddm__featuredsessiontitleNew}>Accelerating Cross-Functional Agility: BP-Castrol’s AI-Driven Supply Chain Transformation</div>
											<p>BP-Castrol is accelerating supply chain agility through its strategic partnership with Aera Technology and the adoption of decision intelligence. This session will explore how BP-Castrol is scaling impact through a growing pipeline of use cases and building internal expertise via a center of excellence — laying the groundwork for an agile, AI-enabled supply chain.</p>
										</div>
										<div className={s.ddm__featuredspeakerwrapperNew}>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={JPlebudel}
													alt='JPlebudel'
												/>
												<p>
													<span className={s.ddm__speakerName}>JP Lebudel</span>
													<br /> Chief Supply Chain Officer
													<br /> BP Castrol
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={Fred}
													alt='Fred'
												/>
												<p>
													<span className={s.ddm__speakerName}>Fred Laluyaux</span>
													<br /> President & CEO
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className={s.ddm__featuredboxFull}>
									<div className={s.ddm__featImg}>
										<img
											alt='asterzenecaFeat'
											src={asterzenecaFeat}
											className={s.ddm__featImage}
										/>
									</div>
									<div className={s.ddm__featuredsessionboxNew}>
										<div className={s.ddm__featuredsessiontitlewrapperNew}>
											{/* <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span> */}
											<div className={s.ddm__featuredsessiontitleNew}>Advancing Clinical Trials with Decision Intelligence at AstraZeneca</div>
											<p>AstraZeneca, a global leader in biopharmaceuticals, is pioneering the self-healing supply chain of the future. In collaboration with Aera Technology and ZS Associates, the company is leveraging decision intelligence to transform decision-making across the clinical trial process. By harnessing real-time data-driven insights and decisions at every stage, AstraZeneca is accelerating trial timelines, expanding trial scope, and driving greater efficiency. Join us to explore how decision intelligence is unlocking new frontiers of innovation and efficiency in the pharmaceutical and life sciences industries.</p>
										</div>
										<div className={s.ddm__featuredspeakerwrapperNew}>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={SamMulligan}
													alt='SamMulligan'
												/>
												<p>
													<span className={s.ddm__speakerName}>Sam Mulligan</span>
													<br /> Senior Director of Digital & Lean,
													<br /> Clinical Manufacturing & Supply
													<br /> AstraZeneca
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={Pragati}
													alt='Pragati'
												/>
												<p>
													<span className={s.ddm__speakerName}>Pragati Lodha</span>
													<br /> Principal
													<br /> ZS
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeakerNew}>
												<img
													src={MattYork}
													alt='MattYork'
												/>
												<p>
													<span className={s.ddm__speakerName}>Matt York</span>
													<br /> Regional VP, UK
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								id='bx-featuredpager'
								className={s.ddm__featuredSkillsSliderPager}
							>
								<a
									data-slide-index='0'
									href=''
								></a>
								<a
									data-slide-index='1'
									href=''
								></a>
								<a
									data-slide-index='2'
									href=''
								></a>
							</div>
						</div>
					</div>
					<div className={s.ddm__keynotes}>
						<div className={s.ddm__container}>
							<div className={s.ddm__keynotewrapper}>
								<h2>What you’ll learn at AeraHUB 25</h2>
								{/* <p>
                In a series of fireside chats, these business champions and thought leaders highlighted the transformative potential of decision intelligence across industries, emphasizing innovation, scalability, and rapid time to value. Through their shared insights, discover the capacity of decision intelligence to revolutionize decision-making processes by enabling faster, smarter, and more accurate decisions across a wide array of applications.
                </p> */}

								<div className={s.ddm__keynotesboxwrapper}>
									<div className={s.ddm__keynotesbox}>
										<img
											src={aipowerinnovation}
											alt='aipowerinnovation'
										/>
										<h4>How AI Powers Innovation</h4>
										<p>Learn how decision intelligence combines the best of AI, automation, and data & analytics technologies to revolutionize decision-making.</p>
										{/* <ul>
                      <li><b>What’s hype, what’s real –</b> Ray separates the noise from the real advancements.</li>
                      <li><b>Untangling the buzzwords –</b> AI, DI, GenAI, Agentic AI—what do they actually mean for your business?</li>
                      <li><b>Where companies are finding value –</b> Discover how organizations are truly leveraging AI today.</li>
                      <li><b>Investing for the next phase –</b> What’s the smart move for the future of AI and Decision Intelligence?</li>
                      <li><b>Agentic AI’s game-changing potential –</b> How this new frontier in AI is rewriting the rules?</li>
                    </ul> */}
									</div>
									<div className={s.ddm__keynotesbox}>
										<img
											src={businessimpact}
											alt='businessimpact'
										/>
										<h4>Business Impact of Decision Intelligence</h4>
										<p>Experience how companies are gaining value from implementing and scaling AI for decision-making.</p>
										{/* <ul>
                      <li><b>Reducing costs –</b> Streamlining operations with Decision Intelligence</li>
                      <li><b>Improving customer experience –</b> Enhancing customer interactions and satisfaction.</li>
                      <li><b>Sharpening decision-making –</b> Smarter, faster, and more informed decisions across their organizations.</li>
                      <li><b>Real-world insights –</b> Successes, challenges, and lessons learned.</li>
                      <li><b>Looking ahead –</b> What’s next in their Decision Intelligence journey.</li>
                    </ul> */}
									</div>
									<div className={s.ddm__keynotesbox}>
										<img
											src={techdemos}
											alt='techdemos'
										/>
										<h4>Technology Demos</h4>
										<p>See how AI improves decision-making in supply chain planning, procurement, revenue management, and more.</p>
										{/* <ul>
                      <li><b>What’s New -</b> See how the latest innovations are boosting productivity.</li>
                      <li><b>Agentic AI -</b> Find out how Agentic AI shaking things up, solving bigger, messier decision-making challenges.</li>
                      <li><b>Unstructured Data -</b> Learn how to leverage unstructured data for decision-making.</li>
                      <li><b>Modeling -</b> Discover how to use Decision Intelligence for simulations and strategic decisions.</li>
                    </ul> */}
									</div>
									<div className={s.ddm__keynotesbox}>
										<img
											src={successtories}
											alt='successtories'
										/>
										<h4>Success Stories</h4>
										<p>Hear leaders from innovative brands share their stories of the positive impact of decision intelligence.</p>
										{/*<ul>
                      <li><b>Emerging roles –</b> Learn about the new opportunities in the AI-driven landscape.</li>
                      <li><b>Upskill your teams –</b> Equip your workforce with the skills they need to thrive.</li>
                      <li><b>Stay ahead –</b> Ensure your team remains competitive in the evolving market.</li>
                    </ul> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={s.ddm__featuredsession}
						id='agendaSection'
					>
						<div className={s.ddm__container}>
							<h2>Agenda</h2>
							<div className={s.ddm__featuredboxwrapper}>
								<div className={s.ddm__featuredsessionbox}>
									<div className={s.ddm__featuredspeakerwrapper}>
										<div className={s.ddm__featuredsessionspeaker}>
											<p>12:00 – 13:00</p>
										</div>
									</div>
									<div className={s.ddm__featuredsessiontitlewrapper}>
										<div className={s.ddm__featuredsessiontitle}>Networking Lunch</div>
										<p>Connect with industry peers, Aera professionals and partners over lunch.</p>
									</div>
								</div>
								<div className={s.ddm__featuredsessionbox}>
									<div className={s.ddm__featuredspeakerwrapper}>
										<div className={s.ddm__featuredsessionspeaker}>
											<p>13:00 – 15:00</p>
										</div>
									</div>
									<div className={s.ddm__featuredsessiontitlewrapper}>
										<div className={s.ddm__featuredsessiontitle}>Opening Session & Keynote</div>
										<p>Meet the technology experts, industry leaders, and business executives leading the revolution in AI-powered decision-making and automation.</p>
										<ul>
											<li>
												<b>Welcome & Opening Keynote</b> – Gain insights on the future of decision intelligence.
											</li>
											<li>
												<b>Success Stories: Driving ROI & Innovation with Decision Intelligence</b> – Aera customers and partners share real-world use cases, highlighting measurable business impact.
											</li>
										</ul>
										<div className={s.ddm__sessionDetailsWrapper}>
											<div className={s.ddm__sessionLogo}>
												<img
													alt='accentureSession'
													src={accentureSession}
												/>
											</div>
											<div
												className={s.ddm__sessionDescription}
												data-description='sessionDescriptionAccenture'
											>
												<h3>Next-Gen Supply Chain: From Automation to Full Autonomy</h3>
												<div data-accordian='sessionAccenture'>
													Session Summary
													<img
														alt='smalldownicon'
														src={smalldownicon}
													/>
												</div>
												<p>Join Kris Timmermans, Global Lead for Supply Chain & Operations at Accenture, and Fred Laluyaux, CEO of Aera Technology, for a dynamic conversation on the next frontier of supply chain transformation. As businesses move beyond automation, autonomous supply chains are emerging—driven by AI and real-time data to enable intelligent, self-optimizing decisions. This session will discuss how autonomy reshapes the supply chain landscape, enhances resilience, and drives agility in an unpredictable world. This session will offer real-world perspectives on what it takes to operationalize autonomy at scale—and how leading enterprises are using it to gain a competitive edge.</p>
											</div>
										</div>
										<div className={s.ddm__sessionDetailsWrapper}>
											<div className={s.ddm__sessionLogo}>
												<img
													alt='unileverSession'
													src={unileverSession}
												/>
											</div>
											<div
												className={s(s.ddm__sessionDescription)}
												data-description='sessionDescriptionUnilever'
											>
												<h3>Envisioning the Autonomous Supply Chain with Agentic AI</h3>
												<div data-accordian='sessionUnilever'>
													Session Summary
													<img
														alt='smalldownicon'
														src={smalldownicon}
													/>
												</div>
												<p>Unilever is transforming its global supply chain into an autonomous, intelligent ecosystem powered by Agentic AI—technology that not only predicts but acts, learns, and collaborates. With Aera Technology as a core partner, initiatives like Project Sky and the Digital Materials Planner are enabling real-time decision-making, unifying demand signals, automating complex operations across planning, logistics, and enhancing customer collaboration. This session will explore how Unilever is building an ecosystem where digital agents and human teams work together to drive agility, resilience, and customer-centricity at scale.</p>
											</div>
										</div>
										<div className={s.ddm__sessionDetailsWrapper}>
											<div className={s.ddm__sessionLogo}>
												<img src={astrazenacaSession} />
											</div>
											<div
												className={s(s.ddm__sessionDescription)}
												data-description='sessionDescriptionAstra'
											>
												<h3>Advancing Clinical Trials with Decision Intelligence at AstraZeneca</h3>
												<div data-accordian='sessionAstra'>
													Session Summary
													<img
														alt='smalldownicon'
														src={smalldownicon}
													/>
												</div>
												<p>AstraZeneca, a global leader in biopharmaceuticals, is pioneering the self-healing supply chain of the future. In collaboration with Aera Technology and ZS Associates, the company is leveraging decision intelligence to transform decision-making across the clinical trial process. By harnessing real-time data-driven insights and decisions at every stage, AstraZeneca is accelerating trial timelines, expanding trial scope, and driving greater efficiency. Join us to explore how decision intelligence is unlocking new frontiers of innovation and efficiency in the pharmaceutical and life sciences industries.</p>
											</div>
										</div>
									</div>
								</div>
								<div className={s.ddm__featuredsessionbox}>
									<div className={s.ddm__featuredspeakerwrapper}>
										<div className={s.ddm__featuredsessionspeaker}>
											<p>15:00 – 15:30</p>
										</div>
									</div>
									<div className={s.ddm__featuredsessiontitlewrapper}>
										<div className={s.ddm__featuredsessiontitle}>Coffee & Networking Break</div>
										<p>Recharge with refreshments and meaningful conversations.</p>
									</div>
								</div>
								<div className={s.ddm__featuredsessionbox}>
									<div className={s.ddm__featuredspeakerwrapper}>
										<div className={s.ddm__featuredsessionspeaker}>
											<p>15:30 – 17:00</p>
										</div>
									</div>
									<div className={s.ddm__featuredsessiontitlewrapper}>
										<div className={s.ddm__featuredsessiontitle}>The Future of Decision Intelligence</div>
										{/* <p>Meet the technology experts, industry leaders, and business executives leading the revolution in AI-powered decision-making and automation.</p> */}
										<ul>
											<li>
												<b>Aera Innovation Showcase</b> – Learn about the latest advancements transforming enterprise decision-making.
											</li>
											<li>
												<b>Real-World Applications: Decision Intelligence in Action</b> – Aera customers and partners demonstrate how they leverage decision intelligence to enhance operations and drive efficiency.
											</li>
										</ul>
										<div className={s.ddm__sessionDetailsWrapper}>
											<div className={s.ddm__sessionLogo}>
												<img
													alt='PMIsession'
													src={PMIsession}
												/>
											</div>
											<div
												className={s.ddm__sessionDescription}
												data-description='sessionDescriptionPMI'
											>
												<h3>Warp-Speed Supply Chain: Decision Intelligence Powering PMI’s Smoke-Free Future</h3>
												<div data-accordian='sessionPMI'>
													Session Summary
													<img
														alt='smalldownicon'
														src={smalldownicon}
													/>
												</div>
												<p>As Philip Morris International transforms toward a smoke-free future, its supply chain is evolving into a more complex, tech-driven ecosystem. Balancing legacy operations with new categories like devices, electronics, and consumables, PMI is leveraging decision intelligence to optimize operations and boost agility, speed, and resilience. This session will explore how PMI is using scenario planning, end-to-end visibility, and advanced analytics to improve inventory control, reduce product loss, and enable smarter, faster decisions across a multi-tier global network. Learn how PMI is creating an integrated, responsive supply chain while also preparing the organization for the complexity of tomorrow’s markets.</p>
											</div>
										</div>
										<div className={s.ddm__sessionDetailsWrapper}>
											<div className={s.ddm__sessionLogo}>
												<img src={castrolSession} />
											</div>
											<div
												className={s.ddm__sessionDescription}
												data-description='sessionDescriptionCastrol'
											>
												<h3>Accelerating Cross-Functional Agility: BP-Castrol’s AI-Driven Supply Chain Transformation</h3>
												<div data-accordian='sessionCastrol'>
													Session Summary
													<img
														alt='smalldownicon'
														src={smalldownicon}
													/>
												</div>
												<p>BP-Castrol is accelerating supply chain agility through its strategic partnership with Aera Technology and the adoption of decision intelligence. Tackling challenges like slow-moving inventory and fragmented planning, BP-Castrol is enabling faster, connected decision-making and cross-functional alignment across sales, planning, and operations. Key initiatives—including dynamic inventory rebalancing and demand sensing from vessel movement data—are delivering real-time business value. This session will explore how BP-Castrol is scaling impact through a growing pipeline of use cases and building internal expertise via a center of excellence — laying the groundwork for an agile, AI-enabled supply chain.</p>
											</div>
										</div>
										<div className={s.ddm__sessionDetailsWrapper}>
											<div className={s.ddm__sessionLogo}>
												<img src={marsSession} />
											</div>
											<div
												className={s.ddm__sessionDescription}
												data-description='sessionDescriptionMars'
											>
												<h3>Achieving Double-Digit Case Fill Rate Increase with Decision Intelligence at Mars</h3>
												<div data-accordian='sessionMars'>
													Session Summary
													<img
														alt='smalldownicon'
														src={smalldownicon}
													/>
												</div>
												<p>Mars's Supply Chain Data & Analytics team develops digital products to enhance decision-making across the E2E supply chain, addressing issues like inventory shortages & volume allocation volatility. By implementing decision intelligence, Mars streamlined and automated volume allocation processes through a user-friendly decision-support interface, and plans to further expand its capabilities in future use cases.</p>
											</div>
										</div>
									</div>
								</div>
								<div className={s.ddm__featuredsessionbox}>
									<div className={s.ddm__featuredspeakerwrapper}>
										<div className={s.ddm__featuredsessionspeaker}>
											<p>17:00 – 18:30</p>
										</div>
									</div>
									<div className={s.ddm__featuredsessiontitlewrapper}>
										<div className={s.ddm__featuredsessiontitle}>Cocktails & Canapés Networking Reception</div>
										<p>Unwind, network, and continue the conversation with peers, partners, and industry leaders in a relaxed setting.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={s.ddm__keynotes}
						id='venueSection'
					>
						<div className={s.ddm__container}>
							<div className={s.ddm__keynotewrapper}>
								<h2>Venue: The Brewery, London</h2>
								<p>52 Chiswell Street, London, EC1Y 4SD</p>
								<div className={s.ddm__keynotesboxwrapper}>
									<div className={s.ddm__keynotesbox}>
										<img
											src={brewery}
											alt='brewery'
										/>
									</div>
									<div className={s.ddm__keynotesbox}>
										<a
											href='https://maps.app.goo.gl/FZGKn9idU2uivpbh9'
											target='_blank'
										>
											<img
												src={map}
												alt='map'
											/>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={s.ddm__registersection}>
						<div className={s.ddm__container}>
							<div className={s.ddm__registersectionwrapper}>
								<h2>
									Don’t miss this year’s premier
									<br className={s.ddm__hiddenXS} /> decision intelligence event.
								</h2>
								<p>Register today and reserve your seat at the table with the next generation of AI leaders.</p>
								<div className={s.ddm__footerbutton}>
									<a
										href='javascript:;'
										className={s.ddm__registercta}
										id='footercta'
									>
										Save your seat
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className={s.ddm__clearfix}></div>
					{/* <div className={s.ddm__ctasection}>
            <div className={s(s.ddm__container)}>
                <div className={s.ddm__socialIcons}>
                    <a href="https://www.linkedin.com/company/aera-technology/" target="_blank"><img alt="Linkedin" src={LinkedinIcon} /></a>
                    <a href="https://x.com/Aera_Technology" target="_blank"><img alt="Twitter" src={TwitterIcon} /></a>
                    <a href="https://www.youtube.com/@AeraTechnology" target="_blank"><img alt="Youtube" src={YoutubeIcon} /></a>
                </div>
                <p>
                <a href="https://www.aeratechnology.com/" target="_blank">Aera Technology</a> | 707 California St, Mountain View, CA 94041
                </p>

            </div>
          </div> */}
				</div>
			</Page>
		);
	}
}
