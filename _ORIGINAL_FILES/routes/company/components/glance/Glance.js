import React, { Component, Children } from "react";
import PropTypes from "prop-types";
import { TimelineLite } from "gsap";
import { fadeSlideIn } from "utils/timelineAnimations";

import WaypointEnter from "components/waypoint-enter";

import s from "./Glance.scss"

export default class Glance extends Component {
    
      t = new TimelineLite();
    
      componentDidMount() {
        this.t.set(this.el, { autoAlpha: 0 });
      }
    
      animate = () => {
        fadeSlideIn(this.t, this.el);
      };

    render() {
        return (
            <WaypointEnter onEnter={this.animate}>
                <div ref={c => (this.el = c)} className={s.glance}>
                    <div className={s.glance__container}>
                        <div className={s.glance__content}>
                            <div className={s.glance__title}>At a Glance</div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Founded
                                </div>
                                <div className={s.glance__right}>
                                    2017
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Headquarters              
                                </div>
                                <div className={s.glance__right}>
                                    Mountain View, California
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Global Footprint
                                </div>
                                <div className={s.glance__right}>
                                    500+ employees in 8 countries
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Leadership
                                </div>
                                <div className={s.glance__right}>
                                    <div>Fred Laluyaux, Chief Executive Officer</div>
                                    <div>Shariq Mansoor, Founder &amp; Chief Technology Officer</div> 
                                    {/* <div>Laurent Lefouet, Chief Strategy Officer</div>
                                    <div>Shawn Reynolds, Chief Marketing Officer</div>
                                    <div>Emily Hallowell, Chief People Officer</div> */}
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Funding
                                </div>
                                <div className={s.glance__right}>
                                    Privately-held, VC-funded ($170M+ in total funding)
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Key Investors
                                </div>
                                <div className={s.glance__right}>
                                    New Enterprise Associates, Georgian Partners, DFJ Growth
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Customers
                                </div>
                                <div className={s.glance__right}>
                                    {/* Unilever, Merck, Johnson &amp; Johnson, Deacero, Mars, Smith + Nephew, ExxonMobil, Deacero, and more. */}
                                    Unilever, Merck, Deacero, Lion Pty Ltd., and more
                                </div>
                            </div>
                            <div className={s.glance__row}>
                                <div className={s.glance__left}>
                                    Partners
                                </div>
                                <div className={s.glance__right}>
                                    Kearney, Ernest &amp; Young, Microsoft, Bristlecone
                                </div>
                            </div>
                        </div>
                        <div className={s.glance__row}>
                            <div className={s.glance__challenge}>
                                <h2>The Challenge</h2>
                                <p>With today's digital reality, the demand for timely, accurate, and intelligent decisions is increasing exponentially. The business environment is constantly changing with geopolitical instability, supply shortages, and highly informed socially-conscious consumers. These drivers are accelerating decision volume, velocity, and complexity at an unprecedented rate.</p>
                                <p>With outdated thinking, legacy processes, and siloed organizations, enterprises are unable to keep up. The gap is widening. The demand is outpacing the ability of organizations to make every business-critical decision required in today’s environment.</p>
                                <p>Even today, decisions are left unmade. There’s simply not enough time or people to make them all. </p>
                                <p>And that deficit of decision making continues to grow.</p>
                            </div>
                            <div className={s.glance__solution}>
                                <h2>The Solution</h2>
                                <p>The Aera Decision Cloud™ is a platform that understands how a business works, makes real-time recommendations, predicts outcomes, and takes action autonomously.</p>
                                <p>TIt aggregates and harmonizes internal, external, and physical data that provides a continuously-updated, end-to-end 360° view of operations. It also retains a permanent memory of all decisions made, the context, and the resulting impact, to improve future recommendations.</p>
                                <p>The platform is enhanced by the use of Skills. Each Skill harnesses the data, intelligence, automation, and engagement of the platform to deliver domain-specific data models, analytics, algorithms, and recommendations that can be configured to meet your unique business requirements.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </WaypointEnter>
        )
    }

}