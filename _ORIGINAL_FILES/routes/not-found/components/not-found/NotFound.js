import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './NotFound.scss';

export default class NotFound extends Component {

  static propTypes = {
    title: PropTypes.string,
    subline: PropTypes.string,
  }

  render() {
    const { title, subline } = this.props;

    return (
      <div className={s.notFound}>
        <div className={s.notFound__container}>
          <div className={s.notFound__row}>
            <div className={s.notFound__col}>
              <div className={s.notFound__content}>
                <h1 className={s.notFound__title}>{title}</h1>
                <p className={s.notFound__subline}>{subline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
