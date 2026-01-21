import React, { Component } from "react";
import Helmet from "react-helmet";
import Page from "components/page";


// import { TimelineLite } from "gsap";
// import { fadeSlideIn } from "utils/timelineAnimations";
//import WaypointEnter from "components/waypoint-enter";
import Intro, { Loading } from "components/intro-pr";
import s from "./DecisionIntelligenceFAQ.scss";
import WDI from "assets/images/decisionintelligence/Whatisdecisionintelligence.jpg";
import VennDiagram from "assets/images/decisionintelligence/VennDiagramofDecisionIntelligence.png";
import VennDiagramMobile from "assets/images/decisionintelligence/VennDiagramofDecisionIntelligenceMobile.jpg";
import AIColab from "assets/images/decisionintelligence/TheSpectrumofAICollaborationinDigitizedDecisionMaking.jpg";
import AIColabMobile from "assets/images/decisionintelligence/TheSpectrumofAICollaborationinDigitizedDecisionMakingMobile.jpg";
import useCases from "assets/images/decisionintelligence/BenefitsCapabilitiesUseCases.png";
import useCasesMobile from "assets/images/decisionintelligence/BenefitsCapabilitiesUseCasesMobile.jpg";
import softwareStocks from "assets/images/decisionintelligence/softwarestocks.png";
import softwareStocksMobile from "assets/images/decisionintelligence/softwarestocksMobile.jpg";





export default class DecisionIntelligenceFAQ extends Component {
    // t = new TimelineLite();
    
    componentDidMount() {
        $(".accordion-header").click(function(){
            const content = $(this).next(".accordion-content");
            const arrow = $(this).find(".arrow");
        
            // Close all others
            $(".accordion-content").not(content).slideUp();
            $(".arrow").not(arrow).removeClass("up").addClass("down");
        
            // Toggle this one
            content.slideToggle();
            arrow.toggleClass("down up");
          });
        // const sections = document.querySelectorAll("section");
        
        // const navLinks = document.querySelectorAll(".nav a");
        // const mainLinks = document.querySelectorAll(".nav li.main > a");
        // const toggles = document.querySelectorAll(".toggle-btn");
        // const toggleIcon = document.getElementById("toggleIcon");
        // const hamburgerToggle = document.getElementById("hamburgerToggle");
        // const accordionMenu = document.querySelector(".accordion");
        // const menuList = document.getElementById("menu");
        // const progressBar = document.getElementById("progressBar");
        // const navHeight = document.getElementById('menu').scrollHeight;
        // const targetDiv = document.getElementById('sectionWrapper');
        // const outerSection = document.getElementById('outerSection');
        // const navMobile = document.getElementById('navMobile');
        // const leftWrapper = document.getElementById('leftWrapper');
        

    // function updateProgressLine() {
        
    //     const scrollPosition = leftWrapper.scrollTop;
      
        
    //     // console.log('scrollPos '+scrollPosition)
    //     const totalHeight = leftWrapper.scrollHeight - window.innerHeight;
    //     // console.log('tH '+totalHeight);
    //     // const rect = leftWrapper.getBoundingClientRect();
    //     // console.log("top "+rect.top);
      
    //     const scrollPercent = (scrollPosition / totalHeight);
    //     // console.log("scrollPercent "+scrollPercent);
    //     const menu = document.getElementById("menu");
    //     const barHeight = (scrollPercent * menu.clientHeight);
    //     // console.log("barHeight "+barHeight);
    //     const styleEl = document.getElementById("dynamic-bar-style") || document.createElement("style");
    //     styleEl.id = "dynamic-bar-style";
    //     styleEl.innerHTML = `
    //         .nav ul#menu::after {
    //         height: ${barHeight}px !important;
    //         }
    //     `;
    //   document.head.appendChild(styleEl);
    //   if(window.innerWidth > 780){
    //     if(barHeight == 0){
    //         $('.nav a[href="#section1"]').removeClass('active')
    //         $('.nav a[href="#section1"]').removeClass('filled')
    //     }
    //   }
        
      
    // }

    // toggles.forEach(btn => {
    //   btn.addEventListener("click", (e) => {
    //     const parent = btn.parentElement;
    //     parent.classList.toggle("open");
    //     btn.textContent = parent.classList.contains("open") ? "▲" : "▼";
    //   });
    // });

    // hamburgerToggle.addEventListener("click", () => {
    //   accordionMenu.classList.toggle("show");
    //   toggleIcon.textContent = accordionMenu.classList.contains("show") ? "▲" : "▼";
      
    // });

    // navLinks.forEach(link => {
    //   link.addEventListener("click", () => {
    //     if (window.innerWidth < 768) {
    //       accordionMenu.classList.remove("show");
    //       toggleIcon.textContent = accordionMenu.classList.contains("show") ? "▲" : "▼";
    //     }
    //   });
    // });

    //window.addEventListener("scroll", () => {
        
        // const section6 = document.getElementById('section6');
        // const scrollPositionWindow = window.screenY;
        // if(window.innerWidth < 780){
        //     console.log(section6.scrollTop);
        //     if (scrollPositionWindow >= section6.scrollTop) {
        //         navLinks.forEach((link) => {
        //             link.classList.remove("active");
        //             if (link.getAttribute("href") === `#section6`) {
        //                 link.classList.add("active");
        //             }
        //         })
                
        //         //console.log('Top of the window has reached the div top!');
        //     }
        // }
    //})
    
    // leftWrapper.addEventListener("scroll", () => {
    //     // const leftWrapper1 = leftWrapper.scrollTop;
    //     // console.log('scrollPos '+leftWrapper1);
    //     // const totalHeight1 = leftWrapper.scrollHeight - window.innerHeight;
    //     // console.log('left-totalHeight '+totalHeight1);
    //     const section6 = document.getElementById('section3');
    //     const divTop = section6.getBoundingClientRect().top;
    //     const scrollPosition = document.getElementById('leftWrapper').scrollTop;
        
        
    //     let current = "";
    //     sections.forEach((section) => {
    //       const sectionTop = section.offsetTop - 150;
          
    //       if (leftWrapper.scrollTop >= sectionTop) {
    //         current = section.getAttribute("id");
    //       }
    //     });
    //     navLinks.forEach((link) => {
    //         link.classList.remove("active");
    //         if (link.getAttribute("href") === `#${current}`) {
    //           link.classList.add("active");
    //         }
    //     if(window.innerWidth > 780){
    //         if (scrollPosition >= 13500) {
    //             link.classList.remove("active");
    //             if (link.getAttribute("href") === `#section6`) {
    //                 link.classList.add("active");
    //             }
    //             //console.log('Top of the window has reached the div top!');
    //         }
    //     }  
    //     else if(window.innerWidth < 780){
    //         // console.log(section6.scrollTop);
    //         if (scrollPosition >= 18800) {
    //             link.classList.remove("active");
    //             if (link.getAttribute("href") === `#section6`) {
    //                 link.classList.add("active");
    //             }
    //             //console.log('Top of the window has reached the div top!');
    //         }
    //     }
            
            
    //       });
    //       let anyFilled = false;
    //       mainLinks.forEach((mainLink) => {
    //         const sectionId = mainLink.getAttribute("href").substring(1);
    //         const section = document.getElementById(sectionId);
    //         if (section && leftWrapper.scrollTop >= section.offsetTop - 150) {
    //           mainLink.classList.add("filled");
    //           anyFilled = true;
    //         } else {
    //           mainLink.classList.remove("filled");
    //         }

    //         if(window.innerWidth > 780){
    //             if($('.nav li.main > a[href="#section6"]').hasClass('active')){
    //             $('.nav li.main > a[href="#section6"]').addClass('filled');
    //             //console.log('hit2')
    //         }
    //         else{
    //             $('.nav li.main > a[href="#section6"]').removeClass('filled');
    //         }
    //         }
            

            

    //       });
    
    //       if (window.innerWidth >= 768) {
    //         if (anyFilled) {
    //           menuList.classList.add("filled");
    //         } else {
    //           menuList.classList.remove("filled");
    //         }
    //       } else {
    //         menuList.classList.remove("filled");
    //       }
    //     updateProgressLine();
    // })

    // window.addEventListener("scroll", () => {
        


        
  
        
  
        
        
    //     if (window.innerWidth <= 720) {
            
    //         const offsetTop = outerSection.offsetTop;
            
    //         if (window.scrollY >= offsetTop) {
                
    //             navMobile.classList.add('navfixed');
    //         } else {
                
    //             navMobile.classList.remove('navfixed');
    //         }
    //     }
        
    //   });
    // window.addEventListener("load", updateProgressLine);
    // window.addEventListener("resize", updateProgressLine);
    }
    
