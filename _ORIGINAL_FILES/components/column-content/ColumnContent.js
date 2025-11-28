import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

import s from './ColumnContent.scss';

export default class ColumnContent extends Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={s.columnContent}>
        <div className={s.columnContent__container}>
          <div className={s.columnContent__row}>
            {Children.map(children, child => (
              <div className={s.columnContent__col}>{child}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
