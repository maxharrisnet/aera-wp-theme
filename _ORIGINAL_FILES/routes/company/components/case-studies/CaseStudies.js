import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './CaseStudies.scss';

export default class CaseStudies extends Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { title, children } = this.props;

    return (
      <div className={s.caseStudies}>
        <div className={s.caseStudies__container}>
          <h2 className={s.caseStudies__title}>{title}</h2>
          <div className={s.caseStudies__row}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
