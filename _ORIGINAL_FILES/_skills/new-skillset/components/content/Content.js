import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";

export default class Content extends Component {
  static propTypes = {
    relatedSkillTitle: PropTypes.string,
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
    // componentDidMount() {
    //   $('#list div[data-link="Logistics"]').css('background-color','#023059');
    //   $('#list div[data-link="Logistics"]').css('color','#fff');
    // }
    

    render() {
      const { children } = this.props;
      const { relatedSkillTitle } = this.props;
      // const slideskills = this.props.relatedSkillTitle;
      // console.log("data " + slideskills)
      return (
          <WaypointEnter onEnter={this.animate}>
              <div ref={c => (this.el = c)} className={s(s.decisioncloud__background)}>
                <div className={s.decisioncloud__container}>
                  <div className={s.decisioncloud__wrapper}>
                      <h2>Learn more about Aera Skills™</h2>
                      <div className={s.decisioncloud__skillsetRow}>
                        {/* <div className={s.decisioncloud__skillsList} id="list">
                        <div data-link="Logistics">Logistics<span>&rarr;</span></div>
                          <div data-link="Demand">Demand<span>&rarr;</span></div>
                          <div data-link="Inventory">Inventory<span>&rarr;</span></div>
                          <div data-link="Order">Order<span>&rarr;</span></div>
                          <div data-link="Control-Tower">Control Tower<span>&rarr;</span></div>
                          <div data-link="Procurement">Procurement<span>&rarr;</span></div>
                          <div data-link="Revenue">Revenue<span>&rarr;</span></div>
                          <div data-link="Finance">Finance<span>&rarr;</span></div>
                        </div> */}
                        <div className={s.decisioncloud__cardwrapper}>
                          {children}
                        </div>
                      </div>
                  </div>
                </div>  
              </div>
        </WaypointEnter>
      );
  }
}