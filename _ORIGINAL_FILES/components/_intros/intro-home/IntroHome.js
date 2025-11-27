import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./IntroHome.scss";
import DownArrow from "assets/images/home/downArrow.png";

export default class IntroHome extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    fullHeight: PropTypes.bool
  };

 

  render() {
    const { text, fullHeight, title } = this.props;

    return (
      <div className={s(s.intro, { fullHeight })}>
        <div className={s.intro__container}>
          <h1 className={s.intro__title}>Hello, I’m Aera.</h1>
          <h2 className={s.intro__subtitle}>Your Decision Intelligence Agent™</h2>
          <p className={s.intro__text}>
          {/* The AI for Decision Automation.<br/> */}
          Aera understands how your business works, makes real-time recommendations, takes action autonomously, and learns from every decision made.
          </p>

          {/* <p className={s.intro__text}>
          The Cognitive Technology for Decision Intelligence.<br/>
          Aera understands how your business works, makes real-time recommendations, predicts outcomes, and takes action autonomously.
          </p> */}
          {/* <p className={s.intro__text}>
          The Cognitive Technology for the Self-Driving Enterprise™. <br/> Aera understands how your business works, makes real-time recommendations, predicts outcomes, and takes action autonomously.
          </p> */}
          {/* <p className={s.intro__text}>
            The Cognitive Automation platform that digitizes, augments, and automates decision making.
          </p> */}
        </div>
        {/* <div className={s.intro__scrollBtn} id="scrollDownBtn"><img src={DownArrow} /></div> */}
      </div>
    );
  }
}

