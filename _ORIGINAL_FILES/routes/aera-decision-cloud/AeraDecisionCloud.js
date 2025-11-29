import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import Helmet from 'react-helmet';
import Intro, { Loading } from 'components/intro-adc';
import Page from 'components/page';
import s from './AeraDecisionCloud.scss';
import Content, { ContentItem } from './components/content';
//import Benefits from "../../routes/technology/components/benefits/Benefits";
import developerImage1 from 'assets/images/AeraDeveloperImage1.png';
import developerImage2 from 'assets/images/AeraDeveloperImage2.png';
import Request from 'components/request';
import Delloite from 'assets/images/partners/deloitte.png';
import EY from 'assets/images/partners/ey.png';
import Kearney from 'assets/images/partners/kearney.png';
import Bristlecone from 'assets/images/partners/bristlecone.png';
import Microsoft from 'assets/images/partners/MicrosoftPartner.png';
import leftarrow from 'assets/images/ADC/leftarrow.png';
import rightarrow from 'assets/images/ADC/rightarrow.png';
export default class AeraDecisionCloud extends Component {
	render() {
		return (
			<Page>
				<Helmet
					title='Aera Decision Cloud™ - Aera Technology'
					meta={[
						{
							name: 'description',
							content: 'We are partnering with a select group of organizations, from consulting firms to technology platforms and data service providers, to accelerate time to value and value over time. Together, we are delivering and scaling Decision Intelligence across the globe.',
						},
						{
							property: 'og:description',
							content: 'We are partnering with a select group of organizations, from consulting firms to technology platforms and data service providers, to accelerate time to value and value over time. Together, we are delivering and scaling Decision Intelligence across the globe.',
						},
						{
							name: 'twitter:description',
							content: 'We are partnering with a select group of organizations, from consulting firms to technology platforms and data service providers, to accelerate time to value and value over time. Together, we are delivering and scaling Decision Intelligence across the globe.',
						},
						{ property: 'og:image', content: '/favicons/aera-share.jpg' },
						{ name: 'twitter:image', content: '/favicons/aera-share.jpg' },
					]}
					link={[{ rel: 'canonical', href: 'https://www.aeratechnology.com/aera-decision-cloud' }]}
				/>

				{/* <Intro title="Partners" text="Utinam delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Conubia eget lucidus nam felis melior. Mi vulputate loquor os augue litora. Mollis venio est lucidus volutpat rusticus nobis class sollicitudin."/> */}
				<Intro
					title='Aera Decision Cloud™'
					tagline='The Agentic Decision Intelligence Platform'
					fullheight
				/>
				<Content />
				{/* <ContentItem
            title="Delloite"
            image={Delloite}
            text="Delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Utinam delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Conubia eget lucidus nam felis melior. Mi vulputate loquor os augue litora. Mollis venio est lucidus volutpat rusticus nobis class sollicitudin."
          /> */}
				{/* <ContentItem
            title="EY"
            image={EY}
            text="EY exists to build a better working world, helping create long-term value for clients, people and society and build trust in the capital markets. Enabled by data and technology, diverse EY teams in over 150 countries provide trust through assurance and help clients grow, transform and operate. Working across assurance, consulting, law, strategy, tax and transactions, EY teams ask better questions to find new answers for the complex issues facing our world today."
          />
          <ContentItem
            title="Kearney"
            image={Kearney}
            text="Delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Utinam delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Conubia eget lucidus nam felis melior. Mi vulputate loquor os augue litora. Mollis venio est lucidus volutpat rusticus nobis class sollicitudin."
          />
          <ContentItem
            title="Bristlecone"
            image={Bristlecone}
            text="Delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Utinam delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Conubia eget lucidus nam felis melior. Mi vulputate loquor os augue litora. Mollis venio est lucidus volutpat rusticus nobis class sollicitudin."
          />
          <ContentItem
            title="Microsoft"
            image={Microsoft}
            text="Delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Utinam delenit proprius conventio decet conventio. Regula leo premo libero vestibulum validus. Cursus quisque quidem pretium ludus uxor nimis. Conubia eget lucidus nam felis melior. Mi vulputate loquor os augue litora. Mollis venio est lucidus volutpat rusticus nobis class sollicitudin."
          />
        </Content> */}
				{/* <Request title="See Aera in action." text="REQUEST FOR DEMO" link="/demo" /> */}
			</Page>
		);
	}
}
