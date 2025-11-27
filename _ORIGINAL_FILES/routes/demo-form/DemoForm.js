import React, { Component } from "react";
import Helmet from "react-helmet";
import Page from "components/page";
import Intro from "components/intro";
import s from "./DemoForm.scss"
import Dashboard from "assets/images/demoform/dashboards.png";

export default class FredPage extends Component {
    //t = new TimelineLite();
    
    // componentDidMount() {
    //     this.t.set(this.el, { autoAlpha: 0 });
    // }
    
    // animate = () => {
    //     fadeSlideIn(this.t, this.el);
    // };


    componentDidMount() {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      document.body.appendChild(script);
      
      script.addEventListener('load', () => {
          if(window.hbspt) {
            window.hbspt.forms.create({
            portalId: '4455954',
            formId: '9fa1d4a1-4c89-44d5-add1-37df812fc7bd',
            target: '#hubspotForm'
          })
        }
      });
    }

    render() {
        return (
            <Page>
                <Helmet
                title="Aera Technology - Meet Aera - Request a Demo"
                meta={[
                    {
                    name: "description",
                    content:
                        "Request to Meet Aera. Request a demo or to have one of our client partners contact you today about our Cognitive Technology for Decision Intelligence"
                    },
                    {
                    property: "og:description",
                    content:
                        "Request to Meet Aera. Request a demo or to have one of our client partners contact you today about our Cognitive Technology for Decision Intelligence"
                    },
                    {
                    name: "twitter:description",
                    content:
                        "Request to Meet Aera. Request a demo or to have one of our client partners contact you today about our Cognitive Technology for Decision Intelligence"
                    },
                    { property: "og:image", content: "/favicons/aera-share.jpg" },
                    { name: "twitter:image", content: "/favicons/aera-share.jpg" }
                ]}
                link = {[
                    { rel : "canonical", href : "https://www.aeratechnology.com/demo" }
                  ]}
                />
            {/* <Intro
                title="Meet Aera."
                text="Decision Intelligence is here. With Aera, turn your data into better decisions and actions across your business. Fill out the form and we will be in touch shortly."
            />
            <div>
                <div className={s.fred}>
                    <div className={s.fred__contentwrapper}>
                        <div id="hubspotForm"></div>
                    </div>
                    <div className={s.fred__container}>
                        <div className={s.fred__buttonwrapper}>
                        
                        </div>
                    </div>
                </div>
            </div> */}
            <div className={s.fred__formSectionWrapper}>
                <div className={s.fred__formSection}>
                    <div className={s.fred__formContainer}>
                        <div className={s.fred__formRow}>
                            <div className={s.fred__formCopy}>
                                <h1>Meet Aera: Schedule a demo today.</h1>
                                <p className={s.fred__mTop30}>
                                Learn why leaders in consumer goods, life sciences, technology, and beyond trust Aera to digitize and automate decisions. Schedule a personalized demo of Aera Decision Cloud and see how you can start to benefit from AI-powered insights in as little as 2 to 4 weeks.
                                </p>
                                <div className={s.fred__contentwrapper}>
                                    <div id="hubspotForm"></div>
                                </div>
                            </div>
                            <div className={s.fred__formDashboard}>
                                {/* <div className={s.fred__dashboardImage}></div> */}
                                <img alt="Dashboard" src={Dashboard} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Page>
        )
    }
        
}