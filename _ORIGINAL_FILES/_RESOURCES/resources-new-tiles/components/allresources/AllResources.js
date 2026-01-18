import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";
import Button from "components/button";

import s from "./News.scss";

export default class AllResources extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    onMoreClick: PropTypes.func,

    hasMore: PropTypes.bool
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { title, children, type, hasMore, onMoreClick } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.news}>
          <div className={s.news__container}>
            <h2 ref={c => (this.el = c)} className={s.news__title}>
              {title}
            </h2>

            <div className={s.news__list}>
              <div className={s.news__col}>{children}</div>
            </div>

            {/* {hasMore && (
              <div className={s.news__more}>
                <Button
                  data-event-category="Section"
                  data-event-action="Click"
                  data-event-name="See More"
                  onClick={onMoreClick}
                >
                  See More
                </Button>
              </div>
            )} */}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
