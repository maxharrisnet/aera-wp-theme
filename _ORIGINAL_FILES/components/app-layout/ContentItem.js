import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import Footer from 'components/footer';
import { TimelineLite } from 'gsap';
import s from './Content.scss';

export default class ContentItem extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollRef = _debounce(this.handleScroll, 100));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollRef);
  }

  scrollPosition = 0;

  handleScroll = () => {
    this.scrollPosition = window.scrollY;
  }

  componentWillEnter(cb) {
    if (this.el) {
      const t = new TimelineLite();
      t.set(document.body, { overflowY: 'hidden' });
      t.set(this.el, {
        opacity: 0,
        position: 'absolute',
      });
      t.fromTo(
        this.el,
        0.5,
        { opacity: 0 },
        { opacity: 1, ease: window.Power1.easeOut },
        'start',
      );
      t.set(this.el, {
        position: 'static',
      });
      t.set(document.body, { overflowY: 'auto' });
      t.call(() => {
        if (this.el) cb();
      });
    }
  }

  componentWillLeave(cb) {
    if (this.el) {

      const header = document.querySelector('header');

      let pos = { start: 0, end: 0, opacity: 1 };
      if (this.scrollPosition !== 0) {
        pos = (this.scrollPosition > header.offsetHeight)
          ? { opacity: 0, start: '0%', end: '0%' }
          : { opacity: 1, start: `${this.scrollPosition * -1}px`, end: '0px' };
      }

      const t = new TimelineLite();
      t.set(this.el, {
        position: 'absolute',
        top: `-${(this.scrollPosition || window.scrollY)}px`,
      });
      t.addLabel('start');
      t.fromTo(
        header,
        0.5,
        { opacity: pos.opacity, y: pos.start },
        { opacity: 1, y: pos.end, ease: window.Power1.easeOut },
      );
      t.fromTo(
        this.el,
        0.5,
        { opacity: 1 },
        { opacity: 0, ease: window.Power1.easeOut },
        'start',
      );
      t.call(() => {
        if (this.el) cb();
      });
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={c => (this.el = c)} className={s.contentItem}>
        {children}
        <Footer />
      </div>
    );
  }
}
