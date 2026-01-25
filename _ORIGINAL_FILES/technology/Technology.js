import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { StickyContainer, Sticky } from 'react-sticky';
import TechnologyScene from './TechnologyScene';

import s from './Technology.scss';

@inject('ui')
export default class Technology extends Component {

  static propTypes = {
    ui: PropTypes.object,
    children: PropTypes.node,
  }

  state = {
    activeItem: 0,
    isMobile: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      isMobile: !window.matchMedia('(min-width: 767px)').matches,
    });
  }

  handleItemEnter = (itemIndex) => {
    this.setState({
      activeItem: itemIndex,
    });
  }

  renderMobile(children) {
    return (
      <div className={s(s.technology)} id="sectionTechnologyMobile">
        <div className={s.technology__container}>
          <div className={s.technology__row}>
            <div className={s.technology__colItems}>
              {Children.map(children, (child, index) => (
                cloneElement(child, {
                  index,
                  isMobile: true,
                  onItemEnter: this.handleItemEnter,
                })
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { ui, children } = this.props;
    const { activeItem, isMobile } = this.state;

    if (isMobile) {
      return this.renderMobile(children);
    }

    return (
      <div className={s(s.technology, { isSticky: !isMobile })} id="sectionTechnology">
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <div className={s.technology__scene} style={style}>
                <div className={s.technology__sceneWrapper}>
                  {Children.map(children, ({ props: { video, messages, background } }, index) => (
                    <TechnologyScene
                      key={index}
                      scene={index}
                      isPrimary={index === 0}
                      isActive={activeItem === index}
                      video={video}
                      messages={messages}
                      background={background}
                      ui={ui}
                    />
                  ))}
                </div>
              </div>
            )}
          </Sticky>
          <div className={s.technology__container}>
            <div className={s.technology__row}>
              <div className={s.technology__colItems}>
                {Children.map(children, (child, index) => (
                  cloneElement(child, {
                    index,
                    isMobile,
                    onItemEnter: this.handleItemEnter,
                  })
                ))}
              </div>
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}
