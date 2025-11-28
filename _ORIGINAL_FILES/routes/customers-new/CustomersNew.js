import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import Helmet from 'react-helmet';
import Intro, { Loading } from 'components/intro-pr';
import Page from 'components/page';
import Content, { ContentItem } from './components/content';

import Request from 'components/request';

class CustomersNew extends Component {
	static propTypes = {
		jobResult: PropTypes.object,
	};

	state = {
		customerPageCardsVisible: 1,
		//allCustomersVisible: 10
	};

	render() {
		const {
			page: { heading, subheading, allCustomers },
		} = this.props.jobResult;
		const { allCustomersVisible } = this.state;

		return (
			<Page>
				<Helmet
					title='Customers - Aera Technology'
					meta={[
						{
							name: 'description',
							content: 'From supply chain and procurement to revenue management and marketing, some of the world’s largest organizations are achieving breakthrough agility by transforming how they make and execute decisions.',
						},
						{
							property: 'og:description',
							content: 'From supply chain and procurement to revenue management and marketing, some of the world’s largest organizations are achieving breakthrough agility by transforming how they make and execute decisions.',
						},
						{
							name: 'twitter:description',
							content: 'From supply chain and procurement to revenue management and marketing, some of the world’s largest organizations are achieving breakthrough agility by transforming how they make and execute decisions.',
						},
						{ property: 'og:image', content: '/favicons/aera-share.jpg' },
						{ name: 'twitter:image', content: '/favicons/aera-share.jpg' },
					]}
					link={[{ rel: 'canonical', href: 'https://www.aeratechnology.com/customers' }]}
				/>

				<Intro
					title={heading}
					text={subheading}
					fullheight
				/>

				<Content>
					{allCustomers &&
						allCustomers.slice(0, allCustomersVisible).map(({ id, heroImage, companyLogo, companyText, title, type, buttonName, link, videoURL, assetType, assetTitle, assetLink, assetLink2, assetTitle2, assetType2, assetLink3, assetTitle3, assetType3, assetLink4, assetTitle4, assetType4 }) => (
							<ContentItem
								key={id}
								heroImage={heroImage && heroImage.file && heroImage.file.url}
								companyLogo={companyLogo && companyLogo.file && companyLogo.file.url}
								companyText={companyText}
								title={title.substring(0, 150) + (title.length > 150 ? '...' : '')}
								link={link}
								type={type}
								buttonName={buttonName}
								videoURL={videoURL}
								assetType={assetType}
								assetTitle={assetTitle}
								assetLink={assetLink}
								assetLink2={assetLink2}
								assetTitle2={assetTitle2}
								assetType2={assetType2}
								assetLink3={assetLink3}
								assetTitle3={assetTitle3}
								assetType3={assetType3}
								assetLink4={assetLink4}
								assetTitle4={assetTitle4}
								assetType4={assetType4}
							/>
						))}
				</Content>

				<Request
					title='See Aera in action.'
					text='Schedule Demo'
					link='/demo'
				/>
			</Page>
		);
	}
}
const jobHOC = withJob({
	work: async ({ contentful }) => {
		const [page] = await Promise.all([contentful.fetchSingleByContentType('customerPage')]);

		return {
			page,
		};
	},
	LoadingComponent: Loading,
})(CustomersNew);
const injectHOC = inject('contentful')(jobHOC);

export default injectHOC;
