import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import getVideoServiceId from "utils/getVideoServiceId";
import WaypointEnter from "components/waypoint-enter";
import Video from "components/video";
import TopVideoImage from "assets/images/selfdriving-video-img.png";
import s from "./FeaturedVideo.scss";
import p from "./News.scss";

const IMAGE_WIDTH = 1170;
const IMAGE_HEIGHT = 730;

export default class FeaturedVideoItem extends Component {
  static propTypes = {
    date: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    link: PropTypes.string,
    slug: PropTypes.string,
    video: PropTypes.string,
    logo: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    type: PropTypes.string,
    city: PropTypes.string,

    logo: PropTypes.shape({
      url: PropTypes.string,
      publication: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    })
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 1 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
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
      logo,
      title,
      excerpt,
      link,
      slug,
      video,
      city,
      type,
      publication
    } = this.props;
    const videoInfo = getVideoServiceId(video);
    const hasImage = this.props.image;
    const hasLogo = this.props.logo;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.featuredVideoItem__topstories}>
          <div ref={c => (this.el = c)} className={p.newsItem}>
            <div className={p.newsItem__wrapper}>
              <div className={p.newsItem__row}>
                <div className={p.newsItem__type}>{type}</div>
                <div className={p.newsItem__line}></div>
                {city && <div className={p.newsItem__date}>{city} -&nbsp;</div>}
                <div className={p.newsItem__date}>{date}</div>
              </div>
              <div className={p.newsItem__row}>
                <div className={p.newsItem__content}>
                  <h3 className={p.newsItem__title}>
                    {link && (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.onClick}
                      >
                        {title}
                      </a>
                    )}
                  </h3>
                </div>
              </div>
              {hasImage || hasLogo ? (
                <div className={p.newsItem__row}>
                  <div className={p.newsItem__col1}>
                    <div className={p.newsItem__figure}>
                      <div
                        className={s(p.newsItem__image, { isVideo: !!video })}
                        onClick={this.onImageClick}
                      >
                        {image && !logo && (
                          <img
                            src={`${image}?w=${IMAGE_WIDTH /
                              2}&h=${IMAGE_HEIGHT /
                              2}&fit=thumb&f=faces&fl=progressive&q=60`}
                            srcSet={`${image}?w=${IMAGE_WIDTH /
                              2}&h=${IMAGE_HEIGHT /
                              2}&fit=thumb&f=faces&fl=progressive&q=60 1x,
                     ${image}?w=${IMAGE_WIDTH}&h=${IMAGE_HEIGHT}&fit=thumb&f=faces&fl=progressive&q=60 2x`}
                            alt=""
                          />
                        )}

                        {logo && !image && (
                          <img
                            className={p.newsItem__logo}
                            src={`${logo.url}?w=220&h=200`}
                            width={logo.width}
                            height={logo.height}
                            alt={publication}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={p.newsItem__col3}>
                    <p className={p.newsItem__text}>{excerpt}</p>

                    {video && (
                      <a
                        className={p.newsItem__link}
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

                    {link && !video && (
                      <a
                        className={p.newsItem__link}
                        href={link}
                        target="_blank"
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
                  <div className={p.newsItem__clearfix}></div>
                </div>
              ) : (
                <div className={p.newsItem__row}>
                  <div className={p.newsItem__col12}>
                    <p className={p.newsItem__text}>{excerpt}</p>

                    {video && (
                      <a
                        className={p.newsItem__link}
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

                    {link && !video && (
                      <a
                        className={p.newsItem__link}
                        href={link}
                        target="_blank"
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
                  <div className={p.newsItem__clearfix}></div>
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
        </div>
      </WaypointEnter>
    );
  }
}
