import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./NewSkillsNotFound.scss";

export default class NewSkillsNotFound extends Component {
  static propTypes = {
    title: PropTypes.string,
    subline: PropTypes.string
  };

  render() {
    const { title, subline } = this.props;

    return (
      <div className={s.articlenotFound}>
        <div className={s.articlenotFound__container}>
          <div className={s.articlenotFound__row}>
            <div className={s.articlenotFound__col}>
              <div className={s.articlenotFound__content}>
                <h1 className={s.articlenotFound__title}>{title}</h1>
                <p className={s.articlenotFound__subline}>{subline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
