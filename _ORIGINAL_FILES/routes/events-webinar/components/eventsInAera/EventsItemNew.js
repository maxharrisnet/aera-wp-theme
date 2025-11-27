import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import getVideoServiceId from "utils/getVideoServiceId";
import WaypointEnter from "components/waypoint-enter";
import Video from "components/video";

import s from "./EventsNew.scss";

export default class EventsItemNew extends Component {
  static propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    endDate: PropTypes.string,
    city: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    link: PropTypes.string,
    video: PropTypes.string
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 1 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  onClick = e => {
    const videoInfo = getVideoServiceId(this.props.video);

    if (!videoInfo) {
      return;
    }

    e.preventDefault();

    this.videoPlayer.show();
  };

  render() {
    const {
      title,
      date,
      endDate,
      city,
      image,
      description,
      link,
      video
    } = this.props;
    const videoInfo = getVideoServiceId(video);

    const startDateMonth = date.slice(8, 11);
    const startDateDay = date.slice(5, 7);

    const year = date.slice(12, 16);

    const endDateMonth = endDate && endDate.slice(8, 11);
    const endDateDay = endDate && endDate.slice(5, 7);

    const originalEventStartDate = new Date(date);
    const isoEventStartDate = originalEventStartDate.toISOString();

    // const originalEventEndDate = new Date(endDate);
    // const isoEventEndDate = originalEventEndDate.toISOString();

    return (
      <WaypointEnter onEnter={this.animate}>
        <div
          ref={c => (this.el = c)}
          className={s.eventsNewItem}
          itemScope
          itemType="http://schema.org/Event"
        >
          <div className={s.eventsNewItem__header}>
            <div
              className={s.eventsNewItem__city}
              itemProp="location"
              itemScope
              itemType="http://schema.org/Place"
            >
              <span itemProp="name">{city}</span>
              <meta
                itemProp="address"
                content="707 California Street Mountain View, CA 94041"
              />
            </div>
            <div
              className={s(s.eventsNewItem__date, s.eventsNewItem__startDate)}
              itemProp="startDate"
              content={isoEventStartDate}
            >{`${startDateMonth} ${startDateDay}`}</div>
            {endDate && endDateMonth !== startDateMonth && (
              <div
                className={s(s.eventsNewItem__date, s.eventsNewItem__endDate)}
              >
                {`${endDateMonth} ${endDateDay}`}
              </div>
            )}
            {endDate && endDateMonth === startDateMonth && (
              <div
                className={s(s.eventsNewItem__date, s.eventsNewItem__endDate)}
              >
                {endDateDay}
              </div>
            )}
            <div
              className={s(s.eventsNewItem__date, s.eventsNewItem__year)}
            >{`, ${year}`}</div>
          </div>
          <div
            className={s(s.eventsNewItem__imageWrap, { isVideo: !!video })}
            onClick={this.onClick}
          >
            <a
              href={video || link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.onClick}
            >
              <img
                className={s.eventsNewItem__image}
                src={`${image}?w=760&h=475&fit=fill&fl=progressive&q=60`}
                alt=""
                itemProp="image"
              />
            </a>
          </div>
          <h3 className={s.eventsNewItem__title} itemProp="name">
            <a
              href={video || link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.onClick}
            >
              {title}
            </a>
          </h3>
          <p className={s.eventsNewItem__description} itemProp="description">
            {description}
          </p>
          <p className={s.eventsNewItem__action}>
            <a
              className={s.eventsNewItem__link}
              href={video || link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={this.onClick}
              data-event-category="Section"
              data-event-action="Click"
              data-event-name={title}
              itemProp="url"
            >
              Find out more
            </a>
          </p>

          {videoInfo && (
            <Video
              {...videoInfo}
              ref={el => {
                this.videoPlayer = el;
              }}
            />
          )}
        </div>
      </WaypointEnter>
    );
  }
}

// <iframe src="https://player.vimeo.com/video/57544990?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
