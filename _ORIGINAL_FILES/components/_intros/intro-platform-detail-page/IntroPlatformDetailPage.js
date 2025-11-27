import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./IntroPlatformDetailPage.scss";
import { NavLink } from "react-router-dom";
import HomeButton from "assets/images/homeButton.png";

export default class IntroPlatformDetailPage extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    fullHeight: PropTypes.bool
  };

  render() {
    const { title, text, fullHeight } = this.props;

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
              to="/platform"
              className={s.intro__link}
              data-event-category="Skills Breadcrumbs"
              data-event-action="Click"
              data-event-name="Platform"
            >
              Platform &nbsp; &#62; &nbsp;
            </NavLink>
            <NavLink
              to="/platform#scrolledToCOS"
              className={s.intro__link}
              data-event-category="Header"
              data-event-action="Click"
              data-event-name="Cognitive Operating System"
            >
              Cognitive Operating System &nbsp; &#62; &nbsp;
            </NavLink>
            <span className={s.intro__last}>{title}</span>
          </p> */}
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
        </div>
      </div>
    );
  }
}
