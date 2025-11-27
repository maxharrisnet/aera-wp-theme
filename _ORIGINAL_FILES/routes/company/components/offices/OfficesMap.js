import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';

import SvgMarker from 'assets/images/company/offices-marker.svg';

import WaypointEnter from 'components/waypoint-enter';

import s from './Offices.scss';


export default class OfficesMap extends Component {

  static propTypes = {
    image: PropTypes.string,
    markers: PropTypes.array,
  };

  markers = [];
  t = new TimelineLite();

  componentDidMount() {
    this.t.set(`.${s.officesMap__marker}`, { autoAlpha: 0, y: '-20px' });
  }

  animate = () => {
    this.t
      .staggerFromTo(
        this.markers,
        0.5,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power4.easeInOut' },
        0.2,
        1,
      )
      .staggerFromTo(
        this.markers,
        0.8,
        { y: '-20px' },
        { y: '0px', ease: 'Bounce.easeOut' },
        0.2,
        1,
      );
  }

  highlightLocation(location) {
    const marker = this.markers[location];
    new TimelineLite()
      .set(marker, { zIndex: 1 })
      .to(
        marker,
        0.2,
        { y: '-20px', ease: 'Power4.easeOut' },
      )
      .to(
        marker,
        0.8,
        { y: '0px', ease: 'Bounce.easeOut' },
      )
      .set(marker, { zIndex: 'auto' });
  }

  render() {
    const { image, markers } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.officesMap}>
          <img ref={c => (this.map = c)} className={s.offices__image} src={image} alt="" />
          {markers.map(({ x, y, continent }, index) => (
            <span
              ref={c => (this.markers[index] = c)}
              key={`${x}-${y}`}
              className={s(s.officesMap__marker, continent)}
              style={{
                top: `${y}%`,
                left: `${x}%`,
              }}
            >
              <SvgMarker className={s.officesMap__svg} />
            </span>
          ))}
        </div>
      </WaypointEnter>
    );
  }
}
