import React, { Component } from "react";
import Helmet from "react-helmet";
import Intro from "components/intro";
import Page from "components/page";
import RequestDemo from "./components/request-demo";

export default class Demo extends Component {
  render() {
    return (
      <Page>
        <Helmet
          title="Aera Technology - Meet Aera - Request a Demo"
          meta={[
            {
              name: "description",
              content:
                "Request to Meet Aera. Request a demo or to have one of our client partners contact you today about our cognitive automation software."
            },
            {
              property: "og:description",
              content:
                "Request to Meet Aera. Request a demo or to have one of our client partners contact you today about our cognitive automation software."
            },
            {
              name: "twitter:description",
              content:
                "Request to Meet Aera. Request a demo or to have one of our client partners contact you today about our cognitive automation software."
            }
          ]}
        />

        <Intro
          title="Meet Aera."
          text="Decision Intelligence is here. With Aera, turn your data into better decisions and actions across your business. Fill out the form and we will be in touch shortly."
        />

        <RequestDemo />
      </Page>
    );
  }
}
