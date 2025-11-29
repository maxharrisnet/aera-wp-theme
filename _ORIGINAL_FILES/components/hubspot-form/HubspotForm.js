/* eslint-disable react/no-array-index-key */

import React, { Component } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import Button from "components/button";
import { withJob } from "react-jobs";

import config from "utils/config";

import HubspotFormField from "./HugbspotFormField";


import s from "./HubspotForm.scss";

import $ from "jquery";

const hubspotPortalId = config("hubspotPortalId");

class HubspotForm extends Component {
  static propTypes = {
    jobResult: PropTypes.array,
    onSent: PropTypes.func,
    formId: PropTypes.string.isRequired
  };

  componentDidMount() {
    $('#leadsource').parent().hide();
    $('#leadsource').parents('div').css('margin-bottom', '0px')
    if($('#client_id').attr("name") == "client_id"){
      //console.log('hit');
      $('#client_id').attr('type','hidden');
      
    }
}


  static defaultProps = {
    jobResult: [],
    onSent: () => {}
  };

  state = {
    isLoading: false,
    isInvalid: false,
    formSent: false
  };

  onSubmit = e => {
    const { jobResult: fields, onSent } = this.props;
    const { method, action: url } = e.target;

    e.preventDefault();

    // bunch of uncontrolled inputs
    const getFieldValue = id => document.getElementById(id).value;

    const getCheckboxFieldValue = id => {
      const inputs = document
        .getElementById(id)
        .querySelectorAll(`input[name='${id}[]']`);

      const values = Array.from(inputs)
        .map(input => (input.checked ? input.value : null))
        .filter(Boolean)
        .join(";");

      return encodeURIComponent(values);
    };

    function mapHubspotFieldsToFormFields(hubspotField) {
      const { fieldType, name } = hubspotField;

      const value =
        fieldType === "checkbox"
          ? getCheckboxFieldValue(name)
          : getFieldValue(name);

      return {
        name,
        value
      };
    }

    this.setState({
      isLoading: true,
      isInvalid: false
    });

    function campaignId() {
      const meetAera = "7013l000000z1yRAAQ";
      const contactForm = "7013l000001Z7qzAAC";

      if (window.location.pathname == "/demo") {
        return meetAera;
      } else if (window.location.pathname == "/contact") {
        return contactForm;
      }
    }

    const data = {
      submittedAt: Date.now(),
      fields: fields.map(mapHubspotFieldsToFormFields),
      context: { sfdcCampaignId: campaignId() }
    };

    axios({ method, url, data })
      .then(() => {
        this.setState({
          isLoading: false
        });
        onSent();
      })
      .catch(err => {
        console.error("Error submitting form", err);
        const error =
          "There was an error submitting your data. Please try again.";
        this.setState({ error, isInvalid: true, isLoading: false });
      });
  };

  render() {
    const { jobResult: fields, formId } = this.props;
    const { isLoading, isInvalid, error } = this.state;

    const hubspotApiUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${formId}`;

    // group fields so selects and checkbox are always on their own
    const grouppedFields = fields.reduce(
      (prev, curr) => {
        const latest = prev[prev.length - 1];

        // selects and checkbox should be in their own group
        if (curr.fieldType === "select" || curr.fieldType === "checkbox") {
          if (latest.length > 0) {
            prev.push([curr]);
            prev.push([]); // create a new group for the following fields
          } else {
            latest.push(curr);
            prev.push([]);
          }
          // other fields go into the current group
        } else {
          latest.push(curr);
        }

        return prev;
      },
      [[]] // start with an empty group
    );

    let lastGroup = grouppedFields[grouppedFields.length - 1];

    if (lastGroup.length === 0) {
      grouppedFields.pop(); // remove trailing empty goup
      lastGroup = grouppedFields[grouppedFields.length - 1];
    }

    const submit = (
      <div className={s(s.hubspotForm__item, s.hubspotForm__itemRight)}>
        <Button type="submit" mobileFull id="formSubmit">
          Submit request
        </Button>
      </div>
    );

    // If we end with a single select in the last group, insert the submit there
    const insertSubmitLast =
      lastGroup &&
      lastGroup.length === 1 &&
      lastGroup[0].fieldType === "select";

    return (
      <form
        method="post"
        action={hubspotApiUrl}
        className={s("hubspotForm__container", { isLoading })}
        onSubmit={this.onSubmit}
      >
        {grouppedFields.map((group, i) => (
          <div className={s.hubspotForm__group} key={`group-${i}`}>
            {group.map((field, j) => (
              <HubspotFormField field={field} key={`${field.name}-${i}-${j}`} />
            ))}
            {i === grouppedFields.length - 1 && insertSubmitLast && submit}
          </div>
        ))}
        {isInvalid && <div className={s.hubspotForm__validation}>{error}</div>}
        {insertSubmitLast ? null : (
          <div className={s(s.hubspotForm__group, s.hubspotForm__groupActions)}>
            {submit}
          </div>
        )}
        <p className={s.hubspotForm__gdpr}>
          By clicking submit above, you consent to allow Aera Technology to
          store and process the personal information submitted above to provide
          you the content requested as well as future marketing materials. You
          can unsubscribe at any time.
        </p>
      </form>
    );
  }
}

async function getHubspotFields(formId) {
  const response = await axios.get(`/api/hubspot/fields/${formId}`);

  return response.data;
}

const hubspotFormWithJob = withJob({
  work: ({ formId }) => getHubspotFields(formId)
})(HubspotForm);

export default hubspotFormWithJob;
