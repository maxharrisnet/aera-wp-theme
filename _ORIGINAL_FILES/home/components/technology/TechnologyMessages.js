import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import s from './Technology.scss';

export default class TechnologyMessages extends Component {

  static propTypes = {
    scene: PropTypes.number,
    children: PropTypes.node,
  }

  render() {
    const { scene, children } = this.props;

    let lastAeraIndex = 0;

    Children.forEach(children, ({ props }, index) => {
      if (props.type === 'aera') {
        lastAeraIndex = index;
      }
    });

    return (
      <div className={s(s.technologyMessages, `scene-${scene}`)}>
        {Children.map(children, (child, index) => (
          (index === lastAeraIndex) ? cloneElement(child, { lastAera: true }) : child
        ))}
      </div>
    );
  }
}
