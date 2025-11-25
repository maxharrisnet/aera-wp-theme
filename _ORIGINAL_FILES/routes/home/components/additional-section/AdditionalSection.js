import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";

import s from "./AdditionalSection.scss";

export default class AdditionalSection extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { title } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div ref={c => (this.el = c)} className={s.additionalsection}>
          <div className={s.additionalsection__container}>
            <div className={s.additionalsection__wrapper}>
              <div className={s.additionalsection__row}>
                <div className={s.additionalsection__col}>
                  <h2>
                    With Decision Intelligence, your business is&nbsp;
                    <br className={s.additionalsection__hiddenxs}/>
                     agile, scalable, and continuously learning.{" "}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
