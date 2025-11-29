import React from 'react';
import PropTypes from 'prop-types';

import s from './LoadingText.scss';

const LoadingText = ({ block, lines }) => (
  <span
    className={s(s.loadingText, {
      block,
      [`lines-${lines}`]: lines,
    })}
  />
);

LoadingText.propTypes = {
  block: PropTypes.bool,
  lines: PropTypes.number,
};

export default LoadingText;
