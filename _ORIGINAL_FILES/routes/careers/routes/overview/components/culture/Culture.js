import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './Culture.scss';

export default class Culture extends Component {

  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
  }

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  }

  render() {
    const { title, text } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div ref={c => (this.el = c)} className={s.culture}>
          <div className={s.culture__container}>
            <h2 className={s.culture__title}>{title}</h2>
            {text && (
              <p className={s.culture__text}>{text}</p>
            )}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
