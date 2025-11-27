import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './Investors.scss';


export default class InvestorsItem extends Component {

  static propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    text: PropTypes.node,
    link: PropTypes.string,
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  }

  render() {
    const { name, logo, text, link } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div ref={c => (this.el = c)} className={s.investorsItem}>
          <a
            className={s.investorsItem__logo}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={s.investorsItem__logoImage} src={logo} alt={name} />
          </a>
          <div className={s.investorsItem__text}>{text}</div>
        </div>
      </WaypointEnter>
    );
  }
}
