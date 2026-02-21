/* eslint-disable no-underscore-dangle */

import { Component } from 'react';
import PropTypes from 'prop-types';

export default class HubspotTracker extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.trackPageView();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.trackPageView();
    }
  }

  trackPageView() {
    if (!('_hsq' in window)) {
      return;
    }

    window._hsq.push(['setPath', this.props.location.pathname]);
    window._hsq.push(['trackPageView']);
  }

  render() {
    return null;
  }
}
