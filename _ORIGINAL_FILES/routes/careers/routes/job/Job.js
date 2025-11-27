import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';
import Button from 'components/button';
import Description from './components/description';
import Interested from './components/interested';
import AllOpenRoles from './components/all-open-roles';

const LoadingComponent = () => (
  <Description isLoading />
);

class Job extends Component {

  static propTypes = {
    jobResult: PropTypes.object,
  }

  render() {
    const { jobResult: {
      role,
      location,
      description,
      responsibilities,
      aboutYou,
      aboutUs,
      applyNow,
      // recruiter,
    } } = this.props;

    return (
      <div>
        <Helmet
          title={`${role} - ${location}`}
          meta={[
            { name: 'description', content: `${description}` },
            { property: 'og:description', content: `${description}` },
            { name: 'twitter:description', content: `${description}` },
          ]}
        />

        {(
          <div>
            <Description
              location={location}
              title={role}
              details={description}
              responsibilities={responsibilities}
              aboutYou={aboutYou}
              aboutUs={aboutUs}
            />

            <Interested
              title="Interested?"
              apply={
                <div>
                  <p>Send your application together with your CV as soon as possible. We will start
                  interviews when suitable applicants are found.</p>
                  <Button type="transparent" to={applyNow}>Apply here</Button>
                </div>
              }
            />
          </div>
        )}

        <AllOpenRoles>
          <Button to="/careers#open-roles" type="solid">All open roles</Button>
        </AllOpenRoles>
      </div>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful, match }) =>
    contentful.fetchSingleByContentType('job', { 'sys.id': match.params.id }),
  LoadingComponent,
})(Job);
const injectHOC = inject('contentful')(jobHOC);

export default injectHOC;
