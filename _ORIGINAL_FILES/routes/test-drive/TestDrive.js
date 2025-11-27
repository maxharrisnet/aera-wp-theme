import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import Page from 'components/page';
import s from './TestDrive.scss';
//import Benefits from "../../routes/technology/components/benefits/Benefits";
import ddmImage from 'assets/images/DDM_CIRLCES.png';
import aeraskills from 'assets/images/aeraskills.jpg';
import insight from 'assets/images/TD_Insights_screen.jpg';
import reccomendations from 'assets/images/TD_recommendation_screen.jpg';
import Lipton from 'assets/images/Lipton_Logo.png';

import Streams from 'assets/images/ddm/datastreams_2x.png';
import DataCrawlers from 'assets/images/ddm/datacrawlers.png';
import Dummyimage from 'assets/images/ddm/dummyimage.png';
import Writeback from 'assets/images/ddm/writeback_2x.png';
import DDM from 'assets/images/ddm/Decision-Data-Model_v001.png';
import ExecutionPlan from 'assets/images/ddm/Execution-Plan_v001.png';

import Request from 'components/request';

import { NavLink } from 'react-router-dom';
export default class TestDrive extends Component {
	componentDidMount() {
		document.addEventListener('DOMContentLoaded', function () {
			const targetDiv = document.querySelector('#cta-section'); // your div
			const formWrapper = document.querySelector('#form-wrapper'); // adjust selector

			const checkInterval = setInterval(function () {
				if (formWrapper && formWrapper.querySelector('.submitted-message')) {
					if (targetDiv) targetDiv.remove();
					clearInterval(checkInterval);
				}
			}, 500);
		});
		$(function () {
			$('#ddmslider').bxSlider({
				auto: false,
				pause: 3000,
				controls: false,
				pager: true,
				adaptiveHeight: $(window).width() < 720 ? true : false,
				moveSlides: 1,
				pagerCustom: '#bx-pager',
			});
		});

		$('#testdrivebtn').click(function () {
			$('html, body').animate(
				{
					scrollTop: $('#form-wrapper').offset().top - 200,
				},
				500
			);
		});

		$('#bx-pager a').on('click touchstart', function () {
			var thumbIndex = $('#bx-pager a').index(this);
			//console.log(thumbIndex);

			$('#bx-pager a').css('backgroundColor', '#fff');
			$('#bx-pager a').css('border', '1px solid #bee9f3');
			$('#bx-pager a').css('borderColor', 'rgba(138,196,232,.5)');
			$('#bx-pager a').css('backgroundImage', 'linear-gradient(white, white)');

			$(this).css('backgroundColor', '#dee8fb');
			$(this).css('borderColor', '#dee8fb');
			$(this).css('backgroundImage', 'linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)');
		});

		const script = document.createElement('script');
		script.src = 'https://js.hsforms.net/forms/embed/v2.js';
		document.body.appendChild(script);

		script.addEventListener('load', () => {
			if (window.hbspt) {
				window.hbspt.forms.create({
					portalId: '4455954',
					formId: '18507570-ffd6-4923-9315-ea5604480183',
					target: '#testdriveForm',
				});
			}
		});

		// $('#bx-pager a').on('click', function() {
		//     var thumbIndex = $('#bx-pager a').index(this);
		//     // call the "goToSlide" public function
		//     console.log(thumbIndex);
		//     //slider.goToSlide(thumbIndex);

		//     // remove all active classes
		//     $('#bx-pager a').css('backgroundColor','#fff');
		//     $('#bx-pager a').css('border','1px solid #bee9f3');
		//     $('#bx-pager a').css('borderColor','rgba(138,196,232,.5)');

		//     // assisgn "pager-active" to clicked thumb
		//     $(this).css('backgroundColor','#dee8fb');
		//     $(this).css('borderColor','#dee8fb');
		//     $(this).css('borderImage','linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)');
		//     // very important! you must kill the links default behavior
		//     return false;
		// });

		// // assign "pager-active" class to the first thumb
		// $('#bx-pager a:first').addClass('pager-active');
	}

