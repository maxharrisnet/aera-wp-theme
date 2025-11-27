import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './CaseStudies.scss';

export default class CaseStudiesItem extends Component {

  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
  };

  render() {
    const { title, image, text, link } = this.props;

    return (
      <div className={s.caseStudiesItem}>
        <div className={s.caseStudiesItem__wrapper}>
          <img className={s.caseStudiesItem__image} src={image} alt="" />
          <h3 className={s.caseStudiesItem__title}>{title}</h3>
          <p className={s.caseStudiesItem__text}>{text}</p>
          <p className={s.caseStudiesItem__action}>
            <Link className={s.caseStudiesItem__link} to={link}>Read case study</Link>
          </p>
        </div>
      </div>
    );
  }
}
