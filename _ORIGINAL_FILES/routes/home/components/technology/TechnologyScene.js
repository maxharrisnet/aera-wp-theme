import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import TechnologyMessages from './TechnologyMessages';
import TechnologyMessagesItem from './TechnologyMessagesItem';
import s from './Technology.scss';

export default class TechnologyScene extends Component {

  static propTypes = {
    isPrimary: PropTypes.bool,
    isActive: PropTypes.bool,
    scene: PropTypes.number,
    video: PropTypes.node,
    messages: PropTypes.array,
    background: PropTypes.node,
    ui: PropTypes.object,
  }

  state = {
    hasPlayed: false,
  }

  componentDidMount() {
    if (!this.props.isPrimary) return;

    this.t = new TimelineLite({ paused: true })
      .addLabel('start', '+=3')
      .fromTo(
        this.videoWrapEl,
        3,
        { y: `${-15 * (window.innerHeight / 1200)}%` },
        { y: '0%', ease: 'Power4.easeInOut' },
        'start-=1',
      )
      // .fromTo(
      //   this.videoWrapEl,
      //   2,
      //   { x: '25%' },
      //   { x: '0%', ease: 'Power4.easeInOut' },
      //   'start',
      // )
      .addLabel('content', '-=1')
      .add(this.getMessageAnimation(), 'content-=1.2')
      .fromTo(
        document.querySelector(`.${s.technologyItem}`),
        1,
        { opacity: 0 },
        { opacity: 1 },
        'content',
      )
      .set(this.videoEl, { display: 'block' }, '+=2');

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    if (!this.props.isPrimary) return;

    window.removeEventListener('scroll', this.onScroll);
  }

  getMessageAnimation() {
    const messages = this.el.querySelectorAll(`.${s.technologyMessagesItem}`);

    return new TimelineLite()
      .staggerFromTo(
        messages,
        0.3,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: window.Power3.easeOut },
        0.4,
        1.5,
      );
  }

  componentWillReceiveProps({ isPrimary, isActive }) {
    const { hasPlayed } = this.state;

    if (!isPrimary && isActive && !hasPlayed) {
      this.setState({ hasPlayed: true });
      new TimelineLite()
        .add(this.getMessageAnimation());
    }
  }

  componentWillEnter(cb) {
    if (!this.el) {
      cb();
      return;
    }

    if (this.props.scene === 0) {
      cb();
      return;
    }

    const { scene, ui } = this.props;
    const t = new TimelineLite();

    t.fromTo(
      this.el,
      0.3,
      { opacity: 0 },
      { opacity: 1, ease: window.Power1.easeOut },
    );

    if (!ui.isChatAnimationDone[scene]) {
      t.add(this.getMessageAnimation());
    }

    t.call(() => {
      ui.setChatAnimationDone(scene);
      cb();
    });
  }

  componentWillLeave(cb) {
    if (this.el) {
      const t = new TimelineLite();
      t.fromTo(
        this.el,
        0.3,
        { opacity: 1 },
        { opacity: 0, ease: window.Power1.easeOut },
      );
      t.call(() => {
        if (this.el) cb();
      });
    }
  }

  onScroll = () => {
    const scrollY = window.scrollY;
    const bar = document.querySelector(`.${s.technologyItem__title}`).offsetTop;
    const foo = document.querySelector(`.${s.technologyItem}`).offsetHeight;
    const height = window.innerHeight + ((foo - window.innerHeight) / 2) + bar;

    const percentage = scrollY / height; // intro + first child

    this.t.seek(this.t.totalDuration() * percentage);
  }

  render() {
    const { isActive, scene, video, messages, background } = this.props;

    return (
      <div
        className={s(s.technologyScene, `scene-${scene}`, {
          isVisible: isActive,
        })}
        ref={c => (this.el = c)}
      >
        <div className={s.technologyScene__container}>

          <div className={s.technologyScene__videoContainer}>
            <div className={s.technologyScene__videoWrap} ref={el => (this.videoWrapEl = el)}>
              <video
                ref={el => (this.videoEl = el)}
                className={s.technologyScene__video}
                src={video}
                width="1280"
                height="720"
                playsInline
                autoPlay
                muted
                loop
              />
            </div>
          </div>

          {background && (
            <div className={s.technologyScene__prop}>
              {background}
            </div>
          )}

          <div className={s.technologyScene__messages}>
            <div className={s.technologyScene__messagesRow}>
              <div className={s.technologyScene__messagesCol}>
                <TechnologyMessages scene={scene}>
                  {messages.map((message, index) => (
                    <TechnologyMessagesItem
                      key={index} // eslint-disable-line
                      index={index}
                      type={message.type}
                      message={message.message}
                    />
                  ))}
                </TechnologyMessages>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
