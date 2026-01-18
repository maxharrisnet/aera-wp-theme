import React, { Component, Children } from "react";
import PropTypes from "prop-types";

import Button from "components/button";
import TopVideoImage from "assets/images/selfdriving-video-img.png";
import s from "./FeaturedVideo.scss";
import Video from "components/video";
const IMAGE_WIDTH = 1170;
const IMAGE_HEIGHT = 730;
export default class FeaturedVideo extends Component {
  static propTypes = {
    children: PropTypes.node,
    onMoreClick: PropTypes.func,
    hasMore: PropTypes.bool
  };

  render() {
    const { children, hasMore, onMoreClick } = this.props;
    const hasImage = this.props.image;
    const hasLogo = this.props.logo;
    return (
      <div className={s.featuredVideo}>
        <div className={s.featuredVideo__container}>
          <div className={s.featuredVideo__row}>
            <div className={s.featuredVideo__col}>
              <div ref={c => (this.el = c)} className={s.featuredVideoItem}>
                <div
                  className={s.featuredVideoItem__figure}
                  style={{
                    paddingTop: `${(IMAGE_HEIGHT / IMAGE_WIDTH) * 100}%`
                  }}
                >
                  <a
                    href="/videos/aera-vision"
                    className={s.featuredVideoItem__image}
                  >
                    <img
                      src={TopVideoImage}
                      className={s.featuredVideoItem__featimg}
                    />
                  </a>
                </div>

                <div className={s.featuredVideoItem__row}>
                  <div className={s.featuredVideoItem__content}>
                    <h2 className={s.featuredVideoItem__title}>
                      <a href="/videos/aera-vision" rel="noopener noreferrer">
                        Video: Welcome to the Self-Driving Enterprise
                      </a>
                    </h2>
                    <p className={s.featuredVideoItem__text}>
                      Imagine if your business was self-driving. Real-time and
                      always-on. Connected outside and in. Thinking and
                      autonomous. With Aera - it is.
                    </p>

                    <a
                      className={s.featuredVideoItem__link}
                      href="/videos/aera-vision"
                      data-event-category="Section"
                      data-event-action="Click"
                      data-event-name="Video: Welcome to the Self-Driving Enterprise"
                    >
                      Watch
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.featuredVideo__col}>
              {Children.map(children, child => (
                <div>{child}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
