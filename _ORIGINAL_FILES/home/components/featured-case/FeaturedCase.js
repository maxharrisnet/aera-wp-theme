import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './FeaturedCase.scss';

export default class FeaturedCase extends Component {

  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.node,
    link: PropTypes.string,
    linkText: PropTypes.string,
  }

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  }

  render() {
    const { image, title, text, link, linkText } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.featuredCase}>
          <div
            ref={c => (this.el = c)}
            className={s.featuredCase__background}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className={s.featuredCase__container}>

              <div className={s.featuredCase__row}>
                <div className={s.featuredCase__col}>

                  <h2 className={s.featuredCase__title}>{title}</h2>
                  <p className={s.featuredCase__text}>{text}</p>

                  {link && linkText && (
                    <p className={s.featuredCase__action}>
                      <a
                        className={s.featuredCase__link}
                        href={link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {linkText}
                      </a>
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
