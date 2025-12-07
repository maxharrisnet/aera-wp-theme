import React, { Component } from "react";

import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import Page from "components/page";
import s from "./AeraHub25LondonOnDemand.scss";
//import AeraLogo1 from "assets/images/aerahub2024/AeraLogo_whiteText.png";
import AeraLogo2 from "assets/images/AeraLogo_Full-Black_H_RGBnew.png";


// import ddmImage from 'assets/images/DDM_CIRLCES.png';
// import aeraskills from 'assets/images/aeraskills.jpg';
// import insight from 'assets/images/TD_Insights_screen.jpg';
// import reccomendations from 'assets/images/TD_recommendation_screen.jpg';
// import MSD from 'assets/images/customers/msdAnimalHealth.png';

import LinkedinIcon from 'assets/images/aerahub2024/LinkedIn.png';
import TwitterIcon from 'assets/images/aerahub2024/Twitter.png';
import YoutubeIcon from 'assets/images/aerahub2024/Youtube.png';
import Fred from 'assets/images/aerahub2024/FRED1.png';
import Lalitha from 'assets/images/aerahub2024/LALITHA1.png';
import Mustafa from 'assets/images/aerahub2024/Mustafa1.png';
// import Naveen from 'assets/images/aerahub2024/Naveen1.png';
// import Sean from 'assets/images/aerahub2024/Sean.png';
import Joe from 'assets/images/aerahub2024/Joe_Dery_WGU.png';
import Ray from 'assets/images/aerahub2024/RayWang.png';
import Wendy from 'assets/images/aerahub2024/WendyMannon.png';
import Gonzalo from 'assets/images/aerahub2024/Gonzalo.png';
import LAURENT from 'assets/images/aerahub2024/LAURENT.png';



import RayWangStage from 'assets/images/aerahub2024/Ray_Thumbnail.png';
import SashaFred from 'assets/images/aerahub2024/Dell_Thumbnail.png';
import ArjunFred from 'assets/images/aerahub2024/Kraft_thumbnail.png';
import GonzalezLuis from 'assets/images/aerahub2024/Becle_thumbnail.png';
import FredMustafastage from 'assets/images/aerahub2024/Fred_Mustafa_stage.png';
import Futureofworkthumb from 'assets/images/aerahub2024/Futureofworkthumb.png';
import IndustryLeaders from 'assets/images/aerahub2024/IndustryLeaders.png';
import LisaJohnston from 'assets/images/aerahub2024/LisaJohnston.png';
import LouisPeacock from 'assets/images/aerahub2024/LouisPeacock.png';
// import EvgenyKrapovitskiy from 'assets/images/aerahub2024/EvgenyKrapovitskiy.png';

// import PaulIves from 'assets/images/aerahub2024/PaulIves.png';
// import JoeFuler from 'assets/images/aerahub2024/JoeFuler.png';
import LuisGonzalez from 'assets/images/aerahub2024/LuisGonzalez.png';
// import kraftheinz from 'assets/images/aerahub2024/KraftHeinz_logo.png';
// import Brian from 'assets/images/aerahub2024/brianevergreen.png';
// import livenetworkingimg from 'assets/images/aerahub2024/livenetworking.png';
// import Anonymous from 'assets/images/aerahub2024/Anonymous.png';
// import AlexNasciutti from 'assets/images/aerahub2024/AlexNasciutti.png';
// import GualtieroCerrato from 'assets/images/aerahub2024/GualtieroCerrato.png';
// import JuanCarlosParadaUnilever from 'assets/images/aerahub2024/JuanCarlosParadaUnilever.png';
// import deloitteAnonymous from 'assets/images/aerahub2024/deloitteAnonymous.png';
// import EYAnonymous from 'assets/images/aerahub2024/EYAnonymous.png';
// import KraftHeinzAnonymous from 'assets/images/aerahub2024/KraftHeinzAnonymous.png';
// import constellationresearch from 'assets/images/aerahub2024/constellationresearch.png';
// import WGU from 'assets/images/aerahub2024/WGU.png';
// import baxterhealthcare from 'assets/images/aerahub2024/baxterhealthcare.png';
// import cgt from 'assets/images/aerahub2024/cgt.png';
// import deloittelogo from 'assets/images/aerahub2024/deloittelogo.png';
// import eylogo from 'assets/images/aerahub2024/eylogo.png';
// import futuresolving from 'assets/images/aerahub2024/futuresolving.png';
// import HBS from 'assets/images/aerahub2024/HBS.png';
// import Infrabuild from 'assets/images/aerahub2024/Infrabuild.png';
// import KraftHeinz_Logonew from 'assets/images/aerahub2024/KraftHeinz_Logonew.png';
// import Merck from 'assets/images/aerahub2024/Merckanimalhealth.webp';
// import becle from 'assets/images/aerahub2024/becle.png';
// import UNILEVER from 'assets/images/aerahub2024/UNILEVER.png';
// import PhilipMorrisLogo from 'assets/images/aerahub2024/PhilipMorrisLogo.png';
// import jdirving from 'assets/images/aerahub2024/jdirving.webp';
// import tetagan from 'assets/images/aerahub2024/tetagan.png';
// import ram from 'assets/images/aerahub2024/RAM.png';
import kannan from 'assets/images/aerahub2024/kannan.png';
// import evcar from 'assets/images/aerahub2024/electriccar.png';
// import hotel from 'assets/images/aerahub2024/housekeeping.png';
import accenturelogo from 'assets/images/aerahub2024/Accenture_logo.png';
import Deloittesponsor from 'assets/images/aerahub2024/Deloittesponsor.png';
import eylogosponsor from 'assets/images/aerahub2024/eylogosponsor.png';
// import Jeroen from 'assets/images/aerahub2024/Jeroen.png';
// import kaysen from 'assets/images/aerahub2024/kaysen.png';
// import kevin from 'assets/images/aerahub2024/kevin.png';
// import SaradaDalai from 'assets/images/aerahub2024/SaradaDalai.png';
// import shailanderdagar from 'assets/images/aerahub2024/shailanderdagar.png';
// import JennieSanders from 'assets/images/aerahub2024/JennieSanders.png';
// import FoliaGrace from 'assets/images/aerahub2024/FoliaGrace.png';
import SASHA from 'assets/images/aerahub2024/SASHA.png';
// import DellLogo from 'assets/images/aerahub2024/Dell_logo.png';
import Accenture_tile from 'assets/images/aerahub2025/Accenture_tile.png';
import Castrol_tile from 'assets/images/aerahub2025/Castrol_tile.png';
import Fred_tile from 'assets/images/aerahub2025/Fred_tile.png';
import PMI_tile from 'assets/images/aerahub2025/PMI_tile.png';
import Unilever_tile from 'assets/images/aerahub2025/Unilever_tile.png';
import AeraLogo1 from "assets/images/aerahub2025/AERAHUB24_LOGO.png";
import HeroLogo25 from "assets/images/aerahub2025/AERAHUB25.png";
import AeraWhiteLogo from "assets/images/aerahub2025/AeraHUB25logowhite.png";
import zsLogo from "assets/images/aerahub2025/zs_logo_sponsor.png";
import AZ_tile from "assets/images/aerahub2025/AZ_tile.png";




















