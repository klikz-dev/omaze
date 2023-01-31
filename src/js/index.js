/**
 * Home Page
 */

import slider from './lib/slider';
import daysCounter from './lib/days-counter';

(function () {

    function initPage () {
        addEvents();
        initImpactSlider();
        // sendAnalytics();

        // Set up days left banners in experience cards
        const daysBetween = daysCounter();
        daysBetween.init('.js-days-left');
    }

    // function sendAnalytics () {
    //
    // 	if (!Cookies.get('logged_out_user')) {
    // 		return;
    // 	}
    //
    // 	// When user log out through navbar (in handlebars version),
    // 	// we log them out  and set a cookie, then redirect to homepage
    // 	// send LogOut event to analytics for this case
    // 	const loggedOutUserCookie = Cookies.get('logged_out_user').split(';');
    // 	const loggedOutUser = {
    // 		id: loggedOutUserCookie && loggedOutUserCookie[0],
    // 		email: loggedOutUserCookie && loggedOutUserCookie[1]
    // 	};
    //
    // 	if (!loggedOutUser.id || !loggedOutUser.email) {
    // 		return;
    // 	}
    //
    // 	const oaData = {
    // 		'hitType': 'event',
    // 		'event': 'LogOut',
    // 		'screenName': '',
    // 		'userId': loggedOutUser.id,
    // 		'userEmail': loggedOutUser.email
    // 	};
    //
    // 	const oaDataString = JSON.stringify(oaData);
    // 	const formattedoaDataString = oaDataString.substring(1, oaDataString.length - 1);
    //
    // 	if (window.dataLayer) {
    // 		window.dataLayer.push(oaData);
    // 	}
    //
    // 	if (window.__oa) {
    // 		window.__oa.tag = oaData.screenName;
    // 		window.__oa.push(9, {
    // 			d: formattedoaDataString
    // 		});
    // 	}
    //
    // 	// Remove this cookie after analytics sent
    // 	Cookies.remove('logged_out_user');
    // }

    function addEvents () {
        addHeroImageGAEvent();
    }

    function addHeroImageGAEvent () {
        const HERO_IMAGE_SELECTOR = 'oz-section-banner__image-container';
        const HERO_VIDEO_SELECTOR = 'oz-video__container';
        const images = document.getElementsByClassName(HERO_IMAGE_SELECTOR);
        const videos = document.getElementsByClassName(HERO_VIDEO_SELECTOR);
        const heroElements = [...images, ...videos];

        for (let i=0; i < heroElements.length; i++) {
            if (!heroElements[i]) {
                return;
            }

            heroElements[i].addEventListener('click', () => {
                if (window.dataLayer) {
                    const data = {
                        event: 'click',
                        ga_category: 'Homepage Buttons',
                        ga_action: 'Click',
                        ga_label: 'Homepage Hero',
                    }
                    window.dataLayer.push(data);
                }
            });
        }
    }

    function initImpactSlider () {
        const options = {
            listNode: '.js-impact-slider',
            placeholderNode: '.js-impact-slider-placeholder',
            customConfig: {
                infinite: true,
                arrows: false,
                dots: false,
                centerMode: true,
                centerPadding: '10%',
                slidesToShow: 1,
                lazyLoad: false,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                responsive: [{
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '20%',
                        arrows: true,
                    },
                }, {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '20%',
                        arrows: true,
                    },
                }],
            },
        };

        slider().init(options);
    }

    return initPage();
}());