import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";
import _isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import Page from "components/page";
import Request from "components/request";
import NewSkillsTemplatePage from "components/newskills-template-page";
//import Loading from "components/loading";
import Intro, { Loading } from "components/intro-newskills-detail-page";
import PlatformDetailSidebar from "components/platform-detail-sidebar";
import NewSkillsNotFound from "./NewSkillsNotFound";
import s from "./NewSkillsOrNotFound.scss";
import $ from "jquery";
import leftArrow from "assets/images/technology/icons/leftArrow.png";
import rightArrow from "assets/images/technology/icons/rightArrow.png";


class NewSkillsOrNotFound extends Component {
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
      return <NewSkillsNotFound staticContext={staticContext} />;
    }

    const {
      
      title,
      description,
      tagline,
      bodyCopy,
      benefitsImage,
      featuredSkills,
      benefits,
      features,
      keyDecisionNeeded,
      howAeraHelps,
      featuredImage,
      content,
      slug,
      metaTitle,
      featuredNewSkills,
      relatedSkills,
      metaDescription,
      schemaArticle,
      relatedResources,
      benefitsTextAndImage,
      neededDecisionsAndAeraHelpsMobile,
      demoVideoForm,
      yesIfFormPresent
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
        />
        <Intro title={title} tagline={tagline} text={description}/>
        <NewSkillsTemplatePage
                    title={title}
                    benefitsImage={benefitsImage}
                    featuredSkills={featuredSkills}
                    featuredImage={featuredImage}
                    bodyCopy={bodyCopy}
                    benefits={benefits}
                    features={features}
                    slug={slug}
                    keyDecisionNeeded={keyDecisionNeeded}
                    howAeraHelps={howAeraHelps}
                    featuredNewSkills={featuredNewSkills}
                    relatedSkills={relatedSkills}
                    relatedResources={relatedResources}
                    benefitsTextAndImage={benefitsTextAndImage}
                    neededDecisionsAndAeraHelpsMobile={neededDecisionsAndAeraHelpsMobile}
                    demoVideoForm={demoVideoForm}
                    
                  >
        </NewSkillsTemplatePage>
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful, match }) =>
    
    contentful.fetchSingleByContentType("newSkillsTemplatePage", {
      "fields.slug": match.url.substr(1)
    }),

  LoadingComponent: Loading
})(NewSkillsOrNotFound);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
