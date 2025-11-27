import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";
import WaypointEnter from "components/waypoint-enter";
import s from "./Content.scss";
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




export default class Content extends Component {
    t = new TimelineLite();

    toggleAccordion = () => {
      this.setState({
        open: !this.state.open
      });
    };
  
    componentDidMount() {
      this.t.set(this.el, { autoAlpha: 0 });
    }
  
    animate = () => {
      fadeSlideIn(this.t, this.el);
    };

    render() {
        const { children } = this.props;
        return (
            <WaypointEnter onEnter={this.animate}>
                <div ref={c => (this.el = c)} className={s(s.decisioncloud)}>
                    <div className={s.decisioncloud__wrapper}>
                        <div className={s.platformAttributes__list}>{children}</div>
                        <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={EY} alt="EY"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>EY</h3>
                                <p>
                                EY exists to build a better working world, helping create long-term value for clients, people and society and build trust in the capital markets. Enabled by data and technology, diverse EY teams in over 150 countries provide trust through assurance and help clients grow, transform and operate. Working across assurance, consulting, law, strategy, tax and transactions, EY teams ask better questions to find new answers for the complex issues facing our world today. For more information about our organization, please visit <a href="http://ey.com/" target="_blank">ey.com</a>.

                                </p>
                            </div>
                          
                        </div>
                        <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={Accenture} alt="Accenture"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Accenture</h3>
                                <p>
                                At Accenture, we're a team of over 500,000 passionate strategists and consultants working across more than 120 countries. We leverage data, technology, and our diverse perspectives to unlock long-term value for our clients. Our focus is on bold thinking and innovative solutions across strategy, digital, technology, and operations. We partner with a vast majority of the Fortune Global 500 companies, helping them navigate complex challenges and achieve lasting success. Please visit <a href="https://www.accenture.com/in-en/about/consulting-index" target="_blank">accenture.com</a> to learn more.
                                </p>
                            </div>
                          
                        </div>
                        <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={Delloite} alt="Delloite"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Deloitte</h3>
                                <p>
                                At Deloitte, we make an impact that matters. For over 175 years, we have worked with leaders around the world—from the Global 500® to private businesses—to help them build better futures. To support their people. To succeed. All while caring for our communities. With a workforce made up of the industry’s greatest minds, we continue to shape the future by delivering real, measurable results. We go beyond talk—we act. To learn more, please visit <a href="https://www2.deloitte.com/us/en.html" target="_blank">deloitte.com</a>.
                                </p>
                            </div>
                          
                        </div>
                        <div className={s.decisioncloud__components}>
                            <div className={s.decisioncloud__cosImage}><img src={Kearney} alt="Kearney"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Kearney</h3>
                                <p>
                                As a global consulting partnership, our people make us who we are. We’re individuals who take as much joy from those we work with as the work itself. Driven to be the difference between a big idea and making it happen, we help our clients break through. We are more than 3,600 people strong in 40+ countries and server over three-quarters of the Fortune Global 500 with curiosity, boldness, generosity, solidarity, passion, and genuine commitment to client success. <a href="http://kearney.com/" target="_blank">kearney.com</a>

                                </p>
                            </div>
                        </div>
                        <div className={s.decisioncloud__components}>
                            <div className={s.decisioncloud__cosImage}><img src={Microsoft} alt="Microsoft"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Microsoft</h3>
                                <p>
                                For Microsoft, partners, and our customers, the future is in the cloud. The immense and rapid changes associated with the cloud journey, digital transformation, and the new world of tech intensity where every company is an innovator, are unlocking limitless opportunities for partners on the Microsoft platform. The Microsoft Partner Network provides resources, programs, and tools that empower partners to capture those opportunities throughout our thriving ecosystem and across the globe. 
                                </p>
                            </div>
                        </div>
                        <div className={s.decisioncloud__components}>
                            <div className={s.decisioncloud__cosImage}><img src={AWS} alt="AWS"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>AWS</h3>
                                <p>
                                Amazon Web Services provides a highly reliable, scalable, low-cost infrastructure platform in the cloud that powers hundreds of thousands of businesses in 190 countries around the world. With data center locations in the U.S., Europe, Brazil, Singapore, Japan, and Australia, customers across all industries are taking advantage of low cost, agility and instant elasticity, openness, flexibility and data security. 
                                </p>
                            </div>
                        </div>
                        <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={Bristlecone} alt="Bristlecone"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Bristlecone</h3>
                                <p>
                                Bristlecone is the leading provider of AI-powered application transformation services for the connected supply chain. We combine deep industry and supply chain expertise, optimally blending digital, process, technology and operations to empower customers with supply chains that are smarter, resilient and responsible. By improving visibility and efficiency across your connected enterprise, the results are better performance, lower cost and positive customer experiences. Our custom delivery models provide flexibility and scalability, and intellectual property, proven methodologies and powerful analytics accelerate your time to value.
                                </p>
                            </div>
                          
                        </div>
                        <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={ZSAssociates} alt="ZS Associates"/></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>ZS Associates</h3>
                                <p>
                                ZS is a leading management consulting and technology firm that helps companies achieve better outcomes by combining data, science, technology, and human ingenuity. With over 13,000 employees across more than 35 offices worldwide, ZS has been delivering transformative impact since its founding in 1983. Everything ZS does connects to the business model and product mix with calculated decisions about future opportunities to drive growth. <a href="https://www.zs.com/" target="_blank">zs.com</a>
                                </p>
                            </div>
                          
                        </div>
                        {/* <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={Cloudsufi} /></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>CLOUDSUFI</h3>
                                <p>
                                CLOUDSUFI is a global leading provider of data and AI-driven digital transformation across cloud-based enterprises. With a global presence and focus on software &amp; platforms, life sciences and healthcare, retail &amp; CPG, financial services, and supply chain, CLOUDSUFI exists to enable our customers to make better decisions in their data monetization journeys.
                                </p>
                            </div>
                          
                        </div> */}
                        
                        {/* <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={Sintec} /></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Sintec Consulting</h3>
                                <p>
                                We are a leading consulting firm in the Americas, with a strong presence in over 20 countries. With over 35 years of consolidated experience in value generation, we stand out for providing close support in specific areas of business, such as business strategy, customer growth, operation strategy, organizational transformation, digital transformation, technology, and advanced analytics, across various sectors including consumer goods, manufacturing, retail, telecommunications, and logistics. At Sintec Consulting, we are dedicated to inspiring a new generation of companies to push their boundaries, ensuring sustainable growth and a successful future.
                                </p>
                            </div>
                          
                        </div> */}
                        {/* <div className={s.decisioncloud__components}>
                          
                            <div className={s.decisioncloud__cosImage}><img src={Course5} /></div>
                            <div className={s.decisioncloud__cosText}>
                                <h3>Course5 Intelligence Limited</h3>
                                <p>
                                    Course5 Intelligence Limited focuses on helping organizations drive digital transformation using artificial intelligence, advanced analytics, and insights. Course5’s AI-driven, IP-led platforms and solutions are supported by industry-specific domain experience and the latest technologies, and aim at enabling organizations to solve complex issues relating to their customers, markets, and supply chains at speed and scale. Course5 combines a multi-disciplinary approach to data integration across structured and unstructured data sources to help businesses grow through informed decision making.
                                </p>
                                <p>
                                    Course5 caters to some of the world’s largest enterprises, including many Fortune 500 companies. The company’s clients span technology, media, and telecom (TMT), pharma &amp; life sciences, CPG, retail, and other sectors. Course5 Intelligence has been recognized by leading industry analysts for its analytics and AI capabilities and proprietary AI-based platforms.
                                </p>
                            </div>
                          
                        </div> */}
                        
                        
                        
                    </div>
                </div>
          </WaypointEnter>
        );
    }
}