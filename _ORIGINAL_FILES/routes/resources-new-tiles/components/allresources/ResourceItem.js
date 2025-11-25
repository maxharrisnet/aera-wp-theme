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
    video: PropTypes.string,
    publication: PropTypes.string,
    type: PropTypes.string,
    formOrVideo: PropTypes.string,
    companyType: PropTypes.string,
    icon: PropTypes.string,
    //businessProblem: PropTypes.string,
    link: PropTypes.string,
    employees: PropTypes.string,
    revenue: PropTypes.string,
    businessStatement: PropTypes.string,
    
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
      formOrVideo,
      //companyType,
      icon,
      problem,
      employees,
      revenue,
      businessStatement

    } = this.props;
    const videoInfo = getVideoServiceId(video);
    const hasImage = this.props.image;
    const hasLogo = this.props.logo;
    ``;

    const hasCat = this.props.type;
    const hastitle = this.props.title;
   // console.log(hasCat);
    const ans = this.props.formOrVideo;
    // console.log(ans);
    
    return (
      <WaypointEnter onEnter={this.animate}>
        <div
          ref={c => (this.el = c)}
          className={s.newsItem}
          resource-type={type}
          resource-class="resources"
        >
          <div className={s.newsItem__wrapper}>
              
          <div className={s.newsItem__figure}>
              {hasCat == 'Video' && image && !link &&(
              <a href={video}
                className={s(s.newsItem__image, { isVideo: !!video }, s.newsItem__bgImage, s.newsItem__imageBorder)}
                onClick={this.onImageClick}
                style={{backgroundImage: `url(${image})`}}
              >
              </a>)}
              {hasCat == 'Video' && link && image &&(
                <a href={link}
                target="_blank"
                className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
                style={{backgroundImage: `url(${image})`}}
                >
                <img
                  className={s.newsItem__logo}
                  src={logo}
                  // width={logo.width}
                  // height={logo.height}
                  alt={publication}
                />
              </a>)} 

              {hasCat == 'Podcast' && image && !link &&(
              <a href={video}
                className={s(s.newsItem__image, { isVideo: !!video }, s.newsItem__bgImage, s.newsItem__imageBorder)}
                onClick={this.onImageClick}
                style={{backgroundImage: `url(${image})`}}
              >
              </a>)}
              {hasCat == 'Podcast' && link && image &&(
                <a href={link}
                target="_blank"
                className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
                style={{backgroundImage: `url(${image})`}}
                >
                <img
                  className={s.newsItem__logo}
                  src={logo}
                  // width={logo.width}
                  // height={logo.height}
                  alt={publication}
                />
              </a>)}
            

              {hasCat == 'News' && image && !logo &&(
              <a href={link}
              target="_blank"
              className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
              style={{backgroundImage: `url(${image})`}}
              ></a>)}
              {hasCat == 'News' && logo && !image &&(
              <a href={link} target='_blank' className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
                  <img
                    className={s.newsItem__logo}
                    src={logo}
                    // width={logo.width}
                    // height={logo.height}
                    alt={publication}
                  />
              </a>)}
              {hasCat == 'Press Release' && image && !logo &&(
              <a href={link}
              className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
              style={{backgroundImage: `url(${image})`}}
              ></a>)}
              {hasCat == 'Press Release' && logo && !image &&(
              <a href={link} className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
                  <img
                    className={s.newsItem__logo}
                    src={logo}
                    // width={logo.width}
                    // height={logo.height}
                    alt={publication}
                  />
              </a>)}
              {hasCat == 'Blogs' && image && !logo &&(
              <a href={link}
              className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
              style={{backgroundImage: `url(${image})`, backgroundPosition: 'right'}}
              ></a>)}
              {hasCat == 'Blogs' && logo && !image &&(
              <a href={link} className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
                  <img
                    className={s.newsItem__logo}
                    src={logo}
                    // width={logo.width}
                    // height={logo.height}
                    alt={publication}
                  />
              </a>)}
              {hasCat == 'Announcements' && image && !logo &&(
              <a href={link}
              className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
              style={{backgroundImage: `url(${image})`}}
              ></a>)}
              {hasCat == 'Announcements' && logo && !image &&(
              <a href={link} className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
                  <img
                    className={s.newsItem__logo}
                    src={logo}
                    // width={logo.width}
                    // height={logo.height}
                    alt={publication}
                  />
              </a>)}
              {hasCat == 'Perspectives' && image && !logo &&(
              <a href={link}
              className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
              style={{backgroundImage: `url(${image})`}}
              ></a>)}
              {hasCat == 'Perspectives' && logo && !image &&(
              <a href={link} className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
                  <img
                    className={s.newsItem__logo}
                    src={logo}
                    // width={logo.width}
                    // height={logo.height}
                    alt={publication}
                  />
              </a>)}
              {hasCat == 'Event' && image && !logo &&(
              <a href={link}
              className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
              target="_blank"
              style={{backgroundImage: `url(${image})`}}
              ></a>)}
              {hasCat == 'Event' && logo && !image &&(
              <a href={link} target="_blank" className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
              <img
                className={s.newsItem__logo}
                src={logo}
                // width={logo.width}
                // height={logo.height}
                alt={publication}
              />
              </a>)}
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
              {hasCat == 'AeraHub' && image && !logo &&(
              <a href={link}
                className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
                target="_blank"
                style={{backgroundImage: `url(${image})`, backgroundPosition: "right"}}
              ></a>
              )}
              {hasCat == 'AeraHub' && logo && !image &&(
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
              {hasCat == 'Whitepaper' && image && !logo &&(
              <a href={link}
                className={s(s.newsItem__image, s.newsItem__bgImage, s.newsItem__imageBorder)}
                target="_blank"
                style={{backgroundImage: `url(${image})`}}
              ></a>)}
              {hasCat == 'Whitepaper' && logo && !image &&(
              <a href={link} target="_blank" className={s(s.newsItem__logoImage, s.newsItem__imageBorder)} style={{padding: "30px 0 25px 0px"}}>
                  <img
                    className={s.newsItem__logo}
                    src={logo}
                    // width={logo.width}
                    // height={logo.height}
                    alt={publication}
                  />
              </a>)}
              
            </div>
            {hasCat == "Video" && video && (
              <a href={video} target="_blank"
              rel="noopener noreferrer"
              onClick={this.onImageClick}
              data-event-category="Section"
              data-event-action="Click"
              data-event-name={title}>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__type}>{type}</div>                
                      {/* <div className={s.newsItem__dateWrapper}>
                      {city && <div className={s.newsItem__date}>
                        {city} -&nbsp;
                      </div>}
                      <div className={s.newsItem__date}>{date}</div>
                    </div> */}
                  </div>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__content}>
                        <h2 className={s.newsItem__title}>  
                            {title}
                        </h2>
                        <p className={s.newsItem__text}>{excerpt}</p>
                    </div>
                  </div>
                  <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )}

            {/* {hasCat == "Podcast" && video && (
              <a href={video} target="_blank"
              rel="noopener noreferrer"
              onClick={this.onImageClick}
              data-event-category="Section"
              data-event-action="Click"
              data-event-name={title}>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__type}>{type}</div>                
                      <div className={s.newsItem__dateWrapper}>
                      {city && <div className={s.newsItem__date}>
                        {city} -&nbsp;
                      </div>}
                      <div className={s.newsItem__date}>{date}</div>
                    </div>
                  </div>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__content}>
                        <h2 className={s.newsItem__title}>  
                            {title}
                        </h2>
                        <p className={s.newsItem__text}>{excerpt}</p>
                    </div>
                  </div>
                  <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )} */}


            {/* {hasCat == "Video" && !video && link && (
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                  <div className={s(s.newsItem__row)}>
                      <div className={s.newsItem__date}>{date}</div>
                      <div className={s.newsItem__line}></div>
                  </div>
                </div>
              </a>
            )} */}
            {hasCat == "Video" && link && ans == "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>REGISTER</span>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "Podcast" && link && ans == "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>REGISTER</span>
                    </div>
                  </div>
              </a>
            )}

            

            {hasCat == "Podcast" && video && ans == "Form" &&(
               <a href={video} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}
               
               >
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>REGISTER</span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Video" && link && ans != "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>WATCH NOW</span>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "Podcast" && link && ans != "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>WATCH NOW</span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Podcast" && video && ans != "Form" &&(
               <a href={video} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}
                >
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>WATCH NOW</span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Podcast" && ans != "Video" && ans != "Form" &&(
               <a href="javascript:;" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}
                >
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__nonlink}>COMING SOON</span>
                    </div>
                  </div>
              </a>
            )}
            
            {hasCat == "On-Demand" && video && (
              <a href={video} target="_blank"
              rel="noopener noreferrer"
              onClick={this.onImageClick}
              data-event-category="Section"
              data-event-action="Click"
              data-event-name={title}>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__type}>{type}</div>                
                      {/* <div className={s.newsItem__dateWrapper}>
                      {city && <div className={s.newsItem__date}>
                        {city}
                      </div>}
                    </div> */}
                  </div>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__content}>
                        <h2 className={s.newsItem__title}>  
                            {title}
                        </h2>
                        <p className={s.newsItem__text}>{excerpt}</p>
                    </div>
                  </div>
                  <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                          <span className={s.newsItem__link}>REGISTER</span>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "On-Demand" && link && ans == "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>REGISTER</span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "On-Demand" && link && ans != "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>WATCH NOW</span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "AeraHub" && video && (
              <a href={video} target="_blank"
              rel="noopener noreferrer"
              onClick={this.onImageClick}
              data-event-category="Section"
              data-event-action="Click"
              data-event-name={title}>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__type}>{type}</div>                
                      {/* <div className={s.newsItem__dateWrapper}>
                      {city && <div className={s.newsItem__date}>
                        {city}
                      </div>}
                    </div> */}
                  </div>
                  <div className={s.newsItem__row}>
                    <div className={s.newsItem__content}>
                        <h2 className={s.newsItem__title}>  
                            {title}
                        </h2>
                        <p className={s.newsItem__text}>{excerpt}</p>
                    </div>
                  </div>
                  <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                          <span className={s.newsItem__link}>WATCH NOW</span>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "AeraHub" && link && ans != "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                   
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>WATCH NOW</span>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "AeraHub" && link && ans == "Form" &&(
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                  {/*<div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                  </div>*/}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <span className={s.newsItem__link}>REGISTER</span>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "Whitepaper" && (
              <a href={link} target="_blank" data-event-category="Section"
              data-event-action="Click"
              data-event-name={title}>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} -&nbsp;
                    </div>}
                    <div className={s.newsItem__date}>{date}</div>
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "Event" && (
               <a href={link} target="_blank" data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                 <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} 
                    </div>}
                    {/* <div className={s.newsItem__date}>{date}</div> */}
                  </div>
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                        <div>
                          <span className={s.newsItem__link}>REGISTER</span>
                        </div>
                    </div>
                  </div>
              </a>
            )}
            {/* {hasCat == "News" && (
               <a href={link} rel="noopener noreferrer"
               data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                 <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} -&nbsp;
                    </div>}
                    <div className={s.newsItem__date}>{date}</div>
                  </div>
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )} */}

            {hasCat == "News" && (
               <a href={link} rel="noopener noreferrer"
               data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}
               target="_blank"
               >
                 <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} -&nbsp;
                    </div>}
                    <div className={s.newsItem__date}>{date}</div>
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )}
            {hasCat == "Press Release" && (
               <a href={link} rel="noopener noreferrer"
               data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}
               
               >
                 <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} -&nbsp;
                    </div>}
                    <div className={s.newsItem__date}>{date}</div>
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Blogs" && (
               <a href={link} rel="noopener noreferrer"
               data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                 <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} -&nbsp;
                    </div>}
                    <div className={s.newsItem__date}>{date}</div>
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )}

            {hasCat == "Perspectives" && (
               <a href={link} rel="noopener noreferrer"
               data-event-category="Section"
               data-event-action="Click"
               data-event-name={title}>
                 <div className={s.newsItem__row}>
                  <div className={s.newsItem__type}>{type}</div>                
                    {/* <div className={s.newsItem__dateWrapper}>
                    {city && <div className={s.newsItem__date}>
                      {city} -&nbsp;
                    </div>}
                    <div className={s.newsItem__date}>{date}</div>
                  </div> */}
                </div>
                <div className={s.newsItem__row}>
                  <div className={s.newsItem__content}>
                      <h2 className={s.newsItem__title}>  
                          {title}
                      </h2>
                      <p className={s.newsItem__text}>{excerpt}</p>
                  </div>
                </div>
                <div className={s.newsItem__lastRow}>
                    <div className={s(s.newsItem__row)}>
                        <div className={s.newsItem__date}>{date}</div>
                        <div className={s.newsItem__line}></div>
                    </div>
                  </div>
              </a>
            )}
           
            
            {videoInfo && (
              <Video
                {...videoInfo}
                ref={el => {
                  this.videoPlayer = el;
                }}
              />
            )}
            {hasCat == "Case Study" && (
              <NavLink to={link}>
                <div className={z.decisioncloud__components}>
                    {/* <div className={z.decisioncloud__cosImage} style={{backgroundImage: `url(${image})`}}></div> */}
                      <div className={s(z.decisioncloud__cosImage, z.decisioncloud__imageRow)}>
                        <div>
                        {hastitle == "Pharmaceutical" && (
                          <img src={icon} alt={title} style={{width:'40px', marginTop:'-5.5px'}}/>
                        )}
                        {hastitle == "Health & Hygiene" && (
                          <img src={icon} alt={title} style={{width:'45px'}}/>
                        )}
                        {hastitle != "Pharmaceutical" && hastitle != "Health & Hygiene" &&(
                          <img src={icon} alt={title}/>
                        )}
                        </div>
                        <div className={z.decisioncloud__companyType}>
                        {title}
                        </div>
                      </div>
                      <div className={s.newsItem__row}>
                        <div className={s.newsItem__type}>{type}</div>                
                          {/* <div className={s.newsItem__dateWrapper}>
                          {city && <div className={s.newsItem__date}>
                            {city} -&nbsp;
                          </div>}
                          <div className={s.newsItem__date}>{date}</div>
                        </div> */}
                      </div>
                  {revenue && employees &&(
                  <div className={z.decisioncloud__companydetails}>
                      <div className={z.decisioncloud__info}>
                        <div className={z.decisioncloud__title}>Revenue</div>
                        <div className={z.decisioncloud__details}>{revenue}</div>
                      </div>
                      <div className={z.decisioncloud__info}>
                        <div className={z.decisioncloud__title}>Employees</div>
                        <div>{employees}</div>
                      </div>
                  </div>)}
                  <div className={z.decisioncloud__businessproblem}>
                    <div className={z.decisioncloud__title}>Business Problem</div>
                    {/* <div>{excerpt}</div> */}
                    <div>{businessStatement}</div>
                  </div>
                  <div className={z.decisioncloud__learnmore}>
                  Learn More &rarr;
                  </div>
              </div>
            </NavLink>
            )}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
