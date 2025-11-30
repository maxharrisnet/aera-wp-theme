import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import config from "utils/config";

import HubspotForm from "components/hubspot-form";

import s from "./MakeContact.scss";

const hubspotContactFormId = config("hubspotContactFormId");

class MakeContact extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    formSent: false
  };

  onSent = () => {
    this.setState({
      formSent: true
    });
    ga("send", {
      // eslint-disable-line
      hitType: "event",
      eventCategory: "Contact Form",
      eventAction: "Submitted",
      eventLabel: "Form Submitted"
    });

    this.props.history.push("/thankyou");
  };

  render() {
    const { formSent } = this.state;

    return (
      <div className={s.makeContact}>
        <div className={s.makeContact__container}>
          {formSent && (
            <div className={s.makeContact__thanks}>
              <h1 className={s.makeContact__title}>
                Thanks for contacting Aera!
              </h1>
              <p className={s.makeContact__subline}>
                We will be in touch shortly.
              </p>
            </div>
          )}

          {!formSent && (
            <HubspotForm formId={hubspotContactFormId} onSent={this.onSent} />
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(MakeContact);
