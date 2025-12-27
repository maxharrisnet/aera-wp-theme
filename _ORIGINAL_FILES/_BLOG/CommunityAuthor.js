import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import s from "./CommunityAuthor.scss";

export default class CommunityAuthor extends Component {
  static propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    articleUrl: PropTypes.string,
    children: PropTypes.node
  };

  renderImage = ({ src, alt }) => (
    <span className={s.articleTemplatePage__contentImage}>
      <img src={src} alt={alt} />
    </span>
  );

  getCoreProps(props) {
    return {
      key: props.nodeKey,
      className: props.className,
      "data-sourcepos": props["data-sourcepos"]
    };
  }

  renderHtmlBlock = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const children = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {children}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{children}</Element>;
    }
  };

  render() {
    const { date, title, lead, children, author, articleUrl, image, authorPhoto, publisher2, author2, authorPhoto2, publisher3, author3, authorPhoto3 } = this.props;

    return (
      <article className={s.articleTemplatePage}>
        <div className={s.articleTemplatePage__container}>
          <div className={s.articleTemplatePage__row}>
            <div className={s.articleTemplatePage__col}>
              {authorPhoto && authorPhoto.file && (
                <div className={s.articleTemplatePage__image}>
                  <img src={authorPhoto.file.url} alt={authorPhoto.title} />
                </div>
              )}
              {lead &&
                  lead
                    .split("\n")
                    .filter(p => p !== "")
                    .map((paragraph, i) => (
                      <p className={s.articleTemplatePage__lead} key={i}>
                        <a
                          href={articleUrl}
                          target="_blank"
                          className={s.articleTemplatePage__lead__name}
                        >
                          {paragraph}
                        </a>
                      </p> // eslint-disable-line
                    ))}
              {author &&
                  author
                    .split("\n")
                    .filter(p => p !== "")
                    .map((paragraph, i) => (
                      <p className={s.articleTemplatePage__lead} key={i}>
                        <span className={s.articleTemplatePage__lead__name}>
                          {paragraph}
                        </span>
                      </p> // eslint-disable-line
                    ))}
            </div>
            <div className={s.articleTemplatePage__col}>
              {authorPhoto2 && authorPhoto2.file && (
                <div className={s.articleTemplatePage__image}>
                  <img src={authorPhoto2.file.url} alt={authorPhoto2.title} />
                </div>
              )}
              {publisher2 &&
                  publisher2
                    .split("\n")
                    .filter(p => p !== "")
                    .map((paragraph, i) => (
                      <p className={s.articleTemplatePage__lead} key={i}>
                        <a
                          href={articleUrl}
                          target="_blank"
                          className={s.articleTemplatePage__lead__name}
                        >
                          {paragraph}
                        </a>
                      </p> // eslint-disable-line
                    ))}
              {author2 &&
                  author2
                    .split("\n")
                    .filter(p => p !== "")
                    .map((paragraph, i) => (
                      <p className={s.articleTemplatePage__lead} key={i}>
                        <span className={s.articleTemplatePage__lead__name}>
                          {paragraph}
                        </span>
                      </p> // eslint-disable-line
                    ))}
            </div>
            <div className={s.articleTemplatePage__col}>
              {authorPhoto3 && authorPhoto3.file && (
                <div className={s.articleTemplatePage__image}>
                  <img src={authorPhoto3.file.url} alt={authorPhoto3.title} />
                </div>
              )}
              {publisher3 &&
                  publisher3
                    .split("\n")
                    .filter(p => p !== "")
                    .map((paragraph, i) => (
                      <p className={s.articleTemplatePage__lead} key={i}>
                        <a
                          href={articleUrl}
                          target="_blank"
                          className={s.articleTemplatePage__lead__name}
                        >
                          {paragraph}
                        </a>
                      </p> // eslint-disable-line
                    ))}
              {author3 &&
                  author3
                    .split("\n")
                    .filter(p => p !== "")
                    .map((paragraph, i) => (
                      <p className={s.articleTemplatePage__lead} key={i}>
                        <span className={s.articleTemplatePage__lead__name}>
                          {paragraph}
                        </span>
                      </p> // eslint-disable-line
                    ))}
            </div>
          </div>
        </div>
      </article>
    );
  }
}
