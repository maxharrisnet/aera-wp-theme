import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import IntroCareers, { Loading } from "components/intro-careers";
import ColumnContent, { ColumnContentItem } from "components/column-content";

import ImageOffice from "assets/images/careers/office.jpg";
import ImageVideo from "assets/images/careers/gallery-video.jpg";
import ImageGallery1 from "assets/images/careers/gallery-image1.jpg";
import ImageGallery2 from "assets/images/careers/gallery-image2.jpg";
import ImageGallery3 from "assets/images/careers/gallery-image3.jpg";

import ImageBlock from "components/image-block";
import Culture from "./components/culture";
import Gallery from "./components/gallery";
// import Banner from "./components/banner";
import OverviewRoles from "./OverviewRoles";
// import Roles, { RolesItem } from './components/roles';

class Overview extends Component {
  static propTypes = {
    jobResult: PropTypes.object,
    location: PropTypes.object
  };

  state = {
    jobListing: []
  };

  componentDidMount() {
    setTimeout(() => {
      const { hash } = this.props.location;
      const el = document.getElementById(hash.substr(1));

      if (el) {
        window.scrollTo(0, el.offsetTop);
      }
    }, 100);
  }

  render() {
    const { title, subline /* , jobs*/ } = this.props.jobResult;

    return (
      <Page>
        <Helmet
          title="Careers at Aera"
          meta={[
            {
              name: "description",
              content:
                "Grow your career by joining leaders, innovators, and technology pioneers at Aera Technology"
            },
            {
              property: "og:description",
              content:
                "Grow your career by joining leaders, innovators, and technology pioneers at Aera Technology"
            },
            {
              name: "twitter:description",
              content:
                "Grow your career by joining leaders, innovators, and technology pioneers at Aera Technology"
            },
            { property: "og:image", content: "/favicons/aera-share.jpg" },
            { name: "twitter:image", content: "/favicons/aera-share.jpg" }
          ]}
          link = {[
            { rel : "canonical", href : "https://www.aeratechnology.com/careers" }
          ]}
        />
        {/* <Banner /> */}
        <IntroCareers title={title} text={subline} />

        <ImageBlock image={ImageOffice} />

        <Culture
          title="The big ideas behind our culture."
          // text="We're building a culture of opportunity alongside accountability.  We don't look
          //   to implement the standard playbook. We are driven to seek out better, more powerful
          //   ways of doing things each and every day. As we evolve the product, we constantly
          //   evolve and grow ourselves. So join us, and let’s build this together."
        />

        <ColumnContent>
          <ColumnContentItem title="Excellence">
            <p>
              {" "}
              We shoot for the best <br />
              We don't compromise
            </p>
          </ColumnContentItem>
          <ColumnContentItem title="Integrity">
            <p>
              We do the right thing
              <br />
              We take the high road
            </p>
          </ColumnContentItem>
          <ColumnContentItem title="Accountability">
            <p>
              We deliver what we promise
              <br />
              As individuals and as a team
            </p>
          </ColumnContentItem>
          <ColumnContentItem title="Speed">
            <p>
              We decide with data
              <br />
              We fail and succeed fast
            </p>
          </ColumnContentItem>
          <ColumnContentItem title="Disruption">
            <p>
              We take risks
              <br />
              We think on our feet
            </p>
          </ColumnContentItem>
          <ColumnContentItem title="Inclusion">
            <p>
              We proactively build a diverse
              <br />
              community. We advance together
            </p>
          </ColumnContentItem>
        </ColumnContent>

        <Gallery
          video={ImageVideo}
          image1={ImageGallery1}
          image2={ImageGallery2}
          image3={ImageGallery3}
        />

        <OverviewRoles />
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: ({ contentful }) => contentful.fetchSingleByContentType("pageCareers"),
  LoadingComponent: Loading
})(Overview);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
