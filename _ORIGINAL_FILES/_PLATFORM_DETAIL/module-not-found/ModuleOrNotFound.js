import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";
import _isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import Page from "components/page";
import Request from "components/request";
import ModuleTemplatePage from "components/module-template-page";
//import Loading from "components/loading";
import Intro, { Loading } from "components/intro-platform-detail-page";
import PlatformDetailSidebar from "components/platform-detail-sidebar";
import ModuleNotFound from "./ModuleNotFound";
import s from "./ModuleOrNotFound.scss";
import $ from "jquery";
import leftArrow from "assets/images/technology/icons/leftArrow.png";
import rightArrow from "assets/images/technology/icons/rightArrow.png";


class ModuleOrNotFound extends Component {
  static propTypes = {
    jobResult: PropTypes.object,
    staticContext: PropTypes.shape({
      status: PropTypes.number
    })
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    $(function() {
      $('#horizon-prev').on('click', function(event) {
        event.preventDefault();
        $('#navbar').animate({
          scrollLeft: "-=775px"
        }, "slow");
      });
    
       $('#horizon-next').on('click', function(event) {
        event.preventDefault();
        $('#navbar').animate({
         scrollLeft: "+=775px"
        }, "slow");
      });
      
      

    });
  }

  handleScroll = () => {
      
      var scroll = $(window).scrollTop();
      var footerPosition = $("footer").offset().top;
      var screenHeight = $(window).height();

      if (scroll >= (footerPosition - screenHeight) ){
        $('#navbarWrapper').removeClass(s.scroll);
        $('#navbarWrapper').addClass(s.absolute);
      }
      else{
        $('#navbarWrapper').addClass(s.scroll);
        $('#navbarWrapper').removeClass(s.absolute);
      }
  };

  render() {
    const { jobResult, staticContext } = this.props;

    if (_isEmpty(jobResult)) {
      return <ModuleNotFound staticContext={staticContext} />;
    }

    const {
      
      title,
      description,
      bodyCopy,
      benefits,
      features,
      featuredImage,
      content,
      slug,
      metaTitle,
      metaDescription,
      schemaArticle
    } = jobResult;

    return (
      <Page>
        <Helmet
          title={metaTitle}
          meta={[
            {
              name: "description",
              content: [metaDescription]
            },
            {
              property: "og:description",
              content: [metaDescription]
            },
            {
              name: "twitter:description",
              content: [metaDescription]
            },
            { property: "og:image", content: "/favicons/aera-share.jpg" },
            { name: "twitter:image", content: "/favicons/aera-share.jpg" }
          ]}
          script={[
            {
              type: "application/ld+json",
              innerHTML: schemaArticle
            }
          ]}
          link = {[
            { rel : "canonical", href : "https://www.aeratechnology.com/" + [slug]  }
          ]}
        />
        <Intro title={title} text={description}/>
        <div className={s.platformnew} id="platform">
          {/* <div className={s.platformnew__relative} id="navbarWrapper">
            <div className={s.platformnew__controls} id="controls">
              <div className={s.platformnew__controlsLeft} id="horizon-prev"><img src={leftArrow} /></div>
              <div className={s.platformnew__controlsRight} id="horizon-next"><img src={rightArrow} /></div>
            </div>
            <div className={s.platformnew__left} id="navbar">
            
              <PlatformDetailSidebar />
            </div>
          </div> */}
            <div className={s.platformnew__wrapper}>
                <div className={s.platformnew__right}>
                  <ModuleTemplatePage
                    featuredImage={featuredImage}
                    bodyCopy={bodyCopy}
                    benefits={benefits}
                    features={features}
                    slug={slug}
                  >
                  
                    {content}
                  </ModuleTemplatePage>
                </div> 
                <div className={s.platformnew__clearfix}></div> 
              </div>
              <div className={s.platformnew__clearfix}></div>
        </div>
        <Request title="See Aera in action." text="Request for Demo" link="/demo" />
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful, match }) =>
    
    contentful.fetchSingleByContentType("moduleTemplatePage", {
      "fields.slug": match.url.substr(1)
    }),

  LoadingComponent: Loading
})(ModuleOrNotFound);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
