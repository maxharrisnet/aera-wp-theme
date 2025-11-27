import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./IntroSkillsDetailPage.scss";
import { NavLink } from "react-router-dom";
import HomeButton from "assets/images/homeButton.png";

export default class IntroSkillsDetailPage extends Component {
  static propTypes = {
    title: PropTypes.string,
    tagline: PropTypes.string,
    text: PropTypes.string,
    fullHeight: PropTypes.bool
  };

  render() {
    const { title, text, tagline, fullHeight } = this.props;

    return (
      <div className={s(s.intro, { fullHeight })}>
        <div className={s.intro__container}>
          {/* <p className={s.intro__link}>
            <NavLink
              to="/"
              className={s.intro__link}
              data-event-category="Skills Breadcrumbs"
              data-event-action="Click"
              data-event-name="Home"
            >
              <img className={s.intro__imageLink} src={HomeButton} /> &nbsp; &#62; &nbsp;
            </NavLink>
            <NavLink
              to="/skillsv2"
              className={s.intro__link}
              data-event-category="Skills Breadcrumbs"
              data-event-action="Click"
              data-event-name="Skills"
            >
              Skills &nbsp; &#62; &nbsp;
            </NavLink>
            <NavLink
              to="/skillsv2#CognitiveSkills"
              className={s.intro__link}
              data-event-category="Skills Breadcrumbs"
              data-event-action="Click"
              data-event-name="Cognitive Skills"
            >
              Cognitive Skills &nbsp; &#62; &nbsp;
            </NavLink>
            <span className={s.intro__last}>{title}</span>
          </p> */}
          <h1 className={s.intro__title}>{title}</h1>
          <p className={s.intro__tagline}><i>{tagline}</i></p>
          {text &&
            text
              .split("\n")
              .filter(p => p !== "")
              .map((paragraph, i) => (
                <p className={s.intro__text} key={i}>
                  {paragraph}
                </p> // eslint-disable-line
              ))}
        </div>
      </div>
    );
  }
}
