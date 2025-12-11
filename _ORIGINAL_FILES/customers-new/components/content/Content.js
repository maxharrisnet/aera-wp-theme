import React, { Component } from "react";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";

export default class Content extends Component {
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
        const { children } = this.props;
        return (
            <WaypointEnter onEnter={this.animate}>
                <div ref={c => (this.el = c)} className={s(s.decisioncloud)}>
                    <div className={s.decisioncloud__wrapper}>
                        <div className={s.decisioncloud__cardwrapper}>{children}</div>
                    </div>
                </div>
          </WaypointEnter>
        );
    }
}