import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./IntroADC.scss";
import { NavLink } from "react-router-dom";
import HomeButton from "assets/images/homeButton.png";

export default class IntroADC extends Component {
  static propTypes = {
    title: PropTypes.string,
    tagline: PropTypes.string,
    text: PropTypes.string,
    fullHeight: PropTypes.bool
  };

  render() {
    const { title, tagline,text, fullHeight } = this.props;

    return (
      <div className={s(s.intro, { fullHeight })}>
        <div className={s.intro__container}>
          <h1 className={s.intro__title}>{title}</h1>
          <h3 className={s.intro__tagline}>{tagline}</h3>
          <p className={s.intro__text}>Aera Decision Cloud is the platform that powers Aera, your decision intelligence agent.<br/>This digital brain of your organization automates and optimizes business decisions in real time.</p>
          
          {/* {text &&
            text
              .split("\n")
              .filter(p => p !== "")
              .map((paragraph, i) => (
                <p className={s.intro__text} key={i}>
                  {paragraph}
                </p> // eslint-disable-line
              ))} */}
          {/* <p className={s.intro__button}><a href="/demo">SCHEDULE DEMO</a></p> */}
        </div>
      </div>
    );
  }
}
