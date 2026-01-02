import React, { Component } from "react";
import PropTypes from "prop-types";

import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Loading from "components/intro";

import News, { NewsItem } from "./components/news";

class RecentNews extends Component {
  static propTypes = {
    jobResult: PropTypes.object
  };

  state = {
    newsVisible: 5
  };

  render() {
    const { news: inTheNews } = this.props.jobResult;
    const { newsVisible } = this.state;

    return (
      <News>
        {inTheNews &&
          inTheNews
            .slice(0, newsVisible)
            .map(({ id, title: newsTitle, link }) => (
              <NewsItem key={id} title={newsTitle} link={link} />
            ))}
      </News>
    );
  }
}

const jobHOC = withJob({
  work: async ({ contentful }) => {
    const [news] = await Promise.all([
      //contentful.fetchSingleByContentType("pageNewsroom"),
      contentful.fetchByContentType("newsItem", { order: "-fields.date" })
    ]);

    return { news };
  },
  LoadingComponent: Loading
})(RecentNews);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
