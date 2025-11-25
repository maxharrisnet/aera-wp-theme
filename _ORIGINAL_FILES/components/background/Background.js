/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
// import _debounce from 'lodash/debounce';
import WebglScene from "./WebglScene";
// import StatScene from './StatScene';
import s from "./Background.scss";

export default class Background extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  };

  state = {
    innerWidth: 0
  };

  componentWillReceiveProps({ location }) {
    // Check if URL matches the criteria
    const isVisible = this.isURLMatch(location.pathname);

    if (this.WebglScene) {
      // Hide or show the helix canvas
      this.WebglScene[isVisible ? "showHelix" : "hideHelix"]();
    }
  }

  componentDidMount() {
    const { location } = this.props;
    // Check if URL matches the criteria
    const isVisible = this.isURLMatch(location.pathname);

    if (isVisible) {
      // Setup right away
      this.setup(true);
    } else {
      // Setup when idle or maximum 3 seconds
      if (window.requestIdleCallback) requestIdleCallback(this.setup);
      setTimeout(this.setup, 3000);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("mousemove", this.onMousemove);
    window.removeEventListener("resize", this.onResize);
  }

  setup = () => {
    // Dont setup multiple times
    if (this.WebglScene) return;

    // Setup constructors
    this.WebglScene = new WebglScene(this.canvasWrapper);
    // this.StatScene = new StatScene(this.statsEl, this.WebglScene);

    if (this.isURLMatch(this.props.location.pathname)) {
      this.WebglScene.showHelix();
    }

    this.setCanvasHeight();

    // Setup event listeners
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("mousemove", this.onMousemove);
    window.addEventListener("resize", this.onResize);
  };

  isURLMatch(path) {
    if (
      typeof window !== "undefined" &&
      document.body.classList.contains("is404")
    ) {
      return true;
    }

    if (path === "/") return true;
    if (path === "/company") return true;
    // if (path === "/skills") return true;
    //if (path === "/skillsv2") return true;
    if (path === "/technology") return true;
    //if (path === "/platform") return true;
    if (path === "/about-us") return true;
    if (path === "/resources") return true;
    if (path === "/careers") return true;
    if (path === "/webinars") return true;
    if (path === "/aera-decision-cloud") return true;
    
    //if (path === "/data-crawlers") return true;
    // if (path === "/modeling") return true;
    // if (path === "/analytics") return true;
    // if (path === "/automation-rules") return true;
    // if (path === "/cognitive-decision-board") return true;
    // if (path === "/cognitive-workbench") return true;
    // if (path === "/data-workbench") return true;
    // if (path === "/search-voice-mobile") return true;
    // if (path === "/process-builder") return true;
    // if (path === "/write-backs") return true;
    // if (path === "/data-science") return true;
    // if (path === "/data-processing") return true;
    if (path === "/cognitive-automation") return true;
    if (path === "/team") return true;
    if (path === "/timeline-milestone") return true;
    if (path === "/decision-cloud") return true;
    if (path === "/decision-data-model-new") return true;
    if (path === "/aera-cortex-new") return true;
    if (path === "/modeling") return true;
    if (path === "/decision-engagement") return true;
    if (path === "/modeling-new") return true;
    if (path === "/decision-engagement-new") return true;
    if (path === "/aera-developer-new") return true;
    if (path === "/test-drive") return true;
    // if (path === "/decision-cloud") return true;
    if (path === "/decision-cloud-old") return true;
    if (path === "/decision-intelligence-faq") return true;
    
    if (path === "/events") return true;
    if (path === "/community") return true;
    // if (path === "/ui-voice-builder") return true;
    // if (path === "/cognitive-data-layer") return true;
    // if (path === "/cortex-al-ml") return true;
    // if (path === "/data-streams") return true;
    

    return false;
  }

  show() {
    this.WebglScene.showHelix();
  }

  hide() {
    this.WebglScene.hideHelix();
  }

  onMousemove = e => {
    const moveMiddleX = e.pageX - window.innerWidth / 2;
    const moveMiddleY = e.screenY - window.innerHeight / 2;

    this.WebglScene.updateMouseMove(moveMiddleX, moveMiddleY);
  };

  onScroll = () => {
    this.WebglScene.scrollY = window.scrollY;
  };

  onResize = () => {
    const currentInnerWidth = window.innerWidth;

    // hide/show of ios-addressbar is triggering resize, checking for width changes
    if (
      this.state.innerWidth !== currentInnerWidth ||
      window.matchMedia("(min-width: 767px)").matches
    ) {
      this.setCanvasHeight();
      this.WebglScene.resizeCanvas();
    }
  };

  setCanvasHeight = () => {
    if (window.matchMedia("(min-width: 767px)").matches) {
      return;
    }

    this.canvasWrapper.style.height = `${window.innerHeight}px`;

    this.setState({
      innerWidth: window.innerWidth
    });
  };

  render() {
    const { location } = this.props;

    return (
      <div
        className={s("background", { isHome: location.pathname === "/" })}
        ref={ref => (this.canvasWrapper = ref)}
      >
        {/* <div className={s.stats} ref={ref => (this.statsEl = ref)} /> */}
      </div>
    );
  }
}
