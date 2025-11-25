import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";

import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import getVideoServiceId from "utils/getVideoServiceId";
import Video from "components/video";

import s from "./News.scss";
import { has } from "lodash";

const IMAGE_WIDTH = 1170;
const IMAGE_HEIGHT = 730;

export default class ResourceItem extends Component {
  static propTypes = {
    date: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    link: PropTypes.string,
    logo: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    video: PropTypes.string,
    publication: PropTypes.string,
    type: PropTypes.string
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 1 });
  }

  animate = () => {
    //fadeSlideIn(this.t, this.el);
  };

  onImageClick = e => {
    const videoInfo = getVideoServiceId(this.props.video);

    if (!videoInfo) {
      return;
    }

    e.preventDefault();

    this.videoPlayer.show();
  };

  render() {
    const {
      date,
      image,
      title,
      excerpt,
      link,
      video,
      logo,
      publication,
      type,
      city
    } = this.props;
    const videoInfo = getVideoServiceId(video);
    const hasImage = this.props.image;
    const hasLogo = this.props.logo;
    ``;

    const hasCat = this.props.type;
    console.log(hasCat);
    
    return (
      <WaypointEnter onEnter={this.animate}>
        <div
          ref={c => (this.el = c)}
          className={s.newsItem}
          resource-type={type}
          resource-class="resources"
        >
          <div className={s.newsItem__wrapper}>
            <div className={s.newsItem__row}>
              <div className={s.newsItem__type}>{type}</div>
              <div className={s.newsItem__line}></div>
              {city && <div className={s.newsItem__date}>{city} -&nbsp;</div>}
              <div className={s.newsItem__date}>{date}</div>
            </div>
            <div className={s.newsItem__row}>
              <div className={s.newsItem__content}>
                <h2 className={s.newsItem__title}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={this.onClick}
                  >
                    {title}
                  </a>
                </h2>
              </div>
            </div>
            {hasImage || hasLogo ? (
              <div className={s.newsItem__row}>
                <div className={s.newsItem__col1}>
                  <div className={s.newsItem__figure}>
                    <div
                      className={s(s.newsItem__image, { isVideo: !!video })}
                      onClick={this.onImageClick}
                    >
                      {image && !logo && (
                        <img
                          src={`${image}?w=${IMAGE_WIDTH / 2}&h=${IMAGE_HEIGHT /
                            2}&fit=thumb&f=faces&fl=progressive&q=60`}
                          srcSet={`${image}?w=${IMAGE_WIDTH /
                            2}&h=${IMAGE_HEIGHT /
                            2}&fit=thumb&f=faces&fl=progressive&q=60 1x,
                     ${image}?w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&fit=thumb&f=faces&fl=progressive&q=60 2x`}
                          alt="name"
                        />
                      )}

                      {logo && !image && (
                        <img
                          className={s.newsItem__logo}
                          src={`${logo.url}?w=220&h=200`}
                          width={logo.width}
                          height={logo.height}
                          alt={publication}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className={s.newsItem__col3}>
                  <p className={s.newsItem__text}>{excerpt}</p>

                  {hasCat == "Video" && video && (
                    <a
                      className={s.newsItem__link}
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.onImageClick}
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}
                  {hasCat == "Video" && link && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "On-Demand" && link && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "On-Demand" && video && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "Event" && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Register
                    </a>
                  )}

                  {hasCat == "News" && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      rel="noopener noreferrer"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Read
                    </a>
                  )}

                  {/* {!link && !video && (
                    <Link
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                      className={s.articlesItem__link}
                      to={link}
                    >
                      Read
                    </Link>
                  )} */}
                </div>
                <div className={s.newsItem__clearfix}></div>
              </div>
            ) : (
              <div className={s.newsItem__row}>
                <div className={s.newsItem__col12}>
                  <p className={s.newsItem__text}>{excerpt}</p>

                  {hasCat == "Video" && video && (
                    <a
                      className={s.newsItem__link}
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.onImageClick}
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "Video" && !video && link && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "On-Demand" && video && (
                    <a
                      className={s.newsItem__link}
                      href={video}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.onImageClick}
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "On-Demand" && !video && link && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Watch
                    </a>
                  )}

                  {hasCat == "Whitepaper" && (
                    <a
                      className={s.newsItem__link}
                      href={link}
                      target="_blank"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                    >
                      Read
                    </a>
                  )}

                  {/* {!link && !video && (
                    <Link
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name={title}
                      className={s.articlesItem__link}
                      to={link}
                    >
                      Read
                    </Link>
                  )} */}
                </div>
                <div className={s.newsItem__clearfix}></div>
              </div>
            )}
            {videoInfo && (
              <Video
                {...videoInfo}
                ref={el => {
                  this.videoPlayer = el;
                }}
              />
            )}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