	render() {
		return (
			<Page>
				<Helmet
					title='Aera Technology - Test Drive the Aera Decision Cloud™'
					meta={[
						{
							name: 'description',
							content: 'Experience the value of Decision Intelligence in just 4 weeks. Our hands-on Test Drive gives you actionable insights and recommendations generated from your data.',
						},
						{
							property: 'og:description',
							content: 'Experience the value of Decision Intelligence in just 4 weeks. Our hands-on Test Drive gives you actionable insights and recommendations generated from your data.',
						},
						{
							name: 'twitter:description',
							content: 'Experience the value of Decision Intelligence in just 4 weeks. Our hands-on Test Drive gives you actionable insights and recommendations generated from your data.',
						},
					]}
				/>

				<div className={s.ddm}>
					<div className={s.ddm__section1}>
						<div className={s.ddm__container}>
							<div className={s.ddm__headlinewrapper}>
								<h1 className={s.ddm__title}>Test Drive the Aera Decision Cloud™</h1>
								<p>Experience the value of Decision Intelligence in just 2 to 4 weeks. Our hands-on Test Drive gives you actionable insights and recommendations generated from your data.</p>
							</div>
							<div className={s.ddm__section1wrapper}>
								<div className={s.ddm__section1lefttext}>
									<p>With the Aera Test Drive, you experience the powerful capabilities of the Aera Decision Cloud platform, including harmonized data, AI-enabled insights, and actionable recommendations.</p>
									<p>See the benefits of Decision Intelligence in the context of your business. Gain an understanding of the commercial and technical requirements – and potential value to your company – of deploying decision-making AI.</p>
									<p>Assess your organization’s readiness to start your Decision Intelligence journey. Schedule a meeting to learn more about an Aera Test Drive today.</p>
									{/* <div className={s.ddm__subhead}>Aggregating and<br/> harmonizing data</div>
                  <div className={s.ddm__subheadcontinue}>from across your ecosystem into a model designed for decision making</div> */}
									{/* <div className={s.ddm__buttonwrapper}>
                    <NavLink 
                      to="/demo"
                      className={s.ddm__requestbutton}
                    >
                        Request A Demo
                    </NavLink>
                  </div> */}
								</div>
								<div className={s.ddm__section1rightimg}>
									<div
										className={s.ddm__formwrapper}
										id='form-wrapper'
									>
										<div id='testdriveForm'></div>
									</div>
								</div>
								<div className={s.ddm__clearfix}></div>
							</div>
						</div>
					</div>
					<div className={s.ddm__section2}>
						<div className={s.ddm__container}>
							<div className={s.ddm__section2div1}>
								<h2>What do you get as part of the Aera Test Drive?</h2>
								<p>We guide you through the process of deploying an AI-powered Decision Intelligence platform that understands your business capabilities, makes real-time recommendations, acts to execute decisions, and learns from the outcomes of decisions made. You will experience firsthand how Aera harmonizes data, applies intelligence, engages with users, and executes decisions.</p>
							</div>
						</div>
						<div className={s.ddm__sliderwrapper}>
							<div
								id='bx-pager'
								className={s.ddm__pager}
							>
								<a
									data-slide-index='0'
									href=''
									className={s.ddm__default}
								>
									Aera Skills™
								</a>
								<a
									data-slide-index='1'
									href=''
								>
									Data-Driven Recommendations
								</a>
								<a
									data-slide-index='2'
									href=''
								>
									Decision Data Model
								</a>
								<a
									data-slide-index='3'
									href=''
								>
									Insights
								</a>
							</div>
							<div id='ddmslider'>
								<div>
									<div className={s.ddm__slidercontentwrapper}>
										<div className={s.ddm__sliderimg}>
											<img
												src={aeraskills}
												alt='Aera Skills™'
											/>
										</div>
										<div className={s.ddm__slidercontent}>
											<h3>Aera Skills™</h3>
											<ul>
												<li>Address specific use cases, called skills, with composable data science and machine learning models. Select from a menu of skills that solve critical business decision-making challenges.</li>
												<li>Learn how your team can develop new Aera Skills to meet your changing business needs.</li>
											</ul>
										</div>
										<div className={s.ddm__clearfix}></div>
									</div>
								</div>
								<div>
									<div className={s.ddm__slidercontentwrapper}>
										<div className={s.ddm__sliderimg}>
											<img
												src={reccomendations}
												alt='Data-Driven Recommendations'
											/>
										</div>
										<div className={s.ddm__slidercontent}>
											<h3>Data-Driven Recommendations</h3>
											<ul>
												<li>Execute decisions at the moment of maximum impact with timely recommendations delivered to your inbox, along with the context and data required to understand each decision.</li>
												<li>Dive into the data behind each recommendation using Aera’s rich analysis and visualization tools.</li>
											</ul>
										</div>
										<div className={s.ddm__clearfix}></div>
									</div>
								</div>
								<div>
									<div className={s.ddm__slidercontentwrapper}>
										<div className={s.ddm__sliderimg}>
											<img
												src={ddmImage}
												alt='Decision Data Model'
											/>
										</div>
										<div className={s.ddm__slidercontent}>
											<h3>Decision Data Model</h3>
											<ul>
												<li>Rapidly ingest and harmonize your enterprise data to get real-time insights and improve data quality.</li>
												<li>Map over 170 data sets to generate over 80 pre-populated KPIs and measures with Aera Data Crawlers.</li>
												<li>Learn how Aera’s Data Workbench enables continuous learning by writing back to source systems, capturing the context and outcome of every decision.</li>
											</ul>
										</div>
										<div className={s.ddm__clearfix}></div>
									</div>
								</div>

								<div>
									<div className={s.ddm__slidercontentwrapper}>
										<div className={s.ddm__sliderimg}>
											<img
												src={insight}
												alt='Insights'
											/>
										</div>
										<div className={s.ddm__slidercontent}>
											<h3>Insights</h3>
											<ul>
												<li>Gain insights across procurement, inventory, manufacturing, and customer metrics with Aera’s dashboards, data science, and Graph DB capabilities.</li>
												<li>Empower users with the ability to go from high-level insights to transaction-level details for deep-dive analysis.</li>
												<li>Identify and quantify the value that Decision Intelligence can deliver for your organization.</li>
											</ul>
										</div>
										<div className={s.ddm__clearfix}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <div className={s.ddm__benefits}>
            <div className={s.ddm__container}>
              <div className={s.ddm__benefitswrapper}>
                  <h2>Gain insight into critical business areas</h2>
                  <div className={s.ddm__pointerwrapper}>
                  <div className={s.ddm__pointers}>
                    <b>Procurement</b>
                    <ul>
                      <li>Procurement dashboards with insights into spend, PPV, OTIF, Supplier Performance, and PO risk</li>
                      <li>Graph DB capability providing visualizations across material, vendor, location, and product</li>
                      <li>Data Science capability which highlights OTIF-impacting factors</li>
                    </ul>
                  </div>
                  <div className={s.ddm__pointers}>
                  <b>Inventory</b>
                  <ul>
                    <li>Inventory dashboards with insights into inventory days, value, aging, and product expiry across a range of dimensions, including material and location</li>
                    <li>Graph DB capability which provides visualization across material and location</li>
                  </ul>    
              
                  </div>
                  <div className={s.ddm__pointers}>
                  <b>Customer</b>
                  <ul>
                    <li>Customer dashboards with insights into revenue, OTIF/Fill Rate,returns/cancellations, and sales order item visibility</li>
                    <li>Graph DB capability which provides visualization across materials, customers, and locations</li>
                  </ul>
                  </div>
                  <div className={s.ddm__pointers}>
                  <b>Manufacturing</b>
                  <ul>
                    <li>Production dashboards with insights into schedule adherence, field, lead time, quality (Lots Released On Time, Defect Parts Per Million), and capacity trends over time</li>
                  </ul>
                  </div>
                  <div className={s.ddm__clearfix}></div>
                  </div>
              </div>
            </div>
          </div> */}
					<div className={s.ddm__quotesection}>
						<div className={s.ddm__overlay}></div>
						<div className={s(s.ddm__container, s.ddm__quoteflex)}>
							{/* <div className={s.ddm__quotelogo}>
                <img src={Lipton} />
              </div> */}
							<div className={s.ddm__quote}>
								<h2>“Through the Aera Test Drive, we experienced the ability of Decision Intelligence to empower the people in our organization with the technology and capabilities to accelerate our impact. It's been a privilege to be part of the Aera journey and we look forward to achieving new milestones in the future.”</h2>
								<div className={s.ddm__signaturewrapper}>
									<div className={s.ddm__signature}>
										<div className={s.ddm__dash}>Kevin Callanan,</div>
										<div>Vice President of Supply Chain and Procurement,</div>
										<div className={s.ddm__bold}>Lucid Motors</div>
									</div>
								</div>
							</div>
							<div className={s.ddm__clearfix}></div>
						</div>
					</div>
					<div className={s(s.ddm__benefits, s.ddm__padding)}>
						<div className={s.ddm__container}>
							<div className={s.ddm__benefitswrapper}>
								<h2>Benefits of the Aera Test Drive</h2>
								<div className={s.ddm__pointerwrapper}>
									<div className={s.ddm__linepointers}>Actionable, AI-powered recommendations, harmonized data, and insights delivered in your business context.</div>
									<div className={s.ddm__linepointers}>Firsthand experience of how AI accelerates your business and digital strategies, and introduces your team to a new way of working.</div>
									<div className={s.ddm__linepointers}>A Decision Intelligence value-based roadmap for your organization, created in collaboration with your executive team and subject-matter experts.</div>
									<div className={s.ddm__linepointers}>Hands-on workshops and training with your end users to educate them on the benefits of our self-service platform.</div>
									<div className={s.ddm__clearfix}></div>
								</div>
							</div>
						</div>
					</div>
					<div
						className={s.ddm__ctasection}
						id='cta-section'
					>
						<div className={s(s.ddm__container)}>
							<h2>Talk to us to learn more</h2>
							<div className={s.ddm__footerbutton}>
								<a
									href='javascript:;'
									className={s.ddm__testdrivebutton}
									id='testdrivebtn'
								>
									Schedule Meeting
								</a>
							</div>
						</div>
					</div>
					{/* <div className={s.ddm__section2}>
            <div className={s.ddm__container}>
                <div className={s.ddm__section2div1}>
                  <h2>Data Harmonization Made Easy</h2>
                  <p>
                    Data Workbench, Aera’s intuitive, self-service interface, gives data engineers easy access to build and configure Data Crawlers, manage the Decision Data Model, and publish content for other teams to use. 
                  </p>
                  <p>
                    Because every organization is different, Data Workbench’s exploration and transformation tools enable you to apply predefined data sets or define new ones to fit your needs.
                  </p>
                  <div className={s.ddm__footerbutton}>
                  <NavLink 
                      to="/demo"
                      className={s.ddm__meetaerabutton}
                    >
                        MEET AERA
                    </NavLink>
                  </div>
                </div>
            </div>
          </div> */}
				</div>
				{/* <Request title="See Aera in action." text="Meet Aera" link="/demo" /> */}
			</Page>
		);
	}
}
