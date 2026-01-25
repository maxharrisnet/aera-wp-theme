import React, { Component } from "react";
import PropTypes from "prop-types";
import Waypoint from "react-waypoint";
import TechnologyScene from "./TechnologyScene";

import s from "./Technology.scss";

export default class TechnologyItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    onItemEnter: PropTypes.func,
    title: PropTypes.string,
    text: PropTypes.node,
    video: PropTypes.string,
    background: PropTypes.node,
    messages: PropTypes.array,
    isMobile: PropTypes.bool
  };

  handleWaypointEnter = () => {
    const { index, onItemEnter } = this.props;
    onItemEnter(index);
  };

  render() {
    const {
      index,
      title,
      text,
      video,
      background,
      messages,
      isMobile
    } = this.props;

    const scene = isMobile && (
      <div className={s.technologyItem__scene}>
        <TechnologyScene
          scene={index}
          isActive
          video={video}
          background={background}
          messages={messages}
        />
      </div>
    );

    return (
      <div className={s(s.technologyItem, `pos-${index}`)}>
        <Waypoint onEnter={this.handleWaypointEnter} topOffset="-30%" />

        {scene}

        <h2 className={s.technologyItem__title}>{title}</h2>
        <div className={s.technologyItem__text}>{text}</div>
      </div>
    );
  }
}
