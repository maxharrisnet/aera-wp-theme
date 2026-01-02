import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './News.scss';

export default class NewsItem extends Component {
	static propTypes = {
		publication: PropTypes.string,
		logo: PropTypes.shape({
			url: PropTypes.string,
			width: PropTypes.number,
			height: PropTypes.number,
		}),
		date: PropTypes.string,
		title: PropTypes.string,
		type: PropTypes.string,
		excerpt: PropTypes.string,
		link: PropTypes.string,
	};

	render() {
		const { title, link } = this.props;

		return (
			<div
				ref={(c) => (this.el = c)}
				className={s.newsItem}
			>
				<div className={s.newsItem__row}>
					<div className={s.newsItem__col12}>
						<p className={s.newsItem__title}>
							<a
								href={link}
								rel='noopener noreferrer'
							>
								{title}
							</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
