;(function ($, window, document, undefined) {
    'use strict';

    if( $('.aera-banner-slider .swiper-container').length ){
        let autoplay = +$('.aera-banner-slider .swiper-container').data('autoplay');
        let swiper = new Swiper(".aera-banner-slider .swiper-container", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: autoplay,
                disableOnInteraction: false,
            },
        });
    }

})(jQuery, window, document);