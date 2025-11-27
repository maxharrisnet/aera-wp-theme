import React, { Component } from "react";
import Helmet from "react-helmet";

import Page from "components/page";
import Intro from "components/intro";
import MakeContact from "./components/make-contact";

export default class Demo extends Component {
  render() {
    return (
      <Page>
        <Helmet title="Aera Technology - Contact Us - Learn more about Aera" />

        <Intro
          title="Contact us."
          // text="The Self-Driving Enterprise™ is here. Fill out the form and we will be in touch shortly."
          text="The new era of decision making is here.  Fill out the form below and we will be in touch shortly."
        />

        <MakeContact />
      </Page>
    );
  }
}
