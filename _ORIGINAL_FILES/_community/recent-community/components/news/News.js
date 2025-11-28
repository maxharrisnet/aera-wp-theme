import React, { Component } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import { NavLink } from "react-router-dom";
import WaypointEnter from "components/waypoint-enter";
//import Button from "components/button";

import s from "./News.scss";

export default class News extends Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    children: PropTypes.node,
    onMoreClick: PropTypes.func,
    hasMore: PropTypes.bool
  };

  t = new TimelineLite();

  componentDidMount() {
    this.t.set(this.el, { autoAlpha: 10 });
  }

  animate = () => {
    fadeSlideIn(this.t, this.el);
  };

  render() {
    const { title, children, author, image } = this.props;

    return (
      <WaypointEnter onEnter={this.animate}>
        <div className={s.news}>
          <div className={s.news__container}>
            <h3>Recent Articles</h3>
            <div>
            <h2 ref={c => (this.el = c)} className={s.news__title}>
              {title}
            </h2>
              {image}
              {author}
            </div>
            <div className={s.news__list}>
              <div className={s.news__col}>{children}</div>
            </div>
            <div className={s.news__sidebar}>
              <h3>Other Resources</h3>
              <ul>
                {/* <li>
                  <NavLink
                    to="/resources?category=news"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="News"
                    
                  >
                    News
                  </NavLink>
                </li> */}
                <li>
                <NavLink
                    to="/what-is-decision-intelligence"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="What is Decision Intelligence?"
                    
                  >
                    What is Decision Intelligence?
                  </NavLink>
                </li>
                <li>
                <NavLink
                    to="/resources?category=news"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="News"
                    
                  >
                    News
                  </NavLink>
                </li>
                <li>
                <NavLink
                    to="/resources?category=press-release"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="News"
                    
                  >
                    Press Releases
                  </NavLink>
                </li>
                <li>
                <NavLink
                    to="/resources?category=videos"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="Videos"
                    
                  >
                    Videos
                  </NavLink>
                </li>
                {/* <li>
                <NavLink
                    to="/resources?category=perspectives"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="Perspectives"
                    
                  >
                    Perspectives
                  </NavLink>
                </li> */}
                <li>
                  <NavLink
                      to="/resources?category=whitepapers"
                      data-event-category="Sidebar"
                      data-event-action="Click"
                      data-event-name="Whitepapers"
                    >
                      Whitepapers
                    </NavLink>
                </li>
                <li>
                  <NavLink
                      to="/resources?category=blogs"
                      data-event-category="Sidebar"
                      data-event-action="Click"
                      data-event-name="Blogs"
                    >
                      Blogs
                    </NavLink>
                </li>
                <li>
                  <NavLink
                      to="/resources?category=case-studies"
                      data-event-category="Sidebar"
                      data-event-action="Click"
                      data-event-name="case studies"
                    >
                      Case Studies
                    </NavLink>
                </li>
                <li>
                  <NavLink
                      to="/resources?category=podcasts"
                      data-event-category="Sidebar"
                      data-event-action="Click"
                      data-event-name="podcasts"
                    >
                      Podcasts
                    </NavLink>
                </li>
                {/* <li>
                <NavLink
                    to="/resources?category=events"
                    data-event-category="Sidebar"
                    data-event-action="Click"
                    data-event-name="Events"
                    
                  >
                    Events
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </WaypointEnter>
    );
  }
}
