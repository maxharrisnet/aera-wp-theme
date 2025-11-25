import React, { Component } from "react";
import PropTypes from "prop-types";

import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Loading from "components/intro";

import News, { NewsItem } from "./components/news";

class RecentCommunity extends Component {
  static propTypes = {
    jobResult: PropTypes.object
  };

  state = {
    newsVisible: 5
  };

  render() {
    const { communityCard: inTheNews } = this.props.jobResult;
    const communityCard = this.props.jobResult;
    const { newsVisible } = this.state;

    return (
      <News>
        {inTheNews &&
          inTheNews
            .slice(0, newsVisible)
            .map(({ id, title: newsTitle, link, author, image }) => (
              <NewsItem key={id} title={newsTitle} link={link} author={author} image={image && image.file && image.file.url} />
            ))}
      </News>
    );
  }
}

const jobHOC = withJob({
  work: async ({ contentful }) => {
    const [communityCard] = await Promise.all([
      //contentful.fetchSingleByContentType("pageNewsroom"),
      contentful.fetchByContentType("communityCard", { order: "-fields.date" })
    ]);

    return { communityCard };
  },
  LoadingComponent: Loading
})(RecentCommunity);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
