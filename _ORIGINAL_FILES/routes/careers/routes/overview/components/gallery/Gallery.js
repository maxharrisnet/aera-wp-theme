import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import WaypointEnter from 'components/waypoint-enter';

import s from './Gallery.scss';


export default class Gallery extends Component {

  static propTypes = {
    video: PropTypes.string,
    image1: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(`.${s.gallery__media}`, { autoAlpha: 0 });
  }

  animate = () => {
    this.t
      .staggerFromTo(
        `.${s.gallery__media}`,
        1,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power3.easeInOut' },
        0.3,
        0,
      )
      .staggerFromTo(
        `.${s.gallery__media}`,
        1,
        { y: '10%' },
        { y: '0%', ease: 'Power3.easeOut' },
        0.3,
        0,
      );
  }

  render() {
    const { video, image1, image2, image3 } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.gallery}>
          <div className={s.gallery__container}>
            <div className={s.gallery__row}>
              <div className={s.gallery__col1}>
                <img ref={c => (this.el1 = c)} className={s.gallery__media} src={video} alt="" />
              </div>
              <div className={s.gallery__col2}>
                <img ref={c => (this.el2 = c)} className={s.gallery__media} src={image1} alt="" />
              </div>
            </div>
            <div className={s.gallery__row}>
              <div className={s.gallery__col3}>
                <img ref={c => (this.el3 = c)} className={s.gallery__media} src={image2} alt="" />
              </div>
              <div className={s.gallery__col4}>
                <img ref={c => (this.el4 = c)} className={s.gallery__media} src={image3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
