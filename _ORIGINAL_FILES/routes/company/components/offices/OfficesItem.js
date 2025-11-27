import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Offices.scss';

export default class OfficesItem extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.node.isRequired,
    country: PropTypes.string.isRequired,
    continent: PropTypes.string.isRequired,
  };

  render() {
    const { title, address, country, continent } = this.props;

    return (
      <div className={s.officesItem}>
        <h3 className={s.officesItem__location}>{title}</h3>
        <div className={s.officesItem__address}>
          {address}
        </div>
        <p className={s(s.officesItem__country, continent)}>
          {country}
        </p>
      </div>
    );
  }
}
