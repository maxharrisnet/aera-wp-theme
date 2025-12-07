import React, { Component } from "react";

import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Page from "components/page";
import s from "./AeraHub25NYandLondon.scss";
import AeraLogo1 from "assets/images/aerahub2025/AERAHUB24_LOGO.png";
import AeraLogoSVG from "!file-loader!assets/images/aerahub2025/AeraHUB25logoblack.svg";
// import HeroVideo from "assets/images/aerahub2025/NY_London_bgVideo.mp4";
import HeroVideo from "assets/images/aerahub2025/aerahubBGVideo.mp4";

import HeroLogo from "!file-loader!assets/images/aerahub2025/AeraHUB25logowhite.svg";

import NYVector from "assets/images/aerahub2025/NYbg.png";
import LondonVector from "assets/images/aerahub2025/Londonbg.png";

import ArrowRight from "!file-loader!assets/images/aerahub2025/Arrowblue.svg";
import ArrowRightWhite from "!file-loader!assets/images/aerahub2025/arrowwhite.svg";






import LinkedinIcon from 'assets/images/aerahub2024/LinkedIn.png';
import TwitterIcon from 'assets/images/aerahub2024/Twitter.png';
import YoutubeIcon from 'assets/images/aerahub2024/Youtube.png';


export default class AeraHub25NYandLondon extends Component {

  componentDidUpdate() {
    if(window.location.pathname == '/aerahub'){
       $('#headnav').hide();
       //$('#footer').hide();
    }
    // else if(window.location.pathname != '/aerahub-2025'){
    //   $('#headnav').show();
    //   $('#footer').show();
    // }
  }

  componentDidMount() {
    
    // $("#testdrivebtn, #register, #registertoday, #saveseat").click(function() {
    //   $('html, body').animate({
    //       scrollTop: $("#ddmslider").offset().top
    //   }, 1000);
    // })
    // if($(window).width() < 1180){
    //   var height = $('#fullheight').height() + 200;
    //   $('#myVideo').css('height', height);
    // }
    // if($(window).width() < 960){
    //   var height = $('#fullheight').height() + 200;
    //   $('#myVideo').css('height', height);
    // }
    // if($(window).width() <= 720){
    //   var height = $('#fullheight').height() + 200;
    //   $('#myVideo').css('height', height);
    // }
    
    

    $("#registerbtn").click(function() {
      $('html, body').animate({
          scrollTop: $("#scrollForm").offset().top - 100
      }, 1000);
    })

    
  //   $("#hideMe").on("contextmenu",function(e){
  //     return false;
  //  }); 

    // const script = document.createElement('script');
    //   script.src = 'https://js.hsforms.net/forms/embed/v2.js';
    //   document.body.appendChild(script);
      
    //   script.addEventListener('load', () => {
    //       if(window.hbspt) {
    //         window.hbspt.forms.create({
    //         portalId: '4455954',
    //         formId: 'f3905e25-4190-48d3-8fdf-2ed25e839c7c',
    //         target: '#testdriveForm', 
    //       })
    //     }
    //   });

      // const script2 = document.createElement('script');
      // script2.src = 'https://js.hsforms.net/forms/embed/v2.js';
      // document.body.appendChild(script2);
      
      // script2.addEventListener('load', () => {
      //     if(window.hbspt) {
      //       hbspt.forms.create({
      //         portalId: "4455954",
      //         formId: "0cec06f1-bb44-4fea-b9c5-90ed3ab51f5c",
      //         region: "na1",
      //         target: '#stickyform'
      //       });
      //       window.hbspt.forms.create({
      //       portalId: '4455954',
      //       formId: 'f3905e25-4190-48d3-8fdf-2ed25e839c7c',
      //       target: '#stickyform', 
      //       onFormSubmit: function($form) {
      //         $('#hideMe').hide(300);
      //         $('#removeBlurr').css('filter','blur(0px)')
      //       } 
      //     })
      //   }
      // });

      

        if(window.location.pathname == '/aerahub'){
          $('#headnav').hide();
          //$('#footer').hide();
        }
        // else if(window.location.pathname != '/aerahub-2025'){
        //   $('#headnav').show();
        //   //$('#footer').show();
        // }

        // let searchParams = new URLSearchParams(window.location.search)
        // searchParams.has('access') // true
        // let paramId = searchParams.get('access');
        // if(paramId == 'direct'){
        //   $('#hideMe').hide();
        //   $('#removeBlurr').css('filter','blur(0px)')
        // }

        // window.addEventListener("resize", this.handleResize);

        
        //   var position = $(window).scrollTop(); 
        //   $(window).scroll(function() {
        //     var scroll = $(window).scrollTop();
        //       if(scroll <=0 && position <=0){
        //           $("#aeraLogo").css("background-color", "transparent");
        //       }
        //       else if(scroll > position && scroll != 0) {
        //           $("#aeraLogo").css("background-color", "#fff");
        //           $("#white").hide();
        //           $("#black").show();
        //       } 
        //       else if(scroll == 0){
        //         $("#aeraLogo").css("background-color", "transparent");
        //         $("#white").show();
        //         $("#black").hide();
        //       }
        //       else if(scroll <= 100){
        //         $("#aeraLogo").css("background-color", "transparent");
        //         $("#white").show();
        //         $("#black").hide();
        //       }
        //       else {
        //           $("#aeraLogo").css("background-color", "#fff");
        //           $("#black").show();
        //           $("#white").hide();
        //       }
        //       position = scroll;
        //   });
  }

