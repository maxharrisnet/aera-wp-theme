import React, { Component } from "react";
import Helmet from "react-helmet";
import Intro from "components/intro";
import Page from "components/page";

export default class Thankyou extends Component {
  render() {
    return (
      <Page>
        <Helmet title="Thank You" />

        <Intro
          title="Thanks for your interest in Aera!"
          text="We will be in touch shortly."
        />
      </Page>
    );
  }
}
