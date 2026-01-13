import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { reaction } from "mobx";
import { TimelineLite } from "gsap";

import SvgMedium from "assets/images/social-medium.svg";
import SvgTwitter from "assets/images/logo_black.svg";
import SvgLinkedin from "assets/images/social-linkedin.svg";
import SvgFacebook from "assets/images/social-facebook.svg";

import s from "./Social.scss";

@inject("ui")
@observer
export default class Social extends Component {
  static propTypes = {
    ui: PropTypes.object
  };

  componentDidMount() {
    const { ui } = this.props;

    reaction(
      () => ui.isNavigationOpen,
      isNavigationOpen => {
        if (isNavigationOpen) {
          this.staggerIn();
        }
      }
    );
  }

  staggerIn = () => {
    const t = new TimelineLite();

    t.add("start").staggerFromTo(
      `.${s.social__item}`,
      0.4,
      { x: 200, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, clearProps: "visibility, opacity, transform" },
      0.035,
      "start+=0.3"
    );
  };

  render() {
    const links = [
      // { name: 'Medium', url: 'https://medium.com/@Aera_Technology', icon: SvgMedium },
      {
        name: "Twitter",
        url: "https://twitter.com/Aera_Technology",
        icon: SvgTwitter
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/aera-technology",
        icon: SvgLinkedin
      }
      // {
      //   name: "Facebook",
      //   url: "https://www.facebook.com/aeratech",
      //   icon: SvgFacebook
      // }
    ];

    return (
      <div className={s.social}>
        <ul className={s.social__list}>
          {links.map(({ name, url, icon: Icon }) => (
            <li key={name} className={s.social__item}>
              <a
                className={s.social__link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className={s.social__linkIcon} title={name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
