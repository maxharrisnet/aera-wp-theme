import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";

import ReadNowBtn from "assets/images/customers/icons/readnow.png";
import WatchNowBtn from "assets/images/customers/icons/watchnow.png";

export default class Content extends Component {

      static propTypes = {
        relatedSkillTitle: PropTypes.string,
        relatedSkillDescription: PropTypes.string,
        relatedSkillsLink: PropTypes.string,
        relatedSkillsBlurb: PropTypes.string,
        subSkills: PropTypes.string,
        skillsIcon: PropTypes.object
      };
    t = new TimelineLite();
    
    toggleAccordion = () => {
      this.setState({
        open: !this.state.open
      });
    };

   

    componentDidMount() {
      this.t.set(this.el, { autoAlpha: 1 });
    }
  
    animate = () => {
      fadeSlideIn(this.t, this.el);
    };

    renderHtmlBlock = props => {
      const coreProps = this.getCoreProps(props);
  
      const nodeProps = props.escapeHtml
        ? {}
        : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
      const subSkills = props.escapeHtml ? [props.literal] : null;
      
      if (props.escapeHtml || !props.skipHtml) {
        const actualProps = { ...coreProps, ...nodeProps };
  
        if (props.literal.indexOf("iframe") === 1) {
          return (
            <div className={s.articleTemplatePage__contentEmbed}>
              <div
                {...actualProps}
                className={s.articleTemplatePage__contentIframe}
              >
                {/* {children} */}
                {subSkills}
              </div>
            </div>
          );
        }
  
        const Element = props.isBlock ? "div" : "span";
  
        return <Element {...actualProps}>{subSkills}</Element>;
      }
    };

    // componentDidMount() {
    //   $('[data-details="Logistics"]').css('display','block');
    // }

    render() {
      
        const { relatedSkillTitle, relatedSkillDescription, relatedSkillsLink, relatedSkillsBlurb, subSkills,skillsIcon } = this.props;
        
        return (
            <WaypointEnter>
                      <div className={s.decisioncloud__skillsetWrapper} ref={c => (this.el = c)} id={relatedSkillTitle} data-details={relatedSkillTitle}>
                          <div className={s.decisioncloud__skillsDetails}>
                            <img alt="skills icon" src={skillsIcon.file.url}/>
                            <h2>{relatedSkillTitle.replace(/-/g, ' ')}</h2>
                            <h3>{relatedSkillDescription}</h3>
                            <p>{relatedSkillsBlurb}</p>
                            <ReactMarkdown
                              className={s.articleTemplatePage__content}
                              source={subSkills}
                              renderers={{
                                Image: this.renderImage,
                                HtmlBlock: this.renderHtmlBlock
                              }}
                            />
                            <a href={relatedSkillsLink}>Learn more <span>&rarr;</span></a>
                          </div>
                      </div>
          </WaypointEnter>
        );
    }
}