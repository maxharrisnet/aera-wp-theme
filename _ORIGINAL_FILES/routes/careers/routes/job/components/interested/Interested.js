import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Interested.scss';

export default class Interested extends Component {

  static propTypes = {
    title: PropTypes.string,
    apply: PropTypes.node,
    info: PropTypes.node,
  }

  render() {
    const { title, apply, info } = this.props;
    return (
      <div className={s.interested}>
        <div className={s.interested__container}>
          <div className={s.interested__wrapper}>

            <div className={s.interested__row}>
              <div className={s.interested__apply}>
                <h2 className={s.interested__title}>{title}</h2>
              </div>
            </div>
            <div className={s.interested__row}>
              <div className={s.interested__apply}>
                {apply}
              </div>
              <div className={s.interested__info}>
                {info}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
