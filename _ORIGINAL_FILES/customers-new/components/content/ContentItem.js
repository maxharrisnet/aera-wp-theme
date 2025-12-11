import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";

import ReadNowBtn from "assets/images/customers/icons/readnow.png";
import WatchNowBtn from "assets/images/customers/icons/watchnow.png";

export default class Content extends Component {

      static propTypes = {
        heroImage: PropTypes.string,
        companyLogo: PropTypes.string,
        companyText: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string,
        type: PropTypes.string,
        videoURL: PropTypes.string,
        ctaText: PropTypes.string,
        assetType: PropTypes.string,
        assetTitle: PropTypes.string,
        assetLink: PropTypes.string,
        assetLink2:PropTypes.string,
        assetTitle2:PropTypes.string,
        assetType2:PropTypes.string,
        assetLink3:PropTypes.string,
        assetTitle3:PropTypes.string,
        assetType3:PropTypes.string,
        assetLink4:PropTypes.string,
        assetTitle4:PropTypes.string,
        assetType4:PropTypes.string,
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
      
        const { heroImage, companyLogo, companyText, type, title, assetType, assetTitle, assetLink, assetLink2,
          assetTitle2,
          assetType2,
          assetLink3,
          assetTitle3,
          assetType3,
          assetLink4,
          assetTitle4,
          assetType4,
          } = this.props;

          const hasType1 = this.props.assetType;
          const hasType2 = this.props.assetType2;
          const hasType3 = this.props.assetType3;
          const hasType4 = this.props.assetType4;

          // const hasLink1 = this.props.assetLink;
          // const hasLink2 = this.props.assetLink2;
          // const hasLink3 = this.props.assetLink3;
          // const hasLink4 = this.props.assetLink4;

         

          // console.log(hasLink1);
          // console.log(hasLink2);
          // console.log(hasLink3);
          // console.log(hasLink4);
          
        
        return (
            <WaypointEnter onEnter={this.animate}>
                
                    <div className={s.decisioncloud__card} ref={c => (this.el = c)}>
                        
                        <div className={s.decisioncloud__components} id="mainCard">
                            <div className={s(s.decisioncloud__cosImage, s.decisioncloud__imageRow)} id="companyimage">
                              <img src={heroImage} alt="companyImage" />
                              
                            </div>
                            <div className={s.decisioncloud__companydetails}>
                              {companyLogo && !companyText &&(
                                  <div className={s.decisioncloud__title}>
                                    <img src={companyLogo} alt="companyLogo"/>
                                  </div>
                               )}
                               {companyText && !companyLogo &&(
                                <div className={s.decisioncloud__info}>
                                  <div className={s(s.decisioncloud__title, s.decisioncloud__companyText)}>{companyText}</div>
                                </div>
                               )}
                            </div>
                            <div className={s.decisioncloud__businessproblem}>
                              <div>{title}</div>
                            </div>
                            <div className={s.decisioncloud__tags} id="tags">
                              <span>{type}</span>
                            </div>
                            {/* <div className={s.decisioncloud__learnmore}>
                              {videoURL && link &&(
                                <div className={s.decisioncloud__linkwrapper}>
                                  <a href={videoURL} target="_blank">
                                    Watch Video
                                  </a>
                                  <NavLink to={link}>
                                    <div>See Story <span>&rarr;</span></div>
                                  </NavLink>
                                  
                                </div>
                              )}
                              {videoURL && !link &&(
                                <div className={s.decisioncloud__linkwrapper}>
                                  <a href={videoURL} target="_blank">
                                    <div>Watch Video</div>
                                  </a>
                                </div>
                              )}
                              {link && !videoURL &&(
                                <div className={s.decisioncloud__linkwrapper}>
                                  <NavLink to={link}>
                                    <div>See Story <span>&rarr;</span></div>
                                  </NavLink>
                                </div>
                              )}
                            </div> */}
                            <div className={s.decisioncloud__assetholder} id="items">
                              {assetLink && (
                              <div className={s.decisioncloud__assetwrapper}>
                                  <div className={s.decisioncloud__assettype}>
                                    <a href={assetLink} target="_blank">{assetType}</a>
                                    {
                                      hasType1 == "Watch Now" && hasType1 != "Read Now" &&
                                      (
                                        <a href={assetLink} target="_blank"><img alt="Watch Now" src={WatchNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                    {
                                      hasType1 == "Read Now" && hasType1 != "Watch Now" &&
                                      (
                                        <a href={assetLink} target="_blank"><img alt="Read Now" src={ReadNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                  </div>
                                  <ul>
                                    <li><a href={assetLink} target="_blank">{assetTitle}</a></li> 
                                  </ul>
                              </div>
                              )}
                              {assetLink2 && (
                              <div className={s.decisioncloud__assetwrapper}>
                                  <div className={s.decisioncloud__assettype}>
                                  <a href={assetLink2} target="_blank">{assetType2}</a>
                                    {
                                      hasType2 == "Watch Now" && hasType2 != "Read Now" &&
                                      (
                                        <a href={assetLink2} target="_blank"><img alt="WatchNowBtn" src={WatchNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                    {
                                      hasType2 == "Read Now" && hasType2 != "Watch Now" &&
                                      (
                                        <a href={assetLink2} target="_blank"><img alt="ReadNowBtn" src={ReadNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                  </div>
                                  <ul>
                                    <li><a href={assetLink2} target="_blank">{assetTitle2}</a></li> 
                                  </ul>
                              </div>
                              )}
                              {assetLink3 && (
                              <div className={s.decisioncloud__assetwrapper}>
                                  <div className={s.decisioncloud__assettype}>
                                  <a href={assetLink3} target="_blank">{assetType3}</a>
                                    {
                                      hasType3 == "Watch Now" && hasType3 != "Read Now" &&
                                      (
                                        <a href={assetLink3} target="_blank"><img alt="WatchNowBtn" src={WatchNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                    {
                                      hasType3 == "Read Now" && hasType3 != "Watch Now" &&
                                      (
                                        <a href={assetLink3} target="_blank"><img alt="ReadNowBtn" src={ReadNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                  </div>
                                  <ul>
                                    <li><a href={assetLink3} target="_blank">{assetTitle3}</a></li> 
                                  </ul>
                              </div>
                              )}
                              {assetLink4 && (
                              <div className={s.decisioncloud__assetwrapper}>
                                  <div className={s.decisioncloud__assettype}>
                                  <a href={assetLink4} target="_blank">{assetType4}</a>
                                    {
                                      hasType4 == "Watch Now" && hasType4 != "Read Now" &&
                                      (
                                        <a href={assetLink4} target="_blank"><img alt="WatchNowBtn" src={WatchNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                    {
                                      hasType4 == "Read Now" && hasType4 != "Watch Now" &&
                                      (
                                        <a href={assetLink4} target="_blank"><img alt="ReadNowBtn" src={ReadNowBtn} className={s.decisioncloud__playReadBtn}/></a>
                                      )
                                    }
                                  </div>
                                  <ul>
                                    <li><a href={assetLink4} target="_blank">{assetTitle4}</a></li> 
                                  </ul>
                              </div>
                              )}
                            </div>
                        </div>
                    </div>
                
          </WaypointEnter>
        );
    }
}