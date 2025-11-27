import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";

import s from "./ExecutiveTeam.scss";

export default class ExecutiveTeam extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { title, children } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.othermanagement}>
          <div className={s.othermanagement__container}>
            <div className={s.othermanagement__content}>
              <h2 ref={c => (this.el = c)} className={s.othermanagement__title}>
                {title}
              </h2>

              <div className={s.othermanagement__row}>
                {Children.map(children, child => (
                  <div className={s.othermanagement__col}>{child}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
