import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";
import _isEmpty from "lodash/isEmpty";

import TemplatePage from "components/template-page";
import Loading from "components/loading";
import NotFound from "./NotFound";

class PageOrNotFound extends Component {
  static propTypes = {
    jobResult: PropTypes.object,
    staticContext: PropTypes.shape({
      status: PropTypes.number
    })
  };

  render() {
    const { jobResult, staticContext } = this.props;

    if (_isEmpty(jobResult)) {
      return <NotFound staticContext={staticContext} />;
    }

    const { date, title, lead, image, content, slug } = jobResult;

    return (
      <TemplatePage date={date} title={title} lead={lead} image={image} slug={slug}>
        {content}
      </TemplatePage>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful, match }) =>
    contentful.fetchSingleByContentType("templatePage", {
      "fields.slug": match.url.substr(1)
    }),
  LoadingComponent: Loading
})(PageOrNotFound);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
