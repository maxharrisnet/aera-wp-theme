import React, { Component } from 'react';
import s from './TestimonialNew.scss';
import ImageTestimonial from "assets/images/home/testimonial-1x.png";
//import ImageTestimonial2x from "assets/images/home/testimonial-2x.png";
import MarcEngel from "assets/images/home/MarcEngel.png";
//import MarcEngel2x from "assets/images/home/MarcEngel@2x.png";



export default class TestimonialNew extends Component {

  componentDidMount() {
    $(function() {
      $('#bxslider').bxSlider({
        auto: true,
        pause: 8000,
        controls: false,
        pager: true,
        adaptiveHeight: false,
        //pagerCustom: '#bx-pager'
      });

      $('.bx-viewport').css('height','auto');
      $('.bx-wrapper').css('background','transparent');
      $('.bx-wrapper').css('border','0px solid');
      $('.bx-wrapper').css('box-shadow','0 0 0px transparent');
      $('.bx-wrapper').css('margin-bottom','0');
      
    })
  }

  render() {

    return (
        
            <div className={s.testimonial}>
              <div className={s.testimonial__container}>
                <div className={s.testimonial__wrapper}>
                  <div className={s.testimonial__row}>
                  <div id="bxslider">
                    <div>
                      <div className={s.testimonial__col}>

                        <div className={s.testimonial__blockquote}>
                          <p className={s.testimonial__quote}>“Our partnership with Aera has been instrumental in our journey to transform our Supply Chain into a digital ecosystem.”</p>
                          <p className={s.testimonial__cite}>Marc Engel
                            <span className={s.testimonial__role}>Chief Supply Chain Officer, Unilever PLC</span>
                          </p>
                        </div>

                      </div>

                      <img
                        ref={c => (this.imageEl = c)}
                        className={s.testimonial__image}
                        src={MarcEngel}
                        alt=""
                      />

                    </div>
                    <div>
                      <div className={s.testimonial__col}>

                        <div className={s.testimonial__blockquote}>
                          <p className={s.testimonial__quote}>“Aera is the foundation of our self-driving supply chain. It’s real-time and intelligent at scale, fundamentally improving the speed, the quality and the impact of our decisions.”</p>
                          <p className={s.testimonial__cite}>Alessandro de Luca
                            <span className={s.testimonial__role}>Group Chief Information Office and Head of Information Technology, Merck Group</span>
                          </p>
                        </div>

                      </div>

                      <img
                        ref={c => (this.imageEl = c)}
                        className={s.testimonial__image}
                        src={ImageTestimonial}
                        alt=""
                      />

                    </div>
                  </div>
                  {/* <div id="bx-pager" className={s.testimonial__pager}>
                    <a data-slide-index="0" href=""></a>
                    <a data-slide-index="1" href=""></a>
                  </div> */}
                </div>
            </div>
          </div>
        </div>
    );
  }
}
