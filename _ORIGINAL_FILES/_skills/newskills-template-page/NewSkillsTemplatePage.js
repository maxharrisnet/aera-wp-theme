import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import s from "./NewSkillsTemplatePage.scss";
import arrowOpen from 'assets/images/newskills/rightArrow.png';
import playbtn from 'assets/images/newskills/playbtn.png';

import { Link } from "react-scroll";

//import reccomendations from 'assets/images/TD_recommendation_screen.jpg';
//import Benefits from "../../routes/technology/components/benefits/Benefits";

export default class NewSkillsTemplatePage extends Component {
  static propTypes = {
    
    title: PropTypes.string,
    description: PropTypes.string,
    bodyCopy: PropTypes.string,
    benefits: PropTypes.string,
    features: PropTypes.string,
    keyDecisionNeeded: PropTypes.string,
    howAeraHelps: PropTypes.string,
    featuredImage: PropTypes.object,
    featuredSkills: PropTypes.object,
    relatedSkills: PropTypes.object,
    relatedResources: PropTypes.object,
    benefitsTextAndImage: PropTypes.object,
    slug: PropTypes.string,
    neededDecisionsAndAeraHelpsMobile: PropTypes.string,
    demoVideoForm: PropTypes.string,
    //demoVideo: PropTypes.string,
    //yesIfFormPresent: PropTypes.string,
    // lead: PropTypes.string,
    // author: PropTypes.string,
    // articleUrl: PropTypes.string,
    children: PropTypes.node,
    
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
    const keyDecisionNeeded = props.escapeHtml ? [props.literal] : null;
    
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
              {keyDecisionNeeded}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{keyDecisionNeeded}</Element>;
    }
  };

  
  
  renderHtmlBlock2 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const howAeraHelps = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.articleTemplatePage__contentIframe}
            >
              {howAeraHelps}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{howAeraHelps}</Element>;
    }
  };

  renderHtmlBlock3 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const featuredSkillBodyContent = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.skills__contentIframe}
            >
              {featuredSkillBodyContent}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{featuredSkillBodyContent}</Element>;
    }
  };

  renderHtmlBlock4 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const neededDecisionsAndAeraHelpsMobile = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.skills__contentIframe}
            >
              {neededDecisionsAndAeraHelpsMobile}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{neededDecisionsAndAeraHelpsMobile}</Element>;
    }
  };

  renderHtmlBlock5 = props => {
    const coreProps = this.getCoreProps(props);

    const nodeProps = props.escapeHtml
      ? {}
      : { dangerouslySetInnerHTML: { __html: props.literal } }; // eslint-disable-line
    const demoVideoForm = props.escapeHtml ? [props.literal] : null;

    if (props.escapeHtml || !props.skipHtml) {
      const actualProps = { ...coreProps, ...nodeProps };

      if (props.literal.indexOf("iframe") === 1) {
        return (
          <div className={s.articleTemplatePage__contentEmbed}>
            <div
              {...actualProps}
              className={s.skills__contentIframe}
            >
              {demoVideoForm}
            </div>
          </div>
        );
      }

      const Element = props.isBlock ? "div" : "span";

      return <Element {...actualProps}>{demoVideoForm}</Element>;
    }
  };

  componentDidMount() {
    // function getURLParameter(e) {
    //   return decodeURI((new RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, ""])[1]);
    // }
    //console.log(window.location.pathname);
    // $('#gatedVideo').on('click',function(){
    //   $('#slideForm').show()
    // })
    // $('#closeBtn').on('click',function(){
    //   $('#slideForm').hide()
    // })

    $('[data-name="showForm"]').on('click',function(){
      $('#slideForm').show();
      console.log('openform');
    })
    $('[data-name="closeForm"]').on('click',function(){
      $('#slideForm').hide();
      console.log('closeform');
    })

    
    
    
    

    $(function() {
      var slider = $('#bx-featuredslider').bxSlider({
        auto: false,
        pause: 3000,
        controls: false,
        pager: true,
        adaptiveHeight: $(window).width()<720 ? true : false,
        moveSlides: 1,
        pagerCustom: '#bx-featuredpager',
        touchEnabled: false,
        onSliderLoad: function(){
          
          // do funky JS stuff here
          let searchParams = new URLSearchParams(window.location.search)
            searchParams.has('watch') // true
            let paramId = searchParams.get('watch');
            //console.log(paramId)
            if(paramId == 'video'){
              //console.log('hit');
            
              $('html, body').animate({
                scrollTop: $("#featured-skills").offset().top
            }, 1000);
          }
          var hash = document.URL.substr(document.URL.indexOf('#')+1);
          var removeDash = hash.replace(/-/g, ' ');
          console.log('with dash '+hash)

          if(window.location.hash == '#'+hash){
            console.log('with/o dash '+removeDash)
            $("a[data-slide-name='"+removeDash+"']").trigger("click");
            $('html, body').animate({
              scrollTop: $("#featured-skills").offset().top
          }, 1000);
          }
        },
      });
    })

    $('#bx-featuredpager a[data-slide-index="0"]').css('backgroundColor','#dee8fb');
    $('#bx-featuredpager a[data-slide-index="0"]').css('backgroundImage','linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)');

    $('#bx-featuredpager a').on('click touchstart', function() {
      var thumbIndex = $('#bx-featuredpager a').index(this);
      //console.log(thumbIndex);

      $('#bx-featuredpager a').css('backgroundColor','#fff');
      $('#bx-featuredpager a').css('border','2px solid #bee9f3');
      $('#bx-featuredpager a').css('borderColor','rgba(138,196,232,.5)');
      $('#bx-featuredpager a').css('backgroundImage','linear-gradient(white, white)');

      $(this).css('backgroundColor','#dee8fb');
      //$(this).css('borderColor','#dee8fb');
      $(this).css('backgroundImage','linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)');
    })

    

      // let screen = ($(window).width())
      // if(screen <= 720){
      //   $("#scheduledemo,#gatedVideo").on('click',function() {
      //     $('html, body').animate({
      //         scrollTop: $("#slideForm").offset().top-50
      //     }, 500);
      //   })
      // }
      
     
   
      
  var accordion = (function(){
  
  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');
 
  // default settings 
  var settings = {
    // animation speed
    speed: 400,
    
    // close all other accordion items if true
    oneOpen: false
  };
    
  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion.toggle($(this));
      });
      
      $.extend(settings, $settings); 
      
      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }
      
      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {
            
      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
               .find('> .js-accordion-item') 
               .removeClass('active')
               .find('.js-accordion-body')
               .slideUp()
      }
      
      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    }
  }
})();

