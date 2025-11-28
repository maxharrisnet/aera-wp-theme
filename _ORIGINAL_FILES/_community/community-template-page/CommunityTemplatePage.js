import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import s from "./CommunityTemplatePage.scss";

export default class CommunityTemplatePage extends Component {
  static propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
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
    const { date, title, lead, children, author, articleUrl } = this.props;

    return (
      <article className={s.articleTemplatePage}>
        <div className={s.articleTemplatePage__container}>
          <div className={s.articleTemplatePage__row}>
            <div className={s.articleTemplatePage__col}>
              <header className={s.articleTemplatePage__header}>
                {date && (
                  <p className={s.articleTemplatePage__date}>
                    <time dateTime={date}>{date}</time>
                  </p>
                )}
                <h1 className={s.articleTemplatePage__title}>{title}</h1>
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
              </header>

              {/* {image && image.file && (
                <div className={s.articleTemplatePage__image}>
                  <img src={image.file.url} alt={image.title} />
                </div>
              )} */}

              <ReactMarkdown
                containerTagName="section"
                className={s.articleTemplatePage__content}
                source={children}
                renderers={{
                  Image: this.renderImage,
                  HtmlBlock: this.renderHtmlBlock
                }}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
}
