import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Page from "components/page";
import CommunityNotFound from "./components/community-not-found";

export default class CommunityNotFoundRoute extends Component {
  static propTypes = {
    staticContext: PropTypes.shape({
      status: PropTypes.number
    })
  };

  componentWillMount() {
    const { staticContext } = this.props;

    if (staticContext) {
      staticContext.status = 404;
    }

    if (typeof window !== "undefined") {
      document.body.classList.toggle("is404", true);
    }
  }

  render() {
    return (
      <Page>
        <Helmet title="404 Not Found" />

        <CommunityNotFound
          title="Page not found."
          subline="It is possible that the page has moved or changed or
            may no longer be available. Please check the page address and try again."
        />
      </Page>
    );
  }
}
