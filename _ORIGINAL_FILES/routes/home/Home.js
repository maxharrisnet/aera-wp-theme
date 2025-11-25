import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import IntroHome, { Loading } from "components/intro-home";
// import ColumnContent, { ColumnContentItem } from 'components/column-content';
import Request from "components/request";

import VideoScene1 from "assets/images/home/technology-loop-vpsales.mp4";
import VideoScene2 from "assets/images/home/technology-loop-csco.mp4";
import VideoScene3 from "assets/images/home/technology-loop-ceo.mp4";
import VideoScene4 from "assets/images/home/technology-loop-vpmanufacturing.mp4";
import ImageTruck from "assets/images/home/technology-truck.jpg";
// import ImageTestimonial from "assets/images/home/testimonial-1x.png";
// import ImageTestimonial2x from "assets/images/home/testimonial-2x.png";

import Technology, { TechnologyItem } from "./components/technology";
import AdditionalSection from "./components/additional-section";
//import FeaturedCase from "./components/featured-case";
// import Testimonial from "./components/testimonial";
//import TestimonialNew from "./components/testimonial-new";
// import AlphaVideo from './components/alpha-video';

class Home extends Component {
  static propTypes = {
    jobResult: PropTypes.object
  };

componentDidMount() {

  if($(window).width() > 720){
      $("#scrollDownBtn").on('click', function() {
        $('html, body').animate({
            scrollTop: $("#sectionTechnology").offset().top + 200
        }, 1000);
      })
    }
  else{
    $("#scrollDownBtn").on('click', function() {
      $('html, body').animate({
          scrollTop: $("#sectionTechnologyMobile").offset().top + 50
      }, 1000);
    })
  }
}

componentDidUpdate() {

  if($(window).width() > 720){
      $("#scrollDownBtn").on('click', function() {
        $('html, body').animate({
            scrollTop: $("#sectionTechnology").offset().top + 200
        }, 1000);
      })
    }
  else{
    $("#scrollDownBtn").on('click', function() {
      $('html, body').animate({
          scrollTop: $("#sectionTechnologyMobile").offset().top + 50
      }, 1000);
    })
  }
}
  
    

  render() {
    const { newTitle, subline } = this.props.jobResult;

    return (
      <Fragment>
        <Helmet
          // title="Aera Technology - Enabling the Self-Driving Enterprise™"
          title="Aera Technology - The Decision Intelligence Company"
          meta={[
            {
              name: "description",
              content:
                "Aera Technology is the Decision Intelligence company that makes business agility happen. In the era of digital acceleration, Aera helps enterprises around the world transform how they respond to the ever-changing environment"
            },
            {
              property: "og:description",
              content:
                "Aera Technology is the Decision Intelligence company that makes business agility happen. In the era of digital acceleration, Aera helps enterprises around the world transform how they respond to the ever-changing environment"
            },
            {
              name: "twitter:description",
              content:
                "Aera Technology is the Decision Intelligence company that makes business agility happen. In the era of digital acceleration, Aera helps enterprises around the world transform how they respond to the ever-changing environment"
            },
            { property: "og:image", content: "/favicons/aera-share.jpg" },
            { name: "twitter:image", content: "/favicons/aera-share.jpg" },
          ]}
          link = {[
            { rel : "canonical", href : "https://www.aeratechnology.com"  }
          ]}
        />

        <IntroHome title={newTitle} text={subline} fullHeight />

        <Technology>
          <TechnologyItem
            title="Aera understands."
            text={
              <p>
                Aera continuously crawls enterprise systems; refines, indexes, and augments data; and delivers end-to-end, real-time visibility into your operations.
              </p>
              // <p>
              //   Aera continuously crawls your enterprise systems, refines,
              //   indexes, and augments your data, and delivers end-to-end,
              //   real-time visibility into your company's operations.
              // </p>
            }
            video={VideoScene1}
            messages={[
              {
                type: "user",
                message: "Aera, what’s my forecast?"
              },
              {
                type: "aera",
                message: `On track at $1.2B with an additional $134M revenue opportunity.
                  Do you want the regional breakdown?`
              }
            ]}
          />

          <TechnologyItem
            title="Aera recommends."
            text={
              <p>
                Aera uses real-time data and AI to predict business risks and opportunities accurately, then recommends the best course of action.
              </p>
              // <p>
              //   Using machine learning and business domain expertise, Aera
              //   dynamically uncovers risks and opportunities to continuously
              //   improve your financial and operational performance.
              // </p>
            }
            video={VideoScene2}
            background={<img src={ImageTruck} alt="" />}
            messages={[
              {
                type: "user",
                message: "Aera, how can I reduce my working capital?"
              },
              {
                type: "aera",
                message: `Transferring excess inventory from Santiago to
                  Sao Paulo will reduce working capital by $22.1M.`
              }
            ]}
          />

          <TechnologyItem
            title="Aera acts."
            text={
              <p>
                Aera proactively engages relevant users and autonomously drives the execution of decisions.
              </p>
              // <p>
              //   Aera brings the future into the present, leveraging real-time
              //   data and artificial intelligence to accurately predict business
              //   risks and opportunities.
              // </p>
            }
            video={VideoScene3}
            messages={[
              {
                type: "aera",
                message:
                  "I predict a competitor stock-out for the Logo product in Germany."
              },
              {
                type: "user",
                message: "Aera, do we have excess inventory that we can ship?"
              },
              {
                type: "aera",
                message:
                  "Yes, I found excess inventory to fill 53% of the projected stock-out."
              }
            ]}
          />

          <TechnologyItem
            title="Aera learns."
            text={
              <div>
                <p>
                Aera learns from decisions made and their outcomes in order to improve future recommendations.
                </p>
                {/* <p>
                  Aera engages relevant users when needed and autonomously
                  executes decisions.
                </p> */}
                <p>
                  <Link to="/aera-decision-cloud">More About the technology</Link>
                </p>
              </div>
            }
            video={VideoScene4}
            // background={<AlphaVideo />}
            messages={[
              {
                type: "aera",
                message: ` I found capacity for 100,000 units of Logo product in plant
                  P23 for this month. Shall we launch production?`
              },
              {
                type: "user",
                message: "Let's do it!"
              }
            ]}
          />
        </Technology>

        {/* {caseStudy && (
          <FeaturedCase
            image={caseStudy.image.file.url}
            title={caseStudy.title}
            text={caseStudy.text}
            link={caseStudy.link}
            linkText={caseStudy.linkText}
          />
        )} */}

        <AdditionalSection />
        {/* <TestimonialNew /> */}
        {/* <Testimonial
          quote="Aera is the foundation of our self-driving supply chain. It’s real-time
            and intelligent at scale, fundamentally improving the speed, the quality
            and the impact of our decisions."
          by="Alessandro de Luca"
          title="Chief Information Officer, Merck Group"
          image={ImageTestimonial}
          image2x={ImageTestimonial2x}
        /> */}

        <Request title="See Aera in action." text="Schedule Demo" link="/demo" />
      </Fragment>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful }) => contentful.fetchSingleByContentType("home"),
  LoadingComponent: Loading
})(Home);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
