import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';

import OfficesMap from './OfficesMap';

import s from './Offices.scss';


export default class Offices extends Component {

  static propTypes = {
    title: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    mapImage: PropTypes.string,
    children: PropTypes.node,
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
    this.t.set(`.${s.officesItems}`, { autoAlpha: 0 });
  }


  animate = () => {
    fadeSlideIn(this.t, this.el);
    this.t
      .staggerFromTo(
        `.${s.officesItem}`,
        1,
        { autoAlpha: 0 },
        { autoAlpha: 1, ease: 'Power4.easeInOut' },
        0.2,
        0,
      );
  }

  handleOfficeMouseEnter = (pos) => {
    this.elMap.highlightLocation(pos);
  }

  render() {
    const { title, phone, email, mapImage, children } = this.props;

    const markers = Children.map(children, ({ props: { location, continent } }) => ({
      x: location.x,
      y: location.y,
      continent,
    }));

    return (
      <WaypointEnter onEnter={this.animate}>
        <div ref={c => (this.el = c)} className={s.offices}>
          <div className={s.offices__container}>

            <div className={s.offices__header}>
              <h2 className={s.offices__title}>{title}</h2>

              <div className={s.offices__contact}>
                <p className={s.offices__contactPhone}>{phone}</p>
                <p className={s.offices__contactEmail}>
                  <a className={s.offices__contactEmailLink} href={`mailto: ${email}`}>{email}</a>
                </p>
              </div>
            </div>

            <OfficesMap
              ref={c => (this.elMap = c)}
              image={mapImage}
              markers={markers}
            />

            <div className={s.offices__row}>
              {Children.map(children, (child, index) => (
                <div
                  className={s.offices__col}
                  onMouseEnter={() => this.handleOfficeMouseEnter(index)}
                >
                  {child}
                </div>
              ))}
            </div>

          </div>
        </div>
      </WaypointEnter>
    );
  }
}
