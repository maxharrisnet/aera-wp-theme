import React, { Component } from "react";
import { withRouter } from "react-router";

import PropTypes from "prop-types";

import config from "utils/config";

import HubspotForm from "components/hubspot-form";

import s from "./RequestDemo.scss";

import $ from "jquery";

const hubspotDemoFormId = config("hubspotDemoFormId");

class RequestDemo extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    formSent: false
  };
  componentDidMount() {
      $('#leadsource').parent().hide();
  }

  onSent = () => {
    this.setState({
      formSent: true
    });
    ga("send", {
      // eslint-disable-line
      hitType: "event",
      eventCategory: "Demo Form",
      eventAction: "Submitted",
      eventLabel: "Form Submitted"
    });

    var img = document.createElement('img'); 
    img.src = '//20836913p.rfihub.com/ca.gif?rb=45324&ca=20836913&ra=REPLACE_ME_WITH_YOUR_CACHE_BUSTING&_o=45324&_t=20836913'; 
    img.height = '0'
    img.width = '0'
    img.style = 'display:none'
    img.alt = 'DSP'
	  document.body.appendChild(img);

    //setTimeout(() => this.props.history.push("/thankyou"), 5000);
    this.props.history.push("/thankyou");
  };

  render() {
    const { formSent } = this.state;

    return (
      <div className={s.requestDemo}>
        <div className={s.requestDemo__container}>
          {formSent && (
            <div className={s.requestDemo__thanks}>
              <h1 className={s.requestDemo__title}>
                Thanks for your interest in Aera!
              </h1>
              <p className={s.requestDemo__subline}>
                We will be in touch shortly.
              </p>
            </div>
          )}

          {!formSent && (
            <HubspotForm formId={hubspotDemoFormId} onSent={this.onSent} />
          )}
          
        </div>
      </div>
    );
  }
}

export default withRouter(RequestDemo);
