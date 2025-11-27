import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import ColumnContent, { ColumnContentItem } from 'components/column-content';
import Intro, { Loading } from 'components/intro';
import Page from 'components/page';

// import ImageManagement1old from "assets/images/company/management-frederic_laluyaux.jpg";
// import ImageManagement2old from "assets/images/company/management-shariq_mansoor.jpg";
import ImageInvestors1 from 'assets/images/company/investors-nea.png';
import ImageInvestors2 from 'assets/images/company/investors-gp.png';
import ImageInvestors3 from 'assets/images/company/investors-nvcap.png';
import ImageInvestors4 from 'assets/images/company/investor-dfjgrowth.png';

// import ImageCaseStudy1 from 'assets/images/company/casestudies-merck.jpg';
// import ImageCaseStudy2 from 'assets/images/company/casestudies-columbia.jpg';
// import ImageCaseStudy3 from 'assets/images/company/casestudies-brocade.jpg';
import ImageOfficesMap from 'assets/images/company/offices-map.png';

import About from './components/about';
import Glance from './components/glance';
import Management, { ManagementItem } from './components/management';
import Investors, { InvestorsItem } from './components/investors';
// import CaseStudies, { CaseStudiesItem } from './components/case-studies';
import Offices, { OfficesItem } from './components/offices';

import ImageManagement1 from 'assets/images/company/FredNew.jpg';
import ImageManagement2 from 'assets/images/company/ShariqNew.jpg';
import ImageManagement3 from 'assets/images/company/laurent.jpg';
import ImageManagement4 from 'assets/images/company/jonathan.jpg';
import ImageManagement5 from 'assets/images/company/ram.jpg';

import ImageManagement8 from 'assets/images/company/gonzolo.jpg';
import ImageManagement9 from 'assets/images/company/rajeev.jpg';

import ImageManagement12 from 'assets/images/company/SteveLeightell.jpeg';
import ImageManagement13 from 'assets/images/company/fuller.jpg';
import ImageManagement14 from 'assets/images/company/goel.jpg';
import ImageManagement15 from 'assets/images/company/john.jpg';
import ImageManagement16 from 'assets/images/company/timconner.png';

import ImageManagement17 from 'assets/images/company/aruna.jpg';
import ImageManagement18 from 'assets/images/company/lalitha.jpg';

import ImageManagement25 from 'assets/images/company/ZakPeirce.jpg';
import ImageManagement26 from 'assets/images/company/MaureenArriola.jpg';

import ImageManagement23 from 'assets/images/company/Mustafa.jpg';
import ImageManagement24 from 'assets/images/company/katieyang.png';
import Folia from 'assets/images/company/folia.jpg';
import Peacock from 'assets/images/company/peacock.jpg';
import SilverLake from 'assets/images/partners/SilverLakeWaterman.jpg';

//import ImageOfficesMap from "assets/images/company/offices-map.png";

import ExecutiveTeam, { ExecutiveTeamItem } from './components/executive-team';

import s from './components/executive-team/ExecutiveTeam.scss';

class Company extends Component {
	static propTypes = {
		jobResult: PropTypes.object,
	};

