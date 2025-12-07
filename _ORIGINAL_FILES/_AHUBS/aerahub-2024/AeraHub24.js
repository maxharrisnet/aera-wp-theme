import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Page from 'components/page';
import s from './AeraHub24.scss';
import AeraLogo1 from 'assets/images/aerahub2024/AeraLogo_whiteText.png';
import AeraLogo2 from 'assets/images/AeraLogo_Full-Black_H_RGBnew.png';

// import ddmImage from 'assets/images/DDM_CIRLCES.png';
// import aeraskills from 'assets/images/aeraskills.jpg';
// import insight from 'assets/images/TD_Insights_screen.jpg';
// import reccomendations from 'assets/images/TD_recommendation_screen.jpg';
// import MSD from 'assets/images/customers/msdAnimalHealth.png';

import LinkedinIcon from 'assets/images/aerahub2024/LinkedIn.png';
import TwitterIcon from 'assets/images/aerahub2024/Twitter.png';
import YoutubeIcon from 'assets/images/aerahub2024/Youtube.png';
import Fred from 'assets/images/aerahub2024/FRED1.png';
import Lalitha from 'assets/images/aerahub2024/LALITHA1.png';
import Mustafa from 'assets/images/aerahub2024/Mustafa1.png';
// import Naveen from 'assets/images/aerahub2024/Naveen1.png';
// import Sean from 'assets/images/aerahub2024/Sean.png';
import Joe from 'assets/images/aerahub2024/Joe_Dery_WGU.png';
import Ray from 'assets/images/aerahub2024/RayWang.png';
import Wendy from 'assets/images/aerahub2024/WendyMannon.png';
import Gonzalo from 'assets/images/aerahub2024/Gonzalo.png';
import LAURENT from 'assets/images/aerahub2024/LAURENT.png';

import RayWangStage from 'assets/images/aerahub2024/Ray_Thumbnail.png';
import SashaFred from 'assets/images/aerahub2024/Dell_Thumbnail.png';
import ArjunFred from 'assets/images/aerahub2024/Kraft_thumbnail.png';
import GonzalezLuis from 'assets/images/aerahub2024/Becle_thumbnail.png';
import FredMustafastage from 'assets/images/aerahub2024/Fred_Mustafa_stage.png';
import Futureofworkthumb from 'assets/images/aerahub2024/Futureofworkthumb.png';
import IndustryLeaders from 'assets/images/aerahub2024/IndustryLeaders.png';
import LisaJohnston from 'assets/images/aerahub2024/LisaJohnston.png';
import LouisPeacock from 'assets/images/aerahub2024/LouisPeacock.png';
// import EvgenyKrapovitskiy from 'assets/images/aerahub2024/EvgenyKrapovitskiy.png';

// import PaulIves from 'assets/images/aerahub2024/PaulIves.png';
// import JoeFuler from 'assets/images/aerahub2024/JoeFuler.png';
import LuisGonzalez from 'assets/images/aerahub2024/LuisGonzalez.png';
// import kraftheinz from 'assets/images/aerahub2024/KraftHeinz_logo.png';
// import Brian from 'assets/images/aerahub2024/brianevergreen.png';
// import livenetworkingimg from 'assets/images/aerahub2024/livenetworking.png';
// import Anonymous from 'assets/images/aerahub2024/Anonymous.png';
// import AlexNasciutti from 'assets/images/aerahub2024/AlexNasciutti.png';
// import GualtieroCerrato from 'assets/images/aerahub2024/GualtieroCerrato.png';
// import JuanCarlosParadaUnilever from 'assets/images/aerahub2024/JuanCarlosParadaUnilever.png';
// import deloitteAnonymous from 'assets/images/aerahub2024/deloitteAnonymous.png';
// import EYAnonymous from 'assets/images/aerahub2024/EYAnonymous.png';
// import KraftHeinzAnonymous from 'assets/images/aerahub2024/KraftHeinzAnonymous.png';
// import constellationresearch from 'assets/images/aerahub2024/constellationresearch.png';
// import WGU from 'assets/images/aerahub2024/WGU.png';
// import baxterhealthcare from 'assets/images/aerahub2024/baxterhealthcare.png';
// import cgt from 'assets/images/aerahub2024/cgt.png';
// import deloittelogo from 'assets/images/aerahub2024/deloittelogo.png';
// import eylogo from 'assets/images/aerahub2024/eylogo.png';
// import futuresolving from 'assets/images/aerahub2024/futuresolving.png';
// import HBS from 'assets/images/aerahub2024/HBS.png';
// import Infrabuild from 'assets/images/aerahub2024/Infrabuild.png';
// import KraftHeinz_Logonew from 'assets/images/aerahub2024/KraftHeinz_Logonew.png';
// import Merck from 'assets/images/aerahub2024/Merckanimalhealth.webp';
// import becle from 'assets/images/aerahub2024/becle.png';
// import UNILEVER from 'assets/images/aerahub2024/UNILEVER.png';
// import PhilipMorrisLogo from 'assets/images/aerahub2024/PhilipMorrisLogo.png';
// import jdirving from 'assets/images/aerahub2024/jdirving.webp';
// import tetagan from 'assets/images/aerahub2024/tetagan.png';
// import ram from 'assets/images/aerahub2024/RAM.png';
import kannan from 'assets/images/aerahub2024/kannan.png';
// import evcar from 'assets/images/aerahub2024/electriccar.png';
// import hotel from 'assets/images/aerahub2024/housekeeping.png';
import accenturelogo from 'assets/images/aerahub2024/Accenture_logo.png';
import Deloittesponsor from 'assets/images/aerahub2024/Deloittesponsor.png';
import eylogosponsor from 'assets/images/aerahub2024/eylogosponsor.png';
// import Jeroen from 'assets/images/aerahub2024/Jeroen.png';
// import kaysen from 'assets/images/aerahub2024/kaysen.png';
// import kevin from 'assets/images/aerahub2024/kevin.png';
// import SaradaDalai from 'assets/images/aerahub2024/SaradaDalai.png';
// import shailanderdagar from 'assets/images/aerahub2024/shailanderdagar.png';
// import JennieSanders from 'assets/images/aerahub2024/JennieSanders.png';
// import FoliaGrace from 'assets/images/aerahub2024/FoliaGrace.png';
import SASHA from 'assets/images/aerahub2024/SASHA.png';
// import DellLogo from 'assets/images/aerahub2024/Dell_logo.png';

export default class AeraHub24 extends Component {
	componentDidUpdate() {
		if (window.location.pathname == '/aerahub-2024') {
			$('#headnav').hide();
			$('#footer').hide();
		} else if (window.location.pathname != '/aerahub-2024') {
			$('#headnav').show();
			$('#footer').show();
		}
	}

