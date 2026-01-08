import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import s from "./CustomerTemplatePage.scss";
//import Benefits from "../../routes/technology/components/benefits/Benefits";

export default class CustomerTemplatePage extends Component {
  static propTypes = {
    
    title: PropTypes.string,
    description: PropTypes.string,
    bodyCopy: PropTypes.string,
    challenges: PropTypes.string,
    solution: PropTypes.string,
    quote: PropTypes.string,
    featuredImage: PropTypes.object,
    slug: PropTypes.string,
    results: PropTypes.string,
    shortResult: PropTypes.string,
    shortSolution: PropTypes.string,
    businessNeed: PropTypes.string,
    industry: PropTypes.string,
    // lead: PropTypes.string,
    // author: PropTypes.string,
    // articleUrl: PropTypes.string,
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
    const challenges = props.escapeHtml ? [props.literal] : null;
    
    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {/* {children} */}
              {challenges}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{challenges}</Element>;
    }
  };
  
  renderHtmlBlock2 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const solution = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {solution}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{solution}</Element>;
    }
  };

  renderHtmlBlock3 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const industry = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {industry}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{industry}</Element>;
    }
  };

  renderHtmlBlock4 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const businessNeed = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {businessNeed}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{businessNeed}</Element>;
    }
  };

  renderHtmlBlock5 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const shortSolution = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {shortSolution}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{shortSolution}</Element>;
    }
  };

  renderHtmlBlock6 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const shortResult = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {shortResult}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{shortResult}</Element>;
    }
  };

  renderHtmlBlock7 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const results = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {results}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{results}</Element>;
    }
  };

  renderHtmlBlock8 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const results = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {quote}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{quote}</Element>;
    }
  };

  renderHtmlBlock9 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const topQuote = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {topQuote}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{topQuote}</Element>;
    }
  };

  render() {
    const { title, challenges, solution, mtop, bodyCopy ,children, description, featuredImage, results, shortSolution, shortResult, industry, businessNeed, quote, topQuote } = this.props;
    //const hasSlug = this.props.slug;
    
    return (
      <div className={s.skills}>
        <div className={s.skills__imagetext}>
          <div className={s.skills__container}>
              <div className={s(s.skills__row, s.skills__wrapper)}>
                <div className={s.skills__featImage}>
                    <img src={featuredImage.file.url} alt={featuredImage.title} style={{marginTop:mtop}}/>
                  </div>
                  <div className={s.skills__bodyCopy}>
                        <ReactMarkdown
                          className={s.articleTemplatePage__content}
                          source={bodyCopy}
                          renderers={{
                            Image: this.renderImage,
                            HtmlBlock: this.renderHtmlBlock
                          }}
                        />
                    </div>
              </div>
              <div className={s(s.skills__row, s.skills__contentWrapper)}>
                {/* <div className={s.skills__contentBox}>
                  <h3>Industry</h3>
                          <ReactMarkdown
                            className={s.articleTemplatePage__content}
                            source={industry}
                            renderers={{
                              Image: this.renderImage,
                              HtmlBlock: this.renderHtmlBlock3
                            }}
                          />
                  </div> */}
                  <div className={s.skills__contentBox}>
                  <h3>Business Need</h3>
                          <ReactMarkdown
                            className={s.articleTemplatePage__content}
                            source={businessNeed}
                            renderers={{
                              Image: this.renderImage,
                              HtmlBlock: this.renderHtmlBlock4
                            }}
                          />
                  </div>
                  {/* <div className={s.skills__contentBox}>
                  <h3>Solution</h3>
                          <ReactMarkdown
                            className={s.articleTemplatePage__content}
                            source={shortSolution}
                            renderers={{
                              Image: this.renderImage,
                              HtmlBlock: this.renderHtmlBlock5
                            }}
                          />
                  </div> */}
                  <div className={s.skills__contentBox}>
                  <h3>Results</h3>
                          <ReactMarkdown
                            className={s.articleTemplatePage__content}
                            source={shortResult}
                            renderers={{
                              Image: this.renderImage,
                              HtmlBlock: this.renderHtmlBlock6
                            }}
                          />
                  </div>
                
              </div>
              <div className={s.skills__row}>
              <div className={s.skills__content}>
                
                <div className={s.skills__detailWrapper}>
                  <div className={s.skills__list}>
                    <h3>The Challenges</h3>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={challenges}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock
                      }}
                    />
                  </div>
                  <div className={s.skills__list}>
                    <h3>The Solution</h3>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={solution}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock2
                      }}
                    />
                  </div>
                  <div className={s.skills__clearfix}></div>
                </div>
              </div>
          </div>
          <div className={s(s.skills__results, s.skills__noBorder, s.skills__topQuote)}>
                  <ReactMarkdown
                    className={s.articleTemplatePage__content}
                    source={topQuote}
                    renderers={{
                      Image: this.renderImage,
                      HtmlBlock: this.renderHtmlBlock9
                    }}
                  />
                </div>
          {/* <div className={s.skills__row}>
              <div className={s.skills__content}>
                
                <div className={s(s.skills__detailWrapper, s.skills__alignCenter)}>
                  <div className={s.skills__list}>
                    <h3>Results</h3>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={results}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock7
                      }}
                    />
                  </div>
                  <div className={s(s.skills__list, s.skills__noBorder)}>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={quote}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock2
                      }}
                    />
                  </div>
                  <div className={s.skills__clearfix}></div>
                </div>
              </div>
          </div> */}
                <div className={s.skills__results}>
                  <h3>Results</h3>
                  <ReactMarkdown
                    className={s.skills__resultsContent}
                    source={results}
                    renderers={{
                      Image: this.renderImage,
                      HtmlBlock: this.renderHtmlBlock7
                    }}
                  />
                </div>
          </div>
        </div>
        
       
        <div className={s.skills__container}>
          
          
        </div>
        
        
      </div>
    );
  }
}
