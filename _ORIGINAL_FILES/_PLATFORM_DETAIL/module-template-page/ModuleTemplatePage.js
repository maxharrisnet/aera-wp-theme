import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

import s from "./ModuleTemplatePage.scss";
//import Benefits from "../../routes/technology/components/benefits/Benefits";

export default class ModuleTemplatePage extends Component {
  static propTypes = {
    
    title: PropTypes.string,
    description: PropTypes.string,
    bodyCopy: PropTypes.string,
    benefits: PropTypes.string,
    features: PropTypes.string,
    featuredImage: PropTypes.object,
    slug: PropTypes.string,
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
    const benefits = props.escapeHtml ? [props.literal] : null;
    
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
              {benefits}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{benefits}</Element>;
    }
  };
  
  renderHtmlBlock2 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const features = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {features}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{features}</Element>;
    }
  };

  render() {
    const { title, benefits, features , bodyCopy ,children, description, featuredImage } = this.props;
    //const hasSlug = this.props.slug;
    
    return (
      <div className={s.skills}>
        <div className={s.skills__imagetext}>
          <div className={s.skills__container}>
              <div className={s.skills__row}>
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
                  <div className={s.skills__featImage}>
                    <img src={featuredImage.file.url} alt={featuredImage.title}/>
                  </div>
              </div>
          </div>
        </div>
        {/* <div className={s.skills__container}>
          <div className={s.skills__row}>
            
        </div>
        </div> */}
        <div className={s.skills__container}>
          <div className={s.skills__row}>
            <div className={s.skills__content}>
              
              <div className={s.skills__detailWrapper}>
                <div className={s.skills__list}>
                  <h3>Benefits</h3>
                  <ReactMarkdown
                    className={s.articleTemplatePage__content}
                    source={benefits}
                    renderers={{
                      Image: this.renderImage,
                      HtmlBlock: this.renderHtmlBlock
                    }}
                  />
                </div>
                <div className={s.skills__list}>
                  <h3>Features</h3>
                  <ReactMarkdown
                    className={s.articleTemplatePage__content}
                    source={features}
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
        </div>
      </div>
    );
  }
}
