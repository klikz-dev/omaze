/**
 * Slider
 */

import '../plugins/slick-custom';

SDG.slider = function() {

    function init(opts) {
        const options = opts || {};
        const customConfig = options.customConfig || {};
        const sliderList = jQuery(options.listNode);
        const placeholder = jQuery(options.placeholderNode);
        const thumbs = jQuery(options.thumbCls);
        const defaultConfig = {
            dots: true,
            arrows: false,
            infinite: false,
            centerMode: false,
            touchMove: false,
            useTransform: true,
            speed: 300,
            mobileFirst: true,
            lazyPreload: 2,
            lazyLoad: 'ondemand',
            slidesToShow: 1.1,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 720,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 2,
                },
            }, {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3.1,
                    slidesToScroll: 3,
                },
            }],
        };
        let config = {};

        if (!sliderList.length) {
            return;
        }

        // hide placeholder if exists
        if (placeholder) {
            sliderList.on('init', () => {
                placeholder.css('opacity', 0);
            });
        }

        // combine custom config with default one and init slick
        config = jQuery.extend(false, defaultConfig, customConfig);
        sliderList.slick(config);


        if (thumbs) {
            jQuery.each((thumbs), function() {
                const thumb = jQuery(this);

                thumb.click(() => {
                    sliderList.slick('slickGoTo', jQuery(this).index());
                });
            });
        }
    }


    function changeToColor(btn) {
        const thumbImages = document.querySelectorAll('.js-thumb-img');
        const color = btn.dataset.val;
        const matchingImages = [];

        thumbImages.forEach((img) => {
            if (img.alt === color) {
                matchingImages.push(img);
            }
        });

        if (matchingImages.length === 0) return;

        const firstImage = matchingImages[0];
        const $imageParent = _.parents(firstImage, '.js-thumb')[0];
        $imageParent.click();
    }


    return {
        init,
        changeToColor,
    };
};

export default SDG.slider;