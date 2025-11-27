import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";

import s from "./Management.scss";

export default class ManagementItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    jobTitle: PropTypes.string,
    image: PropTypes.string,
    bio: PropTypes.string,
    linkedin: PropTypes.string
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { name, jobTitle, image, bio, linkedin } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div ref={c => (this.el = c)} className={s.managementItem}>
          <img className={s.managementItem__image} src={image} alt={name} />
          <h3 className={s.managementItem__name}>{name}</h3>
          <p className={s.managementItem__job}>{jobTitle}</p>
          <p className={s.managementItem__bio}>{bio}</p>
          <p>
            <a
              className={s.managementItem__linkedin}
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              data-event-category="Section"
              data-event-action="Click"
              data-event-name={`${name} on LinkedIn`}
            >
              More
            </a>
          </p>
        </div>
      </WaypointEnter>
    );
  }
}
