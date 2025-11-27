import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./IntroPartners.scss";
import { NavLink } from "react-router-dom";
import HomeButton from "assets/images/homeButton.png";

export default class IntroPartners extends Component {
  static propTypes = {
    title: PropTypes.string,
    tagline: PropTypes.string,
    text: PropTypes.string,
    fullHeight: PropTypes.bool
  };

  render() {
    const { title, text, fullHeight } = this.props;

    return (
      <div className={s(s.intro, { fullHeight })}>
        <div className={s.intro__container}>
          <h1 className={s.intro__title}>{title}</h1>
          {text &&
            text
              .split("\n")
              .filter(p => p !== "")
              .map((paragraph, i) => (
                <p className={s.intro__text} key={i}>
                  {paragraph}
                </p> // eslint-disable-line
              ))}
          {/* <p className={s.intro__button}><a href="https://aeratechnology.force.com/partners/s/" target="_blank">Already a partner? Log into the Partner Portal</a></p> */}
        </div>
      </div>
    );
  }
}
