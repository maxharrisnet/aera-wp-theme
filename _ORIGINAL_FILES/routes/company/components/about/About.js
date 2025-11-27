import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './About.scss';

export default class About extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;
    return (
      <div className={s.about}>
        {children}
      </div>
    );
  }
}
