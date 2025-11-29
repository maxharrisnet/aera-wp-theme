import React, { Component, useRef } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";
import LearnsVideo from "assets/videos/Learns.mp4";
import UnderstandsVideo from "assets/videos/Understands.mp4";
import RecommendsVideo from "assets/videos/Recommends.mp4";

import leftarrow from "assets/images/ADC/leftarrow.png";
import rightarrow from "assets/images/ADC/rightarrow.png";
import explorearrow from "assets/images/ADC/explorearrow.png";
import ZeroLatency from "assets/images/ADC/ZeroLatency.png";
import SecureandCertified from "assets/images/ADC/SecureandCertified.png";
import LowTotal from "assets/images/ADC/LowTotal.png";
import EcosystemReady from "assets/images/ADC/EcosystemReady.png";
import UnifiedDecisionUX from "assets/images/ADC/UnifiedDecisionUX.png";
import DecisionMemory from "assets/images/ADC/DecisionMemory.png";
import chipsetimagemobile from "assets/images/ADC/chipsetimagemobile.png";
import WDI from "assets/images/decisionintelligence/Whatisdecisionintelligence.jpg";
import ADCIntroVideo from "assets/images/ADC/IntrovideoNew.mp4";
import Button from "components/button";

import IDC from "assets/images/ADC/IDC.jpg";
import whatIsDI from "assets/images/ADC/whatIsDI.jpg";
import CustomersTile from "assets/images/ADC/customers.jpg";



import COSImage from "assets/images/decisioncloud/cos.png";
import SkillsImage from "assets/images/decisioncloud/skills.png";
import DeveloperImage from "assets/images/decisioncloud/developer.png";

import EY from "assets/images/partners/ey.png";
import Kearney from "assets/images/partners/kearney.png";
import Bristlecone from "assets/images/partners/bristlecone.png";
import Microsoft from "assets/images/partners/MicrosoftPartner.png";
import AWS from "assets/images/partners/AWS_Logo.png";
import Cloudsufi from "assets/images/partners/cloudsufi.png";
import Sintec from "assets/images/partners/sintec.png";
import Course5 from "assets/images/partners/course5.jpeg";
import Accenture from "assets/images/partners/accenture.png";
import Delloite from "assets/images/partners/DeloitteBlueLogo.png";
import ZSAssociates from "assets/images/partners/ZS_Associates.png";
import chipanimationtest_1 from "assets/images/ADC/chipscrollanimation.mp4";
import adoIcon from "assets/images/ADC/adoIcon.png";
import ddmIcon from "assets/images/ADC/ddmIcon.png";
import decisionEngIcon from "assets/images/ADC/decisionEngIcon.png";
import deIcon from "assets/images/ADC/deIcon.png";



export default class Content extends Component {
    t = new TimelineLite();

    toggleAccordion = () => {
      this.setState({
        open: !this.state.open
      });
    };
    
    


  
    componentDidMount() {
    this.t.set(this.el, { autoAlpha: 0 });

    let slider;
      slider = $('#bx-featuredslider').bxSlider({
        auto: false,
        pager: false,
        controls: true, 
        adaptiveHeight: $(window).width()<720 ? true : false,
        //moveSlides: 1,
        touchEnabled: false,
        nextSelector: '.bxNext',
        prevSelector: '.bxPrev',
        nextText: `<img src=${leftarrow} />`,
        prevText: `<img src=${rightarrow} />`,
        slideWidth: 1000,
        minSlides: $(window).width()<720 ? 1 : 3,
        maxSlides: $(window).width()<720 ? 1 : 3,
        moveSlides: 1,
        slideMargin: $(window).width()<720 ? 0 : 100,
      // responsive: true,
      // infiniteLoop: true,
      onSliderLoad: function(currentIndex){
        console.log("Slider loaded at:", currentIndex);
        
        // handleVideoPlayback(currentIndex);
        //loadVideoInSlide(currentIndex);
        // console.log("current"+currentIndex);

        
        pauseAllVideos();
        setTimeout(() => playVideoAt(currentIndex), 300);

      },
      onSlideAfter: function($slideElement, oldIndex, newIndex){
        console.log("Slide changed to:", newIndex);
        // handleVideoPlayback(newIndex);
        //playVideoInSlide(newIndex);

        
        pauseAllVideos();
        playVideoAt(newIndex);
        
      }
      });
      function pauseAllVideos() {
        $('#bx-featuredslider video').each(function () {
          //this.pause();
          this.currentTime = 0; // Optional: Reset to beginning
        });
      }
      function playVideoAt(index) {
        const $slides = $('#bx-featuredslider').find('div');
        const $video = $slides.eq(index).find('video');
        
        if ($video.length) {
            const videoEl = $video.get(0);
            console.log(videoEl)
            // Set attributes
            videoEl.muted = true;
            videoEl.playsInline = true;

            // Log visibility
            console.log('Slide visible?', window.getComputedStyle($slides.eq(index).get(0)).display);

            // Attempt to play
            videoEl.play().then(() => {
            console.log('Video playing!');
            }).catch(err => {
            console.warn('Autoplay blocked:', err.message);
            });
        } 
        else {
            console.warn('No video found at index:', index);
        }
      }
      function loadVideoInSlide(index){
        
        var currentVideo = $('#bx-featuredslider > div').eq(index).find('video').get(0);
        console.log(currentVideo)
        if (currentVideo) {
            currentVideo.play();
        }
      }
      
    
    const video = document.getElementById("scrollVideo");
    const scrollArea = document.getElementById("scrollArea");
    // console.log(video)
    // Wait until video metadata is loaded
   //video.addEventListener("loadedmetadata", () => {
      const duration = 6;
    console.log("duration"+duration);
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const containerTop = scrollArea.offsetTop - 210;
        const scrollHeight = scrollArea.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(Math.max((scrollTop - containerTop) / scrollHeight, 0), 1);
        // console.log(scrollPercent)
        // Set video current time based on scroll
        video.currentTime = scrollPercent * duration;
      });
    //});

//     const middleSections = document.querySelectorAll("#sec1, #sec2, #sec3, #sec4, #sec5");
//   const scrollBtn = document.getElementById("scrollBtn");
//   let index = 0;
//   let direction = "down";

//   // Helper: find nearest section to viewport top
//   function updateIndex() {
//     let closest = Infinity;
//     middleSections.forEach((sec, i) => {
//       const offset = Math.abs(sec.getBoundingClientRect().top);
//       if (offset < closest) {
//         closest = offset;
//         index = i;
//       }
//     });
//   }

//   // Click logic
//   scrollBtn.addEventListener("click", () => {
//     if (direction === "down") {
//       if (index < middleSections.length - 1) {
//         index++;
//         middleSections[index].scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       if (index > 0) {
//         index--;
//         middleSections[index].scrollIntoView({ behavior: "smooth" });
//       }
//     }

//     // Update arrow after click
//     if (index === middleSections.length - 1) {
//       direction = "up";
//       scrollBtn.innerHTML = "&uarr;"; // up arrow
//     } else if (index === 0) {
//       direction = "down";
//       scrollBtn.innerHTML = "&darr;"; // down arrow
//     } else {
//       scrollBtn.innerHTML = direction === "down" ? "&darr;" : "&uarr;";
//     }
//   });

//   // Scroll detection
//   window.addEventListener("scroll", () => {
//     // Show button only if inside middle sections
//     const middleTop = middleSections[0].offsetTop;
//     const middleBottom = middleSections[middleSections.length - 1].offsetTop + middleSections[middleSections.length - 1].offsetHeight;

//     if (window.scrollY >= middleTop && window.scrollY < middleBottom) {
//       scrollBtn.style.display = "inline-block";
//     } else {
//       scrollBtn.style.display = "none";
//     }

//     // Update nearest index while scrolling
//     updateIndex();