$(document).ready(function(){
  accordion.init({ speed: 300, oneOpen: true });
});

  }

  render() {
    const { title, featuredSkills, keyDecisionNeeded, howAeraHelps, relatedSkills, relatedResources, benefitsTextAndImage, neededDecisionsAndAeraHelpsMobile, demoVideoForm, yesIfFormPresent} = this.props;
    const hasSlug = this.props.slug;
    const slideskills = this.props.featuredSkills;
    const dataSkills = this.props.relatedResources;
    
    // console.log(slideskills);
    
    const result = featuredSkills.map(obj => {
      return obj.demoVideo === "Yes"
    })
    // console.log("Demo Video" + result);
    
    
    
    return (
      <div className={s.skills}>
        <div className={s.skills__benefitsWrapper}>
          <div className={s.skills__container}>
            <h3>Benefits</h3>
            {/* <div className={s.skills__row}>
              {benefitsImage.map(item => (
                <div className={s.skills__benefitsBox}><img src={item.file.url} alt={benefitsImage.title}/></div>
              ))}
            </div> */}
            <div className={s.skills__row}>
              {benefitsTextAndImage.map(item => (
                <div className={s.skills__benefitsBox}>
                  <h2>{item.benefitsPercentage}</h2>
                  <p>{item.benefitsTitle}</p>
                </div>
              ))}
            </div>
          </div>  
        </div>
        <div className={s.skills__featuredSkills} id="featured-skills">
          <div className={s.skills__sliderContainer}>
            <div className={s.skills__featuredSkillsWrapper}>
              <h3>Featured Skills</h3>
              <div className={s.skills__featuredSkillsSlider} id="videoWrapper">
                <div id="bx-featuredpager" className={s.skills__featuredSkillsSliderPager}>
                  {featuredSkills.map(item => (
                    <a data-slide-index={featuredSkills.indexOf(item)} data-slide-name={item.featuredSkillTitle.replace('-', ' ').toLowerCase()} href="">{item.featuredSkillTitle}</a>
                  ))}
                </div>
                <div id="bx-featuredslider">
                  {featuredSkills.map((featuredSkillTitleObj, index) =>(
                        <div key={index} className={s.skills__sliderRow}>
                          <div className={s.skills__slideCol}>
                            <div className={s.skills__sliderTitle} data-title={featuredSkillTitleObj.featuredSkillTitle}>{featuredSkillTitleObj.featuredSkillTitle}</div>
                            <p className={s.skills__sliderDescription}>{featuredSkillTitleObj.featuredSkillDescription}</p>
                            {/* {featuredSkillTitleObj.featuredSkillImageVideo.length > 0 (
                              <img src={featuredSkillTitleObj.featuredSkillImageVideo.file.url} />
                            )}
                            {featuredSkillTitleObj.featuredSkillDemoLink.length > 0(
                              <iframe width="560" height="315" src={featuredSkillTitleObj.featuredSkillDemoLink} title="Aera Technology" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            )} */}
                            
                            { featuredSkillTitleObj.featuredSkillImageVideo ? <img alt="skills image" src={featuredSkillTitleObj.featuredSkillImageVideo.file.url} /> : 
                              <div className={s.skills__overlayWrapper}>
                                  <div className={s(s.skills__overlay)} id="hide-me" data-name="overlay">  
                                      <img alt="play btn" id="gatedVideo" src={playbtn} data-name="showForm"/>                                  
                                      {/* <h3 id="gatedVideo">Complete the form to watch demo
                                      </h3> */}
                                      {/* <div className={s(s.skills__scheduleDemoBtn, s.skills__gatedVideoBtn)} id="gatedVideo">
                                        Complete form below to watch demo
                                        <p>&or;</p>
                                      </div> */}
                                  </div>
                                  <iframe id="videoFrame" class="video-iframe"  width="100%" height="350" src={featuredSkillTitleObj.featuredSkillDemoLink} title="Aera Technology" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                              </div>
                            }
                            
                            
                            {/* <img src={featuredSkillTitleObj.featuredSkillImageVideo.file.url}/>
                            <iframe width="560" height="315" src={featuredSkillTitleObj.featuredSkillDemoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                            
                          </div>
                            <div className={s.skills__slideCol}>
                              <ReactMarkdown
                              className={s.skills__content}
                              source={featuredSkillTitleObj.featuredSkillBodyContent}
                              renderers={{
                                Image: this.renderImage,
                                HtmlBlock: this.renderHtmlBlock3
                              }}
                              />
                            </div>
                            
                        </div>
                    ))}
                </div>
              </div>
              {/* {featuredSkills.find.demoVideo === "Yes" ?
                <h1>Y</h1>:<h1>N</h1>
              } */}
              {/* {featuredSkills.find(item => item.demoVideo === "Yes" &&(
                    <div>{item.demoVideo}</div>
                  ))} */}
              
                <div className={s.skills__sliderFormWrapper} id="slideForm">
                  <div className={s.skills__closebtn} id="closeBtn" data-name="closeForm">X</div>
                  {/* <h3>Complete form to watch demo</h3> */}
                  <div className={s.skills__formWrapper}>
                    <ReactMarkdown
                        className={s.articleTemplatePage__content}
                        source={demoVideoForm}
                        renderers={{
                          Image: this.renderImage,
                          HtmlBlock: this.renderHtmlBlock5
                        }}
                    />
                  </div>
                </div>
                
              {/* {featuredSkills.map(item => (
                  <div>{item.demoVideo}</div>
              ))} */}
              
              
              {/* {featuredSkills.map((featuredSkillTitleObj, index) =>(
                  <div key={index} className={s.skills__sliderFormWrapper} id="slideForm">
                  <div className={s.skills__formWrapper}>
                    <ReactMarkdown
                        className={s.articleTemplatePage__content}
                        source={featuredSkillTitleObj.demoVideo}
                        renderers={{
                          Image: this.renderImage,
                          HtmlBlock: this.renderHtmlBlock5
                        }}
                    />
                  </div>
                </div>
              ))} */}
               
            </div>
          </div>
        </div>
        {/* <div className={s.skills__callToAction} id="form-wrapper">
          <div className={s.skills__container}>
            <div className={s.skills__formWrapper}>
              <h2>Schedule a demo today</h2>
              <div id="hubspotForm"></div>
            </div>
          </div>
        </div> */}
        <div className={s.skills__needAndHelp}>
        <div className={s.skills__xlVisible}>
          <div className={s.skills__container}>
              <div className={s.skills__needAndHelpWrapper}>
              {/* <div id="hubspotForm2"></div> */}
                  <div className={s.skills__listNeeded}>
                    <h2>Key Decisions Needed</h2>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={keyDecisionNeeded}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock
                      }}
                    />
                  </div>
                  <div className={s.skills__listHelp}>
                    <h2>How Aera Helps</h2>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={howAeraHelps}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock2
                      }}
                    />
                  </div>
              </div>
            </div>
        </div>
          
          <div className={s.skills__xsVisible}>
            <div className={s.skills__container}>
              <div className={s.skills__needAndHelpWrapperMobile}>
                <div className={s.skills__listNeededMobile}>
                  <h2>Key Decisions Needed</h2>
                    <ReactMarkdown
                      className={s.articleTemplatePage__content}
                      source={neededDecisionsAndAeraHelpsMobile}
                      renderers={{
                        Image: this.renderImage,
                        HtmlBlock: this.renderHtmlBlock2
                      }}
                    />
                  </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className={s.skills__relatedSkills}>
          <div className={s.skills__relatedSkillsContainer}>
            <h2>
              Related Skills
            </h2>
            <div className={s.skills__relatedSkillsRow}>
              {relatedSkills.map((
                relatedSkillsObj, index) =>(
                <a href={relatedSkillsObj.relatedSkillsLink} key={index} className={s.skills__relatedSkillsBox}>
                  <p><img alt="icon" src={relatedSkillsObj.skillsIcon.file.url} className={s.skills__skillIcon}/></p>
                  <h3>{relatedSkillsObj.relatedSkillTitle.replace(/-/g, ' ')}</h3>
                  <p>{relatedSkillsObj.relatedSkillDescription}</p>
                  <div className={s.skills__relatedSkillsArrow}><img alt="arrow open" src={arrowOpen}/></div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={s.skills__relatedResources}>
          <div className={s.skills__relatedResourcesContainer}>
            <h2>
              Related Resources
            </h2>
            <div className={s.skills__relatedResourcesRow}>
                {relatedResources 
                .map((
                  relatedResourcesObj, index) => (
                  <a href={relatedResourcesObj.link} target="_blank" key={index} className={s.skills__relatedResourceCard}>
                    <div className={s.skills__relatedResourceImage} style={{backgroundImage: `url(${relatedResourcesObj.image.file.url})`}} ></div>
                    <div className={s.skills__relatedResourcesCardWrapper}>
                      <div className={s.skills__relatedResourceType}>{relatedResourcesObj.type}</div>
                      <h3 className={s.skills__relatedResourceTitle}>{relatedResourcesObj.title}</h3>
                      <p className={s.skills__relatedResourceDescription}>{relatedResourcesObj.text}</p>
                    </div>
                  </a>
                ))}
            </div>
            
          </div>
        </div>
        <div className={s.skills__callToAction}>
          <div className={s.skills__container}>
            <div className={s.skills__formWrapper}>
              <h2>Schedule A Live Demo Today</h2>
              <a href="/demo" className={s.skills__scheduleDemoBtn}>Schedule Demo</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
