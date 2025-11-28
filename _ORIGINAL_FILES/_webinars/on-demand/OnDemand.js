import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import Intro, { Loading } from "components/intro-ondemand";

import AllResources, { ResourceItem } from "./components/allresources";
import FeatEvents, { FeatEventsItem } from "./components/featevents";

import s from "./components/allresources/News.scss";


class OnDemand extends Component {
  static propTypes = {
    jobResult: PropTypes.object,
  };


  

  
  
  
  state = {
    //featuredVideoVisible: 1
    // allResourceVisible: 10
    featuredCardVisible: 3,
  };

  componentDidMount() {
    
    // $("#typeSelector a").on("click", function() {
    //   var a = $(this).attr("type");
    //   if (a == "show-all") {
    //     $('[resource-class="resources"]').fadeIn();
    //     $("#typeSelector a").css("border-bottom", "1px solid transparent");
    //     $('[type="show-all"]').css("border-bottom", "1px solid #00578f");
    //   } else {
    //     $('[resource-class="resources"]').hide();
    //     //$("#" + $(this).attr("type")).hide();
    //     $("#typeSelector a").css("border-bottom", "1px solid transparent");
    //     $('[type="' + a + '"]').css("border-bottom", "1px solid #00578f");
    //     $('[resource-type="' + a + '"]').fadeIn();
    //   }
    // });

    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);
    
    script.addEventListener('load', () => {
        if(window.hbspt) {
          window.hbspt.forms.create({
          portalId: '4455954',
          formId: '23724f92-30b8-4f38-b984-70383520619d',
          target: '#webinarForm'
        })
      }
    });
    
  }
  

  


  render() {
    const {
      page: { title, subTitle, webinarCard }
    } = this.props.jobResult;
    const { webinarCardVisible, featuredCardVisible } = this.state;
    
    
    
    
    return (
      <Page>
        <Helmet
          title="Webinars - Aera Technology"
          meta={[
            { name: "description", content: "Register for upcoming webinars or explore our library of past sessions. Filter videos by industry, solution area or job function to find the content most relevant to you." },
            { property: "og:description", content: "Register for upcoming webinars or explore our library of past sessions. Filter videos by industry, solution area or job function to find the content most relevant to you." },
            { name: "twitter:description", content: "Register for upcoming webinars or explore our library of past sessions. Filter videos by industry, solution area or job function to find the content most relevant to you." },
            { property: "og:image", content: "/favicons/aera-share.jpg" },
            { name: "twitter:image", content: "/favicons/aera-share.jpg" }
          ]}
          link = {[
            { rel : "canonical", href : "https://www.aeratechnology.com/webinars"  }
          ]}
        />

        <Intro title={title} text={subTitle} />

        {/* <div className={s.news__filterWrapper}>
          <div className={s.news__filterType} id="typeSelector">
            <a
              href="javascript:;"
              type="show-all"
              style={{ borderBottom: "1px solid #00578f" }}
            >
              ALL TYPES
            </a>
            <a href="javascript:;" type="News">
              NEWS
            </a>
            <a href="javascript:;" type="Video">
              VIDEOS
            </a>
            <a href="javascript:;" type="Whitepaper">
              WHITEPAPERS
            </a>
            <a href="javascript:;" type="On-Demand">
              ON-DEMAND
            </a>
            <a href="javascript:;" type="Blogs">
              BLOGS
            </a>
            <a href="javascript:;" type="Case Study">
              CASE STUDIES
            </a>
            <a href="javascript:;" type="Podcast">
              PODCASTS
            </a>
          </div>
        </div> */}

        <FeatEvents>
          {webinarCard &&
            webinarCard
              .slice(0, featuredCardVisible)
              .map(
                ({
                  id,
                  date,
                  title: articleTitle,
                  type,
                  text,
                  lead,
                  image,
                  logo,
                  link,
                  slug,
                  city,
                  formOrVideo,
                  eventDetails,
                  eventType,
                  ctaText
                }) => (
                  <FeatEventsItem
                    key={id}
                    date={date}
                    image={image && image.file && image.file.url}
                    logo={logo && logo.file && logo.file.url}
                    title={articleTitle.substring(0, 130) + (articleTitle.length > 130 ? "..." : "")}
                    excerpt={
                      text.substring(0, 140) + (text.length > 140 ? "..." : "")
                    }
                    link={link}
                    slug={slug}
                    type={type}
                    city={city}
                    formOrVideo={formOrVideo}
                    eventDetails={eventDetails}
                    eventType={eventType}
                    ctaText={ctaText}
                  />
                )
              )}
        </FeatEvents>
        
        <div className={s.news__formSection}>
          <div className={s.news__container}>
            <div className={s.news__col}>
              <div className={s.news__formRow}>
                <div className={s.news__formText}>
                  <h3>Get the latest resources, blog posts, and updates from Aera Technology.</h3>
                  <p>Sign up for updates in your inbox.</p>
                </div>
                <div className={s.news__formWrapper}>
                  <div id="webinarForm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AllResources />
        
        {/* <div className={s.news__container}>
            <div className={s.news__col}>
              <h2 ref={c => (this.el = c)} className={s.news__subheading}>
                Want to learn more? 
              </h2>
              <p ref={c => (this.el = c)} className={s.news__para}>Catch up on our previous webinars.</p>
              
              
            </div>
            <div>
          </div>
        </div> */}
        
        {/* <h2>Filtered Blogs</h2> */}
        
      
          {/* {webinarCard &&
            webinarCard
              .slice(0, webinarCardVisible)
              .map(
                ({
                  id,
                  date,
                  title: articleTitle,
                  type,
                  text,
                  lead,
                  image,
                  logo,
                  link,
                  slug,
                  city,
                  formOrVideo
                }) => (
                  <ResourceItem
                    key={id}
                    date={date}
                    image={image && image.file && image.file.url}
                    logo={logo && logo.file && logo.file.url}
                    title={articleTitle.substring(0, 130) + (articleTitle.length > 130 ? "..." : "")}
                    excerpt={
                      text.substring(0, 140) + (text.length > 140 ? "..." : "")
                    }
                    link={link}
                    slug={slug}
                    type={type}
                    city={city}
                    formOrVideo={formOrVideo}
                  />
                )
              )} */}
        {/* </AllResources> */}
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: async ({ contentful }) => {
    const [page, caseStudies] = await Promise.all([
      contentful.fetchSingleByContentType("webinarPage"),
      //contentful.fetchByContentType("caseStudies")
    ]);

    return {
      page,
      //caseStudies
    };
  },
  LoadingComponent: Loading
})(OnDemand);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
