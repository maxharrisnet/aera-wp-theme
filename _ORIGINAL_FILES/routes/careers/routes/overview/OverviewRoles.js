import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Roles, { RolesItem } from "./components/roles";

class OverviewRoles extends Component {
  static propTypes = {
    jobResult: PropTypes.array
  };

  state = {
    teamFilter: "All teams",
    locationFilter: "All locations"
  };

  handleTeamChange = teamFilter => {
    this.setState({ teamFilter });
  };

  handleLocationChange = locationFilter => {
    this.setState({ locationFilter });
  };

  render() {
    const { jobResult } = this.props;
    
    const { teamFilter, locationFilter } = this.state;

    const locations = [];
    const teams = [];
    jobResult.forEach(({ categories: { location, team } }) => {
      if (!locations.includes(location)) {
        locations.push(location);
        locations.sort();
      }
      if (!teams.includes(team)) {
        teams.push(team);
      }
    });

    let country = [];

    locations.map(item => {
      let itemArray = item.split(",");
      itemArray = itemArray.map(innerItem => innerItem.trim());
      country.push(itemArray[itemArray.length - 1]);
    });

    let ContryObject = country.reduce((obj, v) => {
      obj[v] = [];
      return obj;
    }, {});

    locations.map(item => {
      let itemArray = item.split(",");
      itemArray = itemArray.map(innerItem => innerItem.trim());
      let cityLocation = itemArray.splice(0, itemArray.length - 1);
      ContryObject[itemArray[itemArray.length - 1]].push(
        cityLocation.join(", ")
      );
    });

    let jobsFiltered = jobResult;
    if (teamFilter !== "All teams") {
      jobsFiltered = jobsFiltered.filter(
        job => job.categories.team === teamFilter
      );
    }

    if (Array.isArray(locationFilter)) {
      jobsFiltered = locationFilter.map((item, index) => {
        return jobsFiltered.filter(x => {
          return x.categories.location === locationFilter[index];
        });
      });
      jobsFiltered = jobsFiltered.flat();
    } else if (locationFilter !== "All locations") {
      jobsFiltered = jobsFiltered.filter(
        job => job.categories.location === locationFilter
      );
    }
    return (
      <Roles
        title="Open Roles."
        text="Headquartered in Mountain View, California, Aera is growing fast. We’re building
          teams in San Francisco and Mountain View (California), Bucharest and
          Cluj-Napoca (Romania), Paris (France), Munich (Germany), London (UK), and Pune (India).
          We offer comprehensive healthcare plans, stock option grants, challenging work and the
          opportunity for professional growth."
          boldtext="All official opportunities for Aera Technology careers will come from @aeratechnology.com email.  Please report any suspicious emails or other communications to security@aeratechnology.com"
        teams={teams}
        locations={ContryObject}
        onTeamChange={this.handleTeamChange}
        onLocationChange={this.handleLocationChange}
      >
        {jobsFiltered.map(job => (
          <RolesItem
            key={`${job.id}-${teamFilter + locationFilter}`}
            name={job.text}
            team={job.categories.team}
            commitment={job.categories.commitment}
            location={job.categories.location}
            applyUrl={job.hostedUrl}
          />
        ))}
      </Roles>
    );
  }
}

const Loading = () => <div>Loading</div>;

const jobHOC = withJob({
  work: ({ lever }) => lever.fetchJobs(),
  LoadingComponent: Loading
})(OverviewRoles);
const injectHOC = inject("lever")(jobHOC);

export default injectHOC;