    animate = () => {
        fadeSlideIn(this.t, this.el);
    };

    render() {
        
        return (
            <Page>
                <Helmet
                title="Aera Technology | Decision Intelligence FAQs"
                meta={[
                    {
                    name: "description",
                    content:
                        "Clear answers to Decision Intelligence: what it is, how it differs from BI and planning tools, platform capabilities, industries, timelines, and how Aera Decision Cloud delivers results."
                    },
                    {
                    property: "og:description",
                    content:
                        "Clear answers to Decision Intelligence: what it is, how it differs from BI and planning tools, platform capabilities, industries, timelines, and how Aera Decision Cloud delivers results."
                    },
                    {
                    name: "twitter:description",
                    content:
                        "Clear answers to Decision Intelligence: what it is, how it differs from BI and planning tools, platform capabilities, industries, timelines, and how Aera Decision Cloud delivers results."
                    },
                    {
                        property: "twitter:image",
                        content: "/favicons/aera-share.jpg"
                      },
                      {
                        property: "og:image",
                        content: "/favicons/aera-share.jpg"
                      },
                      {
                        property: "og:url",
                        content: "https://www.aeratechnology.com/decision-intelligence-faq"
                      }
                ]}
                />
            <Intro title="Frequently Asked Questions" text="" fullheight/>
                <div className={s.di} id="outerSection">
                <style>
                        {`
                        
                        body, html{
                            scroll-behavior: smooth;
                        }
                        .accordion {
                            max-width: 70%;
                            margin: 0 auto;
                            overflow: hidden;
                          }
                      
                          .accordion-item {
                            border-bottom: 1px solid #C2CED7;
                          }
                      
                          .accordion-header {
                            padding: 12px 16px;
                            cursor: pointer;
                            display: flex;
                            font-family: Gilroy, sans-serif;
                            justify-content: space-between;
                            align-items: center;
                            font-weight: bold;
                            text-align:left;
                          }
                      
                          .accordion-header:hover {
                            //background: #eaeaea;
                          }
                      
                          .accordion-content {
                            text-align:left;
                            display: none;
                            padding: 0px 16px 12px 16px;
                            background: #fff;
                          }
                          .accordion-content table{
                              margin-bottom: 15px;
                          }
                          .accordion-content p{
                            margin-top: 0px;
                          }
                          .accordion-content ul{
                            padding-left: 30px;
                          }
                          .arrow {
                            transition: transform 0.3s ease;
                            font-size: 24px;
                          }
                      
                          .arrow.down {
                            transform: rotate(0deg);
                          }
                      
                          .arrow.up {
                            transform: rotate(180deg);
                          }
                          .marginLeft{
                            display: block;
                            margin-left: 15px;
                          }
                          @media screen and (max-width: 720px) {
                            .accordion {
                                max-width: 100%;
                              }
                          }
                        `}
                    </style>
                    <div className={s.ddm__registersection} id="faqSection">
            <div className={s.di__container}>
              <div className={s.ddm__registersectionwrapper}>
                {/* <h2>Frequently Asked Questions</h2>  */}
                <div className={s.ddm__faqwrapper}>
                  <div class="accordion">
                    <div class="accordion-item">
                      <div class="accordion-header">
                      1. What is decision intelligence?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                                        <p><a href="https://www.aeratechnology.com/what-is-decision-intelligence" target="_blank" class="contentLink">Decision intelligence (DI)</a> is a discipline that helps companies design, coordinate, and improve how decisions are made across the enterprise. It integrates data, analytics, AI, and automation into a continuous, feedback-driven loop — enhancing the quality and impact of decisions.</p>
                                        <p>At its core, DI shifts the model from:</p>

                                        <p>"People making decision supported by machines"<br/>
                                        to<br/>
                                        "Machines making decisions with human guidance."</p>
                                        <p>
                                        Leading analysts recognize this shift:
                                        </p>
                                        <ul>
                                            <li>
                                            IDC defines decision intelligence as “a discipline and technology that helps organizations design, engineer, and orchestrate decisions by fully or partially automating all the steps in the decision-making process.”</li>
                                            <li>Gartner describes it as “the practical discipline used to improve decision making by explicitly understanding and engineering how decisions are made, and how outcomes are evaluated, managed and improved by feedback.”</li>
                                        </ul>
                                        <p><a href="https://www.aeratechnology.com/what-is-decision-intelligence" target="_blank" class="contentLink">Aera Technology</a> pioneered the decision intelligence category and remains the leading platform for enterprise-scale decision automation. Unlike traditional systems retrofitted for decision-making, Aera Decision Cloud™ was purpose-built from the ground up specifically for decision optimization and automation, delivering the most comprehensive suite of capabilities for transforming how organizations make and execute decisions.</p>
                      </div>
                    </div>

                    <div class="accordion-item">
                      <div class="accordion-header">
                      2. What are the key benefits of decision intelligence? <span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      {/* <h2 class="sectionSubTitle"></h2> */}
                                        <p><strong>Decision intelligence (DI)</strong> helps businesses operate smarter, scale faster, and compete better by combining real-time data, analytics, and automation. Unlike traditional decision-making approaches, DI delivers faster, smarter, and more comprehensive outcomes.</p>
                                        <p>Here are the five key benefits of DI:</p>
                                        <ul>
                                            <li><strong>Accuracy</strong><br/>
                                                DI improves predictions and recommendations by using harmonized data, advanced analytics, and thorough evaluation of every option.</li>
                                            <li><strong>Frequency</strong><br/>
                                                DI supports decision-making as often as needed, using real-time data and scalable computing to match the pace of the business.</li>
                                            <li><strong>Granularity<br/></strong>
                                                DI enables decisions at the most detailed levels, allowing companies to optimize outcomes and capture value from every opportunity.</li>
                                            <li><strong>Automation<br/></strong>
                                                DI automates the entire process from data to action, reducing manual work and freeing teams to focus on strategic tasks.</li>
                                            <li><strong>Coverage</strong><br/>
                                                DI expands decision-making across the enterprise — not just the top priorities — eliminating blind spots from 80/20 trade-offs.
                                                </li>
                                        </ul>
                                        <p><a href="https://www.aeratechnology.com/decision-cloud" target="_blank" class="contentLink">Aera Decision Cloud™</a> uniquely delivers all five benefits through its comprehensive, composable architecture. The platform's Decision Data Model™ harmonizes billions of transactions in real time for unmatched accuracy. Aera's granular approach optimizes decisions at the most detailed level necessary, and its full spectrum coverage — from decision support to complete automation — spans the entire enterprise. </p>

                                        <p>With proven deployment at leading global companies like Unilever, Merck, Mars, and Dell, Aera has delivered millions of recommendations, resulting in significant revenue gains and cost savings that demonstrate measurable ROI.</p>
                      </div>
                    </div>

                    <div class="accordion-item">
                      <div class="accordion-header">
                      3. Why is decision intelligence becoming essential for enterprises?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      {/* <h2 class="sectionSubTitle"></h2> */}
                                        <p>Today’s companies face a rising volume, complexity, and urgency of decisions. Traditional tools, such as spreadsheets, dashboards, or manual workflows,  are too slow, fragmented, and reactive to keep up with changing market demands.</p>

                                        <p>Decision intelligence (DI) solves this by embedding AI and automation directly into decision-making workflows. While business intelligence tells you what happened, DI tells you what to do next — and can even execute decisions in real time.
                                        </p>
                                        <p>By making this shift, companies can:</p>
                                        <ul>
                                            <li>Shift from reactive firefighting to proactive execution</li>
                                            <li>Reduce costs, errors, and operational delays</li>
                                            <li>Improve agility, revenue performance, and responsiveness</li>
                                            <li>Scale consistent, intelligent decisions across the organization</li>
                                        </ul>
                                        <p>In today’s environment, where speed and adaptability define competitiveness, decision intelligence is becoming a foundational capability.</p>
                                        <p><a href="https://www.aeratechnology.com/decision-cloud" target="_blank" class="contentLink">Aera Decision Cloud™</a> is uniquely positioned to address this need, having been purpose-built from the ground up for decision optimization and automation. Unlike traditional analytics platforms retrofitted for decision-making, Aera's architecture is designed specifically to handle the complexity, speed, and scale requirements of enterprise decision intelligence.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div class="accordion-header">
                      4. How does human-AI collaboration work in decision intelligence?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      {/* <h2 class="sectionSubTitle"></h2> */}
                                    <p>Decision intelligence repositions people not as decision executors, but as architects of how decisions are made and scaled. DI enables collaboration between people and AI across three distinct levels:</p>
                                    <ol>
                                        <li><strong>Decision Support (Human in the loop)</strong><br/>
                                            AI provides insights and simulates decision scenarios to inform human judgment.<br/>
                                            <span class="marginLeft">Example: Evaluating different pricing strategies through scenario modeling.</span>
                                            </li>
                                            <li><strong>Decision Augmentation (Human on the loop)</strong><br/>
                                                AI recommends specific actions with full context and projected impact. Humans can approve, adjust, or override.<br/>
                                                <span class="marginLeft">Example: Recommending the optimal supplier based on cost, lead time, and quality.</span>
                                            </li>
                                            <li><strong>Decision Automation (Human out of the loop)</strong><br/>
                                            AI makes and executes decisions autonomously within predefined constraints, with full traceability and governance.<br/>
                                            <span class="marginLeft">Example: Continuously optimizing logistics routes without human intervention.</span>
                                            </li>
                                    </ol>
                                    <p>This structure allows organizations to balance speed, accuracy, and oversight at scale.<br/>
                                        Aera digitizes the full spectrum of decisions — from structured to situational, from manual to automated — ensuring any and every decision type within an organization can be tackled. Aera covers all three decision modes completely: human-in-the-loop for strategic choices, human-on-the-loop for balanced efficiency and control, and human-out-of-the-loop for autonomous execution at scale.
                                        </p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div class="accordion-header">
                      5. Which industries can use decision intelligence?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      {/* <h2 class="sectionSubTitle"></h2> */}
                                        <p>Decision intelligence (DI) is increasingly used in industries where decisions must be fast, data-driven, and responsive to changing dynamics. Its flexibility and scalability make it valuable in functions that need to continuously sense, decide, and act in real time.</p>

                                        <p>While DI can be applied in almost any sector, the following industries are leading adoption:
                                        </p>
                                        <p><strong>Manufacturing</strong></p>
                                        <ul>
                                            <li>Demand Forecasting: Predicts fluctuations to align inventory and production</li>
                                            <li>Inventory Waste Management: Flags slow-moving or expiring items to reduce loss</li>
                                            <li>Logistics Optimization: Recommends efficient routes to cut costs, time, and emissions</li>
                                            <li>Warehouse Management: Automates restocking and optimizes space usage</li>
                                            <li>Control Tower Visibility: Provides real-time operational insights to manage disruptions</li>
                                            </ul>
                                        <p><strong>Retail & Consumer Goods</strong></p>
                                            <ul>
                                            <li>Price Optimization: Dynamically adjusts pricing based on demand, inventory, and competition</li>
                                            <li>Inventory Replenishment: Ensures product availability across stores and channels</li>
                                            <li>Claims Management: Validates unstructured data to streamline and accelerate processing</li>
                                            </ul>
                                        <p><strong>Life Sciences & Pharmaceuticals</strong></p>
                                        <ul>
                                            <li>Drug Supply Chain Management: Ensures timely and compliant delivery of medications</li>
                                            <li>Clinical Trial Optimization: Identifies the most effective patient cohorts and trial sites</li>
                                            </ul>
                                        <p>
                                        <strong>Energy & Utilities</strong>
                                        </p>
                                        <ul>
                                            <li>Sustainability Planning: Balances cost and compliance to meet ESG goals</li>
                                        </ul>
                                        <p><strong>Financial Services & Banking</strong></p>
                                        <ul>
                                            <li>Fraud Detection: Identifies and responds to suspicious activity in real time</li>
                                            <li>Risk Assessment: Automates underwriting, credit scoring, and loan approvals</li>
                                            </ul>
                                        <p>
                                        <a href="https://www.aeratechnology.com/" target="_blank" class="contentLink">Aera</a> operates at scale, working with some of the largest and most sophisticated global enterprises across industries. In 2024, it delivered tangible value through 25 million digitally generated and executed decisions, powered by over 100 specialized skills. Aera’s customer list includes global leaders like Unilever (CPG), Mars (F&B), Merck Animal Health (Life Sciences), ExxonMobil (Oil & Gas), and Dell (High-Tech).
                                        </p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div class="accordion-header">
                      6. How long does it take to implement decision intelligence?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      {/* <h2 class="sectionSubTitle"></h2> */}
                                        <p>Traditionally, implementing decision intelligence can take 6–12 months. This involves system integration, data modeling, and configuration.</p>
                                        <p><strong>Aera Decision Cloud drastically shortens this timeline</strong>, enabling organizations to begin automating decisions in weeks, not months. Here's how:</p>
                                        <ul>
                                            <li><strong>Patented Data Crawlers  </strong><br/>
                                                Connect directly to ERP, CRM, SCM, and external systems to automatically extract and map data, without disrupting performance.
                                            </li>
                                            <li><strong>Real-Time Decision Data Model  </strong><br/>
                                                Transforms raw data into a live, virtual dataset that serves as a single source of truth — eliminating the need for manual data prep.
                                            </li>
                                            <li><strong>Unstructured Data Integration </strong><br/> 
                                                Ingests PDFs, documents, and other unstructured formats, ensuring that decisions reflect the broadest set of inputs.
                                            </li>
                                            <li><strong>200+ Prebuilt Connectors  </strong><br/>
                                                Enables instant integration with major enterprise platforms, speeding up setup.
                                            </li>
                                            <li><strong>Composable Architecture  </strong><br/>
                                                Lets you deploy modularly — start small, deliver quick wins, and scale fast across functions and geographies.
                                            </li>
                                            <li><strong>Accelerators  </strong><br/>
                                            Decision blueprints and templates accelerate time-to-value by delivering preconfigured, reusable decision models tailored to specific industries, business functions, and use cases. These templates define decision flows, actor personas, data connectivity, and expected outcomes, supporting continuity across the decision lifecycle.
                                            </li>
                                            </ul>
                                            <p>Aera delivers the fastest time to value in the decision intelligence space — without compromise. Its <a href="https://www.aeratechnology.com/decision-data-model" target="_blank" class="contentLink">Decision Data Model™</a> comes pre-populated with thousands of industry-relevant measures, while composable Aera Skills™ enable rapid deployment with proven use cases. This modular approach delivers quick wins and scales without costly implementation cycles.</p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div class="accordion-header">
                      7. How to get started with decision intelligence?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      <h2 class="sectionSubTitle"></h2>
                                    <p>Getting started with decision intelligence involves six clear steps:</p>
                                    <ol>
                                        <li><strong>Identify decision-making challenges </strong><br/>
                                            Find where decisions are slow, manual, or inconsistent, especially in high-impact areas like forecasting, risk, or customer operations.
                                        </li>
                                        <li><strong>Assess data availability and quality </strong> <br/>
                                            Evaluate whether the necessary data exists, and that it’s accurate, timely, and accessible. Clean, unified data is essential for building trust and delivering meaningful outcomes.
                                        </li>
                                        <li><strong>Select the right platform  </strong><br/>
                                            Choose a DI platform that integrates seamlessly with your existing tech stack and supports the full decision lifecycle, from data ingestion and analysis to recommendation and execution.
                                        </li>
                                        <li><strong>Upskill teams and shift culture  </strong><br/>
                                            Train teams to collaborate with intelligent systems. Encourage a culture that values data-driven decisions over intuition alone.
                                        </li>
                                        <li><strong>Start with high-impact use cases  </strong><br/>
                                            Launch pilots in areas where DI can deliver quick, measurable results. Early wins help build internal momentum and support broader adoption.<br/>
                                        </li>
                                        <li><strong>Monitor, measure, and optimize  </strong><br/>
                                            Use metrics and feedback loops to continuously refine decision models, improve accuracy, and expand DI across more functions and workflows.
                                        </li>
                                        </ol>
                                        <p>By following these steps, organizations can build a decision intelligence foundation that supports both short-term improvements and long-term transformation.</p>
                                        <p>Aera accelerates this journey with patented data crawlers and 200+ prebuilt connectors for rapid integration, composable Aera Skills™ for proven use cases, and the Aera Control Room for comprehensive monitoring. Trusted by leading enterprises with millions of executed recommendations, Aera transforms decision-making capabilities at unmatched scale.
                                        </p>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div class="accordion-header">
                      8. What is a decision intelligence platform?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      {/* <h3 class="sectionSubTitle"></h3> */}
                                        <p>A decision intelligence platform (DIP) is the core technology infrastructure that enables organizations to scale decision intelligence across functions and use cases. It bridges the gap between data, insight, decision-making, and execution, turning raw information into real-time, automated action.</p>

                                        <p>According to Gartner, a DIP is “software used to create solutions that support, automate and augment decision making of humans or machines, powered by the composition of data, analytics, knowledge, and artificial intelligence (AI) techniques.”</p>
                                        <p><strong>In short</strong>: a decision intelligence platform transforms data into decisions — and decisions into outcomes.</p>

                                        <p>Essential components of a decision intelligence platform:</p>

                                        <ul>
                                        <li><strong>Data Model</strong><br/>  
                                        A data model that unifies real-time data from organizational systems and external sources, with the capability to capture the decisions made — along with their context, actions taken, and outcomes.
                                        </li>
                                        <li><strong>Decision Engines</strong><br/>
                                        Decision engines that support all types of decisions, from advised to assisted to fully automated. The engines analyze data, apply logic, run scenarios, and generate recommendations and actions.
                                        </li>
                                        <li><strong>Agentic Orchestration  </strong><br/>
                                        Orchestration that combines data, human expertise, and the reasoning power of AI agents within decision processes. Instead of coding decision rules, organizations can prompt and guide agents to automate decisions.
                                        </li>
                                        <li><strong>Decision Engagement  </strong><br/>
                                        Decision engagement that enables organizations to interact with DI platforms through simple, intuitive, natural language interfaces available via chat, voice, desktop, or mobile.
                                        </li>
                                        </ul>
                                        <p><a href="https://www.aeratechnology.com/decision-cloud" target="_blank" class="contentLink">Aera Decision Cloud™</a> is the leading decision intelligence platform globally, purpose-built from the ground up to digitize decision-making. It operates in real time, always-on, thinking, learning, and autonomous, delivering outcomes at the speed and scale of your business. Aera decision cloud excels by being:</p>
                                        <ul>
                                        <li><strong>Comprehensive</strong>: Providing everything you need to support any type of decision.</li>
                                        <li><strong>Composable</strong>: Easy to build, adjust, and expand.</li>
                                        <li><strong>Trusted</strong>: You always know where the data comes from, why recommendations are given, and how decisions are made.</li>
                                        <li><strong>Scalable</strong>: From routine tasks to complex strategies, Aera keeps learning and growing with your business.</li>
                                        </ul>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <div class="accordion-header">
                      9. What are the key capabilities of a decision intelligence platform?<span class="arrow down">&#8964;</span>
                      </div>
                      <div class="accordion-content">
                      <h3 class="sectionSubTitle"></h3>
                                    <p>To function effectively, a decision intelligence platform (DIP) must combine capabilities across data, AI, automation, and user experience. These components work together to convert raw data into intelligent, repeatable actions across the enterprise.</p>
                                    <p><strong>Core capabilities of a decision intelligence platform</strong></p>
                                        <ol>
                                        <li><strong>Data integration & real-time processing</strong>
                                            <ul>
                                            <li>Ingests structured and unstructured data from diverse sources</li>
                                            <li>Streams and integrates data in real time</li>
                                            <li>Harmonizes data into a consistent, enterprise-wide view</li>
                                            </ul>
                                        </li>
                                        <li><strong>Decision composability</strong>
                                            <ul>
                                            <li>Models decision logic and orchestrates complex decision flows</li>
                                            <li>Applies advanced analytics and composite AI/ML techniques</li>
                                            <li>Simulates and tests alternative scenarios for better outcomes</li>
                                            <li>Employs AI agents to reason through multi-variable problems</li>
                                            <li>Uses recommendation engines to suggest optimal actions</li>
                                            </ul>
                                        </li>
                                        <li><strong>Decision-centric engagement</strong>
                                            <ul>
                                            <li>Provides tailored interfaces for decision-makers</li>
                                            <li>Enables natural language queries and guided interactions</li>
                                            <li>Offers contextual visualizations to support informed choices</li>
                                            <li>Supports simulations and side-by-side scenario comparisons</li>
                                            </ul>
                                        </li>
                                        <li><strong>Learning & auditability</strong>
                                            <ul>
                                            <li>Continuously improves decisions using outcome-based feedback</li>
                                            <li>Tracks and audits decisions, approvals, and business impacts</li>
                                            </ul>
                                        </li>
                                        <li><strong>Enterprise-scale deployment & security</strong>
                                            <ul>
                                            <li>Ensures strong governance and regulatory compliance</li>
                                            <li>Supports role-based access and secure scaling across functions</li>
                                            </ul>
                                        </li>
                                        </ol>
                                        <p>Together, these capabilities create a transparent, intelligent system — where decisions are explainable, repeatable, and continuously improved.</p>
                                        <p><a href="https://www.aeratechnology.com/decision-cloud" target="_blank" class="contentLink">The Aera Decision Cloud™</a> is comprehensive, composable, trusted, and scalable — orchestrating DI capabilities through the Decision Intelligence Network™, interacting with users using natural language via Aera Chat, and providing complete visibility through the Aera Control Room. The platform ensures decisions are explainable, repeatable, and continuously improving at enterprise scale.</p>





                      </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                        10. What is the role of AI in decision intelligence platforms? <span class="arrow down">&#8964;</span>
                        </div>
                        <div class="accordion-content">
                        {/* <h3 class="sectionSubTitle"></h3> */}
                                    <p>AI is a core enabler of decision intelligence (DI) — but the two are not the same. <strong>AI represents the "how,"</strong> enabling DI through prediction, automation, and learning. <strong>DI defines the "where and why,"</strong> applying AI in structured, context-aware ways to guide business decisions, with oversight.<br/>Together, they form a system that is not just intelligent, but actionable, explainable, and aligned with business goals.</p>
                                    <p>How AI powers decision intelligence:<br/>
                                    DI platforms embed AI throughout the decision lifecycle, enabling platforms to sense, reason, and act with increasing autonomy and precision. Key capabilities include:</p>
                                    <ul>
                                        <li><strong>Predictive capabilities</strong><br/> Analyzes historical and real-time data to forecast outcomes and recommend next-best actions.</li>
                                        <li><strong>Decision automation</strong><br/> Executes routine and complex decisions automatically, reducing manual work and increasing decision velocity.</li>
                                        <li><strong>Continuous learning</strong><br/> Machine learning algorithms improve over time by learning from decision outcomes, feedback loops, and business results.</li>
                                        <li><strong>Cognitive augmentation</strong><br/> Surfaces insights, flags anomalies, and provides rationale behind recommendations, promoting trust and transparency.</li>
                                        <li><strong>Real-time data processing</strong><br/> Instantly ingests and analyzes both structured and unstructured data to support immediate, data-driven decisions.</li>
                                        <li><strong>Natural language engagement</strong><br/> Enables users to interact with the system conversationally, asking questions, exploring scenarios, and receiving answers in plain language.</li>
                                        <li><strong>Unstructured data support</strong><br/> AI can extract meaning from PDFs, Word documents, emails, and other unstructured sources to inform decisions.</li>
                                    </ul>
                                    <p><a href="https://www.aeratechnology.com/" target="_blank" class="contentLink">Aera</a> integrates AI throughout the decision lifecycle — with agentic AI orchestrating specialized agent teams and Cortex decision engine providing AutoML, forecasting, and optimization capabilities. Unlike traditional AI applications, Aera's AI is specifically designed for decision-making contexts, ensuring every capability is actionable, explainable, and aligned with business objectives.</p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                        11. How does decision intelligence handle unstructured data?<span class="arrow down">&#8964;</span>
                        </div>
                        <div class="accordion-content">
                        {/* <h3 class="sectionSubTitle"></h3> */}
                        {/* <h3 class="sectionSubTitle"></h3> */}
                                        <p>Much of business-critical information lives in unstructured formats — emails, PDFs, images, forms, or sensor feeds — which traditional systems struggle to interpret.</p>
                                        <p>Decision intelligence platforms process both structured data (e.g., databases, spreadsheets) and unstructured content to create a complete, contextual view. For example, Aera’s agentic AI can:</p>
                                        <ul>
                                            <li>Process documents, emails, and unstructured forms</li>
                                            <li>Understand context and extract key information (e.g., quantities, dates, priorities)</li>
                                            <li>Convert unstructured inputs into structured, actionable insights</li>
                                            <li>Seamlessly integrate this intelligence into the Decision Data Model</li>
                                            <li>Enable richer, more accurate decisions across use cases like supply chain planning, finance, and customer operations</li>
                                            </ul>
                                        <p>This dual capability ensures that no critical information is overlooked, empowering enterprises to make data-complete decisions that reflect the full scope of business reality.</p>
                                        <p>Aera's Decision Data Model™ unifies transactional data, analytics, external sources, unstructured data, and IoT inputs across 100+ subject areas. With <a href="https://www.aeratechnology.com/agentic-AI" target="_blank" class="contentLink">Agentic AI</a>, Aera processes unstructured data with minimal performance impact, ensuring no critical information is overlooked.</p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                        12. How does continuous learning work in decision intelligence?<span class="arrow down">&#8964;</span>
                        </div>
                        <div class="accordion-content">
                        
                                    <p>Continuous learning is a core capability of decision intelligence platforms. These systems record each decision — whether made by a human or AI — along with its context, rationale, and outcome. This creates a closed feedback loop that drives ongoing improvement.</p>

                                    <p>With every interaction, the platform:</p>
                                    <ul>
                                        <li>Refines its models based on outcomes</li>
                                        <li>Identifies new patterns and exceptions</li>
                                        <li>Learns from both success and failure</li>
                                        <li>Increases confidence in automation over time</li>
                                        </ul>
                                        <p>Aera Decision Cloud exemplifies this with its Decision Data Model, which captures the full audit trail of decisions, turning individual knowledge into enterprise-wide intelligence.</p>

                                        <p>Over time, the system becomes more adaptive, learning not just how to make better decisions, but when and where to automate them for maximum impact.</p>

                                        <p><a href="https://www.aeratechnology.com/decision-cloud" target="_blank" class="contentLink">Aera</a> learns from every decision and outcome — the Decision Data Model™ serves as the digital memory of the organization, capturing institutional knowledge and turning individual expertise into enterprise-wide intelligence. </p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                        13. What are decision intelligence skills?<span class="arrow down">&#8964;</span>
                        </div>
                        <div class="accordion-content">
                        {/* <h3 class="sectionSubTitle"></h3> */}
                                        <p>A decision intelligence skill is a modular, composable capability that automates or supports decision-making in a specific business domain. These skills are designed to be rapidly deployed, easily configured, and continuously improved, making them ideal for dynamic business environments.</p>

                                        <p>Skills apply to a wide range of functions, including supply chain, procurement, finance, sales, and marketing. Each skill delivers targeted, contextual recommendations, supported by transparent logic and self-learning models.</p>

                                        <p>Core components of a decision intelligence skill:</p>
                                        <ol>
                                            <li><strong>Data Integration</strong><br/>
                                                Pulls and harmonizes structured and unstructured data from multiple enterprise systems.
                                            </li>
                                            <li><strong>Analytics &amp; Modeling  </strong><br/>
                                                Applies machine learning, simulations, and domain-specific logic to evaluate decision options.
                                            </li>
                                            <li><strong>Digitized Rules &amp; Workflows  </strong><br/>
                                                Encodes expert knowledge and business constraints into decision logic.
                                            </li>
                                            <li><strong>Execution Mechanisms  </strong><br/>
                                                Pushes approved decisions directly into enterprise systems for real-time action.
                                            </li>
                                            </ol>
                                        <p><strong>Examples of decision intelligence skills:</strong></p>
                                        <ul>
                                            <li><strong>Logistics Optimization</strong><br/> Recommends optimal transport routes and modes to reduce cost, improve delivery speed, and cut emissions, while adapting to real-time disruptions.</li>
                                            <li><strong>Demand Forecasting</strong><br/> Projects future demand using historical trends, seasonality, promotional events, and external factors, enhancing accuracy and service levels.</li>
                                            <li><strong>Inventory Balancing</strong><br/> Adjusts inventory targets dynamically across locations to prevent stockouts, reduce excess, and optimize aging stock.</li>
                                            <li><strong>Availability to Promise (ATP)</strong><br/> Calculates accurate delivery dates by syncing inventory, order, and capacity data across systems, helping sales and service teams set realistic expectations.</li>
                                            <li><strong>Tariff Impact Mitigation</strong><br/> Simulates global trade scenarios, evaluates sourcing alternatives, and recommends cost-effective suppliers or routes in response to changing tariffs.</li>
                                            </ul>
                                        <p><a href="https://www.aeratechnology.com/skills" target="_blank" class="contentLink">Aera Skills™</a> are composable capabilities that digitize decisions across supply chain, procurement, finance, marketing and multiple other industries and functions. Built on Aera Decision Cloud™, these Skills — including Logistics, Demand, Inventory, Order, Control Tower, Procurement, Finance, and Revenue — can be quickly configured for any enterprise area, delivering measurable ROI through decision automation, continuous learning and optimization.</p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                        14. How is decision intelligence different from business intelligence?<span class="arrow down">&#8964;</span>
                        </div>
                        <div class="accordion-content">
                        
                                    <p>While both business intelligence (BI) and decision intelligence (DI) help organizations work with data, they serve fundamentally different purposes.</p>
                                    <p><strong>Business intelligence</strong> is retrospective. It describes what has happened, using dashboards, reports, and visualizations. These tools require human interpretation and are valuable for tracking performance, but offer limited guidance for what should happen next.</p>
                                    <p><strong>Decision intelligence</strong>, in contrast, is <strong>predictive, prescriptive, and action-oriented</strong>. It doesn’t just show the data — it <strong>interprets it, simulates scenarios, recommends actions</strong>, and can even <strong>execute those decisions</strong> autonomously. It learns from outcomes, continuously improving future decisions. In doing so, DI transforms data from a historical record into a real-time decision engine.</p>

                                    <p><strong>Side-by-side comparison: Business Intelligence vs. Decision Intelligence</strong></p>
                                    <table cellPadding="5" cellSpacing="0" width="100%" border="1">
                                        <thead>
                                        <tr>
                                            <th>Aspect</th>
                                            <th>Business Intelligence (BI)</th>
                                            <th>Decision Intelligence (DI)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><strong>Primary Focus</strong></td>
                                            <td>Describes historical performance</td>
                                            <td>Recommends and executes future actions</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Output Format</strong></td>
                                            <td>Dashboards and static reports</td>
                                            <td>Predictions, simulations, and prescriptive actions</td>
                                        </tr>
                                        <tr>
                                            <td><strong>User Role</strong></td>
                                            <td>Requires human interpretation</td>
                                            <td>Supports or automates decisions</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Adaptability</strong></td>
                                            <td>Produces static insights</td>
                                            <td>Continuously adapts and learns from outcomes</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <p>
                                    <strong>In short:</strong>
                                    </p>
                                    <ul>
                                        <li>BI helps you understand what happened.</li>
                                        <li>DI helps you decide what to do next — and act on it.</li>
                                    </ul>
                                    <p><a href="https://www.aeratechnology.com/" target="_blank" class="contentLink">Aera</a> operates as your decision intelligence agent, purpose built for decision intelligence. While BI shows historical performance, Aera understands how your business works, makes real-time recommendations, and takes action autonomously. </p>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <div class="accordion-header">
                        15. How is decision intelligence different from planning tools?<span class="arrow down">&#8964;</span>
                        </div>
                        <div class="accordion-content">
                        
                                    <p>Planning tools are designed for <strong>structured, periodic planning cycles</strong>. They rely heavily on <strong>historical data</strong> and fixed assumptions to forecast demand, allocate resources, or set budgets. While valuable for long-term alignment, these plans often become outdated in fast-changing environments, and typically require <strong>manual execution</strong>.</p>
                                    <p><strong>Decision intelligence (DI)</strong> platforms take a more fluid, responsive approach. They integrate <strong>real-time data</strong>, simulate the impact of change, and trigger automated, system-wide actions. As new signals emerge, DI platforms continuously adjust, ensuring decisions remain aligned with the current state of the business.</p>
                                    <p><strong>Side-by-side comparison: Planning Tools vs. Decision Intelligence Platforms</strong></p>
                                    <table cellPadding="5" cellSpacing="0" width="100%" border="1">
                                        <thead>
                                            <tr>
                                                <th>Aspect</th>
                                                <th>Planning Tools</th>
                                                <th>Decision Intelligence Platforms</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td><strong>Primary Objective</strong></td>
                                            <td>Create static plans based on forecasts and assumptions</td>
                                            <td>Enable real-time decisions, automation, and continuous learning</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Scope</strong></td>
                                            <td>Support periodic planning and scenario analysis</td>
                                            <td>Span end-to-end decision execution  —  strategic to operational</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Time horizon</strong></td>
                                            <td>Focus on long-term and cyclical plans</td>
                                            <td>Operate across short-term, long-term, and real-time horizons</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Execution</strong></td>
                                            <td>Require manual implementation and tracking</td>
                                            <td>Recommend and execute actions autonomously when appropriate</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Adaptability</strong></td>
                                            <td>Struggle to keep up with rapid changes</td>
                                            <td>Dynamically respond to real-time events and signals</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Data processing</strong></td>
                                            <td>Use historical, structured data for planning</td>
                                            <td>Ingest real-time, structured and unstructured data from many sources</td>
                                        </tr>
                                        <tr>
                                            <td><strong>AI & machine learning</strong></td>
                                            <td>Limited to optimization or forecasting models</td>
                                            <td>Enable contextual reasoning, automation, and self-learning</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Decision learning</strong></td>
                                            <td>Do not learn from past outcomes</td>
                                            <td>Continuously improve based on decision results</td>
                                        </tr>
                                        <tr>
                                            <td><strong>System integration</strong></td>
                                            <td>Require manual connections to execution systems</td>
                                            <td>Seamlessly integrate with ERP, CRM, SCM, and external platforms</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Human-AI collaboration</strong></td>
                                            <td>Primarily analyst-driven</td>
                                            <td>Support collaborative and automated decision-making with AI</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <p>
                                    <strong>In short:</strong>
                                    </p>
                                    <p>Planning tools help organizations build a roadmap; decision intelligence keeps the journey on track, adapting in real time and executing intelligently when it matters most.</p>

                                    <p>While planning tools create static plans, Aera continuously operates in real time, immediately adapting when conditions change and autonomously executing optimal decisions. The Decision Intelligence Network™ connects strategic planning with operational execution, creating a self-optimizing system that traditional planning tools cannot match.</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                    {/* <div className={s.di__section} id="sectionWrapper">
                        <div className={s.di__scrollWrapper}>
                            <div class="contentRow">
                                <div className="nav" id="navMobile">
                                    <div id="hamburgerToggle">
                                        <div id="tableTitle">Table of Contents</div>
                                        <div id="toggleIcon">▼</div>
                                    </div>
                                    <div class="listTitle">Table of Contents</div>
                                    <ul id="menu" className="accordion">
                                    <li className="main">
                                        <a href="#section1">Decision Intelligence - Overview</a><span className="toggle-btn">▼</span>
                                        <ul className="submenu">
                                            <li><a href="#section1">1. What is decision intelligence?</a></li>
                                            <li><a href="#section1-1">2. What are the key benefits of decision intelligence? </a></li>
                                            <li><a href="#section1-2">3. Why is decision intelligence becoming essential for enterprises?</a></li>
                                            <li><a href="#section1-3">4. How does human-AI collaboration work in decision intelligence?</a></li>
                                            <li><a href="#section1-4">5. Which industries can use decision intelligence?</a></li>
                                            <li><a href="#section1-5">6. How long does it take to implement decision intelligence?</a></li>
                                            <li><a href="#section1-6">7. How to get started with decision intelligence?</a></li>
                                        </ul>
                                    </li>
                                    <li className="main">
                                        <a href="#section2">Decision Intelligence Platforms</a><span className="toggle-btn">▼</span>
                                        <ul className="submenu">
                                        <li><a href="#section2">8. What is a decision intelligence platform?</a></li>
                                        <li><a href="#section2-1">9. What are the key capabilities of a decision intelligence platform?</a></li>
                                        <li><a href="#section2-2">10. What is the role of AI in decision intelligence platforms?</a></li>
                                        <li><a href="#section2-3">11. How does decision intelligence handle unstructured data?</a></li>
                                        <li><a href="#section2-4">12. How does continuous learning work in decision intelligence?</a></li>
                                        <li><a href="#section2-5">13. What are decision intelligence skills?</a></li>
                                        </ul>
                                    </li>
                                    <li className="main">
                                        <a href="#section3">Decision Intelligence - Comparisons</a><span className="toggle-btn">▼</span>
                                        <ul className="submenu">
                                        <li><a href="#section3">14. How is decision intelligence different from business intelligence?</a></li>
                                        <li><a href="#section3-1">15. How is decision intelligence different from planning tools?</a></li>
                                        </ul>
                                    </li>
                                    </ul>
                                </div>
                                <div className="mainLeft" id="leftWrapper">
                                    <section id="section1" class="borderBottom">
                                        <h2 class="sectionTitle">Decision Intelligence - Overview</h2>
                                        
                                    </section>
                                    <section id="section1-1">
                                        

                                    </section>
                                    <section id="section1-2">
                                        
                                    </section>
                                    <section id="section1-3">
                                    
                                    </section>
                                    <section id="section1-4">
                                        
                                    </section>
                                    <section id="section1-5">
                                        
                                    </section>
                                    <section id="section1-6">
                                    
                                    </section>
                                    <section id="section2">
                                        <h2 class="sectionTitle">Decision Intelligence Platforms</h2>
                                        

                                    </section>
                                    <section id="section2-1">
                                    
                                    </section> 
                                    <section id="section2-2">
                                    
                                    </section>
                                    <section id="section2-3">
                                       
                                    </section>
                                    <section id="section2-4">
                                    
                                    </section>
                                    <section id="section2-5">
                                    
                                    </section>
                                    <section id="section3">
                                    <h2 class="sectionTitle">Decision Intelligence - Comparisons</h2>
                                    
                                    </section>
                                    <section id="section3-1">
                                    
                                    </section>
                                </div>
                            </div>
                            

                            
                        </div>
                    </div> */}
                </div>
            </Page>
        )
    }
        
}