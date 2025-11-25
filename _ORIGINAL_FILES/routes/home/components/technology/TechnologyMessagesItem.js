import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Technology.scss';

export default class TechnologyMessagesItem extends Component {

  static propTypes = {
    index: PropTypes.number,
    type: PropTypes.string,
    message: PropTypes.string,
    lastAera: PropTypes.bool,
  }

  render() {
    const { index, type, message, lastAera } = this.props;

    return (
      <div
        className={s(
          s.technologyMessagesItem,
          `pos-${index}`,
          type,
          { lastAera },
        )}
      >
        <div className={s.technologyMessagesItem__panel}>
          {message}
        </div>
      </div>
    );
  }
}
