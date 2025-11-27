import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import { fadeSlideIn } from 'utils/timelineAnimations';
import WaypointEnter from 'components/waypoint-enter';
import getVideoServiceId from 'utils/getVideoServiceId';
import Video from 'components/video';

import s from './News.scss';
import { has } from 'lodash';

const IMAGE_WIDTH = 1170;
const IMAGE_HEIGHT = 730;

export default class ResourceItem extends Component {
	static propTypes = {
		date: PropTypes.string,
		image: PropTypes.string,
		title: PropTypes.string,
		excerpt: PropTypes.string,
		link: PropTypes.string,
		logo: PropTypes.string,
		// logo: PropTypes.shape({
		//   url: PropTypes.string,
		//   width: PropTypes.number,
		//   height: PropTypes.number
		// }),
		video: PropTypes.string,
		publication: PropTypes.string,
		type: PropTypes.string,
		ctaText: PropTypes.string,
	};

	t = new TimelineLite();

	componentDidMount() {
		this.t.set(this.el, { autoAlpha: 1 });
	}

	animate = () => {
		//fadeSlideIn(this.t, this.el);
	};

	onImageClick = (e) => {
		const videoInfo = getVideoServiceId(this.props.video);

		if (!videoInfo) {
			return;
		}

		e.preventDefault();

		this.videoPlayer.show();
	};

	render() {
		const { date, image, title, excerpt, link, video, logo, publication, type, city, ctaText } = this.props;
		const videoInfo = getVideoServiceId(video);
		const hasImage = this.props.image;
		const hasLogo = this.props.logo;
		``;

		const hasCat = this.props.type;
		//console.log(hasCat);

		return (
			<WaypointEnter onEnter={this.animate}>
				<div
					ref={(c) => (this.el = c)}
					className={s.newsItem}
					resource-type={type}
					resource-class='resources'
				>
					<div className={s.newsItem__wrapper}>
						<div className={s.newsItem__figure}>
							{hasCat == 'In-Person Event' && image && !logo && (
								<a
									href={link}
									className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
									target='_blank'
									style={{ backgroundImage: `url(${image})` }}
								></a>
							)}
							{hasCat == 'In-Person Event' && logo && !image && (
								<a
									href={link}
									target='_blank'
									className={s(s.newsItem__logoImage, s.newsItem__imageBorder)}
									style={{ padding: '30px 0 25px 0px' }}
								>
									<img
										className={s.newsItem__logo}
										src={logo}
										// width={logo.width}
										// height={logo.height}
										alt={publication}
									/>
								</a>
							)}

							{hasCat == 'Webinar' && image && !logo && (
								<a
									href={link}
									className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
									target='_blank'
									style={{ backgroundImage: `url(${image})` }}
								></a>
							)}
							{hasCat == 'Webinar' && logo && !image && (
								<a
									href={link}
									target='_blank'
									className={s(s.newsItem__logoImage, s.newsItem__imageBorder)}
									style={{ padding: '30px 0 25px 0px' }}
								>
									<img
										className={s.newsItem__logo}
										src={logo}
										// width={logo.width}
										// height={logo.height}
										alt={publication}
									/>
								</a>
							)}
						</div>

						{hasCat == 'In-Person Event' && (
							<a
								href={link}
								target='_blank'
								data-event-category='Section'
								data-event-action='Click'
								data-event-name={title}
							>
								<div className={s.newsItem__row}>
									<div className={s.newsItem__type}>{type}</div>
									<div className={s.newsItem__dateWrapper}>
										{city && <div className={s.newsItem__date}>{city}</div>}
										{/* <div className={s.newsItem__date}>{date}</div> */}
									</div>
								</div>
								<div className={s.newsItem__row}>
									<div className={s.newsItem__content}>
										<h2 className={s.newsItem__title}>{title}</h2>
										<p className={s.newsItem__text}>{excerpt}</p>
									</div>
								</div>
								<div className={s.newsItem__lastRow}>
									<div className={s(s.newsItem__row)}>
										<div className={s.newsItem__date}>{date}</div>
										<div className={s.newsItem__line}></div>
										<div>
											<span className={s.newsItem__link}>{ctaText}</span>
										</div>
									</div>
								</div>
							</a>
						)}

						{hasCat == 'Webinar' && (
							<a
								href={link}
								target='_blank'
								data-event-category='Section'
								data-event-action='Click'
								data-event-name={title}
							>
								<div className={s.newsItem__row}>
									<div className={s.newsItem__type}>{type}</div>
									<div className={s.newsItem__dateWrapper}>
										{city && <div className={s.newsItem__date}>{city}</div>}
										{/* <div className={s.newsItem__date}>{date}</div> */}
									</div>
								</div>
								<div className={s.newsItem__row}>
									<div className={s.newsItem__content}>
										<h2 className={s.newsItem__title}>{title}</h2>
										<p className={s.newsItem__text}>{excerpt}</p>
									</div>
								</div>
								<div className={s.newsItem__lastRow}>
									<div className={s(s.newsItem__row)}>
										<div className={s.newsItem__date}>{date}</div>
										<div className={s.newsItem__line}></div>
										<div>
											<span className={s.newsItem__link}>{ctaText}</span>
										</div>
									</div>
								</div>
							</a>
						)}
					</div>
				</div>
			</WaypointEnter>
		);
	}
}