//     // Update arrow direction
//     if (index === middleSections.length - 1) {
//       direction = "up";
//       scrollBtn.innerHTML = "&uarr;";
//     } else if (index === 0) {
//       direction = "down";
//       scrollBtn.innerHTML = "&darr;";
//     }
//   });
    
    }
    
    componentDidUpdate() {
        const video = document.getElementById("scrollVideo");
    const scrollArea = document.getElementById("scrollArea");
    // console.log(video)
    // Wait until video metadata is loaded
   //video.addEventListener("loadedmetadata", () => {
      const duration = video.duration;
    console.log("duration"+duration);
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const containerTop = scrollArea.offsetTop - 200;
        const scrollHeight = scrollArea.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(Math.max((scrollTop - containerTop) / scrollHeight, 0), 1);
        // console.log(scrollPercent)
        // Set video current time based on scroll
        video.currentTime = scrollPercent * duration;
      });
    //});
    }
    animate = () => {
      fadeSlideIn(this.t, this.el);
    };

    render() {
        const { children } = this.props;
        return (
            <WaypointEnter onEnter={this.animate}>
                <div ref={c => (this.el = c)} className={s(s.decisioncloud)}>
                <style>
                        {`  
                            //    .bx-viewport{
                            //        overflow:visible !important;
                            //        transform: translate(7%, 0px);
                            //    }
                            //   #bx-featuredslider div {
                            //    width: 960px !important;
                            //    max-width: 1000px !important;
                            //     margin-right: 25px !important;
                            //    margin-left: 25px !important;
                            //     margin: 0 auto !important;
                            //     padding: 0 20px;
                            //     box-sizing: border-box;
                            //   }
                            //   #bx-featuredslider video{
                            //     width: 100%;
                            //     height: 100%;
                            //     margin: 0 auto;
                            //   }
                              .section{
                                width: 100%;
                                height: 100vh;
                                // background-color: beige;
                            }
                            .container {
                              display: flex;
                              width: 100vw;
                              height: 100vh;
                              overflow-y: scroll;
                              scroll-snap-type: y mandatory;
                            }
                            .bxPrev{
                                position: absolute;
                                left: 10px;
                                top: -50px;
                            }
                            .bxNext{
                                position: absolute;
                                right: -20px;
                                top: -50px;
                            }
                            .text-section {
                              //flex: 1;
                              padding: 0 2rem;
                              scroll-snap-align: start;
                            //height: 100vh;
                            //overflow-y:auto;
                              //display: flex;
                              align-items: center;
                              justify-content: center;
                              font-size: 1.5rem;
                              //border-bottom: 1px solid #ccc;
                              padding-left: 0px;
                              
                            }
                            
                            .text-section h5{
                                font-family: "Gilroy", sans-serif;
                                font-weight: 700;
                                font-size: 20px;
                                margin-bottom:0;
                                margin-top: 0;
                                line-height: 35px;
                            }
                            .text-section img{
                                display: inline-block;
                                vertical-align:bottom;
                                width: 35px;
                                margin-right: 5px;
                            }
                            .text-section svg{
                                display: inline-block;
                                vertical-align:bottom;
                                width: 40px;
                                margin-right: 5px;
                            }
                            .text-section h5.blue{
                                color: #00619E
                            }
                            .text-section h5.green{
                                color: #00818E;
                            }
                            .text-section h5.aqua{
                                color: #009D95;
                            }
                            .text-section h5.violet{
                                color: #4237B8;
                            }
                            .text-section h2{
                                font-family: "Gilroy", sans-serif;
                                font-weight: 700;
                                font-size: 24px;
                                line-height: 34px;
                                margin: 10px 0px 20px 0;
                            }
                            .section-link{
                                text-align: center;
                            }
                            .text-section-link{
                                font-family: "Gilroy", sans-serif;
                                font-weight: 600;
                                font-size:16px;
                                line-height: 36px;
                                display:block;
                                //margin-top: 15px;
                                // margin-bottom: 10px;
                                color:#1a1a1a;
                                display: inline-block;
                                border: 2px solid #BBE1FA;
                                border-radius: 20px;
                                padding: 0px 40px;
                            }
                            .text-section-link:hover{
                                border-color: #e0f9ff rgba(255, 255, 255, 0) #dee8fb;
                                background-color: #e0f9ff;
                                background-image: linear-gradient(rgba(222, 232, 251, 0) 0%, #dee8fb 90%);
                            }
                            .text-section-link img{
                                display: inline-block;
                                vertical-align: inherit;
                                width: 7px;
                                transition: 0.3s ease-in-out;
                            }
                            .text-section-link:hover img{
                                transform: translate(5px, 0px)
                            }
                            .text-section .core-title{
                                font-family: "Gilroy", sans-serif;
                                font-weight: 700;
                                font-size: 44px;
                                line-height: 54px;
                                margin: 10px 0px;
                                color: #1a1a1a;
                            }
                            .text-section p{
                                font-family: "FreightSans Pro", sans-serif;
                                font-weight: 400;
                                font-size: 18px;
                                line-height: 28px;
                                color:#5C6476;
                                margin-top:0;
                            }
                            .text-section .box.grey{
                                background-color:#F0F6F9;
                                padding: 20px;
                                margin-bottom: 20px;
                                border-radius: 10px;
                            }
                            .text-section .box.lightGreen{
                                background-color:#F0F8F9;
                                padding: 20px;
                                margin-bottom: 20px;
                                border-radius: 10px;
                            }
                            .text-section .box.AAO{
                                background-color:#F0FAF8;
                                padding: 20px;
                                margin-bottom: 20px;
                                border-radius: 10px;
                            }
                            .text-section .box.DE{
                                background-color:#F0F4F9;
                                padding: 20px;
                                margin-bottom: 20px;
                                border-radius: 10px;
                            }
                            
                            .text-section .box h3{
                                font-family: "Gilroy", sans-serif;
                                font-weight: 700;
                                font-size: 20px;
                                margin:0;
                                
                            }
                            .text-section .box p{
                                font-family: "FreightSans Pro", sans-serif;
                                font-weight: 400;
                                font-size: 18px;
                                color: #5C6476;
                                margin: 10px 0;
                            }
                            .text-section .box a{
                                font-family: "Gilroy", sans-serif;
                                font-weight: 700;
                                font-size: 16px;
                                color:#1a1a1a;
                            }
                            .text-section .box a img{
                                display: inline-block;
                                vertical-align: inherit;
                                width: 7px;
                                transition: 0.3s ease-in-out;
                            }
                            .text-section .box:hover img{
                                transform: translate(5px, 0px)
                            }
                            .svg-panel {
                              flex: 1;
                              position: sticky;
                              top: 0;
                              height: 100vh;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                            }
                        
                            .svg-panel svg {
                              width: 90%;
                              height: auto;
                              transform-style: preserve-3d;
                              perspective: 800px;
                            }
                            #square-0, #square-1, #square-2, #square-3{
                                transition: transform 0.5s ease;
                                transform-style: preserve-3d;
                            }
                            .use-animate {
                              opacity: 1;
                              /* transform: scale(0.5); */
                              animation: popIn 1s ease-out forwards;
                              /* transform: translate(0, 0) scale(1) rotateX(0) rotateY(0);
                              transform-origin: center;
                              animation: liftUp 0.6s ease-out forwards; */
                            }
                              @keyframes popIn {
                                to {
                                  opacity: 1;
                                  /* transform: scale(1); */
                                  /* transform: translate(-150px, -200px) scale(1) rotateX(15deg) rotateY(-6deg); */
                                }
                              }
                            /* .highlight {
                              transform: translateY(-10px) scale(1.2);
                              
                              transition: transform 1s ease;
                            } */
                            .hide-core{
                              /* opacity: 0.3; */
                              visibility: hidden;
                              transition: visibility 0.3s;
                            }
                            .highlight-0{
                                /* transform: translate(-150px, -200px) scale(2); */
                                transform: translate(-150px, -200px) scale(2) rotateX(15deg) rotateY(-6deg);
                                visibility: visible;
                            }
                            .highlight-1{
                                /* transform: translate(-370px, -90px) scale(2); */
                                transform: translate(-370px, -90px) scale(2) rotateX(15deg) rotateY(-6deg);
                                visibility: visible;
                            }
                            .highlight-2{
                                /* transform: translate(-370px, -340px) scale(2); */
                                transform: translate(-370px, -340px) scale(2) rotateX(15deg) rotateY(-6deg);
                                visibility: visible;
                            }
                            .highlight-3{
                                /* transform: translate(-575px, -210px) scale(2) ; */
                                transform: translate(-510px, -205px) scale(2) rotateX(15deg) rotateY(-6deg);
                                visibility: visible;
                            }
                            .container-videoscroll {
                                display: flex;
                                //max-width: 1150px;
                                margin: 0 auto;
                              }
                          
                              .video-container {
                                position: sticky;
                                top: 0;
                                height: 100vh;
                                width: 45vw;
                                background: #fff;
                                padding:0 80px 0 80px;
                                margin-top: -180px;
                              }
                          
                              .container-videoscroll video {
                                width: 100%;
                                height: 100%;
                                //object-fit: cover;
                              }
                          
                              .text-container {
                                width: 55vw;
                                //margin-top:15%;
                              }
                          
                              .section-videoscroll {
                                //height: 100vh;
                                padding: 2rem;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 2rem;
                                //border-bottom: 1px solid #ddd;
                                padding-left: 0px;
                              }
                          
                            //   .section-videoscroll:nth-child(even) {
                            //     background: #f0f0f0;
                            //   }

                            .hidden-xs{
                                display:block;
                            }
                            @media screen and (max-width: 960px) {
                                #bx-featuredslider div{
                                    width: 780px !important;
                                }
                            }
                            @media screen and (max-width: 720px) {


                                #bx-featuredslider div{
                                    width: 420px !important;
                                    padding: 0 0 !important;
                                }
                                .hidden-xs{
                                    display:none;
                                }
                                .video-container{
                                    display:none;
                                }
                                .container-videoscroll{
                                    flex-direction: column;
                                    //padding: 0 20px;
                                }
                                .text-container{
                                    width: 100%;
                                }
                                .text-section{
                                    padding: 1rem 0;
                                    height: auto;
                                }
                                .section-videoscroll{
                                    padding: 0rem;
                                    height: auto;
                                }
                                #bx-featuredslider video{
                                    width: 100%;
                                }
                                .bx-viewport{
                                    overflow: visible !important;
                                    transform: translate(0%, 0px);
                                }
                                .bxPrev{
                                    position: absolute;
                                    left: -10px;
                                    top: -30px;
                                }
                                .bxNext{
                                    position: absolute;
                                    right: 0px;
                                    top: -30px;
                                }
                            }
                            .scroll-btn {
                                position: sticky;
                                z-index:1;
                                width:40px;
                                height: 40px;
                                top: 200px;
                                right: 20px;
                                padding: 5px 0px;
                                text-align:center;
                                font-size: 22px;
                                background: #fff;
                                color: #BBE1FA;
                                border: 2px solid #BBE1FA;
                                border-radius: 10px;
                                cursor: pointer;
                                display: none;
                                //box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                                transition: background 0.3s ease;
                                float:right;
                                //opacity: 0;
                                //pointer-events: none; /* prevent clicks when hidden */
                              }
                            //   .scroll-btn.show {
                            //     opacity: 1;
                            //     pointer-events: auto;
                            //   }
                            //   .scroll-btn:hover {
                            //     background: #fff;
                            //     color:#4b8bb5;
                            //     border: 1px solid #4b8bb5;
                            //   }
                        `}
                </style>
                    <div className={s.decisioncloud__featuredSkills} id="featured-skills">
                        <div className={s.decisioncloud__sliderContainer}>
                            <div className={s.decisioncloud__featuredSkillsWrapper}>
                                <video muted autoPlay loop>
                                    <source src={ADCIntroVideo} type='video/mp4'>
                                    </source>
                                </video>
                            {/* <div className={s.decisioncloud__featuredSkillsSlider} id="videoWrapper">
                                <div id="bx-featuredslider">
                                    <div className={s.decisioncloud__sliderRow} data-slider="one">
                                            <video muted playsInline controls loop autoPlay src={UnderstandsVideo} type="video/mp4" >
                                                
                                            </video>
                                            <div className={s.decisioncloud__sliderCaption}>
                                                <p>Understands</p>
                                                <h3>Aera answers any data-driven question in<br class="hidden-xs"/> real time and in natural language.</h3>
                                            </div>
                                        
                                    </div>
                                    <div className={s.decisioncloud__sliderRow} data-link="slider">
                                            <video muted playsInline controls loop autoPlay src={RecommendsVideo} type="video/mp4" >
                                                
                                            </video>
                                            <div className={s.decisioncloud__sliderCaption}>
                                                <p>Recommends</p>
                                                <h3>Aera generates real-time, intelligent, and<br/> data-driven recommendations.</h3>
                                            </div>
                                            
                                    </div>
                                    <div className={s.decisioncloud__sliderRow} data-link="slider">
                                            <video muted playsInline controls loop autoPlay src={LearnsVideo} type="video/mp4">
                                                
                                            </video>
                                            <div className={s.decisioncloud__sliderCaption}>
                                            <p>Acts</p>
                                            <h3>Aera proactively engages users and<br/> executes decisions autonomously.</h3>
                                            </div>
                                            
                                    </div>
                                    <div className={s.decisioncloud__sliderRow} data-link="slider">
                                            <video muted playsInline controls loop autoPlay src={LearnsVideo} type="video/mp4" >
                                                
                                            </video>
                                            <div className={s.decisioncloud__sliderCaption}>
                                            <p>Learns</p>
                                            <h3>Aera learns from past decisions<br/> and outcomes to improve future recommendations.</h3>
                                            </div>
                                    </div>
                                </div>
                                <nav className={s.decisioncloud__sliderControls}>
                                    <a href='#' id='PREV' class='bxPrev'></a>
                                    <a href='#' id='NEXT' class='bxNext'></a>
                                </nav>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={s.decisioncloud__chipSet}>
                        
                        <div className={s.decisioncloud__chipsetContainer}>
                            
                            {/* <div className={s.decisioncloud__sectionTitle}>
                            Explore the Core Components of <br className={s.decisioncloud__hiddenXS}/> Aera Decision Cloud
                            </div>
                            <div className={s.decisioncloud__sectionDescription}>
                            Aera Decision Cloud is built on a powerful foundation of four connected cores that work together to transform how your organization makes and scales decisions. It improves future decisions with data and insights, optimizes decision-making at scale, streamlines processes with autonomous agents, and delivers intuitive, real-time experiences across all channels and roles.
                            </div> */}
                            <div class="container-videoscroll">
                                <div className={s.decisioncloud__chipSetImageMobile}>
                                    <img src={chipsetimagemobile}/>
                                </div>
                                <div class="video-container">
                                    <video id="scrollVideo" muted>
                                        <source src={chipanimationtest_1} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
                                        
                                        </source>
                                    </video>
                                </div>

                                <div class="text-container" id="scrollArea">
                                {/* <div class="scroll-btn" id="scrollBtn">&darr;</div> */}
                                    <div class="section-videoscroll" id="sec1">
                                        <div class="text-section">
                                            <div className={s.decisioncloud__sectionTitle}>
                                            Explore the Core Components of <br className={s.decisioncloud__hiddenXS}/> Aera Decision Cloud 
                                            </div>
                                            <div className={s.decisioncloud__sectionDescription}>
                                            Aera Decision Cloud combines four essential components that work together to deliver fast, high-quality decisions — and turn them into action.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="section-videoscroll" id="sec2">
                                        <div class="text-section" data-index="0">
                                            <h5 class="blue">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="40" height="40" rx="20" fill="#F0F6F9"/>
                                                <path d="M7.78799 12.7891L7.72266 12.7984L7.74799 12.8597" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M7.95703 13.3545L12.5944 24.2892L19.8544 33.8958" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.0195 34.1113L20.0595 34.1647L20.1022 34.1127" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.4414 33.692L28.0387 24.2893L32.2761 13.1133" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M32.3669 12.8611L32.3896 12.7984L32.3242 12.7891" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M31.792 12.7149L20.1467 11.0869L8.05469 12.7536" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M32.3398 27.0775L32.3972 27.0442V26.9775" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M32.3945 26.4347V13.1387" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M32.3972 12.8666V12.7999L32.3398 12.7666" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M31.8662 12.4957L20.3516 5.84766" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.1147 5.71107L20.0573 5.67773L20 5.71107" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M19.5264 5.98242L8.01172 12.6304" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M7.77999 12.7666L7.72266 12.7999V12.8666" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M7.72266 13.4092V26.7052" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M7.72266 26.9775V27.0442L7.77999 27.0775" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M8.25391 27.3477L19.7686 33.9957" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20 34.1309L20.0573 34.1642L20.1147 34.1309" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.5898 33.8599L32.1045 27.2119" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M12.6643 24.2901H12.5977L12.631 24.2314" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M12.8945 23.7717L19.9865 11.373" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.1133 11.1443L20.1466 11.0869L20.1813 11.1429" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.457 11.6025L27.865 24.0025" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M28.0047 24.2314L28.0393 24.2888H27.9727" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M27.431 24.2891H12.9297" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.0625 5.67773L20.0638 5.7444" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.0742 6.28613L20.1489 10.7501" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.1523 11.0205L20.1537 11.0872" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M7.72266 27.0421L7.77999 27.0088" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M8.26953 26.7333L12.2962 24.46" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M12.5391 24.3211L12.5964 24.2891" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M28.0352 24.2891L28.0912 24.3237" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M28.5312 24.6006L32.1219 26.8699" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M32.3398 27.0068L32.3958 27.0428" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                                <path d="M20.1271 11.6536C20.4216 11.6536 20.6604 11.4148 20.6604 11.1202C20.6604 10.8257 20.4216 10.5869 20.1271 10.5869C19.8325 10.5869 19.5938 10.8257 19.5938 11.1202C19.5938 11.4148 19.8325 11.6536 20.1271 11.6536Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M20.0802 6.13307C20.3748 6.13307 20.6135 5.89429 20.6135 5.59974C20.6135 5.30519 20.3748 5.06641 20.0802 5.06641C19.7857 5.06641 19.5469 5.30519 19.5469 5.59974C19.5469 5.89429 19.7857 6.13307 20.0802 6.13307Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M20.0802 34.8557C20.3748 34.8557 20.6135 34.6169 20.6135 34.3224C20.6135 34.0278 20.3748 33.7891 20.0802 33.7891C19.7857 33.7891 19.5469 34.0278 19.5469 34.3224C19.5469 34.6169 19.7857 34.8557 20.0802 34.8557Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M12.6036 24.7766C12.8982 24.7766 13.137 24.5378 13.137 24.2433C13.137 23.9487 12.8982 23.71 12.6036 23.71C12.3091 23.71 12.0703 23.9487 12.0703 24.2433C12.0703 24.5378 12.3091 24.7766 12.6036 24.7766Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M27.9201 24.7766C28.2146 24.7766 28.4534 24.5378 28.4534 24.2433C28.4534 23.9487 28.2146 23.71 27.9201 23.71C27.6255 23.71 27.3867 23.9487 27.3867 24.2433C27.3867 24.5378 27.6255 24.7766 27.9201 24.7766Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M32.5333 27.6565C32.8279 27.6565 33.0667 27.4177 33.0667 27.1232C33.0667 26.8286 32.8279 26.5898 32.5333 26.5898C32.2388 26.5898 32 26.8286 32 27.1232C32 27.4177 32.2388 27.6565 32.5333 27.6565Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M7.60365 27.6565C7.8982 27.6565 8.13698 27.4177 8.13698 27.1232C8.13698 26.8286 7.8982 26.5898 7.60365 26.5898C7.30909 26.5898 7.07031 26.8286 7.07031 27.1232C7.07031 27.4177 7.30909 27.6565 7.60365 27.6565Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M7.60365 13.2542C7.8982 13.2542 8.13698 13.0154 8.13698 12.7208C8.13698 12.4263 7.8982 12.1875 7.60365 12.1875C7.30909 12.1875 7.07031 12.4263 7.07031 12.7208C7.07031 13.0154 7.30909 13.2542 7.60365 13.2542Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                <path d="M32.5333 13.2542C32.8279 13.2542 33.0667 13.0154 33.0667 12.7208C33.0667 12.4263 32.8279 12.1875 32.5333 12.1875C32.2388 12.1875 32 12.4263 32 12.7208C32 13.0154 32.2388 13.2542 32.5333 13.2542Z" fill="#F0F6F9" stroke="#00619E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                                </svg>
                                                Decision Data Model™
                                            </h5>
                                            {/* <h2>Improve future decisions with data and insights learned from every action taken.</h2> */}
                                            <p>The <strong>Decision Data Model</strong> unifies real-time data from your systems and outside sources. It also captures all the decisions made in your organization, along with their context, actions taken, and outcomes. Over time, this decision memory enables Aera to learn and make smarter, more optimized recommendations.
                                            </p>
                                            <div class="box grey">
                                                <h3>
                                                Comprehensive Integration
                                                </h3>
                                                <p>Unify data across the enterprise, including transactions, planning, analytics, unstructured data, IoT signals, and external sources — with 200+ prebuilt connectors.</p>
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>
                                            {/* <div class="box grey">
                                                <h3>
                                                Advanced Modeling
                                                </h3>
                                                <p>​Compose analytical, graph, mathematical, AI/ML, simulations, and decision models to generate context-rich recommendations.</p>
                                            </div> */}
                                            <div class="box grey">
                                                <h3>
                                                Data Quality and Connectivity
                                                </h3>
                                                <p>Ensure trusted, decision-ready data with normalization, bi-directional integration, robust connection management, and comprehensive governance.</p>
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>
                                            <div class="box grey">
                                                <h3>
                                                Data Workbench
                                                </h3>
                                                <p>​Harmonize data across internal and external systems to build and maintain the Decision Data Model.</p>
                                                {/* <a href="/data-workbench">Explore <img src={explorearrow}/></a> */}
                                                <NavLink to="/data-workbench">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                                <div className="section-link"><NavLink to="/decision-data-model" class="text-section-link">Learn More </NavLink></div>
                                            </div>
                                    </div>
                                    <div class="section-videoscroll" id="sec3">
                                        <div class="text-section" data-index="1">
                                            <h5 class="green"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="40" height="40" rx="20" fill="#F0F8F9"/>
                                            <path d="M13.3216 28.778C18.17 28.778 22.1003 24.8477 22.1003 19.9994C22.1003 15.151 18.17 11.2207 13.3216 11.2207C8.47331 11.2207 4.54297 15.151 4.54297 19.9994C4.54297 24.8477 8.47331 28.778 13.3216 28.778Z" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                            <path d="M6.4513 26.0374C6.74585 26.0374 6.98463 25.7986 6.98463 25.504C6.98463 25.2095 6.74585 24.9707 6.4513 24.9707C6.15675 24.9707 5.91797 25.2095 5.91797 25.504C5.91797 25.7986 6.15675 26.0374 6.4513 26.0374Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M23.3454 31.681C29.7968 31.681 35.0267 26.4511 35.0267 19.9997C35.0267 13.5483 29.7968 8.31836 23.3454 8.31836C16.894 8.31836 11.6641 13.5483 11.6641 19.9997C11.6641 26.4511 16.894 31.681 23.3454 31.681Z" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                            <path d="M5.75208 16.2717C6.04664 16.2717 6.28542 16.033 6.28542 15.7384C6.28542 15.4439 6.04664 15.2051 5.75208 15.2051C5.45753 15.2051 5.21875 15.4439 5.21875 15.7384C5.21875 16.033 5.45753 16.2717 5.75208 16.2717Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M34.9201 21.9934C35.2146 21.9934 35.4534 21.7546 35.4534 21.4601C35.4534 21.1655 35.2146 20.9268 34.9201 20.9268C34.6255 20.9268 34.3867 21.1655 34.3867 21.4601C34.3867 21.7546 34.6255 21.9934 34.9201 21.9934Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M22.1193 19.8128C22.4138 19.8128 22.6526 19.574 22.6526 19.2794C22.6526 18.9849 22.4138 18.7461 22.1193 18.7461C21.8247 18.7461 21.5859 18.9849 21.5859 19.2794C21.5859 19.574 21.8247 19.8128 22.1193 19.8128Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M28.256 31.22C28.5505 31.22 28.7893 30.9812 28.7893 30.6867C28.7893 30.3921 28.5505 30.1533 28.256 30.1533C27.9614 30.1533 27.7227 30.3921 27.7227 30.6867C27.7227 30.9812 27.9614 31.22 28.256 31.22Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M11.6661 20.0198C11.9607 20.0198 12.1995 19.781 12.1995 19.4865C12.1995 19.1919 11.9607 18.9531 11.6661 18.9531C11.3716 18.9531 11.1328 19.1919 11.1328 19.4865C11.1328 19.781 11.3716 20.0198 11.6661 20.0198Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M31.2013 11.9553C31.4959 11.9553 31.7346 11.7166 31.7346 11.422C31.7346 11.1275 31.4959 10.8887 31.2013 10.8887C30.9068 10.8887 30.668 11.1275 30.668 11.422C30.668 11.7166 30.9068 11.9553 31.2013 11.9553Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M15.3302 12.009C15.6248 12.009 15.8635 11.7703 15.8635 11.4757C15.8635 11.1812 15.6248 10.9424 15.3302 10.9424C15.0357 10.9424 14.7969 11.1812 14.7969 11.4757C14.7969 11.7703 15.0357 12.009 15.3302 12.009Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            <path d="M15.6115 28.926C15.906 28.926 16.1448 28.6873 16.1448 28.3927C16.1448 28.0982 15.906 27.8594 15.6115 27.8594C15.3169 27.8594 15.0781 28.0982 15.0781 28.3927C15.0781 28.6873 15.3169 28.926 15.6115 28.926Z" fill="#F0F8F9" stroke="#00818E" strokeWidth="0.5" strokeMiterlimit="10"/>
                                            </svg>
                                            Decision Engines</h5>
                                            {/* <h2>Automate and optimize decisions across the full spectrum of decision-making.</h2> */}
                                            <p>Comprehensive <strong>decision engines</strong> support all types of decisions, from advised to assisted to fully automated. Together, they quickly analyze data, apply logic, run simulations, and generate recommendations and actions.
                                            </p>
                                            {/* <div class="box lightGreen">
                                                <h3>
                                                Decision Process and Execution
                                                </h3>
                                                <p>Visually compose and model decision processes by embedding business rules, scenarios, optimization logic, AI/ML models, and agent teams.</p>
                                                <NavLink to="/process-builder">Explore <img src={explorearrow}/></NavLink>
                                            </div> */}
                                            <div class="box lightGreen">
                                                <h3>
                                                AI Engines
                                                </h3>
                                                <p>Rapidly build and deploy machine learning pipelines, domain-specific algorithms, and flexible AI/ML models into decision workflows.</p>
                                                <NavLink to="/cortex-ai-ml">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                            {/* <div class="box lightGreen">
                                                <h3>
                                                Data Workbench
                                                </h3>
                                                <p>Harmonize data across internal and external systems, and orchestrates data workloads to build and maintain the Decision Data Model.</p>
                                                <NavLink to="/data-workbench">Explore <img src={explorearrow}/></NavLink>
                                            </div> */}
                                            <div class="box lightGreen">
                                                <h3>
                                                Learning Engines
                                                </h3>
                                                <p>Continuously improve decision quality as Aera learns from feedback and context, adapting in real time to changing business conditions.</p>
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>
                                            <div class="box lightGreen">
                                                <h3>
                                                Advanced Modeling
                                                </h3>
                                                <p>Compose analytical, graph, mathematical, AI/ML, scenarios, simulations, and decision models to generate context-rich recommendations.</p>
                                                {/* <NavLink to="/data-workbench">Explore <img src={explorearrow}/></NavLink> */}
                                            </div>
                                            <div className="section-link"><NavLink to="/decision-engines" class="text-section-link">Learn More </NavLink></div>
                                            </div>
                                    </div>
                                    <div class="section-videoscroll" id="sec4">
                                    <div class="text-section" data-index="2">
                                        <h5 class="aqua"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="20" fill="#F0FAF8"/>
                                        <path d="M22.2734 15.1494L24.8268 17.7041" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M24.5033 20.4506L19.5273 15.4746" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M23.5598 22.578L17.3984 16.418" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M21.9071 23.9966L15.9805 18.0713" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M19.1494 24.3125L15.6641 20.8271" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M32.4304 13.0231L26.957 7.5498" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M29.674 13.3377L26.6406 10.3057" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M11.1875 25.7852L14.3062 28.9051" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M13.8707 31.5386L8.55469 26.2227" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M27.0002 5.21387C25.6562 6.55787 25.8668 9.46453 25.9655 12.9752C25.9735 13.2685 26.0002 14.3272 26.0002 14.3272C26.0788 17.9885 25.9602 21.8272 23.9562 23.8299C22.1628 25.6232 19.0135 25.3445 15.6802 25.0499C15.5562 25.0392 14.8415 24.9765 14.8415 24.9765C11.2628 24.6739 7.66418 24.5499 5.21484 26.9979" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                        <path d="M13 34.7854C15.448 32.3374 15.324 28.7374 15.0213 25.1587C15.0213 25.1587 14.9587 24.4427 14.948 24.32C14.6533 20.9867 14.3747 17.8373 16.168 16.044C18.1707 14.0413 22.0093 13.9227 25.6707 14C25.6707 14 26.7293 14.0267 27.0227 14.0347C30.5333 14.1333 33.44 14.344 34.784 13" stroke="#009D95" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                        </svg>
                                        Agentic Ambient Orchestration™</h5>
                                            {/* <h2>Activate and manage autonomous agents to streamline complex decision processes.</h2> */}
                                            <p><strong>Agentic Ambient Orchestration</strong> combines structured and unstructured data, human expertise, and the reasoning power of AI agents (through LLMs) in your decision processes.  Instead of coding decision rules, you can simply prompt and guide agents to automate decisions.
                                            </p>
                                            <div class="box AAO">
                                                <h3>
                                                Decision Composition and Execution
                                                </h3>
                                                <p>Visually compose and model decision processes by embedding business rules, scenarios, optimization logic, AI/ML models, and agent teams.​</p>
                                                <NavLink to="/process-builder">Explore <img src={explorearrow}/></NavLink>
                                                
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>

                                            <div class="box AAO">
                                                <h3>
                                                Agent & Agent Team Creation
                                                </h3>
                                                <p>Define, configure, embed, and publish individual agents with defined roles, and organize them into teams to coordinate decision tasks.​</p>
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>
                                            {/* <div class="box AAO">
                                                <h3>
                                                    Advanced modeling
                                                </h3>
                                                <p>Build graph, mathematical, and AI/ML models, as well as agent instructions and decision models, to deliver contextual and impact-aware decisions.</p>
                                                <a href="javascript:;">Explore <img src={explorearrow}/></a>
                                            </div> */}
                                            <div class="box AAO">
                                                <h3>
                                                Agent Functions
                                                </h3>
                                                <p>Convert specific decision processes and external logic into reusable, executable components that agents can leverage as tools to reason and orchestrate tasks.​</p>
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>
                                            {/* <div class="box AAO">
                                                <h3>
                                                Integrated Decision Flows
                                                </h3>
                                                <p>Embed agents seamlessly into end-to-end decision flows to drive increased levels of agency and automation.</p>
                                            </div> */}
                                            <div class="box AAO">
                                                <h3>
                                                LLM Integration Management
                                                </h3>
                                                <p>Configure and manage secure connections to large language models of your choice and map them to specific agents with defined roles.</p>
                                                {/* <a href="javascript:;">Explore <img src={explorearrow}/></a> */}
                                            </div>
                                            <div className="section-link"><NavLink to="/agentic-ambient-orchestration" class="text-section-link">Learn More </NavLink></div>
                                            </div>
                                    </div>
                                    <div class="section-videoscroll" id="sec5">
                                    <div class="text-section" data-index="3">
                                        <h5 class="violet"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="40" height="40" rx="20" fill="#F0F4F9"/>
                                        <path d="M19.999 34.6464C27.9526 34.6464 34.4003 28.1987 34.4003 20.2451C34.4003 12.2914 27.9526 5.84375 19.999 5.84375C12.0454 5.84375 5.59766 12.2914 5.59766 20.2451C5.59766 28.1987 12.0454 34.6464 19.999 34.6464Z" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                        <path d="M20.0013 29.0232C24.8496 29.0232 28.78 25.0928 28.78 20.2445C28.78 15.3962 24.8496 11.4658 20.0013 11.4658C15.153 11.4658 11.2227 15.3962 11.2227 20.2445C11.2227 25.0928 15.153 29.0232 20.0013 29.0232Z" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10" strokeDasharray="0.5 0.5"/>
                                        <path d="M20.0138 11.9426C20.3084 11.9426 20.5471 11.7039 20.5471 11.4093C20.5471 11.1148 20.3084 10.876 20.0138 10.876C19.7193 10.876 19.4805 11.1148 19.4805 11.4093C19.4805 11.7039 19.7193 11.9426 20.0138 11.9426Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M19.9669 6.42116C20.2615 6.42116 20.5003 6.18238 20.5003 5.88783C20.5003 5.59327 20.2615 5.35449 19.9669 5.35449C19.6724 5.35449 19.4336 5.59327 19.4336 5.88783C19.4336 6.18238 19.6724 6.42116 19.9669 6.42116Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M19.9669 29.6233C20.2615 29.6233 20.5003 29.3845 20.5003 29.09C20.5003 28.7954 20.2615 28.5566 19.9669 28.5566C19.6724 28.5566 19.4336 28.7954 19.4336 29.09C19.4336 29.3845 19.6724 29.6233 19.9669 29.6233Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M12.4865 25.0637C12.781 25.0637 13.0198 24.825 13.0198 24.5304C13.0198 24.2359 12.781 23.9971 12.4865 23.9971C12.1919 23.9971 11.9531 24.2359 11.9531 24.5304C11.9531 24.825 12.1919 25.0637 12.4865 25.0637Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M27.8068 25.0637C28.1013 25.0637 28.3401 24.825 28.3401 24.5304C28.3401 24.2359 28.1013 23.9971 27.8068 23.9971C27.5122 23.9971 27.2734 24.2359 27.2734 24.5304C27.2734 24.825 27.5122 25.0637 27.8068 25.0637Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M32.4201 27.9436C32.7146 27.9436 32.9534 27.7048 32.9534 27.4103C32.9534 27.1157 32.7146 26.877 32.4201 26.877C32.1255 26.877 31.8867 27.1157 31.8867 27.4103C31.8867 27.7048 32.1255 27.9436 32.4201 27.9436Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M7.48646 27.9436C7.78101 27.9436 8.01979 27.7048 8.01979 27.4103C8.01979 27.1157 7.78101 26.877 7.48646 26.877C7.19191 26.877 6.95312 27.1157 6.95312 27.4103C6.95312 27.7048 7.19191 27.9436 7.48646 27.9436Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M12.4005 16.4583C12.6951 16.4583 12.9339 16.2195 12.9339 15.9249C12.9339 15.6304 12.6951 15.3916 12.4005 15.3916C12.106 15.3916 11.8672 15.6304 11.8672 15.9249C11.8672 16.2195 12.106 16.4583 12.4005 16.4583Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        <path d="M27.5216 16.4583C27.8162 16.4583 28.0549 16.2195 28.0549 15.9249C28.0549 15.6304 27.8162 15.3916 27.5216 15.3916C27.2271 15.3916 26.9883 15.6304 26.9883 15.9249C26.9883 16.2195 27.2271 16.4583 27.5216 16.4583Z" fill="#F0F4F9" stroke="#4237B8" strokeWidth="0.5" strokeMiterlimit="10"/>
                                        </svg>
                                        Decision Engagement</h5>
                                            {/* <h2>Deliver seamless, intuitive decision-making across all devices, channels, and user roles.</h2> */}
                                            <p><strong>Decision Engagement</strong> enables you to interact with Aera through an intuitive, natural language interface, available via chat, voice, desktop, or mobile. You can explore data, get timely guidance, and act on real-time recommendations.
                                            </p>
                                            <div class="box DE">
                                                <h3>
                                                    Chat
                                                </h3>
                                                <p>Ask open-ended questions and receive instant, explainable, personalized answers supported by dynamic visualizations and contextual actions.</p>
                                                <NavLink to="/aera-chat">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                            <div class="box DE">
                                                <h3>
                                                    Inbox
                                                </h3>
                                                <p>Receive prescriptive, explainable recommendations ​in real-time. Understand context, impact, trade-offs, and take immediate action.</p>
                                                <NavLink to="/aera-inbox">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                            {/* <div class="box DE">
                                                <h3>
                                                    Voice and Mobile
                                                </h3>
                                                <p>Access real-time decision support and execution capabilities anytime, anywhere, on any device.</p>
                                                <a href="javascript:;">Explore <img src={explorearrow}/></a>
                                            </div> */}
                                            <div class="box DE">
                                                <h3>
                                                    Discovery
                                                </h3>
                                                <p>Explore and analyze data from your Decision Data Model through a visual, drillable interface designed to uncover new insights and embed them in recommendations.</p>
                                                <NavLink to="/aera-discovery">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                            <div class="box DE">
                                                <h3>
                                                Workspaces
                                                </h3>
                                                <p>A unified, secure space for teams to collaborate, organize, and manage decision intelligence. Ask questions, analyze data, run simulations, and publish insights and Skills.</p>
                                                <NavLink to="/aera-workspaces">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                            <div class="box DE">
                                                <h3>
                                                Control Room
                                                </h3>
                                                <p>Monitor the activity, performance, and impact of your decisions. Identify and continually fine-tune decision logic to optimize decision-making across your enterprise.</p>
                                                <NavLink to="/aera-control-room">Explore <img src={explorearrow}/></NavLink>
                                            </div>
                                            <div className="section-link"><NavLink to="/decision-engagement" class="text-section-link">Learn More </NavLink></div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
        <div className={s.decisioncloud__benefits}>
            <div className={s.decisioncloud__container}>
                <h2>Built for How Business Works Today</h2>
                <p className={s.decisioncloud__subline}>Four key attributes define how Aera Decision Cloud stands apart.</p>
                <div className={s.decisioncloud__benefitsWrapper}>
                <div className={s.decisioncloud__benefitsBox}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="8" fill="#B6C8E3"/>
                        <rect width="120" height="120" rx="8" fill="white" fillOpacity="0.8"/>
                        <path d="M30.6702 51.3556C31.9679 50.0578 31.9679 47.9538 30.6702 46.6561C29.3725 45.3584 27.2685 45.3584 25.9708 46.6561C24.6731 47.9538 24.6731 50.0579 25.9708 51.3556C27.2685 52.6533 29.3725 52.6533 30.6702 51.3556Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M46.0808 37.2397C47.916 37.2397 49.4037 35.752 49.4037 33.9167C49.4037 32.0815 47.916 30.5938 46.0808 30.5938C44.2456 30.5938 42.7578 32.0815 42.7578 33.9167C42.7578 35.752 44.2456 37.2397 46.0808 37.2397Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M71.7253 37.2397C73.5606 37.2397 75.0483 35.752 75.0483 33.9167C75.0483 32.0815 73.5606 30.5938 71.7253 30.5938C69.8901 30.5938 68.4023 32.0815 68.4023 33.9167C68.4023 35.752 69.8901 37.2397 71.7253 37.2397Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M92.7941 46.062C93.2156 44.2759 92.1094 42.4862 90.3233 42.0646C88.5371 41.6431 86.7474 42.7492 86.3258 44.5354C85.9043 46.3215 87.0105 48.1113 88.7966 48.5329C90.5828 48.9544 92.3725 47.8482 92.7941 46.062Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M93.3048 68.1936C95.0003 67.4913 95.8054 65.5475 95.1031 63.8519C94.4008 62.1564 92.457 61.3512 90.7615 62.0535C89.0659 62.7559 88.2607 64.6997 88.9631 66.3952C89.6654 68.0908 91.6092 68.8959 93.3048 68.1936Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M79.1082 78.2094C80.9434 78.2094 82.4312 76.7217 82.4312 74.8864C82.4312 73.0512 80.9434 71.5635 79.1082 71.5635C77.2729 71.5635 75.7852 73.0512 75.7852 74.8864C75.7852 76.7217 77.2729 78.2094 79.1082 78.2094Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M88.2483 88.3087C89.546 87.011 89.546 84.907 88.2483 83.6092C86.9506 82.3115 84.8466 82.3116 83.5489 83.6093C82.2512 84.907 82.2512 87.011 83.5489 88.3087C84.8466 89.6064 86.9506 89.6064 88.2483 88.3087Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M65.03 80.6323C66.8653 80.6323 68.353 79.1445 68.353 77.3093C68.353 75.4741 66.8653 73.9863 65.03 73.9863C63.1948 73.9863 61.707 75.4741 61.707 77.3093C61.707 79.1445 63.1948 80.6323 65.03 80.6323Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M70.4636 54.1528C72.2989 54.1528 73.7866 52.6651 73.7866 50.8298C73.7866 48.9946 72.2989 47.5068 70.4636 47.5068C68.6284 47.5068 67.1406 48.9946 67.1406 50.8298C67.1406 52.6651 68.6284 54.1528 70.4636 54.1528Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M34.5964 63.3336C34.8905 61.5221 33.6603 59.8152 31.8488 59.5212C30.0373 59.2271 28.3304 60.4572 28.0363 62.2688C27.7423 64.0803 28.9724 65.7872 30.784 66.0813C32.5955 66.3753 34.3024 65.1451 34.5964 63.3336Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M59.9905 67.4747C61.2882 66.177 61.2882 64.073 59.9905 62.7753C58.6928 61.4776 56.5888 61.4776 55.2911 62.7753C53.9934 64.073 53.9934 66.177 55.2911 67.4747C56.5888 68.7724 58.6928 68.7724 59.9905 67.4747Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M78.6222 64.5572C79.0438 62.7711 77.9375 60.9813 76.1514 60.5597C74.3652 60.1382 72.5755 61.2444 72.1539 63.0306C71.7324 64.8167 72.8386 66.6064 74.6247 67.028C76.4109 67.4495 78.2006 66.3434 78.6222 64.5572Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M43.2683 74.5171C45.1035 74.5171 46.5912 73.0293 46.5912 71.1941C46.5912 69.3588 45.1035 67.8711 43.2683 67.8711C41.4331 67.8711 39.9453 69.3588 39.9453 71.1941C39.9453 73.0293 41.4331 74.5171 43.2683 74.5171Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M53.0847 49.5534C53.3788 47.7419 52.1486 46.035 50.3371 45.7409C48.5256 45.4469 46.8187 46.677 46.5246 48.4885C46.2306 50.3001 47.4607 52.0069 49.2722 52.301C51.0838 52.595 52.7907 51.3649 53.0847 49.5534Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M46.3359 69.9024V69.9L54.5871 66.418" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M63.3082 74.4674L59.3711 67.9658" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M75.8359 75.4463L68.2969 76.7456" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M89.3889 67.127L81.7617 72.8847" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M91.6336 61.8269L90.0039 48.6133" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M68.4006 33.9141H49.4023" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M86.7954 43.5285L74.5312 35.7031" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M40.551 69.2849L34.0078 64.6943" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M30.588 59.5415L29.0195 52.252" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M43.5537 36.0674L30.8516 46.8561" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M88.7327 64.8636L78.7344 64.0732" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M78.0554 71.7345L76.4648 66.9629" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M84.1618 83.127L80.8438 77.7168" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M82.8279 84.6867H82.8255L68.0898 78.5791" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M49.4093 45.707L46.9844 37.1133" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M67.1574 50.5312L53.0898 49.2539" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M69.0123 35.8301L52.6641 47.3675" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M46.4507 49.0078H31.6367" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M71.4793 37.2275L70.7109 47.5195" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M72.1049 64.0537L60.9492 64.8686" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M86.3991 46.2373L73.6602 49.9102" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M87.5651 47.9502L77.4297 61.1761" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M74.2388 60.7088L71.6523 53.9355" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M54.3221 65.162L34.6094 62.6514" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M56.1431 62.1642L51.582 51.7988" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M91.1 68.3115L86.8398 82.7731" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M61.8244 76.4083L46.4648 72.0918" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M68.2451 53.3018L59.8594 62.6516" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M47.1115 50.9893L33.9492 60.804" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10"/>
                        </svg>
                        <h3>Comprehensive</h3>
                        <p>It supports every type of decision — from advised, to assisted, to fully automated.</p>
                    </div>
                    <div className={s.decisioncloud__benefitsBox}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="8" fill="#B6E4DB"/>
                        <rect width="120" height="120" rx="8" fill="white" fillOpacity="0.8"/>
                        <path d="M83.9258 43.834H88.6855C90.6921 43.834 92.3176 45.4595 92.3176 47.463V83.6113" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M28.8125 83.6113V47.463C28.8125 45.4595 30.438 43.834 32.4445 43.834H36.2087" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M25.7908 86.6846C25.0872 86.6846 24.5156 87.2561 24.5156 87.9598V88.0028C24.5156 92.8424 28.4396 96.7664 33.2792 96.7664H87.8551C92.6947 96.7664 96.6187 92.8424 96.6187 88.0028V87.9598C96.6187 87.2561 96.0472 86.6846 95.3435 86.6846H25.7939H25.7908Z" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M35 80.2568V50.6289H40.1131" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M86.5116 80.2568V50.6289H81.3984" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M78.6984 43.9081V38.838L74.4149 38.205C74.0554 36.6256 73.4347 35.1476 72.5959 33.8171L75.177 30.3387L71.591 26.7527L68.1127 29.3339C66.7821 28.4981 65.3041 27.8774 63.7247 27.5178L63.0917 23.2344H58.0216L57.3886 27.5178C55.8092 27.8774 54.3312 28.4981 53.0007 29.3339L49.5223 26.7527L45.9363 30.3387L48.5175 33.8171C47.6817 35.1476 47.061 36.6256 46.7014 38.205L42.418 38.838V43.9081L46.7014 44.5411C47.061 46.1205 47.6817 47.5985 48.5175 48.9291L45.9363 52.4075L49.5223 55.9934L53.0007 53.4123C54.3312 54.2481 55.8092 54.8688 57.3886 55.2314L58.0216 59.5148H63.0917L63.7247 55.2314C65.3041 54.8718 66.7821 54.2511 68.1127 53.4123L71.591 55.9934L75.177 52.4075L72.5959 48.9291C73.4317 47.5985 74.0524 46.1205 74.4149 44.5411L78.6984 43.9081Z" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M69.3089 44.4846C71.0321 39.656 68.5146 34.3448 63.6861 32.6217C58.8576 30.8985 53.5464 33.4159 51.8232 38.2444C50.1 43.073 52.6174 48.3842 57.446 50.1074C62.2745 51.8305 67.5857 49.3131 69.3089 44.4846Z" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M72.8672 70.4014H77.3135" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M43.8203 70.4014H59.6913" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M58.5273 79.3135H77.2775" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M43.7773 79.3135H45.9006" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M66.216 73.7816C68.0828 73.7816 69.5961 72.2683 69.5961 70.4016C69.5961 68.5348 68.0828 67.0215 66.216 67.0215C64.3492 67.0215 62.8359 68.5348 62.8359 70.4016C62.8359 72.2683 64.3492 73.7816 66.216 73.7816Z" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M52.0754 82.6928C53.9421 82.6928 55.4555 81.1795 55.4555 79.3127C55.4555 77.4459 53.9421 75.9326 52.0754 75.9326C50.2086 75.9326 48.6953 77.4459 48.6953 79.3127C48.6953 81.1795 50.2086 82.6928 52.0754 82.6928Z" stroke="#009D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>Composable</h3>
                        <p>It’s easy to build and expand as your business needs evolve.</p>
                    </div>
                    <div className={s.decisioncloud__benefitsBox}>
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="8" fill="#B6C8E3"/>
                        <rect width="120" height="120" rx="8" fill="white" fillOpacity="0.8"/>
                        <path d="M60.6235 23.8584C60.6235 23.8584 39.4999 32.4767 28.5312 33.1089V58.1287C28.5312 77.6399 45.2716 92.5833 60.6235 96.1408C75.9724 92.5833 92.7158 77.6399 92.7158 58.1287V33.1089C81.7471 32.4767 60.6235 23.8584 60.6235 23.8584Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M60.6216 90.8384C54.0755 89.0537 47.5657 85.0154 42.5987 79.6309C38.527 75.2144 33.6719 67.8999 33.6719 58.1291V37.6377C43.3247 35.9195 55.8421 31.255 60.6216 29.3916C65.4011 31.255 77.9186 35.9195 87.5714 37.6377V58.1291C87.5714 67.8999 82.7162 75.2144 78.6446 79.6309C73.6806 85.0154 67.1708 89.0507 60.6216 90.8384Z" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M48.3086 61.236L57.3382 68.0513L73.5401 51.9492" stroke="#4237B8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>Trusted</h3>
                        <p>It’s transparent and explainable, so you always know where the data comes from, why recommendations are made, and how decisions are executed.</p>
                    </div>
                    <div className={s.decisioncloud__benefitsBox}>
                        {/* <img src={ZeroLatency}/> */}
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="120" height="120" rx="8" fill="#B6D2E3"/>
                            <rect width="120" height="120" rx="8" fill="white" fillOpacity="0.8"/>
                            <path d="M80.6556 41.9531H89.8496C91.096 41.9531 92.1046 42.9616 92.1046 44.208V95.6714C92.1046 96.9177 91.096 97.9263 89.8496 97.9263H30.2705C29.0241 97.9263 28.0156 96.9177 28.0156 95.6714V44.208C28.0156 42.9616 29.0241 41.9531 30.2705 41.9531H39.0872" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M81.4844 51.9365H92.1056" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M28.0156 51.9365H39.084" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M32.8906 47.208H35.0155" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M85.7054 86.2552C85.7054 83.9305 83.8216 82.0435 81.4937 82.0435C79.8953 82.0435 78.5062 82.9347 77.7926 84.2445C76.7936 83.2042 75.3918 82.5541 73.8378 82.5541C72.2045 82.5541 70.7393 83.274 69.7339 84.4062C68.9632 83.4357 67.7739 82.8078 66.4356 82.8078C64.6532 82.8078 63.1341 83.9178 62.5188 85.4782C61.875 85.0817 61.1202 84.8471 60.3115 84.8471C60.2132 84.8471 60.118 84.8566 60.0197 84.8629C59.1666 82.7602 57.1052 81.276 54.698 81.276C52.4368 81.276 50.4831 82.5826 49.5444 84.4823C48.8942 84.07 48.1236 83.829 47.2958 83.829C46.4681 83.829 45.7228 84.0637 45.079 84.4665C44.3368 82.3162 42.3008 80.7686 39.8968 80.7686C36.868 80.7686 34.4102 83.2264 34.4102 86.2552" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M51.5832 53.0059L50.3685 54.5567C49.0048 56.301 47.1083 57.5537 44.9707 58.1278C42.8046 58.7113 40.889 59.9926 39.519 61.7686C39.2335 62.1428 39.0781 62.5995 39.0781 63.0689V67.4487H48.9255" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M68.9805 53.0059L70.1951 54.5567C71.5589 56.301 73.4554 57.5537 75.593 58.1278C77.7591 58.7113 79.6746 59.9926 81.0447 61.7686C81.3301 62.1428 81.4855 62.5995 81.4855 63.0689V67.4487H71.3686" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M74.2408 53.0054V42.8599C74.2408 41.4422 73.0895 40.291 71.6719 40.291" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M46.1641 53.0054V42.8599C46.1641 41.4422 47.3153 40.291 48.733 40.291" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M62.9435 46.5228C64.4619 45.0044 64.4619 42.5425 62.9435 41.0241C61.425 39.5056 58.9631 39.5056 57.4447 41.0241C55.9263 42.5425 55.9263 45.0044 57.4447 46.5228C58.9631 48.0413 61.425 48.0413 62.9435 46.5228Z" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M67.4976 62.6436L68.6805 51.3595C69.3655 44.8326 68.56 38.2804 66.3749 32.1817C65.2141 28.9373 63.6633 25.8229 61.735 22.9051C61.3703 22.3501 60.7804 22.0742 60.1905 22.0742C59.6006 22.0742 59.0076 22.3533 58.6397 22.9115L58.6111 22.9527C56.7146 25.8514 55.1828 28.95 54.0379 32.169C51.8749 38.2455 51.0789 44.766 51.7608 51.2644L52.9564 62.6436" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M54.0391 32.1689C55.6629 32.8889 57.8353 33.3297 60.2234 33.3297C62.6115 33.3297 64.7554 32.8952 66.3729 32.1816" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M67.0368 65.4883H53.4122C52.5697 65.4883 51.8867 66.1713 51.8867 67.0138V71.2381C51.8867 72.0806 52.5697 72.7636 53.4122 72.7636H67.0368C67.8793 72.7636 68.5623 72.0806 68.5623 71.2381V67.0138C68.5623 66.1713 67.8793 65.4883 67.0368 65.4883Z" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M54.8789 79.1259L56.4742 75.4121" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M63.6445 75.4121L65.947 80.7687" stroke="#00619E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>Scalable</h3>
                        <p>Built on internet-scale, cloud-native technology, it’s designed to support all types of decision-making across complex, global organizations in diverse industries.</p>
                    </div>
                    {/* <div className={s.decisioncloud__benefitsBox}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="8" fill="#B6E4DB"/>
                        <rect width="120" height="120" rx="8" fill="white" fillOpacity="0.8"/>
                        <path d="M69.9766 96.1813V84.4289C69.9766 82.1722 70.9908 80.0423 72.753 78.6224L78.7243 73.8048C78.8131 73.7287 78.9018 73.6526 78.9779 73.5766L86.0902 66.4643C87.3706 65.1838 89.4372 65.1838 90.7049 66.4643C91.9854 67.7447 91.9854 69.8112 90.7049 71.079L84.2012 77.5828" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M89.7946 65.8173V47.1934C89.7946 45.241 91.3666 43.6689 93.319 43.6689C95.2714 43.6689 96.8435 45.241 96.8435 47.1934V72.4858C96.8435 73.2719 96.5899 74.0198 96.1081 74.6411L83.1133 91.4393V96.1808" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M50.9895 96.1813V84.4289C50.9895 82.1722 49.9753 80.0423 48.2131 78.6224L42.2418 73.8048C42.153 73.7287 42.0643 73.6526 41.9882 73.5766L34.8759 66.4643C33.5954 65.1838 31.5289 65.1838 30.2611 66.4643C28.9807 67.7447 28.9807 69.8112 30.2611 71.079L36.7649 77.5828" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M31.17 65.8173V47.1934C31.17 45.241 29.5979 43.6689 27.6456 43.6689C25.6932 43.6689 24.1211 45.241 24.1211 47.1934V72.4858C24.1211 73.2719 24.3747 74.0198 24.8564 74.6411L37.8513 91.4393V96.1808" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M60.0743 72.093C72.9927 72.093 83.4651 61.6206 83.4651 48.7023C83.4651 35.7839 72.9927 25.3115 60.0743 25.3115C47.156 25.3115 36.6836 35.7839 36.6836 48.7023C36.6836 61.6206 47.156 72.093 60.0743 72.093Z" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M61.4067 48.7015H58.757C56.082 48.7015 53.9141 46.5336 53.9141 43.8586C53.9141 41.1835 56.082 39.0156 58.757 39.0156H61.4067C64.0817 39.0156 66.2497 41.1835 66.2497 43.8586" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M58.7414 48.7021H61.391C64.0661 48.7021 66.234 50.8701 66.234 53.5451C66.234 56.2201 64.0661 58.3881 61.391 58.3881H58.7414C56.0663 58.3881 53.8984 56.2201 53.8984 53.5451" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M60.0742 62.7742V58.375" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M60.0742 39.0291V34.6299" stroke="#00818E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>Low Total Cost of Ownership</h3>
                        <p>Reduce your build and operating costs with integrated, best-in-class engines. Design, streamline, and scale decision processes with agility and reusability.</p>
                    </div> */}
                    
                    
                    
                    {/* <div className={s.decisioncloud__benefitsBox}>
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="8" fill="#B6D2E3"/>
                        <rect width="120" height="120" rx="8" fill="white" fillOpacity="0.8"/>
                        <path d="M27.5664 41.5209V78.4782L59.571 96.9541L91.573 78.4782V41.5209L59.571 23.0449L27.5664 41.5209Z" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M44.9805 51.5718V68.4277L59.5768 76.8531L74.1731 68.4277V51.5718L59.5768 43.1465L44.9805 51.5718Z" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M59.5707 59.9994L32.9258 44.6182" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M59.5664 59.9991L91.5684 41.5205" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M59.5664 81.9131V96.9534" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M59.5664 60V76.8533" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M74.168 68.4277L86.0025 75.2594" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M44.9747 68.4277L27.5664 78.4784" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M59.5664 43.1462V23.0449" stroke="#00619E" strokeWidth="1.5" strokeMiterlimit="10"/>
                        </svg>
                        <h3>Ecosystem Ready</h3>
                        <p>Connect your entire ecosystem to decision intelligence — integrating your data, agent frameworks, LLMs, and reusable decision-making skills.</p>
                    </div> */}
                </div>
            </div>

        </div>
        <div className={s.decisioncloud__relatedResources}>
          <div className={s.decisioncloud__relatedResourcesContainer}>
            <h2>
                Resources
            </h2>
            <div className={s.decisioncloud__relatedResourcesRow}>
                  <a href="/what-is-decision-intelligence" target="_blank" className={s.decisioncloud__relatedResourceCard}>
                    {/* <div className={s.decisioncloud__relatedResourceImage} style={{backgroundImage: `url(https://www.aeratechnology.com/client/8b50f20f6595a435fa271aac5a8314bc.jpg)`}} ></div> */}
                    <img src={whatIsDI}/>
                    <div className={s.decisioncloud__relatedResourcesCardWrapper}>
                      {/* <div className={s.decisioncloud__relatedResourceType}>Guide</div> */}
                      <h3 className={s.decisioncloud__relatedResourceTitle}>What is Decision Intelligence</h3>
                      <p className={s.decisioncloud__relatedResourceDescription}>This guide introduces decision intelligence — what it does, why it’s different, and where it delivers value across the enterprise.</p>
                    </div>
                  </a>
                  <a href="https://meet.aeratechnology.com/whitepaper/idc-marketscape-worldwide-decision-intelligence-platforms-2024" target="_blank" className={s.decisioncloud__relatedResourceCard}>
                    {/* <div className={s.decisioncloud__relatedResourceImage} style={{backgroundImage: `url(https://images.ctfassets.net/mh1amgo8m7ts/1wYN24elr0qytBo5jWyrNM/faf68757cb7968cc6aa3c6feab8e3d5f/Resources_Card_-_IDC_report.jpg)`}} ></div> */}
                    <img src={IDC}/>
                    <div className={s.decisioncloud__relatedResourcesCardWrapper}>
                        {/* <div className={s.decisioncloud__relatedResourceType}>Whitepaper</div> */}
                      <h3 className={s.decisioncloud__relatedResourceTitle}>IDC Marketscape for Decision Intelligence Platforms</h3>
                      <p className={s.decisioncloud__relatedResourceDescription}>Aera Technology has been named a Leader in the IDC MarketScape for Decision Intelligence Platforms 2024.</p>
                    </div>
                  </a>
                  <a href="/customers" target="_blank" className={s.decisioncloud__relatedResourceCard}>
                    {/* <div className={s.decisioncloud__relatedResourceImage} style={{backgroundImage: `url(https://images.ctfassets.net/mh1amgo8m7ts/4prFu00cABgTGVeGvbCo8b/a2ac7f09d24154c85cd0dee9ee72096b/Aera_tile.png)`}} ></div> */}
                    <img src={CustomersTile}/>
                    <div className={s.decisioncloud__relatedResourcesCardWrapper}>
                      {/* <div className={s.decisioncloud__relatedResourceType}>Whitepaper</div> */}
                      <h3 className={s.decisioncloud__relatedResourceTitle}>Aera Technology Customers</h3>
                      <p className={s.decisioncloud__relatedResourceDescription}>Leaders at some of the world’s biggest and fastest-growing companies trust Aera to digitize and automate thousands of decisions every day. </p>
                    </div>
                  </a>
              
            </div>
            
          </div>
        </div>
        <div className={s.request}>
          <div className={s.request__container}>
            <h2 className={s.request__title}>See Aera in action.</h2>
            <p>
              <Button
                data-event-category="Section"
                data-event-action="Click"
                data-event-name="Learn about Aera Skills"
                to='/skills'
                className={s.request__button}
              >
                Learn about Aera Skills
              </Button>
              <a
                data-event-category="Section"
                data-event-action="Click"
                data-event-name="SCHEDULE DEMO"
                href='/demo'
                className={s(s.request__button, s.request__filled)}
              >
                SCHEDULE DEMO
              </a>
            </p>
          </div>
      </div>
    </div>
</WaypointEnter>
        );
    }
}