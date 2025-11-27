import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import Select from "components/select";

import s from "./Roles.scss";

export default class Roles extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    teams: PropTypes.array,
    locations: PropTypes.any,
    onTeamChange: PropTypes.func,
    onLocationChange: PropTypes.func,
    children: PropTypes.node
  };

  t = new TimelineLite();

  state = {
    country: ""
  };

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  onCountrySelect = item => {
    if (item === "All countries") {
      this.props.onLocationChange("All locations");
      this.setState({ country: "" });
    } else {
      let countryLocation = this.props.locations[item];
      countryLocation = countryLocation.map(element => `${element}, ${item}`);
      this.props.onLocationChange(countryLocation);
      this.setState({ country: item });
    }
  };

  onLocationChangeFromRoles = item => {
    if (item === "All cities") {
      this.onCountrySelect(this.state.country);
    } else {
      let filterLocation = `${item}, ${this.state.country}`;
      this.props.onLocationChange(filterLocation);
    }
  };

  render() {
    const {
      title,
      boldtext,
      text,
      teams,
      locations,
      onTeamChange,
      children
    } = this.props;

    const country = Object.keys(locations);

    return (
      <WaypointEnter onEnter={this.animate}>
        <div id="open-roles" className={s.roles}>
          <div className={s.roles__container}>
            <div ref={c => (this.el = c)} className={s.roles__content}>
              <div className={s.roles__contentCol}>
                <h2 className={s.roles__title}>{title}</h2>
                
                <p className={s.roles__text}>{text}</p>
                <p className={s.roles__boldtext}><strong>{boldtext}</strong></p>
                <form className={s.roles__filter}>
                  <div className={s.roles__filterItem}>
                    <Select
                      label="Role"
                      id="filter-role"
                      defaultValue="All teams"
                      options={["All teams", ...teams.sort()].map(team => ({
                        name: team,
                        value: team
                      }))}
                      onChange={onTeamChange}
                    />
                  </div>
                  <div className={s.roles__filterItem}>
                    <Select
                      label="Country"
                      id="filter-countries"
                      defaultValue="All countries"
                      options={["All countries", ...country].map(location => ({
                        name: location,
                        value: location
                      }))}
                      onChange={this.onCountrySelect}
                    />
                  </div>
                  {this.state.country ? (
                    <div className={s.roles__filterItem}>
                      <Select
                        label="City"
                        id="filter-cities"
                        defaultValue="All cities"
                        options={[
                          "All cities",
                          ...locations[this.state.country]
                        ].map(location => ({
                          name: location,
                          value: location
                        }))}
                        onChange={this.onLocationChangeFromRoles}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </form>
              </div>
            </div>

            {children.length !== 0 && (
              <Fragment>
                <div className={s.roles__row}>
                  <div className={s.roles__col}>Role</div>
                  <div className={s.roles__col}>Location</div>
                </div>

                <ul className={s.roles__list}>{children}</ul>
              </Fragment>
            )}

            {children.length === 0 && (
              <div className={s.roles__noMatch}>
                <p className={s.roles__noMatchContent}>
                  No job postings match these filters
                </p>
              </div>
            )}
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
