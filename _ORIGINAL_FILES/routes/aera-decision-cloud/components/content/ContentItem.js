import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";
import COSImage from "assets/images/decisioncloud/cos.png";
import SkillsImage from "assets/images/decisioncloud/skills.png";
import DeveloperImage from "assets/images/decisioncloud/developer.png";

export default class Content extends Component {
    static propTypes = {
        image: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
      };
    t = new TimelineLite();

    toggleAccordion = () => {
      this.setState({
        open: !this.state.open
      });
    };
  
    componentDidMount() {
      this.t.set(this.el, { autoAlpha: 0 });
    }
  
    animate = () => {
      fadeSlideIn(this.t, this.el);
    };

    render() {
        const { image, title, text, link } = this.props;
        return (
            <WaypointEnter onEnter={this.animate}>
                <div ref={c => (this.el = c)} className={s(s.decisioncloud)}>
                    <div>
                        <div className={s.decisioncloud__components}>
                            <div className={s.decisioncloud__cosImage}><img src={image} alt={title}/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>{title}</h3>
                                <p>
                                    {text}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
          </WaypointEnter>
        );
    }
}