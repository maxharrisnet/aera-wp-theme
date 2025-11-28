import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";

import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import getVideoServiceId from "utils/getVideoServiceId";
import Video from "components/video";
import { NavLink } from "react-router-dom";
import s from "./News.scss";
import z from "./Content.scss";
import rightArrow from "assets/images/rightArrow.jpg";



const IMAGE_WIDTH = 1170;
const IMAGE_HEIGHT = 730;

export default class ResourceItem extends Component {
  static propTypes = {
    date: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    link: PropTypes.string,
    logo:PropTypes.string,
    // logo: PropTypes.shape({
    //   url: PropTypes.string,
    //   width: PropTypes.number,
    //   height: PropTypes.number
    // }),
    
    publication: PropTypes.string,
    type: PropTypes.string,
    formOrVideo: PropTypes.string,
    industry: PropTypes.string,
    solutionArea: PropTypes.string,
    jobFunction: PropTypes.string,
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 1 });
  }

  animate = () => {
    //fadeSlideIn(this.t, this.el);
  };

  onImageClick = e => {
    const videoInfo = getVideoServiceId(this.props.video);

    if (!videoInfo) {
      return;
    }

    e.preventDefault();

    this.videoPlayer.show();
  };

  render() {
    const {
      date,
      image,
      title,
      excerpt,
      link,
      video,
      logo,
      publication,
      type,
      city,
      industry,
      solutionArea,
      jobFunction

    } = this.props;
    const videoInfo = getVideoServiceId(video);
    const hasImage = this.props.image;
    const hasLogo = this.props.logo;
    
    
    ``;
    
    const hasCat = this.props.type;
    //const hasIndustry = this.props.industry;
    //console.log(hasIndustry);
    const ans = this.props.formOrVideo;
    //console.log(ans);

    
    
    return (
      
      <WaypointEnter onEnter={this.animate}>
        {/* <div>
          <h3>Filter</h3>
        </div> */}
        <div
          ref={c => (this.el = c)}
          className={s.newsItem}
          resource-type={type}
          resource-class="resources"
        >
          <div className={s.newsItem__wrapper}>  
            <div className={s.newsItem__figure}>
              {hasCat == 'On-Demand' && image && !logo &&(
                <a href={link}
                  className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
                  target="_blank"
                  style={{backgroundImage: `url(${image})`}}
                ></a>
              )}
              {hasCat == 'On-Demand' && logo && !image &&(
                <a href={link} target="_blank" className={s(s.newsItem__logoImage, s.newsItem__imageBorder)}>
                <img
                  className={s.newsItem__logo}
                  src={logo}
                  // width={logo.width}
                  // height={logo.height}
                  alt={publication}
                />
                </a>
              )}
            </div>
            <div className={s.newsItem__figure}>
              {hasCat == 'Webinar' && image && !logo &&(
                <a href={link}
                  className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
                  target="_blank"
                  style={{backgroundImage: `url(${image})`}}
                ></a>
              )}
              {hasCat == 'Webinar' && logo && !image &&(
                <a href={link} target="_blank" className={s(s.newsItem__logoImage, s.newsItem__imageBorder)}>
                <img
                  className={s.newsItem__logo}
                  src={logo}
                  // width={logo.width}
                  // height={logo.height}
                  alt={publication}
                />
                </a>
              )}
            </div>
            
            {hasCat == "On-Demand" && link && ans == "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                {/* <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div>
                </div> */}
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        {/* <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div> */}
                        <span className={s.newsItem__link}>REGISTER <img src={rightArrow} /></span>
                    </div>
                </div>
              </a>
            )}

            {hasCat == "On-Demand" && link && ans != "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                {/* <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div>
                </div> */}
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        {/* <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div> */}
                        <span className={s.newsItem__link}>WATCH NOW <img src={rightArrow} /></span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Webinar" && link && ans == "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                {/* <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div>
                </div> */}
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        {/* <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div> */}
                        <span className={s.newsItem__link}>REGISTER <img src={rightArrow} /></span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Webinar" && link && ans != "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                {/* <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div>
                </div> */}
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        {/* <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div> */}
                        <span className={s.newsItem__link}>WATCH NOW <img alt="right arrow" src={rightArrow} /></span>
                    </div>
                  </div>
              </a>
            )}

            

            
            
            
            
            
            

            

            
           
            
            {/* {videoInfo && (
              <Video
                {...videoInfo}
                ref={el => {
                  this.videoPlayer = el;
                }}
              />
            )} */}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
