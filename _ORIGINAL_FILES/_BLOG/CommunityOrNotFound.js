import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";
import _isEmpty from "lodash/isEmpty";
import Helmet from "react-helmet";
import Page from "components/page";
import Request from "components/request";
import CommunityTemplatePage from "components/community-template-page";
import Loading from "components/loading";
//import Share from "components/share";
import RecentCommunity from "components/recent-community";
import CommunityNotFound from "./CommunityNotFound";
import s from "./CommunityOrNotFound.scss";
import ShareCommunity from "../../components/share-community";
import CommunityAuthor from "../../components/community-author";
import { property } from "lodash";

class CommunityOrNotFound extends Component {
  static propTypes = {
    jobResult: PropTypes.object,
    staticContext: PropTypes.shape({
      status: PropTypes.number
    })
  };

  render() {
    const { jobResult, staticContext } = this.props;

    if (_isEmpty(jobResult)) {
      return <CommunityNotFound staticContext={staticContext} />;
    }

    const {
      date,
      title,
      lead,
      publisher2,
      publisher3,
      image,
      authorPhoto,
      authorPhoto2,
      authorPhoto3,
      content,
      author,
      author2,
      author3,
      articleUrl,
      metaTitle,
      metaDescription,
      schemaArticle,
      ogImageUrl
    } = jobResult;

    
    return (
      <Page>
        <Helmet
          title={"Aera Technology - " + metaTitle}
          meta={[
            {
              property: "og:title",
              content: [title]
            },
            {
              name: "description",
              content: [metaDescription]
            },
            {
              property: "og:description",
              content: [metaDescription]
            },
            {
              property: "twitter:description",
              content: [metaDescription]
            },
            {
              property: "twitter:image",
              content: [ogImageUrl]
            },
            {
              property: "og:image",
              content: [ogImageUrl]
            },
            {
              property: "og:url",
              content: [articleUrl]
            },
          ]}
          script={[
            {
              type: "application/ld+json",
              innerHTML: schemaArticle
            }
          ]}
          link = {[
            { rel : "canonical", href : [articleUrl]  }
          ]}
          
          // <meta property="og:title" content="title" />
          // <meta property="og:type" content="website">
          // <meta property="og:description" content="Content description" />
          // <meta property="og:image" content="image you want to show here" />
          // <meta property="og:url" content="url " />
        />
        <div className={s.article}>
          <div>
            <div className={s.article__row}>
              <div className={s.article__left}>
                <CommunityTemplatePage
                  date={date}
                  title={title}
                  articleUrl={articleUrl}
                  image={image}
                >
                  {content}
                </CommunityTemplatePage>
              </div>

              <div className={s.article__right}>
                
                
                <CommunityAuthor 
                  author={author}
                  lead={lead}
                  authorPhoto={authorPhoto}
                  author2={author2}
                  publisher2={publisher2}
                  authorPhoto2={authorPhoto2}
                  author3={author3}
                  publisher3={publisher3}
                  authorPhoto3={authorPhoto3}
                />
                <ShareCommunity />
                <RecentCommunity />
              </div>
            </div>
          </div>
        </div>
        <Request title="See Aera in action." text="Schedule Demo" link="/demo" />
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful, match }) =>
    contentful.fetchSingleByContentType("communityTemplatePage", {
      "fields.slug": match.url.substr(1)
    }),

  LoadingComponent: Loading
})(CommunityOrNotFound);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