  render() {
    
    return (
      <Page>
        <Helmet
          title="AeraHUB 2025 – Decision Intelligence Summit"
          meta={[
            {
              name: "description",
              content:
                "Join AeraHUB in New York or London for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making."
            },
            {
              property: "og:description",
              content:
                "Join AeraHUB in New York or London for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making."
            },
            {
              name: "twitter:description",
              content:
                "Join AeraHUB in New York or London for the premier event in decision intelligence, exploring the deployment of AI to automate business decision-making."
            },
            {
              property: "twitter:image",
              content: "https://images.ctfassets.net/mh1amgo8m7ts/5sSlWRqRtqPnOpKSSsqQnT/41d6924fcb8bb47f2b21097eafdbc635/Open_graph_-_all.png"
            },
            {
              property: "og:image",
              content: "https://images.ctfassets.net/mh1amgo8m7ts/5sSlWRqRtqPnOpKSSsqQnT/41d6924fcb8bb47f2b21097eafdbc635/Open_graph_-_all.png"
            },
          ]}
        />
        
        <div className={s.ddm}>
          {/* <div className={s.ddm__overlaywrapper} id="hideMe">
            
            <div className={s.ddm__overlay}>
              <div className={s.ddm__overlayFormWrapper}>
                <div className={s.ddm__overlayForm}>
                    <p>
                      Enter your email below to receive full access to the complete library of AeraHub 24 video content.
                    </p>
                    <div className={s.ddm__formBox}>
                      <div id="stickyform"></div>
                    </div>
                </div>
              </div>
            </div>
          </div> */}
          
          <div className={s.ddm__header} id="aeraLogo">
            <div className={s.ddm__headerContainer}>
              <div className={s(s.ddm__row, s.ddm__headerRow)}>
                  <div>
                    <Link to="/" className={s.ddm__logo} onClick={this.closeNav} aria-label="Aera">
                      <img alt="aera logo white" src={AeraLogoSVG} className={s.header__logoImage} id="white" />
                      {/* <AeraLogoSVG /> */}
                      <span>London, 11 June<br/> New York & Virtual, November 4</span>
                    </Link>
                  </div>
                  {/* <div>
                      <a href="javascript:;" className={s.ddm__registerbtn} id="registerbtn">Register Now</a>
                  </div> */}
              </div>
            </div>
          </div>
          
            
          <div className={s.ddm__section1}>
            <video autoPlay muted loop id="myVideo" width="100%">
              <source src={HeroVideo} type="video/mp4"/>
            </video>
            {/* <div className={s.ddm__videoWrapper}>
              <div className={s.ddm__videoBox}>

              </div>
            </div> */}
            <div className={s.ddm__absoluteWrapper} id="fullheight">
              <div className={s.ddm__taglinerow}>
                <div className={s.ddm__herotagline}>
                    <img src={HeroLogo} />
                    <h1>The Decision Intelligence Summit</h1>
                    <p>Aera's annual global summit returns to New York City — experience it live or virtually. Also, new for 2025: Our first-ever AeraHUB in London. Join us as we unveil the future of decision automation.</p>
                </div>
                <div className={s.ddm__tileWrapper}>
                  <div className={s.ddm__tileContainer}>
                    {/* <div>
                        <a href="https://www.aeratechnology.com/aerahub-2025-london" target="_blank"><img src={LondonTile}/></a>
                    </div>
                    <div>
                      <a href="https://www.aeratechnology.com/aerahub-2025" target="_blank"><img src={NYTile}/></a>
                    </div> */}
                    <a href="/aerahub-2025-london" target="_blank" className={s(s.ddm__tileBox, s.ddm__tileBoxBlue)}>
                      <div className={s.ddm__tileDate}>11 June 2025</div>
                      <div className={s.ddm__tileName}>
                        <span>London, UK</span>
                        <img className={s.moveArrow} src={ArrowRight}/>
                      </div>
                      <div className={s.ddm__tileVector}><img src={LondonVector} /></div>
                    </a>
                    <a href="/aerahub-2025" target="_blank" className={s.ddm__tileBox}>
                      <div className={s.ddm__tileDate}>November 4, 2025</div>
                      <div className={s.ddm__tileName}>
                        <span>New York & Virtual Annual Global Summit</span>
                        <img className={s.moveArrow} src={ArrowRight}/>
                      </div>
                      <div className={s.ddm__tileVector}><img src={NYVector} /></div>
                    </a>
                  </div>
                  <a href="https://www.aeratechnology.com/aerahub-2024?access=direct" target="_blank" className={s.ddm__replayButtonWrapper}>
                    <div className={s.ddm__replayButton}>
                      <span>Replay AeraHUB24 sessions</span>
                      <img className={s.arrowRightWhite} src={ArrowRightWhite} />
                    </div>
                  </a>
                </div> 
              </div>
              
              
            </div>  
          </div>
          {/* <div className={s.ddm__section2}>
            <div className={s.ddm__container}>
                <div className={s.ddm__section2div1}>
                  <div className={s.ddm__formWrapper} id="scrollForm">
                    <h3>Pre-register now.</h3>
                    <p>Secure your spot for the virtual experience and be first in line for in-person registration when it opens.</p>
                    <div className={s.ddm__formBox}>
                      <div id="stickyform"></div>
                    </div>
                  </div>
                </div>
            </div>
          </div> */}
        
          
          
          {/* <div className={s.ddm__registersection}>
            <div className={s.ddm__container}>
              <div className={s.ddm__registersectionwrapper}>
                <h2>What to expect</h2> 
                <p>Watch last year’s AeraHub to get inspired.</p>
                <div className={s.ddm__footerbutton}>
                  <a 
                      href="/aerahub-2024?access=direct"
                      className={s.ddm__registercta}
                      target="_blank"
                    >
                        Explore AeraHUB 24
                    </a>
                </div>
              </div>
            </div>
          </div> */}
          
          
          
          {/* <div className={s.ddm__clearfix}></div> */}
          {/* <div className={s.ddm__ctasection}>
            <div className={s(s.ddm__container)}>
                <div className={s.ddm__socialIcons}>
                    <a href="https://www.linkedin.com/company/aera-technology/" target="_blank"><img alt="Linkedin" src={LinkedinIcon} /></a>
                    <a href="https://x.com/Aera_Technology" target="_blank"><img alt="Twitter" src={TwitterIcon} /></a>
                    <a href="https://www.youtube.com/@AeraTechnology" target="_blank"><img alt="Youtube" src={YoutubeIcon} /></a>
                </div>
                <p>
                <a href="https://www.aeratechnology.com/" target="_blank">Aera Technology</a> | 707 California St, Mountain View, CA 94041
                </p>
                
            </div>
          </div> */}
        
        </div>
      </Page>
    );
  }
}
