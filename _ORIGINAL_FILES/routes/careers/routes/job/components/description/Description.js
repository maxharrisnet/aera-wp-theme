import React, { Component } from "react";
import PropTypes from "prop-types";
import _camelCase from "lodash/camelCase";
import ReactMarkdown from "react-markdown";

import MarkerSvg from "assets/images/company/offices-marker.svg";

import LoadingText from "components/loading-text";

import s from "./Description.scss";

export default class Description extends Component {
  static propTypes = {
    title: PropTypes.string,
    details: PropTypes.string,
    location: PropTypes.string,
    responsibilities: PropTypes.node,
    aboutYou: PropTypes.node,
    aboutUs: PropTypes.node,
    isLoading: PropTypes.bool
  };

  render() {
    const {
      title,
      details,
      location,
      responsibilities,
      aboutYou,
      aboutUs,
      isLoading
    } = this.props;

    return (
      <div className={s(s.description, { isLoading })}>
        <div className={s.description__container}>
          <div className={s.description__row}>
            <div className={s.description__col}>
              <h1 className={s.description__title}>
                {title || <LoadingText />}
              </h1>
            </div>
          </div>

          <div className={s.description__row}>
            <div className={s.description__col}>
              <p className={s.description__details}>
                {details || <LoadingText block lines={5} />}
              </p>
            </div>
            <div className={s.description__col}>
              <div className={s.description__location}>
                <div
                  className={s(
                    "description__locationMap",
                    _camelCase(location)
                  )}
                />
                <span className={s.description__locationText}>
                  This role is based out of
                </span>
                <strong className={s.description__locationName}>
                  {([
                    "Mountain View",
                    "Mountain View or San Francisco",
                    "San Francisco",
                    "Portland",
                    "Eagan",
                    "Bucharest",
                    "Cluj-Napoca",
                    "Chicago",
                    "London",
                    "Chicago",
                    "Cluj-Napoca",
                    "Paris",
                    "Pune"
                  ].indexOf(location) !== -1 ||
                    isLoading) && (
                    <MarkerSvg className={s.description__locationMarker} />
                  )}
                  {location || <LoadingText />}
                </strong>
              </div>
            </div>
          </div>

          {(responsibilities || aboutYou || aboutUs) && (
            <div className={s.description__row}>
              <div className={s.description__col}>
                {responsibilities && (
                  <div className={s.description__list}>
                    <h2 className={s.description__subtitle}>
                      Responsibilities
                    </h2>
                    <ReactMarkdown source={responsibilities} />
                  </div>
                )}
              </div>
              <div className={s.description__col}>
                {aboutYou && (
                  <div className={s.description__list}>
                    <h2 className={s.description__subtitle}>About You</h2>
                    <ReactMarkdown source={aboutYou} />
                  </div>
                )}

                {aboutUs && (
                  <div className={s.description__list}>
                    <h2 className={s.description__subtitle}>About Us</h2>
                    <ReactMarkdown source={aboutUs} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
