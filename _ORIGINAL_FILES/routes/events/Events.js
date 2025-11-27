import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { inject } from "mobx-react";
import { withJob } from "react-jobs";

import Page from "components/page";
import Intro, { Loading } from "components/intro";

// import Articles, { ArticlesItem } from "./components/articles";
// import News, { NewsItem } from "./components/news";
// import Events, { EventsItem } from "./components/events";
import EventsNew, { EventsItemNew } from "./components/eventsInAera";

class Events extends Component {
  static propTypes = {
    jobResult: PropTypes.object
  };

  state = {
    // articlesVisible: 2,
    // newsVisible: 2,
    // eventsVisible: 3,
    // eventsNewVisible: 3
  };

  render() {
    const {
      page: { title, subline, articles },
      news: inTheNews,
      events,
      eventsNew
    } = this.props.jobResult;
    const {
      articlesVisible,
      newsVisible,
      eventsVisible,
      eventsNewVisible
    } = this.state;

    return (
      <Page>
        <Helmet
          title="Aera Technology - Learn about Aera's webinars and events"
          meta={[
            {
              name: "description",
              content: "Join us at different events around the world to meet"
            },
            {
              property: "og:description",
              content: "Join us at different events around the world to meet"
            },
            {
              name: "twitter:description",
              content: "Join us at different events around the world to meet"
            }
          ]}
        />

        <Intro title="Events" text="" />

        {eventsNew && (
          <EventsNew
            //title="Events."
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
    const [page, news, events, eventsNew] = await Promise.all([
      contentful.fetchSingleByContentType("pageNewsroom"),
      contentful.fetchByContentType("newsItem", { order: "-fields.date" }),
      contentful.fetchByContentType("events", { order: "fields.date" }),
      contentful.fetchByContentType("eventsNew", { order: "fields.date" })
    ]);

    return { page, news, events, eventsNew };
  },
  LoadingComponent: Loading
})(Events);
const injectHOC = inject("contentful")(jobHOC);

export default injectHOC;
