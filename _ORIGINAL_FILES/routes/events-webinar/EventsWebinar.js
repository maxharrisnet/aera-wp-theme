import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import Intro, { Loading } from "components/intro";

import EventsNew, { EventsItemNew } from "./components/eventsInAera";
import Webinar, { WebinarItem } from "./components/webinar";

class EventsWebinar extends Component {
  static propTypes = {
    jobResult: PropTypes.object
  };

  state = {
    // articlesVisible: 2,
    // newsVisible: 2,
    webinarVisible: 3,
    eventsNewVisible: 6
  };

  render() {
    const { eventsNew, webinar } = this.props.jobResult;
    const { eventsNewVisible, webinarVisible } = this.state;

    return (
      <Page>
        <Helmet
          title="Aera Technology - Learn about Aera's webinars and events"
          meta={[
            {
              name: "description",
              content:
                "Join us for webinars live, and on-demand as well as live events"
            },
            {
              property: "og:description",
              content:
                "Join us for webinars live, and on-demand as well as live events"
            },
            {
              name: "twitter:description",
              content:
                "Join us for webinars live, and on-demand as well as live events"
            }
          ]}
        />

        <Intro title="Webinars &amp; Events" text="" />

        {webinar && (
          <Webinar
            title="Webinars"
            hasMore={webinar && webinarVisible < webinar.length}
            onMoreClick={() => {
              this.setState({
                webinarVisible: webinarVisible + 6
              });
            }}
            featured={
              webinar &&
              webinar
                .slice(0, webinarVisible)
                .map(
                  ({
                    id,
                    title: resourceTitle,
                    date,
                    endDate,
                    city,
                    attachment,
                    type,
                    image,
                    text,
                    link,
                    video
                  }) => (
                    <WebinarItem
                      key={id}
                      image={image && image.file && image.file.url}
                      type={type}
                      date={new Date(date).toUTCString()}
                      endDate={endDate && new Date(endDate).toUTCString()}
                      title={resourceTitle}
                      description={text}
                      city={city}
                      link={
                        attachment && attachment.file
                          ? attachment.file.url
                          : link
                      }
                      video={video}
                    />
                  )
                )
            }
          />
        )}
        {eventsNew && (
          <EventsNew
            title="Events"
            hasMore={eventsNew && eventsNewVisible < eventsNew.length}
            onMoreClick={() => {
              this.setState({
                eventsNewVisible: eventsNewVisible + 6
              });
            }}
            featured={
              eventsNew &&
              eventsNew
                .slice(0, eventsNewVisible)
                .map(
                  ({
                    id,
                    title: resourceTitle,
                    date,
                    endDate,
                    city,
                    attachment,
                    type,
                    image,
                    text,
                    link,
                    video
                  }) => (
                    <EventsItemNew
                      key={id}
                      image={image && image.file && image.file.url}
                      type={type}
                      date={new Date(date).toUTCString()}
                      endDate={endDate && new Date(endDate).toUTCString()}
                      title={resourceTitle}
                      description={text}
                      city={city}
                      link={
                        attachment && attachment.file
                          ? attachment.file.url
                          : link
                      }
                      video={video}
                    />
                  )
                )
            }
          />
        )}
      </Page>
    );
  }
}

const jobHOC = withJob({
  work: async ({ contentful }) => {
    const [eventsNew, webinar] = await Promise.all([
      contentful.fetchByContentType("eventsNew", { order: "fields.date" }),
      contentful.fetchByContentType("webinar", { order: "-fields.date" })
    ]);

    return { eventsNew, webinar };
  },
  LoadingComponent: Loading
})(EventsWebinar);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
