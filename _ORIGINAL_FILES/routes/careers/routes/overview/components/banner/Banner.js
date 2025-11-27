import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import s from './Banner.scss';

export default class Banner extends Component {
  render() {
    return (
        <div className={s.culture__topBanner}>
            <span>
              <b>
              All official opportunities for Aera Technology careers will come from @aeratechnology.com email.  Please report any suspicious emails or other communications to security@aeratechnology.com
              </b>
            </span>
            {/* <span><b>&nbsp;December 2, 2021</b></span>
            <a href="https://meet.aeratechnology.com/cognitive-automation-demo-day?utm_campaign=evt_global_CAD-2021q4&utm_source=aera_website&utm_content=aera_banner" target="_blank">
              Register Now
            </a> */}
          </div>
    );
  }
}