	render() {
		const { title, titleLineTwo, subline } = this.props.jobResult;

		return (
			<Page>
				<Helmet
					title='Aera Technology - About Us'
					meta={[
						{
							name: 'description',
							content: 'Our belief, at our core, is helping companies transform. We believe in driving beyond digital transformation so that organizations can operate at internet speed and scale in the era of Decision Intelligence.',
						},
						{
							property: 'og:description',
							content: 'Our belief, at our core, is helping companies transform. We believe in driving beyond digital transformation so that organizations can operate at internet speed and scale in the era of Decision Intelligence.',
						},
						{
							name: 'twitter:description',
							content: 'Our belief, at our core, is helping companies transform. We believe in driving beyond digital transformation so that organizations can operate at internet speed and scale in the era of Decision Intelligence.',
						},
						{ property: 'og:image', content: '/favicons/aera-share.jpg' },
						{ name: 'twitter:image', content: '/favicons/aera-share.jpg' },
					]}
					link={[{ rel: 'canonical', href: 'https://www.aeratechnology.com/about-us' }]}
				/>

				<Intro
					title={title}
					titleLineTwo={titleLineTwo}
					text={subline}
				/>
				{/* <Glance /> */}
				<About>
					<ColumnContent>
						<ColumnContentItem title='The Challenge'>
							<p>The digital economy has created a paradox. Enterprises now have more data than ever before, which should make decision-making easier. Yet the volume, velocity, and complexity of information have outpaced human capacity to act with the speed and precision the digital era demands. That’s why, in the age of AI, the ability to make high-quality decisions rapidly has become a competitive necessity.</p>
						</ColumnContentItem>

						<ColumnContentItem title='The Solution'>
							<p>The answer is decision intelligence, empowering enterprises to optimize and automate decisions at scale. It marks a profound shift: from people making decisions supported by machines to machines making decisions guided by people. Aera makes this shift possible, delivering an enterprise-wide decision intelligence agent that drives consistent, real-time decisions.</p>
						</ColumnContentItem>

						<ColumnContentItem title='The People'>
							<p>Behind Aera is a team of product innovators, industry experts, and experienced leaders, supported by an accomplished board. United by a common mission, we’re shaping a future where decision intelligence becomes the operating system of global enterprises. The AI era has arrived — and the future of decision-making starts now.</p>
						</ColumnContentItem>
					</ColumnContent>
				</About>
				<ExecutiveTeam title='Leadership'>
					<ExecutiveTeamItem
						logo={ImageManagement1}
						text={
							<div>
								<p className={s.othermanagement__name}>Frederic Laluyaux</p>
								<p className={s.othermanagement__designation}>Co-Founder, President &amp; CEO</p>
							</div>
						}
						link='https://www.linkedin.com/in/flaluyaux/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement2}
						text={
							<div>
								<p className={s.othermanagement__name}>Shariq Mansoor</p>
								<p className={s.othermanagement__designation}>Co-Founder &amp; CTO</p>
							</div>
						}
						link='https://www.linkedin.com/in/shariqmansoor/'
					/>

					<ExecutiveTeamItem
						logo={ImageManagement4}
						text={
							<div>
								<p className={s.othermanagement__name}>Jonathan Walsh</p>
								<p className={s.othermanagement__designation}>Chief People Officer</p>
							</div>
						}
						link='https://www.linkedin.com/in/jonathandwalsh/'
					/>

					<ExecutiveTeamItem
						logo={ImageManagement8}
						text={
							<div>
								<p className={s.othermanagement__name}>Gonzalo Benedit</p>
								<p className={s.othermanagement__designation}>Chief Revenue Officer</p>
							</div>
						}
						link='https://www.linkedin.com/in/gonzalobenedit/'
					/>

					<ExecutiveTeamItem
						logo={ImageManagement3}
						text={
							<div>
								<p className={s.othermanagement__name}>Laurent Lefouet</p>
								<p className={s.othermanagement__designation}>Chief Strategy Officer</p>
							</div>
						}
						link='https://www.linkedin.com/in/laurentlefouet/'
					/>
					<ExecutiveTeamItem
						logo={Folia}
						text={
							<div>
								<p className={s.othermanagement__name}>Folia Grace</p>
								<p className={s.othermanagement__designation}>Chief Marketing Officer</p>
							</div>
						}
						link='https://www.linkedin.com/in/foliagrace'
					/>
					{/* <ExecutiveTeamItem
            logo={Peacock}
            text={
              <div>
                <p className={s.othermanagement__name}>Louis Peacock</p>
                <p className={s.othermanagement__designation}>
                 Chief Customer Officer
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/louispeacock"
          /> */}

					{/* <ExecutiveTeamItem
            logo={ImageManagement5}
            text={
              <div>
                <p className={s.othermanagement__name}>Ram Krishnan</p>
                <p className={s.othermanagement__designation}>
                  Global Head, Customer Success
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/rampkrishnan/"
          /> */}

					{/* <ExecutiveTeamItem
            logo={ImageManagement6}
            text={
              <div>
                <p className={s.othermanagement__name}>Kaushal Dave</p>
                <p className={s.othermanagement__designation}>
                  General Manager, Center of Excellence for Cognitive Automation
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/kaushalrdave/"
          /> */}

					{/* <ExecutiveTeamItem
            logo={ImageManagement11}
            text={
              <div>
                <p className={s.othermanagement__name}>Tom Stephenson</p>
                <p className={s.othermanagement__designation}>
                  General Manager, Americas
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/tom-stephenson-81820511/"
          /> */}

					{/* <ExecutiveTeamItem
            logo={ImageManagement9}
            text={
              <div>
                <p className={s.othermanagement__name}>Rajeev Mitroo</p>
                <p className={s.othermanagement__designation}>
                  General Manager, APAC
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/rajeev-mitroo-80575a18/"
          /> */}

					{/* <ExecutiveTeamItem
            logo={ImageManagement10}
            text={
              <div>
                <p className={s.othermanagement__name}>Fred Fontes Gerards</p>
                <p className={s.othermanagement__designation}>
                  Head of Growth
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/fredfontes/"
          /> */}

					{/* <ExecutiveTeamItem
            logo={ImageManagement20}
            text={
              <div>
                <p className={s.othermanagement__name}>Pascal Bornet</p>
                <p className={s.othermanagement__designation}>
                  Chief Evangelist
                </p>
              </div>
            }
            link="https://www.linkedin.com/in/pascalbornet/"
          /> */}
					<ExecutiveTeamItem
						logo={ImageManagement17}
						text={
							<div>
								<p className={s.othermanagement__name}>Aruna Goli</p>
								<p className={s.othermanagement__designation}>SVP, Engineering</p>
							</div>
						}
						link='https://www.linkedin.com/in/arunagoli/'
					/>

					<ExecutiveTeamItem
						logo={ImageManagement18}
						text={
							<div>
								<p className={s.othermanagement__name}>Lalitha Sundaramurthy</p>
								<p className={s.othermanagement__designation}>SVP, Product Management</p>
							</div>
						}
						link='https://www.linkedin.com/in/lalitha-sundaramurthy-4576ab2/'
					/>

					<ExecutiveTeamItem
						logo={ImageManagement23}
						text={
							<div>
								<p className={s.othermanagement__name}>Mustafa Onur Kabul</p>
								<p className={s.othermanagement__designation}>SVP, Data Science Machine Learning and AI</p>
							</div>
						}
						link='https://www.linkedin.com/in/mustafakabul/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement24}
						text={
							<div>
								<p className={s.othermanagement__name}>Katie Yang</p>
								<p className={s.othermanagement__designation}>VP, Finance</p>
							</div>
						}
						link='https://www.linkedin.com/in/katie-yang-89055438/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement26}
						text={
							<div>
								<p className={s.othermanagement__name}>Maureen Arriola</p>
								<p className={s.othermanagement__designation}>VP, Corporate Controller</p>
							</div>
						}
						link='https://www.linkedin.com/in/maureen-arriola-a7a5482/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement25}
						text={
							<div>
								<p className={s.othermanagement__name}>Zak Pierce</p>
								<p className={s.othermanagement__designation}>VP, Cloud Ops & Infrastructure</p>
							</div>
						}
						link='https://www.linkedin.com/in/zak-peirce/'
					/>
				</ExecutiveTeam>
				<ExecutiveTeam title='Board Members'>
					<ExecutiveTeamItem
						logo={ImageManagement14}
						text={
							<div>
								<p className={s.othermanagement__name}>Prabhu Goel</p>
								<p className={s.othermanagement__designation}>Venture Investor</p>
							</div>
						}
						link='https://www.linkedin.com/in/prabhu-goel-b373798/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement12}
						text={
							<div>
								<p className={s.othermanagement__name}>Steve Leightell</p>
								<p className={s.othermanagement__designation}>Georgian Partners</p>
							</div>
						}
						link='https://www.linkedin.com/in/steveleightell/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement16}
						text={
							<div>
								<p className={s.othermanagement__name}>Tim Connor</p>
								<p className={s.othermanagement__designation}>NewView Capital</p>
							</div>
						}
						link='https://www.linkedin.com/in/tim-connor-67538/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement15}
						text={
							<div>
								<p className={s.othermanagement__name}>John H. N. Fisher</p>
								<p className={s.othermanagement__designation}>DFJ Growth</p>
							</div>
						}
						link='https://www.linkedin.com/in/jfisher4/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement13}
						text={
							<div>
								<p className={s.othermanagement__name}>Joseph Fuller</p>
								<p className={s.othermanagement__designation}>Harvard Business School</p>
							</div>
						}
						link='https://www.linkedin.com/in/josephbfuller/'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement1}
						text={
							<div>
								<p className={s.othermanagement__name}>Frederic Laluyaux</p>
								<p className={s.othermanagement__designation}>Co-Founder, President &amp; CEO</p>
							</div>
						}
						link='/fred-laluyaux'
					/>
					<ExecutiveTeamItem
						logo={ImageManagement2}
						text={
							<div>
								<p className={s.othermanagement__name}>Shariq Mansoor</p>
								<p className={s.othermanagement__designation}>Co-Founder &amp; CTO</p>
							</div>
						}
						link='https://www.linkedin.com/in/shariqmansoor/'
					/>
				</ExecutiveTeam>
				<Investors title='Investors'>
					<InvestorsItem
						name='NEA'
						logo={ImageInvestors1}
						text={
							<p>
								New Enterprise Association (NEA) is a global venture capital firm partnering with entrepreneurs to build transformational businesses across multiple stages and sectors, with more than 210 IPOs and 360 acquisitions since the firm’s founding in 1977. For more information, visit{' '}
								<a
									href='https://www.nea.com/'
									target='_blank'
									rel='noopener noreferrer'
								>
									nea.com
								</a>
							</p>
						}
						link='https://www.nea.com/'
					/>

					<InvestorsItem
						name='Georgian Partners'
						logo={ImageInvestors2}
						text={
							<p>
								Georgian Partners is a thesis-driven growth equity firm investing in SaaS-based business software companies exploiting applied artificial intelligence, security first and conversational business. Founded by successful entrepreneurs and technology executives, Georgian Partners leverages our global software expertise to be able to directly impact the success of companies. For more information, visit{' '}
								<a
									href='https://georgianpartners.com'
									target='_blank'
									rel='noopener noreferrer'
								>
									georgianpartners.com
								</a>
							</p>
						}
						link='https://georgianpartners.com/'
					/>
					<InvestorsItem
						name='New View Captial'
						logo={ImageInvestors3}
						text={
							<p>
								NewView Capital is a venture firm based in Burlingame, California. In 2018, NewView Capital spun out of New Enterprise Associates (NEA) and has developed a new model in venture capital to drive sustainable growth for entrepreneurs, venture capital firms, and limited partners in this changing venture landscape. The firm's first fund is a $1.35 billion portfolio of diverse, growth-stage technology companies. For more information, visit{' '}
								<a
									href='https://www.nvc.vc/'
									target='_blank'
									rel='noopener noreferrer'
								>
									newviewcap.com
								</a>
							</p>
						}
						link='https://www.nvc.vc/'
					/>
					<InvestorsItem
						name='DFJ Growth'
						logo={ImageInvestors4}
						text={
							<p>
								DFJ Growth is a venture capital firm that partners with extraordinary entrepreneurs who set out to change the world. Their investments include Anaplan (NYSE: PLAN), Box (NYSE: BOX), Coinbase, Cylance (BlackBerry), Ring (Amazon), SpaceX, Tesla (NASDAQ: TSLA), Twitter (NYSE:TWTR), Unity, and Yammer (Microsoft). The firm works with companies at the growth stage, with the goal of creating iconic and lasting businesses in consumer, enterprise, and disruptive technologies. For more information, visit{' '}
								<a
									href='https://dfjgrowth.com/'
									target='_blank'
									rel='noopener noreferrer'
								>
									dfjgrowth.com
								</a>
							</p>
						}
						link='https://dfjgrowth.com/'
					/>
					<InvestorsItem
						name='Silver Lake Waterman'
						logo={SilverLake}
						text={
							<p>
								Silver Lake Waterman focuses on providing flexible expansion capital to later-stage growth companies in the technology and technology-enabled industries. For more information, visit{' '}
								<a
									href='http://silverlake.com/'
									target='_blank'
									rel='noopener noreferrer'
								>
									silverlake.com
								</a>
							</p>
						}
						link='http://silverlake.com/'
					/>
				</Investors>

				{/* <CaseStudies title="Case studies.">
          <CaseStudiesItem
            title="Merck"
            image={ImageCaseStudy1}
            text="Aera provides real-time reporting on quality data from contract manufacturers,
              resulting in fewer returns and more revenue."
            link=""
          />
          <CaseStudiesItem
            title="Columbia"
            image={ImageCaseStudy2}
            text="Aera delivers analytics to hundreds of users across sales, finance, purchasing
              and allocation at a lower TCO than traditional BI tools."
            link=""
          />
          <CaseStudiesItem
            title="Brocade"
            image={ImageCaseStudy3}
            text="Aera provides real-time reporting on quality data from contract manufacturers,
              resulting in fewer returns and more revenue."
            link=""
          />
        </CaseStudies> */}

				<Offices
					title='Offices'
					phone='+1 (408) 524 2222'
					email='info@aeratechnology.com'
					mapImage={ImageOfficesMap}
				>
					<OfficesItem
						title='Mountain View'
						address={
							<p>
								707 California Street
								<br />
								Mountain View, CA 94041
							</p>
						}
						country='United States'
						continent='america'
						location={{ x: 13.24, y: 42.41 }}
					/>
					<OfficesItem
						title='San Francisco'
						address={
							<p>
								171 2nd Street
								<br />
								5th Floor
								<br />
								San Francisco, CA 94105
							</p>
						}
						country='United States'
						continent='america'
						location={{ x: 12.7, y: 40.8 }}
					/>
					<OfficesItem
						title='Paris'
						address={
							<p>
								24-26 Rue de la Pépinière,
								<br />
								75008 Paris
							</p>
						}
						country='France'
						continent='europe'
						location={{ x: 47.91, y: 34.71 }}
					/>

					<OfficesItem
						title='Bucharest'
						address={
							<p>
								201 Barbu Vacarescu Street,
								<br />
								10th Floor
								<br />
								Bucharest, 020276
							</p>
						}
						country='Romania'
						continent='europe'
						location={{ x: 52.69, y: 37.56 }}
					/>
					<OfficesItem
						title='Cluj-Napoca'
						address={
							<p>
								48 Calea Dorobantilor
								<br />
								1st Floor
								<br />
								Cluj - Napoca 400121
							</p>
						}
						country='Romania'
						continent='europe'
						location={{ x: 53.69, y: 36.56 }}
					/>
					<OfficesItem
						title='Pune'
						address={
							<p>
								Manikchand Icon
								<br />
								C Wing, Ground floor
								<br />
								Dhole Patil Rd, Pune 411001
							</p>
						}
						country='India'
						continent='asia'
						location={{ x: 67.52, y: 53.77 }}
					/>

					<OfficesItem
						title='Sydney'
						address={
							<p>
								Level 16, 1 Denison Street
								<br />
								North Sydney, NSW 2060
								<br />
							</p>
						}
						country='Australia'
						continent='asia'
						location={{ x: 88.78, y: 85.21 }}
					/>
					<OfficesItem
						title='Singapore'
						address={
							<p>
								18 Robinson Road #02-03
								<br />
								Singapore 048547
								<br />
							</p>
						}
						country='Singapore'
						continent='asia'
						location={{ x: 75.78, y: 63.21 }}
					/>
					<OfficesItem
						title='York'
						address={
							<p>
								Westminster Business Centre
								<br />
								York Business Park
								<br />
								10 Great North Way
								<br />
								Nether Poppleton, York
								<br />
								YO26 6RB
							</p>
						}
						country='United Kingdom'
						continent='europe'
						location={{ x: 46.7, y: 29.4 }}
					/>
				</Offices>
			</Page>
		);
	}
}

const jobHOC = withJob({
	work: ({ contentful }) => contentful.fetchSingleByContentType('pageCompany'),
	LoadingComponent: Loading,
})(Company);
const injectHOC = inject('contentful')(jobHOC);

export default injectHOC;
