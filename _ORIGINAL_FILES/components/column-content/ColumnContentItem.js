import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';
import WaypointEnter from 'components/waypoint-enter';

import s from './ColumnContent.scss';


export default class ColumnContentItem extends Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  }

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
        <div ref={c => (this.el = c)} className={s.columnContentItem}>
          <h2 className={s.columnContentItem__title}>{title}</h2>
          {children}
        </div>
      </WaypointEnter>
    );
  }
}
