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
import ReactMarkdown from "react-markdown";


const IMAGE_WIDTH = 1170;
const IMAGE_HEIGHT = 730;

export default class FeatEventsItem extends Component {
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
    ctaText: PropTypes.string
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 1 });
    const divLength = $('#featEvent').find('a').length;
    //console.log("div length "+divLength)
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

  renderHtmlBlock = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const eventDetails = props.escapeHtml ? [props.literal] : null;
    
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
              {eventDetails}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{eventDetails}</Element>;
    }
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
      eventType,
      eventDetails,
      ctaText
      

    } = this.props;
    const videoInfo = getVideoServiceId(video);
    const hasImage = this.props.image;
    const hasLogo = this.props.logo;
    ``;

    const hasCat = this.props.type;
    const hastitle = this.props.title;

    const ans = this.props.formOrVideo;
    
    
    
    return (
      <WaypointEnter onEnter={this.animate}>
              <a
                href={link}
                ref={c => (this.el = c)}
                className={s.newsItem}
                resource-type={type}
                resource-class="resources"
                target="_blank"
              >   
                <div className={s.news__featuredEventsDetails}>
                      <div className={s.news__detailsWrapper}>
                        {hasCat == "Webinar" && link && ans == "Form" &&(
                          <div className={s.news__type}>{eventType}</div>   
                        )}
                        {hasCat == "Webinar" && link && ans != "Form" &&(
                          <div className={s.news__type}>{eventType}</div>   
                        )}
                        {hasCat == "On-Demand" && link && ans != "Form" &&(
                          <div className={s.news__type}>{type}</div>   
                        )}
                        {hasCat == "On-Demand" && link && ans == "Form" &&(
                          <div className={s.news__type}>{type}</div>   
                        )}

                        {hasCat == "Webinar" && link && ans == "Form" &&(
                        <h2 className={s.news__heading}>  
                          {title}
                        </h2>
                        )}
                        {hasCat == "Webinar" && link && ans != "Form" &&(
                        <h2 className={s.news__heading}>  
                          {title}
                        </h2>
                        )}
                        {hasCat == "On-Demand" && link && ans == "Form" &&(
                        <h2 className={s.news__heading}>  
                          {title}
                        </h2>
                        )}
                        {hasCat == "On-Demand" && link && ans != "Form" &&(
                        <h2 className={s.news__heading}>  
                          {title}
                        </h2>
                        )}
                        
                        {hasCat == "Webinar" && link && ans == "Form" &&(
                        <p className={s.news__subheading}>  
                          <ReactMarkdown
                            className={s.articleTemplatePage__content}
                            source={eventDetails}
                            renderers={{
                              Image: this.renderImage,
                              HtmlBlock: this.renderHtmlBlock
                            }}
                          />
                        </p>
                        )}
                        {hasCat == "Webinar" && link && ans != "Form" &&(
                        <p className={s.news__subheading}>  
                          <ReactMarkdown
                            className={s.articleTemplatePage__content}
                            source={eventDetails}
                            renderers={{
                              Image: this.renderImage,
                              HtmlBlock: this.renderHtmlBlock
                            }}
                          />
                        </p>
                        )}
                        {hasCat == "On-Demand" && link && ans == "Form" &&(
                        <p className={s.news__subheading}>  
                          {excerpt}
                        </p>
                        )}
                        {hasCat == "On-Demand" && link && ans != "Form" &&(
                        <p className={s.news__subheading}>  
                          {excerpt}
                        </p>
                        )}
                    </div>
                    <div className={s.news__buttonWrapper}>
                      {hasCat == "Webinar" && link &&(
                      <span className={s(s.newsItem__highlight,s.highlighted)}>{ctaText}</span>
                      )}
                      
                      {hasCat == "On-Demand" && link && ans == "Form" &&(
                      <span className={s(s.newsItem__highlight,s.highlighted)}>REGISTER NOW</span>
                      )}
                      {hasCat == "On-Demand" && link && ans != "Form" &&(
                      <span className={s(s.newsItem__highlight,s.highlighted)}>WATCH NOW</span>
                      )}
                    </div>
                  </div>
                  {/* <div className={s.news__featuredEventsImage} style={{backgroundImage: `url(${image})`}}>
                    
                  </div> */}
                  <div className={s.news__featuredEventsImage}>
                    <img alt="featured image" src={image}/>
                  </div>
              </a>
      </WaypointEnter>
    );
  }
}
