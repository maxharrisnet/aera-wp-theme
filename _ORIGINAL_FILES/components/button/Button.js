import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import s from "./Button.scss";

/**
 * Button Component
 * feel free to modify to fit the project.
 */
export default class Button extends Component {
  static propTypes = {
    to: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.oneOf([
      "default",
      "teal",
      "sky-blue",
      "blue",
      "lilac",
      "solid",
      "transparent",
      "submit"
    ]),
    mobileFull: PropTypes.bool
  };

  static defaultProps = {
    type: "default"
  };

  render() {
    const {
      to,
      children,
      className,
      disabled,
      type,
      mobileFull,
      ...rest
    } = this.props;

    // Some flags
    const isLink = typeof to !== "undefined";
    const isExternal = isLink && /^((https?:)?\/\/|[0-9a-zA-Z]+:)/.test(to);

    // Extend className of the rest
    rest.className = s("button", className, `button--${type}`, {
      "button--disabled": disabled,
      "button--mobileFull": mobileFull
    });

    rest.disabled = disabled;

    if (isExternal) {
      // http, https, //, mailto, etc.
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      );
    }

    if (isLink) {
      // Everything else
      return (
        <Link to={to} {...rest}>
          {children}
        </Link>
      );
    }

    // Default
    return <button {...rest}>{children}</button>;
  }
}
