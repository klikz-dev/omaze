/**
 * product
 *
 * import dependencies
 * fire functions
 */

/**
 * import dependencies
 */
import './lib/product-configurables';
import './lib/bag-add-to';
import './lib/slider';
import ProductExperience from './lib/product-experience';
import ProductInfoTabs from './lib/product-info-tabs';
import ProductSizeGuide from './lib/size-guide';
import './lib2/cart-handler';
/**
 * product namespace
 * @type {Object}
 */
SDG.Product = SDG.Product || {};

/**
 * fire functions
 */
SDG.Product.run = function () {
    const c = {
        experience: 'pvExperience',
        related: 'relatedExp',
        size_guide: 'sGuideContent',
        size_guide_link: 's-guide__link',
        config: 'js-config-group',
    };
    // globals
    const isExperience = document.getElementById(c.experience);
    const hasRelated = document.getElementById(c.related);
    const $sizeGuide = document.getElementById(c.size_guide);
    const $configurables = document.querySelectorAll(`.${c.config}`);
    let view;

    if (isExperience) {

        // product experience
        ProductExperience();

        if (hasRelated) {
            initRelatedSlider();
        }

    } else {

        // size guide
        ProductSizeGuide(c.size_guide_link, $sizeGuide);

        // configurables
        if ($configurables && $configurables.length) {
            $script([path.shopify_options], () => {
                SDG.Product.configurables();
            });
        }

        // add to bag
        SDG.Bag.form();

        // slick slider
        initSlider();

        // init info tabs
        initInfoTabs();
        _.windowResize(initInfoTabs);

    }

    function initSlider() {
        const options = {
            listNode: '.js-shop-photos',
            placeholderNode: '.js-impact-slider-placeholder',
            thumbCls: '.js-thumb',
            customConfig: {
                infinite: true,
                arrows: true,
                dots: false,
                centerMode: true,
                centerPadding: '0%',
                slidesToShow: 1,
                lazyLoad: true,
                prevArrow: '<button type="button" class="slick-prev slick-arrow oz-btn-icon"><i class="icon icon--slider-prev"></i></button>',
                nextArrow: '<button type="button" class="slick-next slick-arrow oz-btn-icon"><i class="icon icon--slider-next"></i></button>',
                responsive: [{
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '0%',
                        arrows: true,
                    },
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '0%',
                        arrows: true,
                    },
                }],
            },
        };

        SDG.slider().init(options);
    }

    function initRelatedSlider() {
        const options = {
            listNode: '.js-related-slider',
            placeholderNode: '.js-related-slider-placeholder',
            customConfig: {
                infinite: false,
                arrows: true,
                dots: false,
                centerPadding: '0%',
                lazyLoad: true,
                prevArrow: '<button type="button" class="slick-prev slick-arrow oz-btn-icon"></button>',
                nextArrow: '<button type="button" class="slick-next slick-arrow oz-btn-icon"></button>',
                responsive: [{
                    breakpoint: 720,
                    settings: 'unslick',
                },
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToScroll: 1,
                        centerPadding: '0%',
                        arrows: true,
                    },
                }],
            },
        };

        SDG.slider().init(options);
    }

    function initInfoTabs() {

        // desktop
        _.mq({
            view: 'desktop',
            callback: () => {
                if (view !== 'desktop') {

                    // run default info tabs
                    ProductInfoTabs();
                    view = 'desktop';
                }
            },
        });

        // mobile
        _.mq({
            view: 'mobile',
            callback: () => {
                if (view !== 'mobile') {

                    // run mobile info tabs
                    ProductInfoTabs({
                        container: 'mobilePvInfoTabs',
                    });

                    view = 'mobile';
                }
            },
        });
    }

};

SDG.SetUser = function (customer) {
    this.Customer = customer;
    this.getCustomer = function () {
        return this.Customer;
    };
};

SDG.Product.run();
