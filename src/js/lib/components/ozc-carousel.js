/**
 * Class representing a carousel element.
 * Component has dependencies of Slick and jQuery libraries (Slick requires jQuery).
 *
 * @export
 * @class Carousel
 * @extends BaseNode
 *
 * @param {Object} options - options for creating a carousel.
 * @param {Array} options.content - list of elements for populating carousel panels .
 * @param {Object} [options.slickConfig=] - if passed in, will override default config.
 * @param {String|HTMLElement} [options.header=] - content for carousel header.
 * @param {Object} [options.type=] - can specify type from existing validTypes.
 *
 * @example
 *     1. Create carousel instance
 *         const carousel = new SDG.Component.Carousel({
 *             content: [<list of html elements>],
 *         });

 *     2. Insert onto the DOM (page)
 *         const bodyEl = document.getElementsByTagName('body')[0];
 *         bodyEl.appendChild(carousel.el);

 *     3. Call init() to initialize
 *         carousel.init();
 */

window.SDG = window.SDG || {};
SDG.Component = SDG.Component || {};

import {default as BaseNode} from './ozc-base-node.js';
import {default as Element} from './ozc-element.js';

SDG.Component.Carousel = class Carousel extends BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.type = options.type;
        this.title = options.header;
        this.content = options.content;
        this.slickConfig = Object.assign({}, this.constructor.defaults().slickConfig, options.slickConfig);
        this.events = options.events || {};
        this.el = this.createEl();
    }

    init () {
        if (!this.el || !this.carousel) {
            return false;
        }

        const CSS_CLASS_SLIDER_READY = 'slider-ready';

        // Set slickConfig
        this.slickConfig.appendArrows = this.slickConfig.appendArrows || (this.nav && this.nav.controls.el);

        if (this.type === 'compact') {
            this.slickConfig.appendArrows = this.carousel.el;
        }

        const $carousel = jQuery(this.carousel.el);

        $carousel.slick(this.slickConfig);

        // Register slick events
        Object.keys(this.events).forEach((eventName) => {
            $carousel.on(eventName, this.events[eventName]);
        });

        // Register Nav rendering event
        $carousel.on('beforeChange', this.renderNavInfo.bind(this));
        $carousel.on('afterChange', this.onAfterChange.bind(this));
        $carousel.on('breakpoint', this.onBreakpoint.bind(this));

        this.onBreakpoint()

        this.carousel.el.classList.add(CSS_CLASS_SLIDER_READY);

        this.refresh();

        return true;
    }

    // hide headerEl if no arrows and no title at a breakpoint
    onBreakpoint () {
        this.updatePartialClass();

        if (this.title) {
            this.showHeaderEl();

            return;
        }

        const showArrows = jQuery(this.carousel.el).slick('slickGetOption', 'arrows');

        if (showArrows) {
            this.showHeaderEl();

            return;
        }

        this.hideHeaderEl();
    }

    paginationStats (slick, slideIndex) {
        const indexValid = typeof(slideIndex) === 'number';

        if (!slick || !indexValid) {
            return false;
        }

        const $carousel = jQuery(this.carousel.el);
        const infiniteMode = $carousel.slick('slickGetOption', 'infinite');
        const slidesToShow = $carousel.slick('slickGetOption', 'slidesToShow');
        const slidesToScroll = $carousel.slick('slickGetOption', 'slidesToScroll');
        const showArrows = $carousel.slick('slickGetOption', 'arrows');

        if (infiniteMode || !slidesToShow || !slidesToScroll) {
            return false;
        }

        const slideCount = slick.slideCount;
        const totalPages = Math.ceil(slideCount/slidesToShow);
        const currentPage = Math.ceil((slideIndex + 1)/slidesToShow);
        const isLastPage = currentPage === totalPages;

        return {
            totalPages: totalPages,
            currentPage: currentPage,
            isLastPage: isLastPage,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            showArrows: showArrows,
        }
    }

    // slide back to beginning if slider reaches end (non-infinite mode)
    onAfterChange (event, slick, currentSlide) {
        const stats = this.paginationStats(slick, currentSlide);

        if (!stats || stats.totalPages < 2) {
            return false;
        }

        if (this.nav && this.nav.ended) {
            jQuery(slick.$slider[0]).slick('slickGoTo', 0);
            this.nav.ended = false;

            return;
        }

        this.nav.ended = stats.isLastPage;
    }

    // render pagination info inside nav
    renderNavInfo (event, slick, currentSlide, nextSlide) {
        if (!slick || !this.nav) {
            return false;
        }

        const stats = this.paginationStats(slick, nextSlide);

        if (!stats || !stats.showArrows || stats.totalPages < 2) {
            this.nav.info.el.innerHTML = '';

            return false;
        }

        if (stats.currentPage >= stats.totalPages) {
            this.nav.lastPage = true;
        }

        const paginationContent = `${stats.currentPage} / ${stats.totalPages}`;

        this.nav.info.el.innerHTML = paginationContent;
    }

    refresh () {
        if (!this.el || !this.carousel) {
            return false;
        }

        const SLICK_REFRESH_ACTION = 'refresh';

        jQuery(this.carousel.el).slick(SLICK_REFRESH_ACTION);
    }

    titleEl () {
        const CSS_CLASS_TITLE = 'ozc-carousel__title';

        if (!this.title) {
            return false;
        }

        const title = new Element({
            cssClasses: CSS_CLASS_TITLE,
        });

        if (this.title instanceof HTMLElement) {
            title.el.appendChild(this.title);
        } else {
            title.el.innerHTML = this.title;
        }

        return title;
    }

    navEl () {
        const CSS_CLASS_NAV = 'ozc-carousel__nav';

        const controls = new Element({
            cssClasses: `${CSS_CLASS_NAV}-controls`,
        });

        const info = new Element({
            cssClasses: `${CSS_CLASS_NAV}-info`,
        });

        const nav = new Element({
            cssClasses: CSS_CLASS_NAV,
            children: [
                info,
                controls,
            ],
        });

        this.nav = {
            info: info,
            controls: controls,
        }

        return nav;
    }

    headerEl () {
        const CSS_CLASS_HEADER = 'ozc-carousel__header';

        const header = new Element({
            cssClasses: CSS_CLASS_HEADER,
            children: [
                this.titleEl(),
                this.navEl(),
            ],
        });

        this.header = header;

        return header;
    }

    updatePartialClass () {
        const CSS_CLASS_PARTIAL = 'ozc-carousel--partial';
        const totSlides = this.content && this.content.length || 0;
        const slidesToShow = jQuery(this.carousel.el).slick('slickGetOption', 'slidesToShow');
        const partialLength = totSlides < slidesToShow;
        const wrapperEl = this.carousel.el.parentElement;

        if (partialLength) {
            wrapperEl.classList.add(CSS_CLASS_PARTIAL);

            return true;
        }

        wrapperEl.classList.remove(CSS_CLASS_PARTIAL);
    }

    showHeaderEl () {
        const CSS_HIDDEN_CLASS = 'ozc-carousel__header--hidden';

        if (this.header && this.header.el) {
            this.header.el.classList.remove(CSS_HIDDEN_CLASS);
        }
    }

    hideHeaderEl () {
        const CSS_HIDDEN_CLASS = 'ozc-carousel__header--hidden';

        if (this.header && this.header.el) {
            this.header.el.classList.add(CSS_HIDDEN_CLASS);
        }
    }

    createEl () {
        if (!this.constructor.dependenciesValid()) {
            return false;
        }

        if (!Array.isArray(this.content) || this.content.length < 1) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.Carousel] content missing or not valid.');

            return false;
        }

        const CSS_CLASS_WRAPPER = 'ozc-carousel__wrapper';
        const CSS_CLASS_CAROUSEL = 'ozc-carousel';
        const CSS_CLASS_PANEL = 'ozc-carousel__panel';

        const carousel = new Element({
            cssClasses: CSS_CLASS_CAROUSEL,
        })

        this.content.forEach((item) => {
            const panel = new Element({
                cssClasses: CSS_CLASS_PANEL,
                children: [
                    item,
                ],
            });

            carousel.appendChild(panel);
        });

        const wrapper = new Element({
            cssClasses: CSS_CLASS_WRAPPER,
            children: [
                this.headerEl(),
                carousel,
            ],
        })

        if (this.constructor.validTypes.includes(this.type)) {
            wrapper.el.classList.add(`${CSS_CLASS_CAROUSEL}--${this.type}`)
        }

        this.carousel = carousel;

        return wrapper.el;
    }

    static dependenciesValid () {
        if (!window.jQuery) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.Carousel] jQuery not loaded.');

            return false;
        }

        if (typeof jQuery('body').slick !== 'function') {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Component.Carousel] Slick library not loaded.');

            return false;
        }

        return true;
    }

    static get validTypes () {
        return [
            'compact',
        ];
    }

    static get deviceBreakpoints () {
        return {
            TABLET: 720 - 1,
            DESKTOP: 1100 - 1,
        };
    }

    static defaults () {
        return {
            imageAspectW: 16,
            imageAspectH: 9,
            slickConfig: {
                mobileFirst: true,
                dots: false,
                arrows: false,
                infinite: true,
                speed: 200,
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth: true,
                adaptiveHeight: false,
                prevArrow: '<span class="ozc-carousel__arrow ozc-carousel__arrow--prev"></span>',
                nextArrow: '<span class="ozc-carousel__arrow ozc-carousel__arrow--next"></span>',
                responsive: [
                    {
                        breakpoint: this.deviceBreakpoints.TABLET,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            arrows: true,
                            infinite: false,
                        },
                    },
                    {
                        breakpoint: this.deviceBreakpoints.DESKTOP,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            arrows: true,
                            infinite: false,
                        },
                    },
                ],
            },
        }
    }
};

export default SDG.Component.Carousel;
