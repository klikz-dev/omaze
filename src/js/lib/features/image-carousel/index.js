/**
 * Image Carousel feature
 * Generates and injects an image carousel
 *
 * @export
 * SDG.ImageCarousel
 *
 * @param {Object} options - options for creating an image carousel.
 * @param {array} options.images - list of image sources to use to populate the carousel.
 *     Array elements can be either:
 *         - string with image source url
 *         - any type accepted by ozc-image component
 * @param {boolean} [options.hide_existing_image=false] - whether to hide the image already in the placement element (if any).
 *     If False, existing image would be injected into the list of passed in images (as first image).
 * @param {string} [options.placement_selector=.exp-leader__img] - selector where to append the carousel.
 * @param {string} [options.placement_type=bottom] - where to inject the carousel relative to the placement element.
 *    Options are those used by HtmlElementUtils.placeElement function: top, bottom, before, after
 * @param {boolean} [options.replace_existing_content=false] - whether to empty out HTML existing HTML content of placement element
 * @param {number} [options.image_aspect_width=16] - width to use for image aspect ratio.
 * @param {number} [options.image_aspect_height=9] - height to use for image aspect ratio.
 * @param {Object} [options.custom_slick_config=] - if passed in, config will override default Slick config in ozc-carousel component.
 *
 *
 * @example
 * Appends image carousel to experience page hero element (if exists),
 *     with existing hero images being the first image of the carousel.
 *
 *    SDG.ImageCarousel.init({
 *        images: [
 *            'http://img/src/one.jpg',
 *            'http://img/src/two.jpg',
 *         ],
 *    });
 */

window.SDG = window.SDG || {};

import  {default as Image}  from '../../components/ozc-image.js';
import  {default as Carousel}  from '../../components/ozc-carousel.js';
import  {default as HtmlElementUtils}  from '../../utility/html-element.js';

SDG.ImageCarousel = {
    featureName () {
        return 'image-carousel';
    },

    getPlacementEl (placementSelector) {
        return document.querySelectorAll(placementSelector)[0];
    },

    getValidConfig (options) {
        const {
            images,
            hide_existing_image: hideExistingImage = this.defaults().HIDE_EXISTING_IMAGE,
            placement_type: placementType = this.defaults().PLACEMENT_TYPE,
            placement_selector: placementSelector = this.defaults().PLACEMENT_CSS_SELECTOR,
            image_aspect_width: imageAspectWidth = this.defaults().IMAGE_ASPECT_WIDTH,
            image_aspect_height: imageAspectHeight = this.defaults().IMAGE_ASPECT_HEIGHT,
            replace_existing_content: replaceExistingContent = this.defaults().REPLACE_EXISTING_CONTENT,
            custom_slick_config: slickConfig = this.defaults().SLICK_CONFIG,
        } = options;

        if (!Array.isArray(images) || !images.length) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.ImageCarousel.validateOptions]: invalid images: ${JSON.stringify(images)}`);

            this.onFeatureFail();

            return false;
        }

        const placementEl = this.getPlacementEl(placementSelector);

        if (!placementEl) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.ImageCarousel.validateOptions]: could not find element: ${placementSelector}`);

            this.onFeatureFail();

            return false;
        }

        return {
            images,
            hideExistingImage,
            placementType,
            placementSelector,
            imageAspectWidth,
            imageAspectHeight,
            replaceExistingContent,
            slickConfig,
            placementEl,
        };
    },

    init (options) {
        options = options || {};

        // check for nested metadata object which comes from CosmicJs
        if (options.metadata) {
            options = options.metadata;
        }

        const config = this.getValidConfig(options);

        if (!config) {
            return false;
        }

        const cards = this.getCarouselCards(config);

        if (!cards || !cards.length) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.ImageCarousel.init] could not generate cards.');

            return false;
        }

        const CAROUSEL_TYPE = 'compact';

        const carousel = new Carousel({
            type: CAROUSEL_TYPE,
            content: cards,
            slickConfig: config.slickConfig,
        });

        if (!carousel || !carousel.el) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.ImageCarousel.init] could not generate carousel.');

            return false;
        }

        if (config.replaceExistingContent) {
            config.placementEl.innerHTML = '';
        }

        const appended = HtmlElementUtils.placeElement(carousel.el, config.placementSelector, config.placementType);

        if (!appended) {
            return false;
        }

        return carousel.init();
    },

    getSrcToPrepend (hideExistingImage, placementEl) {
        const keepExisting = !hideExistingImage;

        if (keepExisting) {
            const existingImages = placementEl.getElementsByTagName('img');

            if (!existingImages.length) {
                return false;
            }

            return existingImages[0].src;
        }

        return false;
    },

    getCarouselCards (config) {
        const images = config.images;

        const srcToPrepend = this.getSrcToPrepend(config.hideExistingImage, config.placementEl)

        if (srcToPrepend) {
            images.unshift(srcToPrepend);
        }

        const cards = [];

        images.forEach((image) => {
            const card = new Image({
                src: image,
                aspectW: config.imageAspectWidth,
                aspectH: config.imageAspectHeight,
            });

            if (card && card.el) {
                cards.push(card);
            }
        });

        return cards;
    },

    onFeatureFail () {
        return SDG.Features.Validation.invalidateFeature(SDG.ImageCarousel.FEATURE_NAME);
    },

    defaults () {
        return {
            HIDE_EXISTING_IMAGE: false,
            REPLACE_EXISTING_CONTENT: false,
            PLACEMENT_CSS_SELECTOR: '.exp-leader__img',
            PLACEMENT_TYPE: 'bottom',
            IMAGE_ASPECT_WIDTH: 16,
            IMAGE_ASPECT_HEIGHT: 9,
            SLICK_CONFIG: {
                mobileFirst: true,
                dots: true,
                arrows: false,
                infinite: true,
                speed: 200,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: false,
                variableWidth: false,
                prevArrow: '<span class="ozc-carousel__arrow ozc-carousel__arrow--prev"></span>',
                nextArrow: '<span class="ozc-carousel__arrow ozc-carousel__arrow--next"></span>',
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            arrows: true,
                        },
                    },
                ],
            },
        };
    },
};


export default SDG.ImageCarousel;
