import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./IntroCommunity.scss";
import { NavLink } from "react-router-dom";
import HomeButton from "assets/images/homeButton.png";

export default class IntroCommunity extends Component {
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
          {/* <h1 className={s.intro__title}>{title}</h1>
          {text &&
            text
              .split("\n")
              .filter(p => p !== "")
              .map((paragraph, i) => (
                <p className={s.intro__text} key={i}>
                  {paragraph}
                </p> // eslint-disable-line
              ))} */}
          <h1 className={s.intro__title}>Transformation Through <br/>Decision Intelligence</h1>
          <p className={s.intro__text}>
          Decision Intelligence transforms how people work, from people making decisions supported by machines to machines making decisions, guided by people. We at Aera are building a community of like-minded innovators who are committed to the adoption of cognitive technology to enable a sustainable, intelligent, and efficient world.
          </p>
        </div>
      </div>
    );
  }
}
