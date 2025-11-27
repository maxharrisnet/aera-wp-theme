import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import Intro, { Loading } from "components/intro-events";

import AllResources, { ResourceItem } from "./components/allresources";

import s from "./components/allresources/News.scss";

class Eventsnew extends Component {
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
      console.log(a);
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
    
    if (getURLParameter("category") === "in-person-event") {
        $('[resource-class="resources"]').hide();
        //$("#" + $(this).attr("type")).hide();
        $("#typeSelector a").css("border-bottom", "1px solid transparent");
        $('[type="In-Person Event"]').css("border-bottom", "1px solid #00578f");
        $('[resource-type="In-Person Event"]').fadeIn();
    } 
    if (getURLParameter("category") === "webinar") {
      $('[resource-class="resources"]').hide();
      //$("#" + $(this).attr("type")).hide();
      $("#typeSelector a").css("border-bottom", "1px solid transparent");
      $('[type="Webinar"]').css("border-bottom", "1px solid #00578f");
      $('[resource-type="Webinar"]').fadeIn();
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
          title="Events - Aera Technology"
          meta={[
            { name: "description", content: `${subline}` },
            { property: "og:description", content: `${subline}` },
            { name: "twitter:description", content: `${subline}` },
            { property: "og:image", content: "/favicons/aera-share.jpg" },
            { name: "twitter:image", content: "/favicons/aera-share.jpg" }
          ]}
          link = {[
            { rel : "canonical", href : "https://www.aeratechnology.com/events" }
          ]}
        />

        <Intro title={title} text={subline} />

        {/* <div className={s.news__filterWrapper}>
          <div className={s.news__filterType} id="typeSelector">
            <a
              href="javascript:;"
              type="show-all"
              style={{ borderBottom: "1px solid #00578f" }}
            >
              ALL EVENTS
            </a>
            
            <a href="javascript:;" type="In-Person Event">
              IN-PERSON EVENTS
            </a>
            <a href="javascript:;" type="Webinar">
              WEBINARS
            </a>
          </div>
        </div> */}
        
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
                  ctaText

                }) => (
                  <ResourceItem
                    key={id}
                    date={date}
                    image={image && image.file && image.file.url}
                    logo={logo && logo.file && logo.file.url}
                    title={articleTitle.substring(0, 130) + (articleTitle.length > 130 ? "..." : "")}
                    excerpt={
                      text.substring(0, 300) + (text.length > 300 ? "..." : "") ||
                      lead.substring(0, 300) + (lead.length > 300 ? "..." : "")
                    }
                    link={link}
                    slug={slug}
                    video={video}
                    type={type}
                    city={city}
                    ctaText={ctaText}
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
    const [page] = await Promise.all([
      contentful.fetchSingleByContentType("eventNew")
    ]);

    return {
      page
    };
  },
  LoadingComponent: Loading
})(Eventsnew);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