export default class AeraHub25LondonOnDemand extends Component {

  componentDidUpdate() {
    if(window.location.pathname == '/aerahub-2024'){
       $('#headnav').hide();
       $('#footer').hide();
    }
    else if(window.location.pathname != '/aerahub-2024'){
      $('#headnav').show();
      $('#footer').show();
    }
  }

  componentDidMount() {
    
    $("#testdrivebtn, #register, #registertoday, #saveseat").click(function() {
      $('html, body').animate({
          scrollTop: $("#keynote").offset().top
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

      const script2 = document.createElement('script');
      script2.src = 'https://js.hsforms.net/forms/embed/v2.js';
      document.body.appendChild(script2);
      
      script2.addEventListener('load', () => {
          if(window.hbspt) {
            window.hbspt.forms.create({
            portalId: "4455954",
            formId: "5348ec0a-1785-4bdf-a47a-fe7e779a4e1a",
            sfdcCampaignId: "701Rb00000Oi4BvIAJ",
            target: '#stickyform', 
            onFormSubmit: function($form) {
              $('#hideMe').hide(300);
              $('#removeBlurr').css('filter','blur(0px)')
            } 
          })
        }
      });

      

        if(window.location.pathname == '/aerahub-2025-london'){
          $('#headnav').hide();
          $('#footer').hide();
        }
        else if(window.location.pathname != '/aerahub-2025-london'){
          $('#headnav').show();
          $('#footer').show();
        }

        let searchParams = new URLSearchParams(window.location.search)
        searchParams.has('access') // true
        let paramId = searchParams.get('access');
        //console.log(paramId)
        if(paramId == 'direct'){
          //console.log('hit');
          $('#hideMe').hide();
          $('#removeBlurr').css('filter','blur(0px)')
        }

        const openPopupUnilever = document.getElementById("openPopupUnilever");
        const closePopupUnilever = document.getElementById("closePopupUnilever");
        const videoPopupUnilever = document.getElementById("videoPopupUnilever");

        const openPopupPMI = document.getElementById("openPopupPMI");
        const closePopupPMI = document.getElementById("closePopupPMI");
        const videoPopupPMI = document.getElementById("videoPopupPMI");

        const openPopupCastrol = document.getElementById("openPopupCastrol");
        const closePopupCastrol = document.getElementById("closePopupCastrol");
        const videoPopupCastrol = document.getElementById("videoPopupCastrol");

        const openPopupAstraZeneca = document.getElementById("openPopupAstraZeneca");
        const closePopupAstraZeneca = document.getElementById("closePopupAstraZeneca");
        const videoPopupAstraZeneca = document.getElementById("videoPopupAstraZeneca");

        const openPopupAccenture = document.getElementById("openPopupAccenture");
        const closePopupAccenture = document.getElementById("closePopupAccenture");
        const videoPopupAccenture = document.getElementById("videoPopupAccenture");

        const openPopupFred = document.getElementById("openPopupFred");
        const closePopupFred = document.getElementById("closePopupFred");
        const videoPopupFred = document.getElementById("videoPopupFred");

        const videoPlayer = document.getElementById("videoPlayer");
        const toggleMenu = document.getElementById("toggleMenu");

        openPopupUnilever.addEventListener("click", () => {
            //videoPopup.classList.add("active");
            document.getElementById("videoPopupUnilever").style.display = "flex";
            // videoPlayer.play();
            document.getElementById("vimeoVideoUnilever").src += "&autoplay=1";
        });

        closePopupUnilever.addEventListener("click", () => {
            document.getElementById("videoPopupUnilever").style.display = "none";
            // videoPlayer.pause();
            document.getElementById("vimeoVideoUnilever").src = document.getElementById("vimeoVideoUnilever").src.replace("&autoplay=1", "");
            //document.getElementById("vimeoVideo").src += "&autoplay=0";
        });

        videoPopupUnilever.addEventListener("click", (e) => {
            if (e.target === videoPopupUnilever) {
                document.getElementById("videoPopupUnilever").style.display = "none";
                // videoPlayer.pause();
                document.getElementById("vimeoVideoUnilever").src = document.getElementById("vimeoVideoUnilever").src.replace("&autoplay=1", "");
                //document.getElementById("vimeoVideo").src += "&autoplay=0";
            }
        });

        openPopupPMI.addEventListener("click", () => {
            //videoPopup.classList.add("active");
            document.getElementById("videoPopupPMI").style.display = "flex";
            // videoPlayer.play();
            document.getElementById("vimeoVideoPMI").src += "&autoplay=1";
        });

        closePopupPMI.addEventListener("click", () => {
            document.getElementById("videoPopupPMI").style.display = "none";
            // videoPlayer.pause();
            document.getElementById("vimeoVideoPMI").src = document.getElementById("vimeoVideoPMI").src.replace("&autoplay=1", "");
            //document.getElementById("vimeoVideo").src += "&autoplay=0";
        });

        videoPopupPMI.addEventListener("click", (e) => {
            if (e.target === videoPopupPMI) {
                document.getElementById("videoPopupPMI").style.display = "none";
                // videoPlayer.pause();
                document.getElementById("vimeoVideoPMI").src = document.getElementById("vimeoVideoPMI").src.replace("&autoplay=1", "");
                //document.getElementById("vimeoVideo").src += "&autoplay=0";
            }
        });

        openPopupCastrol.addEventListener("click", () => {
          //videoPopup.classList.add("active");
          document.getElementById("videoPopupCastrol").style.display = "flex";
          // videoPlayer.play();
          document.getElementById("vimeoVideoCastrol").src += "&autoplay=1";
      });

      closePopupCastrol.addEventListener("click", () => {
          document.getElementById("videoPopupCastrol").style.display = "none";
          // videoPlayer.pause();
          document.getElementById("vimeoVideoCastrol").src = document.getElementById("vimeoVideoCastrol").src.replace("&autoplay=1", "");
          //document.getElementById("vimeoVideo").src += "&autoplay=0";
      });

      videoPopupCastrol.addEventListener("click", (e) => {
          if (e.target === videoPopupCastrol) {
              document.getElementById("videoPopupCastrol").style.display = "none";
              // videoPlayer.pause();
              document.getElementById("vimeoVideoCastrol").src = document.getElementById("vimeoVideoCastrol").src.replace("&autoplay=1", "");
              //document.getElementById("vimeoVideo").src += "&autoplay=0";
          }
      });

      openPopupAccenture.addEventListener("click", () => {
        //videoPopup.classList.add("active");
        document.getElementById("videoPopupAccenture").style.display = "flex";
        // videoPlayer.play();
        document.getElementById("vimeoVideoAccenture").src += "&autoplay=1";
    });

    closePopupAccenture.addEventListener("click", () => {
        document.getElementById("videoPopupAccenture").style.display = "none";
        // videoPlayer.pause();
        document.getElementById("vimeoVideoAccenture").src = document.getElementById("vimeoVideoAccenture").src.replace("&autoplay=1", "");
        //document.getElementById("vimeoVideo").src += "&autoplay=0";
    });

    videoPopupAccenture.addEventListener("click", (e) => {
        if (e.target === videoPopupAccenture) {
            document.getElementById("videoPopupAccenture").style.display = "none";
            // videoPlayer.pause();
            document.getElementById("vimeoVideoAccenture").src = document.getElementById("vimeoVideoAccenture").src.replace("&autoplay=1", "");
            //document.getElementById("vimeoVideo").src += "&autoplay=0";
        }
    });

    openPopupAstraZeneca.addEventListener("click", () => {
      //videoPopup.classList.add("active");
      document.getElementById("videoPopupAstraZeneca").style.display = "flex";
      // videoPlayer.play();
      document.getElementById("vimeoVideoAstraZeneca").src += "&autoplay=1";
  });

  closePopupAstraZeneca.addEventListener("click", () => {
      document.getElementById("videoPopupAstraZeneca").style.display = "none";
      // videoPlayer.pause();
      document.getElementById("vimeoVideoAstraZeneca").src = document.getElementById("vimeoVideoAstraZeneca").src.replace("&autoplay=1", "");
      //document.getElementById("vimeoVideo").src += "&autoplay=0";
  });

  videoPopupAstraZeneca.addEventListener("click", (e) => {
      if (e.target === videoPopupAstraZeneca) {
          document.getElementById("videoPopupAstraZeneca").style.display = "none";
          // videoPlayer.pause();
          document.getElementById("vimeoVideoAstraZeneca").src = document.getElementById("vimeoVideoAstraZeneca").src.replace("&autoplay=1", "");
          //document.getElementById("vimeoVideo").src += "&autoplay=0";
      }
  });

  openPopupFred.addEventListener("click", () => {
    //videoPopup.classList.add("active");
    document.getElementById("videoPopupFred").style.display = "flex";
    // videoPlayer.play();
    document.getElementById("vimeoVideoFred").src += "&autoplay=1";
});

closePopupFred.addEventListener("click", () => {
    document.getElementById("videoPopupFred").style.display = "none";
    // videoPlayer.pause();
    document.getElementById("vimeoVideoFred").src = document.getElementById("vimeoVideoFred").src.replace("&autoplay=1", "");
    //document.getElementById("vimeoVideo").src += "&autoplay=0";
});

videoPopupFred.addEventListener("click", (e) => {
    if (e.target === videoPopupFred) {
        document.getElementById("videoPopupFred").style.display = "none";
        // videoPlayer.pause();
        document.getElementById("vimeoVideoFred").src = document.getElementById("vimeoVideoFred").src.replace("&autoplay=1", "");
        //document.getElementById("vimeoVideo").src += "&autoplay=0";
    }
});

        window.addEventListener("resize", this.handleResize);

        // if($(window).width() >= 1000){
          // var position = $(window).scrollTop(); 
          // $(window).scroll(function() {
          //   var scroll = $(window).scrollTop();
          //     if(scroll <=0 && position <=0){
          //         $("#aeraLogo").css("background-color", "transparent");
          //     }
          //     else if(scroll > position && scroll != 0) {
          //         $("#aeraLogo").css("background-color", "#fff");
          //         $("#white").hide();
          //         $("#black").show();
          //     } 
          //     else if(scroll == 0){
          //       $("#aeraLogo").css("background-color", "transparent");
          //       $("#white").show();
          //       $("#black").hide();
          //     }
          //     else if(scroll <= 100){
          //       $("#aeraLogo").css("background-color", "transparent");
          //       $("#white").show();
          //       $("#black").hide();
          //     }
          //     else {
          //         $("#aeraLogo").css("background-color", "#fff");
          //         $("#black").show();
          //         $("#white").hide();
          //     }
          //     position = scroll;
          // });
        // }
  }

  render() {
    
    return (
      <Page>
        <Helmet
          title="Aera Technology - AeraHUB 2025"
          meta={[
            {
              name: "description",
              content:
                "AeraHUB 2025 - The Decision Intelligence Summit"
            },
            {
              property: "og:description",
              content:
                "AeraHUB 2025 - The Decision Intelligence Summit"
            },
            {
              name: "twitter:description",
              content:
                "AeraHUB 2025 - The Decision Intelligence Summit"
            },
            {
              property: "twitter:image",
              content: "https://images.ctfassets.net/mh1amgo8m7ts/5cMk7MtNJRO948hayfPSdj/bce2c3ed9cdcc31c29c73ec02bfe70eb/Open_graph_-_London__1_.jpg"
            },
            {
              property: "og:image",
              content: "https://images.ctfassets.net/mh1amgo8m7ts/5cMk7MtNJRO948hayfPSdj/bce2c3ed9cdcc31c29c73ec02bfe70eb/Open_graph_-_London__1_.jpg"
            },
          ]}
        />
        
        <div className={s.ddm}>
        <div className={s.ddm__videoPopup} id="videoPopupUnilever">
            <div className={s.ddm__videoContainer}>
                <button className={s.ddm__closeBtn} id="closePopupUnilever">&times;</button>
                <iframe id="vimeoVideoUnilever" src="https://player.vimeo.com/video/1093289093?h=ffe19c7819&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
        <div className={s.ddm__videoPopup} id="videoPopupPMI">
            <div className={s.ddm__videoContainer}>
                <button className={s.ddm__closeBtn} id="closePopupPMI">&times;</button>
                <iframe id="vimeoVideoPMI" src="https://player.vimeo.com/video/1093195380?h=c7e06d0b90&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
        <div className={s.ddm__videoPopup} id="videoPopupCastrol">
            <div className={s.ddm__videoContainer}>
                <button className={s.ddm__closeBtn} id="closePopupCastrol">&times;</button>
                <iframe id="vimeoVideoCastrol" src="https://player.vimeo.com/video/1093239524?h=9f83f76092&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
        <div className={s.ddm__videoPopup} id="videoPopupFred">
            <div className={s.ddm__videoContainer}>
                <button className={s.ddm__closeBtn} id="closePopupFred">&times;</button>
                <iframe id="vimeoVideoFred" src="https://player.vimeo.com/video/1094181529?h=06861f8915&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
        <div className={s.ddm__videoPopup} id="videoPopupAccenture">
            <div className={s.ddm__videoContainer}>
                <button className={s.ddm__closeBtn} id="closePopupAccenture">&times;</button>
                <iframe id="vimeoVideoAccenture" src="https://player.vimeo.com/video/1094218563?h=2dc135ea3b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
        <div className={s.ddm__videoPopup} id="videoPopupAstraZeneca">
            <div className={s.ddm__videoContainer}>
                <button className={s.ddm__closeBtn} id="closePopupAstraZeneca">&times;</button>
                <iframe id="vimeoVideoAstraZeneca" src="https://player.vimeo.com/video/1093938881?h=d549b5fd3f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
        </div>
          <div className={s.ddm__overlaywrapper} id="hideMe">
            
            <div className={s.ddm__overlay}>
              <div className={s.ddm__overlayFormWrapper}>
                <div className={s.ddm__overlayForm}>
                    <p>
                      Enter your email below to receive full access to the complete library of AeraHub 25 video content.
                    </p>
                    <div className={s.ddm__formBox}>
                      <div id="stickyform"></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.ddm__bluroverlay} id="removeBlurr">
          <div className={s.ddm__header} id="aeraLogo">
            <div className={s.ddm__headerContainer}>
                <Link to="/" className={s.header__logo}>
                  <img alt="aera logo white" src={HeroLogo25} className={s.header__logoImage} id="white" />
                  <span>London, UK</span>
                  {/* <img alt="aera logo black" src={AeraLogo1} className={s.header__logoImage} id="black"  style={{ display: "none" }}/> */}
                </Link>
            </div>
          </div>
          
            
          <div className={s.ddm__section1}>
          <div className={s.ddm__imgbox}></div>
            <div className={s.ddm__container}>
              
              <div className={s.ddm__section1wrapper}>
                <div className={s.ddm__section1lefttext}>
                  <div className={s.ddm__flexwrapper}>
                    <img src={AeraWhiteLogo} />
                    {/* <div>
                      <img src={Sputnik} className={s.ddm__sputnik}/>
                    </div>
                    <h1 className={s.ddm__title}>
                      <div className={s.ddm__gilroy}>Aera</div>
                      <div className={s.ddm__freight}>HUB 24</div>
                    </h1> */}
                  </div>
                  
                  
                    <div className={s.ddm__subtitle}>
                      <h2>The Decision Intelligence Summit</h2>
                       <h3>Watch On-Demand</h3>
                      {/*<h4>Starting at 8:30 A.M. EST In-Person, 9:30 A.M. EST Online</h4> */}
                      <div className={s.ddm__footerbutton}>
                        <a 
                            href="javascript:;"
                            className={s.ddm__saveyourseat}
                            id="register"
                          >
                              Watch Now
                          </a>
                      </div>
                    </div>
                </div>
                <div className={s.ddm__clearfix}></div>
            </div>
            </div>
          </div>
          <div className={s.ddm__section2}>
            <div className={s.ddm__container}>
                <div className={s.ddm__section2div1}>
                  <h1 className={s.ddm__darkBlue}>Welcome to AeraHUB 25 On-Demand</h1>
                  <p>
                  AeraHUB 25 brought together innovators, thought leaders, and business pioneers leading the charge in digitizing and automating business decision-making with AI. Explore the full suite of on-demand content from the event, including keynote presentations, fireside chats, and sessions showcasing Aera’s cutting-edge innovations, real-world business impact, and skills demos.
                  </p>
                </div>
            </div>
            {/* <div className={s.ddm__sliderwrapper}>
              <div id="ddmslider">
                <div>
                  <div className={s.ddm__slidercontentwrapper}>
                    <div className={s.ddm__sliderimg}>
                      <iframe src="https://player.vimeo.com/video/1032056280?h=683572b24d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" width="550px" height="400px" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title="AeraHUB23 Highlights"></iframe>
                    </div>
                    <div className={s.ddm__slidercontent}>
                      <h2>AeraHUB 25 Recap Video</h2>
                      <h3>Get a glimpse of the best moments from the conference in this 8-minute highlight reel—your condensed overview of all the key highlights from AeraHUB 25!</h3>
                    </div>
                    <div className={s.ddm__clearfix}></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          
          
          
          {/* <div className={s.ddm__clearfix}></div> */}
          {/* <div className={s.ddm__industryExpertWrapper}>
            <div className={s(s.ddm__container, s.ddm__containerExpert)}>
              <div className={s.ddm__industryExpertBox}>
                  <div className={s.ddm__copy}>
                    <h3>Hear from industry experts.</h3>
                    <p>
                    Meet the technology experts, industry leaders, and business executives leading the revolution in AI-powered decision making and automation.
                    </p>
                  </div>
                  <div className={s.ddm__speakersWrapper}>
                    <div className={s.ddm__speaker}>
                      <img alt="Fred" src={Fred}/>
                      <p>
                        <span>Fred Laluyaux</span><br/>
                        President & CEO,<br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Ray Wang" src={Ray}/>
                      
                      <p>
                        <span>Ray Wang</span><br/>
                        Founder, Chairman, & Principal Analyst<br/>
                        
                      </p>
                      <div><img alt="Constellation Research" src={constellationresearch} className={s.ddm__companylogo50}/></div>
                    </div>
                    
                    <div className={s.ddm__speaker}>
                      <img alt="JuanCarlosParada" src={JuanCarlosParadaUnilever}/>
                      <p>
                        <span>Juan Carlos Parada</span><br/>
                        Executive Vice President - Global Customer Operations <br/>
                        
                      </p>
                      <div><img alt="UNILEVER" src={UNILEVER} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="LuisGonzalez" src={LuisGonzalez}/>
                      <p>
                        <span>Luis Eugenio Gonzalez Chan</span><br/>
                        Global Supply Chain Director <br/>
                        
                      </p>
                      <div><img alt="Becle" src={becle} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Georges Tetegan" src={tetagan}/>
                      <p>
                        <span>Georges Tetegan</span><br/>
                        Corporate Vice President - Project Control Tower <br/>
                        
                      </p>
                      <div><img alt="jdirving" src={jdirving} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="JennieSanders" src={JennieSanders}/>
                      <p>
                        <span>Jennie Sanders</span><br/>
                        Vice President of Instruction<br/>
                        
                      </p>
                      <div><img alt="Western Governors University School of Technology" src={WGU} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Joe" src={Joe}/>
                      <p>
                        <span>Joe Dery</span><br/>
                        Vice President and Dean of School of Technology<br/>
                        
                      </p>
                      <div><img alt="Western Governors University School of Technology" src={WGU} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Wendy Mannon" src={Wendy}/>
                      <p>
                        <span>Wendy Mannon</span><br/>
                        Executive Director IT Strategy and Operations<br/>
                        
                      </p>
                      <div><img alt="Merck" src={Merck} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="EvgenyKrapovitskiy" src={EvgenyKrapovitskiy}/>
                      <p>
                        <span>Evgeny Krapovnitskiy</span><br/>
                        Head of Supply Chain <br/>
                        
                      </p>
                      <div><img alt="Infra build" src={Infrabuild} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="GualtieroCerrato" src={GualtieroCerrato}/>
                      <p>
                        <span>Gualtiero Cerrato</span><br/>
                        Supply Chain Director <br/>
                        
                      </p>
                      <div><img alt="PhilipMorrisLogo" src={PhilipMorrisLogo} className={s.ddm__companylogo40}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="PaulIves" src={PaulIves}/>
                      <p>
                        <span>Paul Ives</span><br/>
                        Director of Integrated Supply Chain <br/>
                        
                      </p>
                      <div><img alt="baxter healthcare" src={baxterhealthcare} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="KraftHeinz" src={kannan}/>
                      <p>
                        <span>Arjun Kannan</span><br/>
                        Head of Digital Supply Chain and Analytics<br/>
                        
                      </p>
                      <div><img alt="The Kraft Heinz Company" src={KraftHeinz_Logonew} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Sasha" src={SASHA}/>
                      <p>
                        <span>Sasha Koff </span><br/>
                        Former SVP, Digital Supply Chain<br/>
                        
                      </p>
                      <div><img alt="Dell" src={DellLogo} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="JoeFuller" src={JoeFuler}/>
                      <p>
                        <span>Joe Fuller</span><br/>
                        Professor of Management Practice; Co-Director, Managing the Future of Work Initiative 
                        
                      </p>
                      <div><img alt="Harvard Business School" src={HBS} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Brian Evergreen" src={Brian}/>
                      <p>
                        <span>Brian Evergreen</span><br/>
                        CEO <br/>
                        
                      </p>
                      <div><img alt="The Future Solving Company" src={futuresolving} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Sarada Dalai" src={SaradaDalai}/>
                      <p>
                        <span>Sarada Dalai</span><br/>
                        Director Supply Chain & Operations<br/>
                        
                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Alex Nasciutti" src={AlexNasciutti}/>
                      <p>
                        <span>Alex Nasciutti</span><br/>
                        Principal Supply Chain & Operations<br/>
                        
                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Shailander Dagar" src={shailanderdagar}/>
                      <p>
                        <span>Shailander Dagar</span><br/>
                        Senior Manager Supply Chain & Operations<br/>
                        
                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Ryan Kaysen" src={kaysen}/>
                      <p>
                        <span>Ryan Kaysen</span><br/>
                        Partner Supply Chain & Operations<br/>
                        
                      </p>
                      <div><img alt="EY" src={eylogo} className={s.ddm__companylogo50}/></div>
                    </div>
                    
                    <div className={s.ddm__speaker}>
                      <img alt="Kevin Overdulve" src={kevin}/>
                      <p>
                        <span>Kevin Overdulve</span><br/>
                        Partner Supply Chain & Network Operations
                        
                      </p>
                      <div><img alt="Deloitte" src={deloittelogo} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Jeroen Nysen" src={Jeroen}/>
                      <p>
                        <span>Jeroen Nysen</span><br/>
                        Senior Manager Supply Chain & Network Operations
                        
                      </p>
                      <div><img alt="Deloitte" src={deloittelogo} className={s.ddm__companylogo20}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="LisaJohnston" src={LisaJohnston}/>
                      <p>
                        <span>Lisa Johnston </span><br/>
                        Editor-in-Chief <br/>
                        
                      </p>
                      <div><img alt="Consumer Goods Technology" src={cgt} className={s.ddm__companylogo35}/></div>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="LouisPeacock" src={LouisPeacock}/>
                      <p>
                        <span>Louis Peacock</span><br/>
                        Chief Customer Officer, <br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Gonzalo Benedit" src={Gonzalo}/>
                      <p>
                        <span>Gonzalo Benedit</span><br/>
                        Chief Revenue Officer, <br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Lalitha" src={Lalitha}/>
                      <p>
                        <span>Lalitha Sundaramurthy </span><br/>
                        Sr. Vice President,<br/>
                        Head of Product, <br/>Aera Technology
                      </p>
                    </div>
                    
                    <div className={s.ddm__speaker}>
                      <img alt="Mustafa" src={Mustafa}/>
                      <p>
                        <span>Mustafa Kabul </span><br/>
                        VP, Data Science & Machine Learning,<br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="Ram Krishnan" src={ram}/>
                      <p>
                        <span>Ram Krishnan </span><br/>
                        Global Head, Customer Success, <br/>
                        Aera Technology
                      </p>
                    </div>
                    <div className={s.ddm__speaker}>
                      <img alt="FoliaGrace" src={FoliaGrace}/>
                      <p>
                        <span>Folia Grace </span><br/>
                        Chief Marketing Officer, <br/>
                        Aera Technology
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </div> */}
          {/* <div className={s.ddm__clearfix}></div> */}
          
          {/* <div className={s.ddm__savetheseat}>
            <div className={s.ddm__container}>
              <div className={s.ddm__savetheseatwrapper}>
                <h2>Register Today!</h2>
                <div className={s.ddm__footerbutton}>
                  <a 
                      href="https://events.zoom.us/ev/AmG3EvdRVeDSVnhXJs8q4a4S7WM67oKSsCq_w0E4SBKI4E7f3a6z~Amxs2MOpLnvKIh255hmU4LIu85EN7IyZFEWVPAG2od9ji7HAB0SfAXC67Q"
                      className={s.ddm__saveyourseat}
                      target="_blank"
                    >
                        Save Your Seat
                    </a>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className={s.ddm__formSection} id="form-wrapper">
            <div className={s.ddm__container}>
              <div className={s.ddm__Formflexwrapper}>
                <div className={s.ddm__Formleft}>
                  <h2>Register now<br/> to watch on-demand</h2>
                  <p>Don’t miss the opportunity to learn from leaders and experts paving the way for Decision Intelligence.</p>
                </div>
                <div className={s(s.ddm__formwrapper)}>
                  <div className={s.ddm__Formleft}>
                    <div id="testdriveForm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className={s.ddm__clearfix}></div>
          <div className={s.ddm__keynotes} id="keynote">
            <div className={s.ddm__container}>
              <div className={s.ddm__keynotewrapper}>
                <h2>Highlights from the Keynote: Stories and Perspectives on the Impact of Decision Intelligence</h2>
                <p>
                In a series of fireside chats, these business champions and thought leaders highlighted the transformative potential of decision intelligence across industries, emphasizing innovation, scalability, and rapid time to value. Through their shared insights, discover the capacity of decision intelligence to revolutionize decision-making processes by enabling faster, smarter, and more accurate decisions across a wide array of applications.
                </p>
                
                <div className={s.ddm__keynotesboxwrapper}>
                    <a href="javascript:;" id="openPopupUnilever" className={s.ddm__keynotesbox}>
                      <img src={Unilever_tile} alt="Unilever_tile" />
                      <h4>How Unilever is envisioning the Autonomous Supply Chain with Agentic AI</h4>
                      {/* <p>AI is reshaping the workforce, and Decision Intelligence is crucial for staying competitive. Hear about:</p>
                      <ul>
                        <li><b>Emerging roles –</b> Learn about the new opportunities in the AI-driven landscape.</li>
                        <li><b>Upskill your teams –</b> Equip your workforce with the skills they need to thrive.</li>
                        <li><b>Stay ahead –</b> Ensure your team remains competitive in the evolving market.</li>
                      </ul> */}
                    </a>
                   
                    <a href="javascript:;" id="openPopupPMI" className={s.ddm__keynotesbox}>
                      <img src={PMI_tile} alt="PMI_tile" />
                      <h4>Warp-Speed Supply Chain: Decision Intelligence Powering PMI’s Smoke-Free Future</h4>
                      {/* <p>AI is reshaping the workforce, and Decision Intelligence is crucial for staying competitive. Hear about:</p>
                      <ul>
                        <li><b>Emerging roles –</b> Learn about the new opportunities in the AI-driven landscape.</li>
                        <li><b>Upskill your teams –</b> Equip your workforce with the skills they need to thrive.</li>
                        <li><b>Stay ahead –</b> Ensure your team remains competitive in the evolving market.</li>
                      </ul> */}
                    </a>
                    
                      <a href="javascript:;" id="openPopupCastrol" className={s.ddm__keynotesbox}>
                      <img src={Castrol_tile} alt="Castrol_tile" />
                      <h4>Accelerating Cross-Functional Agility BP-Castrol’s AI-Driven Supply Chain Transformation</h4>
                      {/* <p>Hear from companies like Kraft Heinz, Merck Animal Health, Western Governors University, and Becle as they share how Decision Intelligence is driving real business results:</p>
                      <ul>
                        <li><b>Reducing costs –</b> Streamlining operations with Decision Intelligence</li>
                        <li><b>Improving customer experience –</b> Enhancing customer interactions and satisfaction.</li>
                        <li><b>Sharpening decision-making –</b> Smarter, faster, and more informed decisions across their organizations.</li>
                        <li><b>Real-world insights –</b> Successes, challenges, and lessons learned.</li>
                        <li><b>Looking ahead –</b> What’s next in their Decision Intelligence journey.</li>
                      </ul> */}
                    </a>
                    
                    <a href="javascript:;" id="openPopupAstraZeneca" className={s.ddm__keynotesbox}>
                      <img src={AZ_tile} alt="AstraZeneca" />
                      <h4>Advancing Clinical Trials with Decision Intelligence at AstraZeneca</h4>
                      {/* <p>Hear from companies like Kraft Heinz, Merck Animal Health, Western Governors University, and Becle as they share how Decision Intelligence is driving real business results:</p>
                      <ul>
                        <li><b>Reducing costs –</b> Streamlining operations with Decision Intelligence</li>
                        <li><b>Improving customer experience –</b> Enhancing customer interactions and satisfaction.</li>
                        <li><b>Sharpening decision-making –</b> Smarter, faster, and more informed decisions across their organizations.</li>
                        <li><b>Real-world insights –</b> Successes, challenges, and lessons learned.</li>
                        <li><b>Looking ahead –</b> What’s next in their Decision Intelligence journey.</li>
                      </ul> */}
                    </a>
                    
                  <a href="javascript:;" id="openPopupAccenture" className={s.ddm__keynotesbox}>
                    <img src={Accenture_tile} alt="Accenture_tile" />
                    <h4>Next-Gen Supply Chain with Accenture - From Automation to Full Autonomy</h4>
                    {/* <p>Ray is pulling back the curtain on the state of Decision Intelligence and AI adoption. Get ready for an unfiltered take:</p>
                    <ul>
                      <li><b>What’s hype, what’s real –</b> Ray separates the noise from the real advancements.</li>
                      <li><b>Untangling the buzzwords –</b> AI, DI, GenAI, Agentic AI—what do they actually mean for your business?</li>
                      <li><b>Where companies are finding value –</b> Discover how organizations are truly leveraging AI today.</li>
                      <li><b>Investing for the next phase –</b> What’s the smart move for the future of AI and Decision Intelligence?</li>
                      <li><b>Agentic AI’s game-changing potential –</b> How this new frontier in AI is rewriting the rules?</li>
                    </ul> */}
                  </a>
                  
                  <a href="javascript:;" id="openPopupFred" className={s.ddm__keynotesbox}>
                    <img src={Fred_tile} alt="Fred_tile" />
                    <h4>Fred Laluyaux provides insights on the future of decision intelligence</h4>
                    {/* <p>Get an inside look at the game-changing updates in Aera Decision Cloud™:</p>
                    <ul>
                      <li><b>What’s New -</b> See how the latest innovations are boosting productivity.</li>
                      <li><b>Agentic AI -</b> Find out how Agentic AI shaking things up, solving bigger, messier decision-making challenges.</li>
                      <li><b>Unstructured Data -</b> Learn how to leverage unstructured data for decision-making.</li>
                      <li><b>Modeling -</b> Discover how to use Decision Intelligence for simulations and strategic decisions.</li>
                    </ul> */}
                  </a>
                  
                  
                </div>
              </div>
            </div>
          </div>
          <div className={s.ddm__clearfix}></div>
          
          {/* <div className={s.ddm__featuredsession} id="keynote">
            <div className={s.ddm__container}>
              <h2>Featured Sessions: Starting, Scaling, and Succeeding with the Aera Decision Cloud</h2>
              <div className={s.ddm__blurb}>Click on the session titles to watch the sessions on-demand.</div>
              <div className={s.ddm__featuredboxwrapper}>
                
                <a href="https://meet.aeratechnology.com/aerahub24/the-evolution-of-aera-and-decision-intelligence" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>Opening Keynote: The Evolution of Decision Intelligence (in the Age of AI)</div>
                  </div>
                    <div className={s.ddm__featuredspeakerwrapper}>
                      <div className={s.ddm__featuredsessionspeaker}>
                        <img src={Fred} alt="Fred"/>
                        <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                      </div>
                      
                    </div>
                </a>
                <a href="https://meet.aeratechnology.com/aerahub24/aera-ui-and-customer-experience" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>The Unveiling of Aera’s New People-Centric Platform</div>
                  </div>
                    <div className={s.ddm__featuredspeakerwrapper}>
                      <div className={s.ddm__featuredsessionspeaker}>
                        <img src={Fred} alt="Fred"/>
                        <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                      </div>
                      
                    </div>
                </a>
                
                <a href="https://meet.aeratechnology.com/aerahub24/product-demonstration-lalitha-mustafa" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>Revolutionizing Decision Intelligence: Product Team Demos of Aera’s Latest Innovations</div>
                  </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Lalitha} alt="Lalitha"/>
                      <p>Lalitha Sundaramurthy,<br/> Sr. Vice President of Products,<br/> Aera Technology</p>
                    </div>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Mustafa} alt="Mustafa"/>
                      <p>Mustafa Kabul,<br/> Vice President of Data Science & Machine Learning<br/> Aera Technology</p>
                    </div>
                  </div>
                </a>
                <a href="https://meet.aeratechnology.com/aerahub24/the-real-impact-of-decision-intelligence-at-merck" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>From Analytics to Action: Merck Animal Health’s Data-Driven Evolution</div>
                  </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Wendy} alt="Wendy"/>
                      <p>Wendy Mannon,<br/> Executive Director IT Strategy and Operations,<br/> Merck</p>
                    </div>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Fred} alt="Fred"/>
                      <p>Fred Laluyaux,<br/> President & CEO,<br/> Aera Technology</p>
                    </div>
                  </div>
                </a>
                
                
                <a href="https://meet.aeratechnology.com/aerahub24/keynote-session-with-joe-dery-of-wgu" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>Revolutionizing Education with Decision Intelligence: WGU’s Journey</div>
                  </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={Joe} alt="Joe"/>
                      <p>Joe Dery,<br/> Vice President – Dean of Data Analytics, Computer Science, & Software Engineering,<br/> Western Governors University</p>
                    </div>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={LouisPeacock} alt="LouisPeacock"/>
                      <p>Louis Peacock,<br/> Chief Customer Officer,<br/> Aera Technology</p>
                    </div>
                  </div>
                </a>
                <a href="https://meet.aeratechnology.com/aerahub24/starting-and-scaling-with-aera-laurent-lefouet" target="_blank" className={s.ddm__featuredsessionbox}>
                  <div className={s.ddm__featuredsessiontitlewrapper}>
                    <span className={s.ddm__circle}><span className={s.ddm__playbtn}></span></span>
                    <div className={s.ddm__featuredsessiontitle}>Building a Roadmap to Decision Intelligence: From Pilot to Scale</div>
                  </div>
                  <div className={s.ddm__featuredspeakerwrapper}>
                    <div className={s.ddm__featuredsessionspeaker}>
                      <img src={LAURENT} alt="LAURENT"/>
                      <p>Laurent Lefouet,<br/>Chief Strategy Officer,<br/> Aera Technology</p>
                    </div>
                    
                  </div>
                </a>
              
              </div>
            </div>
          </div> */}
          <div className={s.ddm__registersection}>
            <div className={s.ddm__container}>
              <div className={s.ddm__registersectionwrapper}>
                <h2>Schedule a Demo of the Aera Decision Cloud</h2> 
                <div className={s.ddm__footerbutton}>
                  <a 
                      href="/demo"
                      className={s.ddm__registerbtnblue}
                      target="_blank"
                    >
                        Schedule Now
                    </a>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={s.ddm__clearfix}></div> */}
          {/* <div className={s.ddm__livenetworking}>
            <div className={s.ddm__container}>
            <div className={s.ddm__livenetworkingtext}>
              <h3>Advantages to Attending in Person</h3>
              <p>
              As a hybrid event, portions of AeraHUB 2025 will be available for registrants to access virtually. But there are numerous advantages to attending the conference in New York in person:
              </p>
              <ul>
                <li><b>Connect with Aera Experts</b> on Decision Intelligence to get in-depth answers to your questions, face to face. </li>
                <li><b>Explore Live Demos</b> to get an insider’s look into the Aera Decision Cloud platform’s game-changing updates. </li>
                <li><b>Access the Customer Forum</b> to deep dive with our Product and Data Science leadership into the 2025 Platform Roadmap.</li>
                <li><b>Engage with Partners</b> to get advice on how to start your journey into Decision Intelligence, and learn best practices and the top use cases in your industry.</li>
                <li><b>Network with Peers, Partners, and Experts</b> over breakfast, lunch, and a cocktail reception at <a href="https://www.littlewaysnyc.com/" target="_blank">Little Ways</a>, hosted by our platinum sponsor, Ernst & Young. Join us for an evening of conversation, shared experiences, and new connections while discussing the latest in Decision Intelligence and enjoying great food and drinks.</li>
              </ul>
            </div>
            </div>
            <div className={s.ddm__clearfix}></div>
            <div className={s.ddm__agendaWrapper}>
              <div className={s.ddm__container}>
                <h2>Live Event Agenda</h2>
                <div className={s.ddm__agendaBox}>
                    <table className={s.ddm__agendaTable} cellpadding="0" cellspacing="0">
                      <tr>
                        <td className={s.ddm__lightBlueTable}>8:30 A.M. - 9:15 A.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Breakfast</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__darkBlueTable}>9:30 A.M. - 12:00 P.M EST</td>
                        <td className={s.ddm__grayTable}><b>Keynote</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__lightBlueTable}>12:00 P.M. - 1:30 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Lunch</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__darkBlueTable}>1:30 P.M. - 4:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Customer Forum</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__lightBlueTable}>4:00 P.M. - 7:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Cocktail Reception</b></td>
                      </tr>
                      
                    </table>
                </div>
            </div>
              <div className={s.ddm__clearfix}></div>
          </div>
          <div className={s.ddm__agendaWrapper}>
              <div className={s.ddm__container}>
                <h2>Virtual Event Agenda</h2>
                <div className={s.ddm__agendaBox}>
                    <table className={s.ddm__agendaTable} cellpadding="0" cellspacing="0">
                      <tr>
                        <td className={s.ddm__lightBlueTable}>9:30 A.M. - 12:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Keynote</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__darkBlueTable}>12:00 P.M. - 2:00 P.M. EST</td>
                        <td className={s.ddm__grayTable}><b>Decision Architect Masterclass</b></td>
                      </tr>
                      <tr>
                        <td className={s.ddm__lightBlueTable}>12:00 P.M. EST - Onwards</td>
                        <td className={s.ddm__grayTable}><b>Access to over 30 educational sessions</b></td>
                      </tr>
                    </table>
                </div>
            </div>
              <div className={s.ddm__clearfix}></div>
          </div>
          </div> */}
          
          {/* <div className={s.ddm__clearfix}></div> */}
          {/* <div className={s.ddm__registersection}>
            <div className={s.ddm__container}>
              <div className={s.ddm__registersectionwrapper}>
                <h2>Watch Videos On-Demand</h2> 
                <div className={s.ddm__footerbutton}>
                  <a 
                      href="javascript:;"
                      className={s.ddm__registerbtnblue}
                      id="registertoday"
                    >
                        Watch Now
                    </a>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className={s.ddm__virtualsession}>
            <div className={s.ddm__container}>
              <div className={s.ddm__virtualsessionwrapper}>
                  <h2>Live Virtual Session: <span>12 P.M. - 2 P.M. EST</span></h2>
                    <h3>Decision Architect Master Class</h3>
                    <p>
                    Join us for a live, interactive 2-hour virtual session designed to help you master the art of composing Decision Skills using the Aera Decision Cloud Platform. Whether you’re a data scientist, IT professional, or business analyst, this is a great opportunity to enhance your expertise and stay ahead in the evolving world of work. Experience this guided training on the principles, skills required and tools available to equip you to shape the future of decision-making and automation.
                    </p>
              </div>
            </div>
          </div> */}
          
          <div className={s.ddm__sponsors}>
            <div className={s.ddm__container}>
              <h2>Thank You to our Sponsors</h2>
              <div className={s.ddm__sponsorswrapper}>
               
                <div className={s.ddm__sponsor}>
                  <img src={accenturelogo} alt="Accenturelogo"/>
                  {/* <p>Silver Sponsor</p> */}
                </div>
                <div className={s.ddm__sponsor}>
                  <img src={zsLogo} alt="zsLogo"/>
                  {/* <p>Gold Sponsor</p> */}
                </div>
                <div className={s.ddm__sponsor}>
                  <img src={Deloittesponsor} alt="Deloittesponsor"/>
                  {/* <p>Platinum Sponsor</p> */}
                </div>
               
                
              </div>
            </div>
          </div>
          {/* <div className={s.ddm__clearfix}></div> */}
          {/* <div className={s.ddm__savetheseat}>
            <div className={s.ddm__container}>
              <div className={s.ddm__savetheseatwrapper}>
                <h2>Watch Videos On-Demand</h2>
                <div className={s.ddm__footerbutton}>
                  <a 
                      href="javascript:;"
                      className={s.ddm__saveyourseat}
                      id="saveseat"
                    >
                        Watch Now 
                    </a>
                </div>
              </div>
            </div>
          </div> */}
          <div className={s.ddm__clearfix}></div>
          <div className={s.ddm__ctasection}>
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
          </div>
          </div>
        </div>
      </Page>
    );
  }
}
