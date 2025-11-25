import React, { Component } from "react";
import PropTypes from "prop-types";

import s from "./News.scss";

export default class NewsItem extends Component {
  static propTypes = {
    publication: PropTypes.string,
    logo: PropTypes.shape({
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    image: PropTypes.shape({
      url: PropTypes.string
    }),
    author: PropTypes.string,
    authorTitle: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    excerpt: PropTypes.string,
    link: PropTypes.string
  };

  render() {
    const { title, link, image, author } = this.props;

    return (
      <div ref={c => (this.el = c)} className={s.newsItem}>
        <div className={s.newsItem__row}>
          <div className={s.newsItem__boxWrapper}>
            {/* <p className={s.newsItem__title}> */}
              <a href={link}>
                <img src={image} alt={title}/>
                <p className={s.newsItem__author}>
                  {author}
                </p>
                <h3 className={s.newsItem__title}>{title}</h3>
                
              </a>
            {/* </p> */}
          </div>
        </div>
      </div>
    );
  }
}
