import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './Testimonial.scss';


export default class Testimonial extends Component {

  static propTypes = {
    quote: PropTypes.string,
    by: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    image2x: PropTypes.string,
  }

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
    this.t.set(this.imageEl, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
    this.t
      .fromTo(
        this.imageEl,
        0.8,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        0.7,
      )
      .fromTo(
        this.imageEl,
        1,
        { x: '-20px' },
        { x: '0px', ease: 'Power3.easeOut' },
        0.7,
      );
  }

  render() {
    const { quote, by, title, image, image2x } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div ref={c => (this.el = c)} className={s.testimonial}>
          <div className={s.testimonial__container}>

            <div className={s.testimonial__wrapper}>
              <div className={s.testimonial__row}>
                <div className={s.testimonial__col}>

                  <blockquote className={s.testimonial__blockquote}>
                    <q className={s.testimonial__quote}>{quote}</q>
                    <cite className={s.testimonial__cite}>{by}
                      <span className={s.testimonial__role}>{title}</span>
                    </cite>
                  </blockquote>

                </div>

                <img
                  ref={c => (this.imageEl = c)}
                  className={s.testimonial__image}
                  src={image}
                  srcSet={`${image} 1x, ${image2x} 2x`}
                  width="650"
                  height="650"
                  alt=""
                />

              </div>

            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
