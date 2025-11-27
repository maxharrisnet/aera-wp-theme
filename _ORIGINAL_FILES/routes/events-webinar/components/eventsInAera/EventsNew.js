import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";
import Button from "components/button";

import s from "./EventsNew.scss";

export default class EventsNew extends Component {
  static propTypes = {
    title: PropTypes.string,
    featured: PropTypes.array,
    onMoreClick: PropTypes.func,
    hasMore: PropTypes.bool
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 1 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { title, featured, hasMore, onMoreClick } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.eventsNew}>
          <div className={s.eventsNew__container}>
            <h2 ref={c => (this.el = c)} className={s.eventsNew__title}>
              {title}
            </h2>

            <div className={s.eventsNew__featured}>
              {Children.map(featured, (featuredItem, index) => (
                <div key={index} className={s.eventsNew__featuredCol}>
                  {featuredItem}
                </div>
              ))}
            </div>

            {hasMore && (
              <div className={s.eventsNew__more}>
                <Button
                  data-event-category="Section"
                  data-event-action="Click"
                  data-event-name="More events"
                  onClick={onMoreClick}
                >
                  More events
                </Button>
              </div>
            )}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
