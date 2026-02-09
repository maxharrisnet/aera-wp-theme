import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import s from './TemplatePage.scss';

export default class TemplatePage extends Component {

  static propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    lead: PropTypes.string,
    // image: PropTypes.object,
    children: PropTypes.node,
  }

  renderImage = ({ src, alt }) => (
    <span className={s.templatePage__contentImage}>
      <img src={src} alt={alt} />
    </span>
  )

  getCoreProps(props) {
    return {
      key: props.nodeKey,
      className: props.className,
      'data-sourcepos': props['data-sourcepos'],
    };
  }

  renderHtmlBlock = (props) => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml ? {} : { dangerouslySetInnerHTML: { __html: props.literal } };  // eslint-disable-line
    const children = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {

      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf('iframe') === 1) {
        return (
          <div className={s.templatePage__contentEmbed}>
            <div {...actualProps} className={s.templatePage__contentIframe}>
              {children}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? 'div' : 'span';

      return <Element {...actualProps}>{children}</Element>;
    }
  }

  render() {
    const { date, title, lead, children } = this.props;

    return (
      <article className={s.templatePage}>
        <div className={s.templatePage__container}>
          <div className={s.templatePage__row}>
            <div className={s.templatePage__col}>

              <header className={s.templatePage__header}>
                {date && (
                  <p className={s.templatePage__date}><time dateTime={date}>{date}</time></p>
                )}
                <h1 className={s.templatePage__title}>{title}</h1>
                {lead && lead.split('\n').filter(p => p !== '').map((paragraph, i) => (
                  <p className={s.templatePage__lead} key={i}>{paragraph}</p> // eslint-disable-line
                ))}
              </header>

              {/* {image && image.file && (
                <div className={s.templatePage__image}>
                  <img src={image.file.url} alt={image.title} />
                </div>
              )} */}

              <ReactMarkdown
                containerTagName="section"
                className={s.templatePage__content}
                source={children}
                renderers={{
                  Image: this.renderImage,
                  HtmlBlock: this.renderHtmlBlock,
                }}
              />

            </div>
          </div>
        </div>
      </article>
    );
  }
}
