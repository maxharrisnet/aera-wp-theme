import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import $ from "jquery";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import Intro, { Loading } from "components/intro";

import AllResources, { ResourceItem } from "./components/allresources";

import s from "./components/allresources/News.scss";

class Resourcesnew extends Component {
  static propTypes = {
    jobResult: PropTypes.object
  };

  state = {
    featuredVideoVisible: 1
    // allResourceVisible: 10
  };

  componentDidMount() {
    $("#typeSelector a").on("click", function() {
      var a = $(this).attr("type");
      if (a == "show-all") {
        $('[resource-class="resources"]').fadeIn();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="show-all"]').css("border-bottom", "1px solid #00578f");
      } else {
        $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="' + a + '"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="' + a + '"]').fadeIn();
      }
    });

    function getURLParameter(e) {
      return decodeURI((new RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, ""])[1]);
    }
    
    if (getURLParameter("category") === "videos") {
        $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Video"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Video"]').fadeIn();
    } 
    if (getURLParameter("category") === "news") {
        $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="News"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="News"]').fadeIn();
    } 
    if (getURLParameter("category") === "whitepapers") {
        $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Whitepaper"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Whitepaper"]').fadeIn();
    } 
    if (getURLParameter("category") === "events") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Event"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Event"]').fadeIn();
    } 
    if (getURLParameter("category") === "on-demand") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="On-Demand"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="On-Demand"]').fadeIn();
    } 
    if (getURLParameter("category") === "announcements") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Announcements"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Announcements"]').fadeIn();
    } 
    if (getURLParameter("category") === "perspectives") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Perspectives"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Perspectives"]').fadeIn();
    } 
  }

  render() {
    const {
      page: { title, subline, allResources }
    } = this.props.jobResult;
    const { allResourceVisible } = this.state;
    
    return (
      <Page>
        <Helmet
          title="Resources - Aera Technology"
          meta={[
            { name: "description", content: `${subline}` },
            { property: "og:description", content: `${subline}` },
            { name: "twitter:description", content: `${subline}` }
          ]}
        />

        <Intro title={title} text={subline} />

        <div className={s.news__filterWrapper}>
          <div className={s.news__filterType} id="typeSelector">
            <a
              href="javascript:;"
              type="show-all"
              style={{ borderBottom: "1px solid #00578f" }}
            >
              ALL TYPES
            </a>
            <a href="javascript:;" type="Video">
              VIDEOS
            </a>
            <a href="javascript:;" type="Announcements">
              Announcements
            </a>
            <a href="javascript:;" type="Perspectives">
              Perspectives
            </a>
            {/* <a href="javascript:;" type="News">
              NEWS
            </a> */}

            <a href="javascript:;" type="Whitepaper">
              WHITEPAPERS
            </a>

            {/* <a href="javascript:;" type="Event">
              EVENTS
            </a> */}
            
            <a href="javascript:;" type="On-Demand">
              ON-DEMAND
            </a>

            {/* <a href="javascript:;" type="Thought Leadership">
              THOUGHT LEADERSHIP
            </a>
            <a href="javascript:;" type="Webinar">
              WEBINARS
            </a> */}
            {/*<a href="javascript:;" type="Testimonial">
              TESTIMONIALS
            </a>
            <a href="javascript:;" type="Collateral">
              COLLATERALS
            </a> */}
          </div>
        </div>

        <AllResources
        // hasMore={allResources && allResourceVisible < allResources.length}
        // onMoreClick={() => {
        //   this.setState({
        //     allResourceVisible: allResourceVisible + 10
        //   });
        // }}
        >
          {allResources &&
            allResources
              .slice(0, allResourceVisible)
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
                  video,
                  city
                }) => (
                  <ResourceItem
                    key={id}
                    date={date}
                    image={image && image.file && image.file.url}
                    logo={
                      logo &&
                      logo.file && {
                        url: logo.file.url,
                        width: logo.file.details.image.width,
                        height: logo.file.details.image.height
                      }
                    }
                    title={articleTitle.substring(0, 130)}
                    excerpt={
                      text.substring(0, 150) + "..." ||
                      lead.substring(0, 250) + "..."
                    }
                    link={link}
                    slug={slug}
                    video={video}
                    type={type}
                    city={city}
                  />
                )
              )}
        </AllResources>
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: async ({ contentful }) => {
    const [page, featuredVideo, topStories] = await Promise.all([
      contentful.fetchSingleByContentType("resourcesNew"),
      contentful.fetchByContentType("featuredVideo"),
      contentful.fetchByContentType("topStories")
    ]);

    return {
      page,
      featuredVideo,
      topStories
    };
  },
  LoadingComponent: Loading
})(Resourcesnew);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
