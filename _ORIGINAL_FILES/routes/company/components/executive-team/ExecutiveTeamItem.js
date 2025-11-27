import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";

import s from "./ExecutiveTeam.scss";

export default class ExecutiveTeamItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    text: PropTypes.node,
    link: PropTypes.string
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { name, logo, text, link } = this.props;
    return (
      <WaypointEnter onEnter={this.animate}>
          <div ref={c => (this.el = c)} className={s.othermanagementItem}>
            <a
              className={s.othermanagementItem__logo}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={s.othermanagementItem__logoImage}
                src={logo}
                alt="Leadership"
              />
              <div>{text}</div>
            </a>
            {/* <div className={s.othermanagementItem__text}>{text}</div> */}
          </div>
      </WaypointEnter>
    );
  }
}
