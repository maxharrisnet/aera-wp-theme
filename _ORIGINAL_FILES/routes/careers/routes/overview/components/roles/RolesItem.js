import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './Roles.scss';


export default class Rolesitem extends Component {

  static propTypes = {
    name: PropTypes.string,
    team: PropTypes.string,
    commitment: PropTypes.string,
    location: PropTypes.string,
    applyUrl: PropTypes.string,
  }

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  }

  render() {
    const { name, team, commitment, location, applyUrl } = this.props;

    return (
      <WaypointEnter onEnter={this.animate} bottomOffset="5%">
        <li ref={c => (this.el = c)} className={s.rolesItem}>
          <a className={s.rolesItem__link} href={applyUrl} target="_blank" rel="noopener noreferrer">
            <div className={s.rolesItem__row}>
              <div className={s.rolesItem__col}>
                <div className={s.rolesItem__heading}>
                  <h3 className={s.rolesItem__name}>{name}</h3>
                  <p className={s.rolesItem__type}>{team}, {commitment}</p>
                </div>
              </div>
              <div className={s.rolesItem__col}>
                <p className={s.rolesItem__location}>{location}</p>
              </div>
            </div>
          </a>
        </li>
      </WaypointEnter>
    );
  }
}
