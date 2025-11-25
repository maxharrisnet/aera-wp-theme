import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "styles/fonts.css";
import "./AppLayout.scss";

export default class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return <Fragment>{children}</Fragment>;
  }
}
