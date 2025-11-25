import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import $ from "jquery";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import Intro, { Loading } from "components/intro";
import { Link } from "react-router-dom";
import AllResources, { ResourceItem } from "./components/allresources";

import s from "./components/allresources/News.scss";

class ResourcesNewTiles extends Component {
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
    if (getURLParameter("category") === "aerahub") {
      $('[resource-class="resources"]').hide();
      //$("#" + $(this).attr("type")).hide();
      $("#typeSelector a").css("border-bottom", "1px solid transparent");
      $('[type="AeraHub"]').css("border-bottom", "1px solid #00578f");
      $('[resource-type="AeraHub"]').fadeIn();
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
    if (getURLParameter("category") === "case-studies") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Case Study"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Case Study"]').fadeIn();
    } 
    if (getURLParameter("category") === "podcasts") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Podcast"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Podcast"]').fadeIn();
    } 
    if (getURLParameter("category") === "announcements") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Announcements"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Announcements"]').fadeIn();
    } 
    if (getURLParameter("category") === "blogs") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Blogs"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Blogs"]').fadeIn();
    } 
    if (getURLParameter("category") === "perspectives") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Perspectives"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Perspectives"]').fadeIn();
    } 
    if (getURLParameter("category") === "press-release") {
      $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="Press Release"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="Press Release"]').fadeIn();
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
            { name: "description", content: "Resources" },
            { property: "og:description", content: "Resources" },
            { name: "twitter:description", content: "Resources" },
            { property: "og:image", content: "/favicons/aera-share.jpg" },
            { name: "twitter:image", content: "/favicons/aera-share.jpg" }
          ]}
          link = {[
            { rel : "canonical", href : "https://www.aeratechnology.com/resources"  }
          ]}
        />

        {/* <Intro title={title} text={subline} /> */}

        <div className={s.news__filterWrapper}>
          <div className={s.news__filterType} id="typeSelector">
            <a
              href="javascript:;"
              type="show-all"
              style={{ borderBottom: "1px solid #00578f" }}
            >
              ALL TYPES
            </a>
            
            {/* <a href="javascript:;" type="News">
              NEWS
            </a> */}
            <a href="javascript:;" type="News">
              NEWS
            </a>
            <a href="javascript:;" type="Press Release">
              PRESS RELEASES
            </a>
            <a href="javascript:;" type="Video">
              VIDEOS
            </a>
            {/* <a href="javascript:;" type="AeraHub">
              AERAHUB
            </a> */}
            {/* <a href="javascript:;" type="Perspectives">
              PERSPECTIVES
            </a> */}
            <a href="javascript:;" type="Whitepaper">
              WHITEPAPERS
            </a>

            {/* <a href="javascript:;" type="Event">
              EVENTS
            </a> */}
            {/* <a href="javascript:;" type="On-Demand">
              ON-DEMAND
            </a> */}

            <a href="javascript:;" type="Blogs">
              BLOGS
            </a>
            <a href="javascript:;" type="Case Study">
              CASE STUDIES
            </a>
            <a href="javascript:;" type="Podcast">
              PODCASTS
            </a>
            {/* <a href="javascript:;" type="Case Study">
              CASE STUDIES
            </a> */}
            {/* <Link to="/aera-community">AERA COMMUNITY
            </Link> */}
          </div>
        </div>

        

        <AllResources>
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
                  city,
                  formOrVideo,
                  //companyType,
                  icon,
                  //businessProblem,
                  employees,
                  revenue,
                  businessStatement
                }) => (
                  <ResourceItem
                    key={id}
                    date={date}
                    image={image && image.file && image.file.url}
                    logo={logo && logo.file && logo.file.url}
                    title={articleTitle.substring(0, 130) + (articleTitle.length > 130 ? "..." : "")}
                    //businessProblem={businessProblem.substring(250, 0)}
                    excerpt={
                      text.substring(0, 140) + (text.length > 140 ? "..." : "")
                      //lead.substring(0, 140) + (lead.length > 140 ? "..." : "") 
                      //businessStatement.substring(0, 250) + (businessStatement.length > 250 ? "..." : "")
                    }
                    businessStatement={businessStatement}
                    link={link}
                    slug={slug}
                    video={video}
                    type={type}
                    city={city}
                    formOrVideo={formOrVideo}
                   // companyType={companyType}
                    icon={icon && icon.file && icon.file.url}
                    //businessProblem={problem.substring(0, 250) + (problem.length > 250 ? "..." : "")}
                    
                    employees={employees}
                    revenue={revenue}
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
    const [page, caseStudies] = await Promise.all([
      contentful.fetchSingleByContentType("resourcesNew"),
      //contentful.fetchByContentType("caseStudies")
    ]);

    return {
      page,
      //caseStudies
    };
  },
  LoadingComponent: Loading
})(ResourcesNewTiles);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
