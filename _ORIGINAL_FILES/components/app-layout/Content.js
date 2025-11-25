import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ContentItem from './ContentItem';
import s from './Content.scss';

export default class Content extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <main className={s.content}>
        {children}
        {/* {Children.map(children, child => (
          <ContentItem key={child.props.location.key}>
            {child}
          </ContentItem>
        ))} */}
      </main>
    );
  }
}
