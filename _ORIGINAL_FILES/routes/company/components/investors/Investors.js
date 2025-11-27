import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './Investors.scss';


export default class Investors extends Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  }

  render() {
    const { title, children } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.investors}>
          <div className={s.investors__container}>
            <h2 ref={c => (this.el = c)} className={s.investors__title}>{title}</h2>

            <div className={s.investors__row}>
              {Children.map(children, child => (
                <div className={s.investors__col}>
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