	componentDidMount() {
		$('#testdrivebtn, #register, #registertoday, #saveseat').click(function () {
			$('html, body').animate(
				{
					scrollTop: $('#ddmslider').offset().top,
				},
				1000
			);
		});

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
				window.hbspt.forms.create({
					portalId: '4455954',
					formId: 'f3905e25-4190-48d3-8fdf-2ed25e839c7c',
					target: '#stickyform',
					onFormSubmit: function ($form) {
						$('#hideMe').hide(300);
						$('#removeBlurr').css('filter', 'blur(0px)');
					},
				});
			}
		});

		if (window.location.pathname == '/aerahub-2024') {
			$('#headnav').hide();
			$('#footer').hide();
		} else if (window.location.pathname != '/aerahub-2024') {
			$('#headnav').show();
			$('#footer').show();
		}

		let searchParams = new URLSearchParams(window.location.search);
		searchParams.has('access'); // true
		let paramId = searchParams.get('access');
		//console.log(paramId)
		if (paramId == 'direct') {
			//console.log('hit');
			$('#hideMe').hide();
			$('#removeBlurr').css('filter', 'blur(0px)');
		}

		window.addEventListener('resize', this.handleResize);

		// if($(window).width() >= 1000){
		var position = $(window).scrollTop();
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();
			if (scroll <= 0 && position <= 0) {
				$('#aeraLogo').css('background-color', 'transparent');
			} else if (scroll > position && scroll != 0) {
				$('#aeraLogo').css('background-color', '#fff');
				$('#white').hide();
				$('#black').show();
			} else if (scroll == 0) {
				$('#aeraLogo').css('background-color', 'transparent');
				$('#white').show();
				$('#black').hide();
			} else if (scroll <= 100) {
				$('#aeraLogo').css('background-color', 'transparent');
				$('#white').show();
				$('#black').hide();
			} else {
				$('#aeraLogo').css('background-color', '#fff');
				$('#black').show();
				$('#white').hide();
			}
			position = scroll;
		});
		// }
	}

	render() {
		return (
			<Page>
				<Helmet
					title='Aera Technology - AeraHUB 2024'
					meta={[
						{
							name: 'description',
							content: 'AeraHUB 2024 - The Decision Intelligence Summit',
						},
						{
							property: 'og:description',
							content: 'AeraHUB 2024 - The Decision Intelligence Summit',
						},
						{
							name: 'twitter:description',
							content: 'AeraHUB 2024 - The Decision Intelligence Summit',
						},
						{
							property: 'twitter:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/9LQIpOcK8gjcyJW1hukjG/b7f540c2257be0a41c46c3e6976abccc/AeraHub2024.jpg',
						},
						{
							property: 'og:image',
							content: 'https://images.ctfassets.net/mh1amgo8m7ts/9LQIpOcK8gjcyJW1hukjG/b7f540c2257be0a41c46c3e6976abccc/AeraHub2024.jpg',
						},
					]}
				/>

				<div className={s.ddm}>
					<div
						className={s.ddm__overlaywrapper}
						id='hideMe'
					>
						<div className={s.ddm__overlay}>
							<div className={s.ddm__overlayFormWrapper}>
								<div className={s.ddm__overlayForm}>
									<p>Enter your email below to receive full access to the complete library of AeraHub 24 video content.</p>
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
					>
						<div
							className={s.ddm__header}
							id='aeraLogo'
						>
							<div className={s.ddm__headerContainer}>
								<Link
									to='/'
									className={s.header__logo}
									onClick={this.closeNav}
									aria-label='Aera'
								>
									<img
										alt='aera logo white'
										src={AeraLogo1}
										className={s.header__logoImage}
										id='white'
									/>
									<img
										alt='aera logo black'
										src={AeraLogo2}
										className={s.header__logoImage}
										id='black'
										style={{ display: 'none' }}
									/>
								</Link>
							</div>
						</div>

						<div className={s.ddm__section1}>
							<div className={s.ddm__imgbox}></div>
							<div className={s.ddm__container}>
								<div className={s.ddm__section1wrapper}>
									<div className={s.ddm__section1lefttext}>
										<div className={s.ddm__flexwrapper}>
											<svg
												width='755'
												height='293'
												viewBox='0 0 755 293'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M21.6321 168.74C32.4746 168.74 41.2642 159.95 41.2642 149.108C41.2642 138.265 32.4746 129.476 21.6321 129.476C10.7896 129.476 2 138.265 2 149.108C2 159.95 10.7896 168.74 21.6321 168.74Z'
													fill='#8AC4E8'
													stroke='#8AC4E8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M269.043 168.561C279.886 168.561 288.675 159.771 288.675 148.929C288.675 138.086 279.886 129.297 269.043 129.297C258.201 129.297 249.411 138.086 249.411 148.929C249.411 159.771 258.201 168.561 269.043 168.561Z'
													fill='#8AC4E8'
													stroke='#8AC4E8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M145.336 291.916C156.178 291.916 164.968 283.126 164.968 272.284C164.968 261.441 156.178 252.652 145.336 252.652C134.493 252.652 125.704 261.441 125.704 272.284C125.704 283.126 134.493 291.916 145.336 291.916Z'
													fill='#8AC4E8'
													stroke='#8AC4E8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M145.624 41.2642C156.466 41.2642 165.256 32.4746 165.256 21.6321C165.256 10.7896 156.466 2 145.624 2C134.781 2 125.991 10.7896 125.991 21.6321C125.991 32.4746 134.781 41.2642 145.624 41.2642Z'
													fill='#8AC4E8'
													stroke='#8AC4E8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M79.6332 227.21C94.761 227.21 107.025 214.946 107.025 199.818C107.025 184.69 94.761 172.427 79.6332 172.427C64.5053 172.427 52.2417 184.69 52.2417 199.818C52.2417 214.946 64.5053 227.21 79.6332 227.21Z'
													fill='#7DD4E8'
													stroke='#7DD4E8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M211.823 227.21C226.95 227.21 239.214 214.946 239.214 199.818C239.214 184.69 226.95 172.427 211.823 172.427C196.695 172.427 184.431 184.69 184.431 199.818C184.431 214.946 196.695 227.21 211.823 227.21Z'
													fill='#7DD4E8'
													stroke='#7DD4E8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M201.489 115.032C206.799 115.032 211.103 110.728 211.103 105.418C211.103 100.108 206.799 95.803 201.489 95.803C196.179 95.803 191.874 100.108 191.874 105.418C191.874 110.728 196.179 115.032 201.489 115.032Z'
													fill='#96B1D8'
													stroke='#96B1D8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M92.2142 113.796C97.5242 113.796 101.829 109.491 101.829 104.181C101.829 98.8713 97.5242 94.5667 92.2142 94.5667C86.9041 94.5667 82.5995 98.8713 82.5995 104.181C82.5995 109.491 86.9041 113.796 92.2142 113.796Z'
													fill='#96B1D8'
													stroke='#96B1D8'
													stroke-width='2.15737'
													stroke-miterlimit='10'
												/>
												<path
													d='M191.851 110.779L100.711 183.146L102.947 185.961L194.087 113.595L191.851 110.779Z'
													fill='url(#paint0_linear_1_994)'
												/>
												<path
													d='M101.479 109.887L99.243 112.703L189.769 184.582L192.005 181.766L101.479 109.887Z'
													fill='url(#paint1_linear_1_994)'
												/>
												<path
													d='M147.198 42.8831H143.603V251.03H147.198V42.8831Z'
													fill='#8AC4E8'
												/>
												<path
													d='M249.411 147.31H41.2642V150.905H249.411V147.31Z'
													fill='#8AC4E8'
												/>
												<path
													d='M145.336 168.561C156.178 168.561 164.968 159.771 164.968 148.929C164.968 138.086 156.178 129.297 145.336 129.297C134.493 129.297 125.704 138.086 125.704 148.929C125.704 159.771 134.493 168.561 145.336 168.561Z'
													fill='white'
												/>
												<path
													d='M145.336 129.296C156.177 129.296 164.968 138.084 164.968 148.928C164.968 159.773 156.18 168.561 145.336 168.561C134.492 168.561 125.704 159.773 125.704 148.928C125.704 138.084 134.492 129.296 145.336 129.296ZM145.336 125.701C132.528 125.701 122.108 136.121 122.108 148.928C122.108 161.736 132.528 172.156 145.336 172.156C158.144 172.156 168.564 161.736 168.564 148.928C168.564 136.121 158.144 125.701 145.336 125.701Z'
													fill='#8AC4E8'
												/>
												<path
													d='M408.031 274.292V232.096H352.249V274.292H346.243V184.896H352.249V226.805H408.031V184.896H414.038V274.292H408.031Z'
													fill='white'
												/>
												<path
													d='M467.531 275.721C446.936 275.721 435.351 262.989 435.351 241.967V184.9H441.214V241.54C441.214 259.419 450.223 270.433 467.675 270.433C485.127 270.433 494.136 259.419 494.136 240.398V184.904H499.999V240.542C499.999 261.995 488.701 275.729 467.531 275.729V275.721Z'
													fill='white'
												/>
												<path
													d='M579.81 249.835C579.81 263.853 570.94 274.292 548.772 274.292H521.308V184.896H547.338C568.652 184.896 576.946 194.481 576.946 207.779C576.946 216.074 571.655 226.517 557.925 228.949C572.37 230.81 579.81 239.105 579.81 249.831V249.835ZM547.055 190.335H527.319V226.809H546.2C560.217 226.809 570.944 220.658 570.944 208.215C570.944 197.488 563.935 190.335 547.059 190.335H547.055ZM546.196 232.244H527.315V268.861H548.912C567.218 268.861 573.799 260.85 573.799 249.696C573.799 239.252 565.645 232.248 546.196 232.248V232.244Z'
													fill='white'
												/>
												<path
													d='M625.152 274.292V270.035L633.735 261.201C659.553 235.886 670.923 222.763 670.923 206.813C670.923 196.194 666.418 185.751 650.683 185.751C641.885 185.751 634.949 190.328 630.983 193.762L628.263 189.113C634.27 183.642 642.425 179.745 652.041 179.745C671.35 179.745 677.859 194.369 677.859 205.383C677.859 223.69 664.629 238.386 641.35 261.381L634.769 268.21V268.497H680.431V274.292H625.148H625.152Z'
													fill='white'
												/>
												<path
													d='M734.176 274.292V246.972H689.8V242.395L735.107 181.322H740.722V241.253H754.955V246.976H740.722V274.296H734.18L734.176 274.292ZM734.176 241.253V203.638C734.176 199.241 734.248 194.948 734.568 190.767L734.104 190.659C731.245 195.878 729.132 199.025 726.916 202.388L697.915 240.969V241.257H734.172L734.176 241.253Z'
													fill='white'
												/>
												<path
													d='M449.029 154.673L437.959 124.242H376.954L365.879 154.673H346.69L397.277 18.9998H417.628L468.214 154.673H449.025H449.029ZM383.084 107.381H431.825L407.456 40.4012L383.088 107.381H383.084Z'
													fill='white'
												/>
												<path
													d='M492.056 113.97C493.733 122.628 497.706 129.349 503.976 134.126C510.242 138.906 517.962 141.298 527.139 141.298C539.93 141.298 549.235 136.582 555.05 127.149L569.395 135.288C559.962 149.892 545.749 157.188 526.756 157.188C511.376 157.188 498.877 152.376 489.252 142.748C479.624 133.123 474.811 120.943 474.811 106.215C474.811 91.4866 479.528 79.4661 488.961 69.7777C498.389 60.0854 510.602 55.2412 525.593 55.2412C539.806 55.2412 551.4 60.2491 560.385 70.2609C569.363 80.2768 573.855 92.3253 573.855 106.407C573.855 108.863 573.66 111.382 573.272 113.966H492.064L492.056 113.97ZM525.585 71.1355C516.54 71.1355 509.044 73.6874 503.102 78.7912C497.155 83.8989 493.473 90.7119 492.056 99.2381H556.791C555.369 90.0649 551.751 83.0882 545.937 78.3039C540.122 73.5237 533.337 71.1315 525.585 71.1315V71.1355Z'
													fill='white'
												/>
												<path
													d='M610.089 74.043C615.644 62.0264 625.724 56.0161 640.324 56.0161V73.6556C632.053 73.2682 624.945 75.4687 619.002 80.245C613.056 85.0252 610.085 92.7168 610.085 103.308V154.669H593.224V57.7573H610.085V74.039L610.089 74.043Z'
													fill='white'
												/>
												<path
													d='M731.808 57.7615H748.669V154.673H731.808V138.004C723.406 150.795 711.197 157.193 695.175 157.193C681.609 157.193 670.044 152.249 660.483 142.365C650.919 132.481 646.139 120.432 646.139 106.219C646.139 92.0062 650.919 79.9577 660.483 70.0736C670.044 60.1896 681.609 55.2456 695.175 55.2456C711.197 55.2456 723.406 61.6433 731.808 74.4346V57.7655V57.7615ZM697.308 140.911C707.124 140.911 715.335 137.585 721.924 130.931C728.514 124.278 731.808 116.039 731.808 106.219C731.808 96.3991 728.514 88.1644 721.924 81.5072C715.335 74.8539 707.128 71.5273 697.308 71.5273C687.488 71.5273 679.477 74.8539 672.887 81.5072C666.298 88.1644 663.003 96.3991 663.003 106.219C663.003 116.039 666.298 124.278 672.887 130.931C679.477 137.589 687.616 140.911 697.308 140.911Z'
													fill='white'
												/>
												<defs>
													<linearGradient
														id='paint0_linear_1_994'
														x1='100.716'
														y1='148.366'
														x2='194.095'
														y2='148.366'
														gradientUnits='userSpaceOnUse'
													>
														<stop stop-color='#7DD4E8' />
														<stop
															offset='1'
															stop-color='#96B1D8'
														/>
													</linearGradient>
													<linearGradient
														id='paint1_linear_1_994'
														x1='99.2361'
														y1='147.244'
														x2='191.989'
														y2='147.244'
														gradientUnits='userSpaceOnUse'
													>
														<stop stop-color='#96B1D8' />
														<stop
															offset='1'
															stop-color='#7DD4E8'
														/>
													</linearGradient>
												</defs>
											</svg>
											{/* <div>
                      <img src={Sputnik} className={s.ddm__sputnik}/>
                    </div>
                    <h1 className={s.ddm__title}>
                      <div className={s.ddm__gilroy}>Aera</div>
                      <div className={s.ddm__freight}>HUB 24</div>
                    </h1> */}
										</div>

										<div className={s.ddm__subtitle}>
											<h2>The Decision Intelligence Summit</h2>
											<h3>Watch On-Demand</h3>
											{/*<h4>Starting at 8:30 A.M. EST In-Person, 9:30 A.M. EST Online</h4> */}
											<div className={s.ddm__footerbutton}>
												<a
													href='javascript:;'
													className={s.ddm__saveyourseat}
													id='register'
												>
													Watch Now
												</a>
											</div>
										</div>
									</div>
									<div className={s.ddm__clearfix}></div>
								</div>
							</div>
						</div>
						<div className={s.ddm__section2}>
							<div className={s.ddm__container}>
								<div className={s.ddm__section2div1}>
									<h1 className={s.ddm__darkBlue}>Welcome to AeraHUB 24 On-Demand</h1>
									<p>AeraHUB 24 brought together innovators, thought leaders, and business pioneers leading the charge in digitizing and automating business decision-making with AI. Explore the full suite of on-demand content from the event, including keynote presentations, fireside chats, and sessions showcasing Aera’s cutting-edge innovations, real-world business impact, and skills demos.</p>
								</div>
							</div>
							<div className={s.ddm__sliderwrapper}>
								<div id='ddmslider'>
									<div>
										<div className={s.ddm__slidercontentwrapper}>
											<div className={s.ddm__sliderimg}>
												<iframe
													src='https://player.vimeo.com/video/1032056280?h=683572b24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
													frameBorder='0'
													width='550px'
													height='400px'
													allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
													title='AeraHUB23 Highlights'
												></iframe>
											</div>
											<div className={s.ddm__slidercontent}>
												<h2>AeraHUB 24 Recap Video</h2>
												<h3>Get a glimpse of the best moments from the conference in this 8-minute highlight reel—your condensed overview of all the key highlights from AeraHUB24!</h3>
											</div>
											<div className={s.ddm__clearfix}></div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* <div className={s.ddm__clearfix}></div> */}
						{/* <div className={s.ddm__industryExpertWrapper}>
            <div className={s(s.ddm__container, s.ddm__containerExpert)}>
              <div className={s.ddm__industryExpertBox}>
                  <div className={s.ddm__copy}>
                    <h3>Hear from industry experts.</h3>
                    <p>
                    Meet the technology experts, industry leaders, and business executives leading the revolution in AI-powered decision making and automation.
                    </p>
                  </div>
                  <div className={s.ddm__speakersWrapper}>
                    <div className={s.ddm__speaker}>
                      <img alt="Fred" src={Fred}/>
                      <p>
                        <span>Fred Laluyaux</span><br/>
                        President & CEO,<br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Ray Wang" src={Ray}/>

                      <p>
                        <span>Ray Wang</span><br/>
                        Founder, Chairman, & Principal Analyst<br/>

                      </p>
                      <div><img alt="Constellation Research" src={constellationresearch} className={s.ddm__companylogo50}/></div>
                    </div>

                    <div className={s.ddm__speaker}>
                      <img alt="JuanCarlosParada" src={JuanCarlosParadaUnilever}/>
                      <p>
                        <span>Juan Carlos Parada</span><br/>
                        Executive Vice President - Global Customer Operations <br/>

                      </p>
                      <div><img alt="UNILEVER" src={UNILEVER} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="LuisGonzalez" src={LuisGonzalez}/>
                      <p>
                        <span>Luis Eugenio Gonzalez Chan</span><br/>
                        Global Supply Chain Director <br/>

                      </p>
                      <div><img alt="Becle" src={becle} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Georges Tetegan" src={tetagan}/>
                      <p>
                        <span>Georges Tetegan</span><br/>
                        Corporate Vice President - Project Control Tower <br/>

                      </p>
                      <div><img alt="jdirving" src={jdirving} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="JennieSanders" src={JennieSanders}/>
                      <p>
                        <span>Jennie Sanders</span><br/>
                        Vice President of Instruction<br/>

                      </p>
                      <div><img alt="Western Governors University School of Technology" src={WGU} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Joe" src={Joe}/>
                      <p>
                        <span>Joe Dery</span><br/>
                        Vice President and Dean of School of Technology<br/>

                      </p>
                      <div><img alt="Western Governors University School of Technology" src={WGU} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Wendy Mannon" src={Wendy}/>
                      <p>
                        <span>Wendy Mannon</span><br/>
                        Executive Director IT Strategy and Operations<br/>

                      </p>
                      <div><img alt="Merck" src={Merck} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="EvgenyKrapovitskiy" src={EvgenyKrapovitskiy}/>
                      <p>
                        <span>Evgeny Krapovnitskiy</span><br/>
                        Head of Supply Chain <br/>

                      </p>
                      <div><img alt="Infra build" src={Infrabuild} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="GualtieroCerrato" src={GualtieroCerrato}/>
                      <p>
                        <span>Gualtiero Cerrato</span><br/>
                        Supply Chain Director <br/>

                      </p>
                      <div><img alt="PhilipMorrisLogo" src={PhilipMorrisLogo} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="PaulIves" src={PaulIves}/>
                      <p>
                        <span>Paul Ives</span><br/>
                        Director of Integrated Supply Chain <br/>

                      </p>
                      <div><img alt="baxter healthcare" src={baxterhealthcare} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="KraftHeinz" src={kannan}/>
                      <p>
                        <span>Arjun Kannan</span><br/>
                        Head of Digital Supply Chain and Analytics<br/>

                      </p>
                      <div><img alt="The Kraft Heinz Company" src={KraftHeinz_Logonew} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Sasha" src={SASHA}/>
                      <p>
                        <span>Sasha Koff </span><br/>
                        Former SVP, Digital Supply Chain<br/>

                      </p>
                      <div><img alt="Dell" src={DellLogo} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="JoeFuller" src={JoeFuler}/>
                      <p>
                        <span>Joe Fuller</span><br/>
                        Professor of Management Practice; Co-Director, Managing the Future of Work Initiative

                      </p>
                      <div><img alt="Harvard Business School" src={HBS} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Brian Evergreen" src={Brian}/>
                      <p>
                        <span>Brian Evergreen</span><br/>
                        CEO <br/>

                      </p>
                      <div><img alt="The Future Solving Company" src={futuresolving} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Sarada Dalai" src={SaradaDalai}/>
                      <p>
                        <span>Sarada Dalai</span><br/>
                        Director Supply Chain & Operations<br/>

                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Alex Nasciutti" src={AlexNasciutti}/>
                      <p>
                        <span>Alex Nasciutti</span><br/>
                        Principal Supply Chain & Operations<br/>

                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Shailander Dagar" src={shailanderdagar}/>
                      <p>
                        <span>Shailander Dagar</span><br/>
                        Senior Manager Supply Chain & Operations<br/>

                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Ryan Kaysen" src={kaysen}/>
                      <p>
                        <span>Ryan Kaysen</span><br/>
                        Partner Supply Chain & Operations<br/>

                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>

                    <div className={s.ddm__speaker}>
                      <img alt="Kevin Overdulve" src={kevin}/>
                      <p>
                        <span>Kevin Overdulve</span><br/>
                        Partner Supply Chain & Network Operations

                      </p>
                      <div><img alt="Deloitte" src={deloittelogo} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Jeroen Nysen" src={Jeroen}/>
                      <p>
                        <span>Jeroen Nysen</span><br/>
                        Senior Manager Supply Chain & Network Operations

                      </p>
                      <div><img alt="Deloitte" src={deloittelogo} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="LisaJohnston" src={LisaJohnston}/>
                      <p>
                        <span>Lisa Johnston </span><br/>
                        Editor-in-Chief <br/>

                      </p>
                      <div><img alt="Consumer Goods Technology" src={cgt} className={s.ddm__companylogo35}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="LouisPeacock" src={LouisPeacock}/>
                      <p>
                        <span>Louis Peacock</span><br/>
                        Chief Customer Officer, <br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Gonzalo Benedit" src={Gonzalo}/>
                      <p>
                        <span>Gonzalo Benedit</span><br/>
                        Chief Revenue Officer, <br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Lalitha" src={Lalitha}/>
                      <p>
                        <span>Lalitha Sundaramurthy </span><br/>
                        Sr. Vice President,<br/>
                        Head of Product, <br/>Aera Technology
                      </p>
                    </div>

                    <div className={s.ddm__speaker}>
                      <img alt="Mustafa" src={Mustafa}/>
                      <p>
                        <span>Mustafa Kabul </span><br/>
                        VP, Data Science & Machine Learning,<br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Ram Krishnan" src={ram}/>
                      <p>
                        <span>Ram Krishnan </span><br/>
                        Global Head, Customer Success, <br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="FoliaGrace" src={FoliaGrace}/>
                      <p>
                        <span>Folia Grace </span><br/>
                        Chief Marketing Officer, <br/>
                        Aera Technology
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </div> */}
						{/* <div className={s.ddm__clearfix}></div> */}

						{/* <div className={s.ddm__savetheseat}>
            <div className={s.ddm__container}>
              <div className={s.ddm__savetheseatwrapper}>
                <h2>Register Today!</h2>
                <div className={s.ddm__footerbutton}>
                  <a
                      href="https://events.zoom.us/ev/AmG3EvdRVeDSVnhXJs8q4a4S7WM67oKSsCq_w0E4SBKI4E7f3a6z~Amxs2MOpLnvKIh255hmU4LIu85EN7IyZFEWVPAG2od9ji7HAB0SfAXC67Q"
                      className={s.ddm__saveyourseat}
                      target="_blank"
                    >
                        Save Your Seat
                    </a>
                </div>
              </div>
            </div>
          </div> */}
						{/* <div className={s.ddm__formSection} id="form-wrapper">
            <div className={s.ddm__container}>
              <div className={s.ddm__Formflexwrapper}>
                <div className={s.ddm__Formleft}>
                  <h2>Register now<br/> to watch on-demand</h2>
                  <p>Don’t miss the opportunity to learn from leaders and experts paving the way for Decision Intelligence.</p>
                </div>
                <div className={s(s.ddm__formwrapper)}>
                  <div className={s.ddm__Formleft}>
                    <div id="testdriveForm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
						<div className={s.ddm__clearfix}></div>
						<div className={s.ddm__keynotes}>
							<div className={s.ddm__container}>
								<div className={s.ddm__keynotewrapper}>
									<h2>Highlights from the Keynote: Stories and Perspectives on the Impact of Decision Intelligence</h2>
									<p>In a series of fireside chats, these business champions and thought leaders highlighted the transformative potential of decision intelligence across industries, emphasizing innovation, scalability, and rapid time to value. Through their shared insights, discover the capacity of decision intelligence to revolutionize decision-making processes by enabling faster, smarter, and more accurate decisions across a wide array of applications.</p>

									<div className={s.ddm__keynotesboxwrapper}>
										<a
											href='https://meet.aeratechnology.com/aerahub24/keynote-session-with-ray-wang-of-constellation-research?_gl=1*11aoq30*_gcl_au*MTY5MzkwNzg4NS4xNzMxOTM4MzU1'
											target='_blank'
											className={s.ddm__keynotesbox}
										>
											<img
												src={RayWangStage}
												alt='RayWangStage'
											/>
											<h4>Beyond Buzzwords with Ray Wang: Where Are Companies Getting Value with AI Today and What’s Ahead?</h4>
											{/* <p>Ray is pulling back the curtain on the state of Decision Intelligence and AI adoption. Get ready for an unfiltered take:</p>
                    <ul>
                      <li><b>What’s hype, what’s real –</b> Ray separates the noise from the real advancements.</li>
                      <li><b>Untangling the buzzwords –</b> AI, DI, GenAI, Agentic AI—what do they actually mean for your business?</li>
                      <li><b>Where companies are finding value –</b> Discover how organizations are truly leveraging AI today.</li>
                      <li><b>Investing for the next phase –</b> What’s the smart move for the future of AI and Decision Intelligence?</li>
                      <li><b>Agentic AI’s game-changing potential –</b> How this new frontier in AI is rewriting the rules?</li>
                    </ul> */}
										</a>
										<a
											href='https://meet.aeratechnology.com/aerahub24/keynote-session-with-sasha-koff-of-dell?_gl=1*16286i5*_gcl_au*MTY5MzkwNzg4NS4xNzMxOTM4MzU1'
											target='_blank'
											className={s.ddm__keynotesbox}
										>
											<img
												src={SashaFred}
												alt='Dell'
											/>
											<h4>From Concept to Global Impact: Dell Technology’s Rapid Adoption of Decision Intelligence</h4>
											{/* <p>Hear from companies like Kraft Heinz, Merck Animal Health, Western Governors University, and Becle as they share how Decision Intelligence is driving real business results:</p>
                    <ul>
                      <li><b>Reducing costs –</b> Streamlining operations with Decision Intelligence</li>
                      <li><b>Improving customer experience –</b> Enhancing customer interactions and satisfaction.</li>
                      <li><b>Sharpening decision-making –</b> Smarter, faster, and more informed decisions across their organizations.</li>
                      <li><b>Real-world insights –</b> Successes, challenges, and lessons learned.</li>
                      <li><b>Looking ahead –</b> What’s next in their Decision Intelligence journey.</li>
                    </ul> */}
										</a>
										<a
											href='https://meet.aeratechnology.com/aerahub24/the-real-impact-of-decision-intelligence-at-the-kraft-heinz-company?_gl=1*78wzrj*_gcl_au*MTY5MzkwNzg4NS4xNzMxOTM4MzU1'
											target='_blank'
											className={s.ddm__keynotesbox}
										>
											<img
												src={ArjunFred}
												alt='Heinz'
											/>
											<h4>Breaking Silos to Drive Innovation: Insights from Kraft Heinz’s DI Transformation</h4>
											{/* <p>Get an inside look at the game-changing updates in Aera Decision Cloud™:</p>
                    <ul>
                      <li><b>What’s New -</b> See how the latest innovations are boosting productivity.</li>
                      <li><b>Agentic AI -</b> Find out how Agentic AI shaking things up, solving bigger, messier decision-making challenges.</li>
                      <li><b>Unstructured Data -</b> Learn how to leverage unstructured data for decision-making.</li>
                      <li><b>Modeling -</b> Discover how to use Decision Intelligence for simulations and strategic decisions.</li>
                    </ul> */}
										</a>
										<a
											href='https://meet.aeratechnology.com/aerahub24/the-real-impact-of-decision-intelligence-at-becle?_gl=1*78wzrj*_gcl_au*MTY5MzkwNzg4NS4xNzMxOTM4MzU1'
											target='_blank'
											className={s.ddm__keynotesbox}
										>
											<img
												src={GonzalezLuis}
												alt='Becle'
											/>
											<h4>Boosting Demand Forecast Accuracy at Becle with Decision Intelligence</h4>
											{/* <p>AI is reshaping the workforce, and Decision Intelligence is crucial for staying competitive. Hear about:</p>
                    <ul>
                      <li><b>Emerging roles –</b> Learn about the new opportunities in the AI-driven landscape.</li>
                      <li><b>Upskill your teams –</b> Equip your workforce with the skills they need to thrive.</li>
                      <li><b>Stay ahead –</b> Ensure your team remains competitive in the evolving market.</li>
                    </ul> */}
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className={s.ddm__clearfix}></div>

						<div
							className={s.ddm__featuredsession}
							id='keynote'
						>
							<div className={s.ddm__container}>
								<h2>Featured Sessions: Starting, Scaling, and Succeeding with the Aera Decision Cloud</h2>
								<div className={s.ddm__blurb}>Click on the session titles to watch the sessions on-demand.</div>
								<div className={s.ddm__featuredboxwrapper}>
									{/* <a href="https://meet.aeratechnology.com/aerahub24/the-evolution-of-aera-and-decision-intelligence" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>The Evolution of Aera and Decision Intelligence</div>
                  </div>
                    <div className={s.ddm__featuredspeakerwrapper}>
                      <div className={s.ddm__featuredsessionspeaker}>
                        <img src={Fred} alt="Fred"/>
                        <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                      </div>

                    </div>
                </a> */}
									<a
										href='https://meet.aeratechnology.com/aerahub24/the-evolution-of-aera-and-decision-intelligence'
										target='_blank'
										className={s.ddm__featuredsessionbox}
									>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<span className={s.ddm__circle}>
												<span className={s.ddm__playbtn}></span>
											</span>
											<div className={s.ddm__featuredsessiontitle}>Opening Keynote: The Evolution of Decision Intelligence (in the Age of AI)</div>
										</div>
										<div className={s.ddm__featuredspeakerwrapper}>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Fred}
													alt='Fred'
												/>
												<p>
													Fred Laluyaux,
													<br /> President & CEO,
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</a>
									<a
										href='https://meet.aeratechnology.com/aerahub24/aera-ui-and-customer-experience'
										target='_blank'
										className={s.ddm__featuredsessionbox}
									>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<span className={s.ddm__circle}>
												<span className={s.ddm__playbtn}></span>
											</span>
											<div className={s.ddm__featuredsessiontitle}>The Unveiling of Aera’s New People-Centric Platform</div>
										</div>
										<div className={s.ddm__featuredspeakerwrapper}>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Fred}
													alt='Fred'
												/>
												<p>
													Fred Laluyaux,
													<br /> President & CEO,
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</a>

									<a
										href='https://meet.aeratechnology.com/aerahub24/product-demonstration-lalitha-mustafa'
										target='_blank'
										className={s.ddm__featuredsessionbox}
									>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<span className={s.ddm__circle}>
												<span className={s.ddm__playbtn}></span>
											</span>
											<div className={s.ddm__featuredsessiontitle}>Revolutionizing Decision Intelligence: Product Team Demos of Aera’s Latest Innovations</div>
										</div>
										<div className={s.ddm__featuredspeakerwrapper}>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Lalitha}
													alt='Lalitha'
												/>
												<p>
													Lalitha Sundaramurthy,
													<br /> Sr. Vice President of Products,
													<br /> Aera Technology
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Mustafa}
													alt='Mustafa'
												/>
												<p>
													Mustafa Kabul,
													<br /> Vice President of Data Science & Machine Learning
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</a>
									<a
										href='https://meet.aeratechnology.com/aerahub24/the-real-impact-of-decision-intelligence-at-merck'
										target='_blank'
										className={s.ddm__featuredsessionbox}
									>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<span className={s.ddm__circle}>
												<span className={s.ddm__playbtn}></span>
											</span>
											<div className={s.ddm__featuredsessiontitle}>From Analytics to Action: Merck Animal Health’s Data-Driven Evolution</div>
										</div>
										<div className={s.ddm__featuredspeakerwrapper}>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Wendy}
													alt='Wendy'
												/>
												<p>
													Wendy Mannon,
													<br /> Executive Director IT Strategy and Operations,
													<br /> Merck
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Fred}
													alt='Fred'
												/>
												<p>
													Fred Laluyaux,
													<br /> President & CEO,
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</a>
									{/* <a href="https://meet.aeratechnology.com/aerahub24/aera-ui-and-customer-experience" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>Decision Intelligence in the Age of Agentic AI</div>
                  </div>
                    <div className={s.ddm__featuredspeakerwrapper}>
                      <div className={s.ddm__featuredsessionspeaker}>
                        <img src={Fred} alt="Fred"/>
                        <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                      </div>

                    </div>
                </a> */}

									<a
										href='https://meet.aeratechnology.com/aerahub24/keynote-session-with-joe-dery-of-wgu'
										target='_blank'
										className={s.ddm__featuredsessionbox}
									>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<span className={s.ddm__circle}>
												<span className={s.ddm__playbtn}></span>
											</span>
											<div className={s.ddm__featuredsessiontitle}>Revolutionizing Education with Decision Intelligence: WGU’s Journey</div>
										</div>
										<div className={s.ddm__featuredspeakerwrapper}>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={Joe}
													alt='Joe'
												/>
												<p>
													Joe Dery,
													<br /> Vice President – Dean of Data Analytics, Computer Science, & Software Engineering,
													<br /> Western Governors University
												</p>
											</div>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={LouisPeacock}
													alt='LouisPeacock'
												/>
												<p>
													Louis Peacock,
													<br /> Chief Customer Officer,
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</a>
									<a
										href='https://meet.aeratechnology.com/aerahub24/starting-and-scaling-with-aera-laurent-lefouet'
										target='_blank'
										className={s.ddm__featuredsessionbox}
									>
										<div className={s.ddm__featuredsessiontitlewrapper}>
											<span className={s.ddm__circle}>
												<span className={s.ddm__playbtn}></span>
											</span>
											<div className={s.ddm__featuredsessiontitle}>Building a Roadmap to Decision Intelligence: From Pilot to Scale</div>
										</div>
										<div className={s.ddm__featuredspeakerwrapper}>
											<div className={s.ddm__featuredsessionspeaker}>
												<img
													src={LAURENT}
													alt='LAURENT'
												/>
												<p>
													Laurent Lefouet,
													<br />
													Chief Strategy Officer,
													<br /> Aera Technology
												</p>
											</div>
										</div>
									</a>

									{/* <a href="https://meet.aeratechnology.com/aerahub24/keynote-session-with-sasha-koff-of-dell" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}>
                      <span className={s.ddm__playbtn}></span>
                    </span>
                    <div className={s.ddm__featuredsessiontitle}>The Real Impact of Decision Intelligence at Dell Technologies</div>
                  </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={SASHA} alt="Sasha"/>
                      <p>Sasha Koff,<br/> Former SVP, Digital Supply Chain,<br/> Dell Technologies</p>
                    </div>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Fred} alt="Fred"/>
                      <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                    </div>
                  </div>
                </a> */}
									{/* <a href="https://meet.aeratechnology.com/aerahub24/keynote-session-with-ray-wang-of-constellation-research" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>Beyond Buzzwords: Where Are Companies Getting Value with AI Today and What’s Ahead?</div>
                  </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Ray} alt="Ray"/>
                      <p>Ray Wang,<br/> Founder, Chairman, & Principal Analyst,<br/> Constellation Research</p>
                    </div>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Fred} alt="Fred"/>
                      <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                    </div>
                  </div>
                </a> */}
									{/* <a href="https://meet.aeratechnology.com/aerahub24/the-real-impact-of-decision-intelligence-at-the-kraft-heinz-company" target="_blank" className={s.ddm__featuredsessionbox}>
                <div className={s.ddm__featuredsessiontitlewrapper}>
                  <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                  <div className={s.ddm__featuredsessiontitle}>Real Impact of Decision Intelligence at The Kraft Heinz Company</div>
                </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                  <div className={s.ddm__featuredsessionspeaker}>
                      <img src={kannan} alt="arjunkannan"/>
                      <p>Arjun Kannan,<br/>Head of Digital Supply Chain and Analytics,<br/>The Kraft Heinz Company</p>
                    </div>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Fred} alt="Fred"/>
                      <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                    </div>

                  </div>
              </a> */}
									{/* <a href="https://meet.aeratechnology.com/aerahub24/the-real-impact-of-decision-intelligence-at-becle" target="_blank" className={s.ddm__featuredsessionbox}>
                <div className={s.ddm__featuredsessiontitlewrapper}>
                  <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                  <div className={s.ddm__featuredsessiontitle}>Real Impact of Decision Intelligence at Becle</div>
                </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={LuisGonzalez} alt="LuisGonzalez"/>
                      <p>Luis Gonzalez,<br/> Global Supply Chain Director,<br/> Becle</p>
                    </div>

                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Gonzalo} alt="Gonzalo"/>
                      <p>Gonzalo Benedit,<br/> Chief Revenue Officer,<br/> Aera Technology</p>
                    </div>
                  </div>
              </a> */}
								</div>
							</div>
						</div>
						<div className={s.ddm__registersection}>
							<div className={s.ddm__container}>
								<div className={s.ddm__registersectionwrapper}>
									<h2>Schedule a Demo of the Aera Decision Cloud</h2>
									<div className={s.ddm__footerbutton}>
										<a
											href='/demo'
											className={s.ddm__registerbtnblue}
											target='_blank'
										>
											Schedule Now
										</a>
									</div>
								</div>
							</div>
						</div>
						{/* <div className={s.ddm__clearfix}></div> */}
						{/* <div className={s.ddm__livenetworking}>
            <div className={s.ddm__container}>
            <div className={s.ddm__livenetworkingtext}>
              <h3>Advantages to Attending in Person</h3>
              <p>
              As a hybrid event, portions of AeraHUB 2024 will be available for registrants to access virtually. But there are numerous advantages to attending the conference in New York in person:
              </p>
              <ul>
                <li><b>Connect with Aera Experts</b> on Decision Intelligence to get in-depth answers to your questions, face to face. </li>
                <li><b>Explore Live Demos</b> to get an insider’s look into the Aera Decision Cloud platform’s game-changing updates. </li>
                <li><b>Access the Customer Forum</b> to deep dive with our Product and Data Science leadership into the 2025 Platform Roadmap.</li>
                <li><b>Engage with Partners</b> to get advice on how to start your journey into Decision Intelligence, and learn best practices and the top use cases in your industry.</li>
                <li><b>Network with Peers, Partners, and Experts</b> over breakfast, lunch, and a cocktail reception at <a href="https://www.littlewaysnyc.com/" target="_blank">Little Ways</a>, hosted by our platinum sponsor, Ernst & Young. Join us for an evening of conversation, shared experiences, and new connections while discussing the latest in Decision Intelligence and enjoying great food and drinks.</li>
              </ul>
            </div>
            </div>
            <div className={s.ddm__clearfix}></div>
            <div className={s.ddm__agendaWrapper}>
              <div className={s.ddm__container}>
                <h2>Live Event Agenda</h2>
                <div className={s.ddm__agendaBox}>
                    <table className={s.ddm__agendaTable} cellpadding="0" cellspacing="0">
                      <tr>
                        <td className={s.ddm__lightBlueTable}>8:30 A.M. - 9:15 A.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Breakfast</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__darkBlueTable}>9:30 A.M. - 12:00 P.M EST</td>
                        <td className={s.ddm__grayTable}><b>Keynote</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__lightBlueTable}>12:00 P.M. - 1:30 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Lunch</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__darkBlueTable}>1:30 P.M. - 4:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Customer Forum</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__lightBlueTable}>4:00 P.M. - 7:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Cocktail Reception</b></td>
                      </tr>

                    </table>
                </div>
            </div>
              <div className={s.ddm__clearfix}></div>
          </div>
          <div className={s.ddm__agendaWrapper}>
              <div className={s.ddm__container}>
                <h2>Virtual Event Agenda</h2>
                <div className={s.ddm__agendaBox}>
                    <table className={s.ddm__agendaTable} cellpadding="0" cellspacing="0">
                      <tr>
                        <td className={s.ddm__lightBlueTable}>9:30 A.M. - 12:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Keynote</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__darkBlueTable}>12:00 P.M. - 2:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Decision Architect Masterclass</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__lightBlueTable}>12:00 P.M. EST - Onwards</td>
                        <td className={s.ddm__grayTable}><b>Access to over 30 educational sessions</b></td>
                      </tr>
                    </table>
                </div>
            </div>
              <div className={s.ddm__clearfix}></div>
          </div>
          </div> */}

						{/* <div className={s.ddm__clearfix}></div> */}
						{/* <div className={s.ddm__registersection}>
            <div className={s.ddm__container}>
              <div className={s.ddm__registersectionwrapper}>
                <h2>Watch Videos On-Demand</h2>
                <div className={s.ddm__footerbutton}>
                  <a
                      href="javascript:;"
                      className={s.ddm__registerbtnblue}
                      id="registertoday"
                    >
                        Watch Now
                    </a>
                </div>
              </div>
            </div>
          </div> */}
						{/* <div className={s.ddm__virtualsession}>
            <div className={s.ddm__container}>
              <div className={s.ddm__virtualsessionwrapper}>
                  <h2>Live Virtual Session: <span>12 P.M. - 2 P.M. EST</span></h2>
                    <h3>Decision Architect Master Class</h3>
                    <p>
                    Join us for a live, interactive 2-hour virtual session designed to help you master the art of composing Decision Skills using the Aera Decision Cloud Platform. Whether you’re a data scientist, IT professional, or business analyst, this is a great opportunity to enhance your expertise and stay ahead in the evolving world of work. Experience this guided training on the principles, skills required and tools available to equip you to shape the future of decision-making and automation.
                    </p>
              </div>
            </div>
          </div> */}
						<div className={s.ddm__ondemandsession}>
							<div className={s.ddm__container}>
								<h2>Virtual On-Demand Tracks</h2>
								<h3>Sessions for Diving into Aera’s Latest Innovations, Deriving Real Business Value, and Seeing AI Skills in ActionSessions for Diving into Aera’s Latest Innovations, Deriving Real Business Value, and Seeing AI Skills in Action</h3>
								<div className={s.ddm__blurb}>Click on the session titles to watch the sessions on-demand.</div>
								<div className={s.ddm__ondemandsessionwrapper}>
									{/* <div className={s(s.ddm__ondemandsessionbox, s.ddm__darkBlueBox)}>
                    <h3>Decision Architect Master Class</h3>
                    <h4>Join us for a live, interactive 2-hour virtual session designed to help you master the art of composing Decision Skills using the Aera Decision Cloud Platform.</h4>
                    <p>Whether you’re a data scientist, IT professional, or business analyst, this is a great opportunity to enhance your expertise and stay ahead in the evolving world of work. Gain guided training and hands-on experience that will equip you with the tools needed to shape the future of decision-making and automation.</p>
                </div> */}
									<div className={s(s.ddm__ondemandsessionbox, s.ddm__darkBlueBox)}>
										<h3>Innovation Track</h3>
										<h4>Explore the Latest Innovations in Aera Decision Cloud™</h4>
										<p>Tune into these sessions to stay ahead of the curve on the latest innovations in Aera Decision Cloud™. Learn how data scientists, skill developers, and business users can enhance and automate decision making across the enterprise—at speed and scale—to drive meaningful business impact.</p>
										<ul>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/an-overview-of-aera-decision-cloud'
													target='_blank'
												>
													An Overview of Aera Decision Cloud™ highlighting latest innovations
													{/* <span className={s.ddm__smallcircle}><span className={s.ddm__smallplaybtn}></span></span> */}
													<ul>
														<li className={s.ddm__innerlist}>Naveen Reddy, VP, Product Marketing, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/data-ai-ready-decision-data-model'
													target='_blank'
												>
													Data: AI-Ready Decision Data Model™
													<ul>
														<li className={s.ddm__innerlist}>Lalitha Sundaramurthy, Sr. Vice President of Products, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/engagement-empowering-business-users-to-make-faster-better-decisions'
													target='_blank'
												>
													Engagement: Empowering Business Users to Make Faster, Better Decisions
													<ul>
														<li className={s.ddm__innerlist}>Sautrik Joardar, Sr. Product Manager, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/digitizing-and-automating-decisions'
													target='_blank'
												>
													Digitizing and Automating Decisions
													<ul>
														<li className={s.ddm__innerlist}>Nitin Gomatam, Principal Product Manager, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/intelligence-operationalizing-ai-to-digitize-business-decision-making'
													target='_blank'
												>
													Intelligence: Operationalizing AI to Digitize Business Decision Making
													<ul>
														<li className={s.ddm__innerlist}>Mustafa Kabul, Vice President of Data Science & Machine Learning, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/aera-learns-leveraging-advanced-ai-to-make-better-decisions'
													target='_blank'
												>
													Aera Learns: Leveraging Advanced AI to Make Better Decisions
													<ul>
														<li className={s.ddm__innerlist}>Mustafa Kabul, Vice President of Data Science & Machine Learning, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/ai-evolution-generative-ai-and-the-power-of-agentic-ai'
													target='_blank'
												>
													AI Evolution: Generative AI and the power of Agentic AI
													<ul>
														<li className={s.ddm__innerlist}>Mustafa Kabul, Vice President of Data Science & Machine Learning, Aera Technology</li>
													</ul>
												</a>
											</li>

											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/scenario-planning-modeling-strategic-decisions'
													target='_blank'
												>
													Scenario Planning: Modeling Strategic Decisions
													<ul>
														<li className={s.ddm__innerlist}>Nitin Gomatam, Principal Product Manager, Aera Technology</li>
													</ul>
												</a>
											</li>
										</ul>
									</div>
									<div className={s(s.ddm__ondemandsessionbox, s.ddm__greenBox)}>
										<h3>Business Impact Track</h3>
										<h4>Master AI for Decision Making: From Implementation to Value</h4>
										<p>Learn how to effectively implement and measure the value of AI in decision making. Our experts will present best practices for assessing the potential impact of Decision Intelligence, achieving rapid deployment with quick time to value, and sharing real-world examples of the transformative power of Decision Intelligence. Gain insights from large global organizations that have successfully deployed and scaled AI for decision automation. This track also features conversations with our partners at Deloitte and EY.</p>
										<ul>
											{/* <li>Decision Intelligence at Proximo Spirits</li>
                      <li>Decision Intelligence at Merck Animal Health</li>
                      <li>Decision Intelligence at Mitsubishi Chemical Group</li> */}
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/a-framework-for-delivering-business-value-with-decision-intelligence'
													target='_blank'
												>
													A Framework for Delivering Business Value with Decision Intelligence
													<ul>
														<li className={s.ddm__innerlist}>Gonzalo Benedit, Chief Revenue Officer, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/getting-started-with-decision-intelligence-and-aera-technology-customer-success'
													target='_blank'
												>
													Getting Started with Decision Intelligence and Aera Technology Customer Success
													<ul>
														<li className={s.ddm__innerlist}>Louis Peacock, Chief Customer Officer, Aera Technology</li>
														<li className={s.ddm__innerlist}>Ram Krishnan, Global Head, Customer Success, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/enabling-people-and-technology-unilevers-autonomous-operations-journey'
													target='_blank'
												>
													Unilever: Enabling People and Technology: Unilever's Autonomous Operations Journey
													<ul>
														<li className={s.ddm__innerlist}>Juan Carlos Parada, Executive Vice President, Global Customer Operations, Unilever</li>
														{/* <li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li> */}
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/decision-intelligence-at-jdi'
													target='_blank'
												>
													JD Irving: From Vision to Execution: J.D. Irving's Decision Intelligence Journey
													<ul>
														<li className={s.ddm__innerlist}>Georges Tetegan, Corporate Vice President - Project Control Tower, Irving</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/leveraging-decision-intelligence-to-improve-supply-chain-agility-and-efficiency-at-pmi'
													target='_blank'
												>
													PMI: Moving from Insights to Action with Decision Intelligence
													<ul>
														<li className={s.ddm__innerlist}>Gualtiero Cerrato, Supply Chain Director, Philip Morris International</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											{/* <li>PMI: Moving from Insights to Action with Decision Intelligence
                        <ul>
                          <li className={s.ddm__innerlist}>
                          Gualtiero Cerrato, Supply Chain Director, Philip Morris International
                          </li>
                          <li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
                        </ul>
                      </li> */}
											{/* <li>How Decision Architects and AI Platforms are Transforming Work and Value: A Conversation with Alex Nasciutti of EY
                        <ul>
                          <li className={s.ddm__innerlist}>
                          Alex Nasciutti, Partner Supply Chain & Operations, Ernst & Young
                          </li>
                          <li className={s.ddm__innerlist}>
                          Alison Crawford, Senior Director of Global Product Marketing, Aera Technology
                          </li>
                        </ul>
                      </li> */}
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/the-new-frontier-unleashing-student-success-with-decision-intelligence-with-wgu'
													target='_blank'
												>
													WGU: The New Frontier: Unleashing Student Success with Decision Intelligence
													<ul>
														<li className={s.ddm__innerlist}>Joe Dery, Vice President – Dean of Data Analytics, Computer Science, & Software Engineering, Western Governors University</li>
														<li className={s.ddm__innerlist}>Jennie Sanders, Vice President of Instruction, Western Governors University</li>

														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/transforming-service-and-inventory-management-with-decision-intelligence-with-infrabuild'
													target='_blank'
												>
													InfraBuild: Transforming Service & Inventory Management with Decision Intelligence
													<ul>
														<li className={s.ddm__innerlist}>Evgeny Krapovnitskiy, Head of Supply Chain, InfraBuild</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/baxter-healthcare-elevating-healthcare-with-decision-intelligence'
													target='_blank'
												>
													Baxter Healthcare: Elevating healthcare with Decision Intelligence
													<ul>
														<li className={s.ddm__innerlist}>Paul Ives, Director of Integrated Supply Chain, Baxter Healthcare</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/supply-chain-insights-from-cpg-leaders'
													target='_blank'
												>
													CGT: Frustrations and Foresight: Supply Chain Insights from CPG Leaders
													<ul>
														<li className={s.ddm__innerlist}>Lisa Johnston, Editor-in-Chief, Consumer Goods Technology</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/reason-driven-decision-making'
													target='_blank'
												>
													Brian Evergreen: Reason Driven™ Decision Making
													<ul>
														<li className={s.ddm__innerlist}>Brian Evergreen, CEO, The Future Solving Company</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/reshaping-the-future-of-work-with-decision-intelligence'
													target='_blank'
												>
													Joe Fuller: Reshaping the Future of Work with Decision Intelligence
													<ul>
														<li className={s.ddm__innerlist}>Dr. Joe Fuller, Professor of Management Practice, and Co-Director, Managing the Future of Work Initiative, Harvard Business School</li>
														<li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
													</ul>
												</a>
											</li>
											{/* <li>Building Decision Agility Now – A Conversation with Dr. John Gattorna
                      <ul>
                          <li className={s.ddm__innerlist}>
                          Dr. John Gattorna, Global Supply Chain Thought Leader, Author, and Adjunct Professor
                          </li>
                          <li className={s.ddm__innerlist}>Rajeev Mitroo, General Manager, APAC, Aera Technology</li>
                        </ul>
                      </li> */}
											{/* <li><a href="https://meet.aeratechnology.com/aerahub24/keynote-session-with-sasha-koff-of-dell" target="_blank">Decision Intelligence at Dell
                      <ul>
                          <li className={s.ddm__innerlist}>
                          Sasha Koff, Former Senior Vice President, Digital Supply Chain, Dell Technologies
                          </li>
                          <li className={s.ddm__innerlist}>Fred Laluyaux, CEO, Aera Technology</li>
                        </ul>
                        </a>
                      </li> */}
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/decision-intelligence-in-chemical-supply-chains'
													target='_blank'
												>
													Deloitte: Decision Intelligence in Chemical Supply Chains
													<ul>
														<li className={s.ddm__innerlist}>Kevin Overdulve, Partner Supply Chain & Network Operations at Deloitte</li>
														<li className={s.ddm__innerlist}>Jeroen Nysen, Senior Manager Supply Chain & Network Operations at Deloitte</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/deloittes-decision-intelligence-manual'
													target='_blank'
												>
													Deloitte’s Decision Intelligence Manual
													<ul>
														<li className={s.ddm__innerlist}>Kevin Overdulve, Partner Supply Chain & Network Operations, Deloitte</li>
														<li className={s.ddm__innerlist}>Jeroen Nysen, Senior Manager Supply Chain & Network Operations, Deloitte</li>
													</ul>
												</a>
											</li>

											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/top-decision-intelligence-use-cases-in-consumer-products-industry'
													target='_blank'
												>
													EY: Top DI Use Cases in Consumer Products industry
													<ul>
														<li className={s.ddm__innerlist}>Sarada Dalai, Director Supply Chain & Operations, EY</li>
														<li className={s.ddm__innerlist}>Ryan Kaysen, Partner Supply Chain & Operations, EY</li>
													</ul>
												</a>
											</li>
											{/* <li><a href="https://meet.aeratechnology.com/aerahub24/decision-intelligence-in-chemical-supply-chains" target="_blank">Top Decision Intelligence Use Cases in Chemicals Industry
                      <ul>
                          <li className={s.ddm__innerlist}>
                          Kevin Overdulve, Partner Supply Chain & Network Operations, Deloitte
                          </li>
                          <li className={s.ddm__innerlist}>Jeroen Nysen, Senior Manager Supply Chain & Network Operations, Deloitte</li>
                        </ul>
                        </a>
                      </li> */}
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/decision-intelligence-as-enabler-of-an-autonomous-control-tower'
													target='_blank'
												>
													EY: DI as enabler of an Autonomous Control Tower
													<ul>
														<li className={s.ddm__innerlist}>Alex Nasciutti, Principal Supply Chain & Operations, EY</li>
														<li className={s.ddm__innerlist}>Shailander Dagar, Senior Manager Supply Chain & Operations, EY</li>
													</ul>
												</a>
											</li>
										</ul>
									</div>
									<div className={s(s.ddm__ondemandsessionbox, s.ddm__lightBlueBox)}>
										<h3>Skills Demo Track</h3>
										<h4>AI-Driven Decision Making Skills</h4>
										<p>Explore how AI enhances decision making in supply chain, procurement, revenue management, and more. Join us for an introduction to AI skills tailored to solve specific business challenges. You'll also witness a diverse range of these skills in action on the Aera Decision Cloud™ platform, showcasing how decisions can be digitized, automated, and continuously evolved as your business needs change.</p>
										<ul>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/introduction-to-the-aera-skills-library'
													target='_blank'
												>
													Introduction to the Aera Skills™ Library
													<ul>
														<li className={s.ddm__innerlist}>Naveen Reddy, VP, Product Marketing, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/getting-started-with-aera-test-drives'
													target='_blank'
												>
													Getting Started with Aera: Test Drive
													<ul>
														<li className={s.ddm__innerlist}>Sean McNunn, Director, Sales Engineering, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/setting-up-decision-intelligence-for-success-accelerating-time-to-value'
													target='_blank'
												>
													Implementing Aera Decision Cloud
													<ul>
														<li className={s.ddm__innerlist}>Rob Wolfe, Senior Engagement Principal, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												<a
													href='https://meet.aeratechnology.com/aerahub24/accelerating-time-to-value-with-decision-intelligence-results-in-weeks-not-months'
													target='_blank'
												>
													Six Best Practices for Delivering a Successful Decision Intelligence Skill
													<ul>
														<li className={s.ddm__innerlist}>Soniya Somani, Engagement Principal, Aera Technology</li>
														<li className={s.ddm__innerlist}>Adam Mikkelsen, Engagement Principal, Aera Technology</li>
													</ul>
												</a>
											</li>
											<li>
												Aera Skill™ Demos
												<ul className={s.ddm__twocolumns}>
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/demand-touchless-demand-forecasting'
															target='_blank'
														>
															Touchless Demand Forecasting
														</a>
													</li>
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/procurement-supply-resilience'
															target='_blank'
														>
															Supply Resilience
														</a>
													</li>
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/aging-inventory-management'
															target='_blank'
														>
															Excess and Obsolete Inventory
														</a>
													</li>
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/inventory-stock-rebalancing'
															target='_blank'
														>
															Inventory Rebalancing
														</a>
													</li>
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/inventory-dynamic-safety-stock-management'
															target='_blank'
														>
															Dynamic Safety Stock Adjustments
														</a>
													</li>
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/inventory-dynamic-order-fulfillment'
															target='_blank'
														>
															Dynamic Order Fulfillment
														</a>
													</li>
													{/* <li>Efficient Shipping and Stock-Out Prevention </li> */}
													<li>
														<a
															href='https://meet.aeratechnology.com/aerahub24/digital-control-tower'
															target='_blank'
														>
															Digital Control Tower
														</a>
													</li>
													{/* <li>Profit and Loss (P&L) Planning & Forecasting</li>
                          <li>Claims Matching and Processing</li> */}
												</ul>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className={s.ddm__sponsors}>
							<div className={s.ddm__container}>
								<h2>Thank You to our Sponsors</h2>
								<div className={s.ddm__sponsorswrapper}>
									<div className={s.ddm__sponsor}>
										<img
											src={eylogosponsor}
											alt='EYlogo'
										/>
										<p>Platinum Sponsor</p>
									</div>
									<div className={s.ddm__sponsor}>
										<img
											src={Deloittesponsor}
											alt='Deloittelogo'
										/>
										<p>Gold Sponsor</p>
									</div>
									<div className={s.ddm__sponsor}>
										<img
											src={accenturelogo}
											alt='Accenturelogo'
										/>
										<p>Silver Sponsor</p>
									</div>
								</div>
							</div>
						</div>
						{/* <div className={s.ddm__clearfix}></div> */}
						{/* <div className={s.ddm__savetheseat}>
            <div className={s.ddm__container}>
              <div className={s.ddm__savetheseatwrapper}>
                <h2>Watch Videos On-Demand</h2>
                <div className={s.ddm__footerbutton}>
                  <a
                      href="javascript:;"
                      className={s.ddm__saveyourseat}
                      id="saveseat"
                    >
                        Watch Now
                    </a>
                </div>
              </div>
            </div>
          </div> */}
						<div className={s.ddm__clearfix}></div>
						<div className={s.ddm__ctasection}>
							<div className={s(s.ddm__container)}>
								<div className={s.ddm__socialIcons}>
									<a
										href='https://www.linkedin.com/company/aera-technology/'
										target='_blank'
									>
										<img
											alt='Linkedin'
											src={LinkedinIcon}
										/>
									</a>
									<a
										href='https://x.com/Aera_Technology'
										target='_blank'
									>
										<img
											alt='Twitter'
											src={TwitterIcon}
										/>
									</a>
									<a
										href='https://www.youtube.com/@AeraTechnology'
										target='_blank'
									>
										<img
											alt='Youtube'
											src={YoutubeIcon}
										/>
									</a>
								</div>
								<p>
									<a
										href='https://www.aeratechnology.com/'
										target='_blank'
									>
										Aera Technology
									</a>{' '}
									| 707 California St, Mountain View, CA 94041
								</p>
							</div>
						</div>
					</div>
				</div>
			</Page>
		);
	}
}
