/**
* Product
* @requires [lib/util.js]
*
* namespace
* run
* run dom ready
* fire functions
*/

/**
* product namespace
* @type {Object}
*/

import Flickity from 'flickity';

SDG.Product = SDG.Product || {};

/**
* product config
* @type {Object}s
*/
SDG.Product.config = SDG.Product.config || {};

/**
* gallery config
* @type {Object}
*/
SDG.Product.config_photos = {
    cls: {
        active: 'is-active',
    },
    dom: {
        gallery: 'gallery',
        photos: 'photos',
        status: 'status',
        slide: 'js-photo',
    },
    flktyPhotos: null,
    photo_size: {
        full: '540x',
        full_retina: '1080x',
        mobile: '767x',
        mobile_retina: '1534x',
    },
};

/**
* extend product config
* @type {Object}
*/
SDG.Product.config = _.extend(SDG.Product.config, SDG.Product.config_photos);

/**
* photos
* @type {Function}
* @return {init}
*/
SDG.Product.photos = function() {
    /**
     * shorthand config
     */
    const c = SDG.Product.config;

    /**
     * cached globals
     */
    const imgCount = imageJson.length;
    const $photos = document.getElementById(c.dom.photos);
    const flktyOpts = {
        contain: true,
        draggable: true,
        adaptiveHeight: true,
        wrapAround: true,
    };
    let view;

    /**
     * init
     * @return {Function}
     */
    function init() {
        let hasAltImages;

        if (imgCount > 1) {
            onWindowResize();
            initGallery();

            hasAltImages = hasSomeSwatchJson();

            if (!hasAltImages && !SDG.Product.swatches) {
                buildSlides();
            }
        }
    }

    /**
    * init flikity
    * @type {Function}
    * @desc global so that other product js files have access to the flkty object
    */
    function initGallery() {

        c.flktyPhotos = new Flickity(`#${c.dom.photos}`, flktyOpts);

        // on resize, change flickity opts and reload
        _.windowResize(onWindowResize);
    }

    function buildSlides(json) {

        const photos = [];
        let img;
        let photo;
        let imgJson;

        if (json) {
            imgJson = json;
        } else {
            imgJson = imageJson; // imageJson is defined in product-data.liquid
        }

        Object.keys(imgJson).forEach((key) => {
            img = imgJson[key];
            photo = getPhotoHtml(img);

            photos.push(photo);
        });

        if (photos.length > 0) {
            flktyEmpty();
            attachToFlkty(photos);
        }
    }

    function flktyEmpty() {
        const $photoSlides = $photos.querySelectorAll(`.${c.dom.slide}`);

        if ($photoSlides) {
            c.flktyPhotos.remove($photoSlides);
        }
    }

    function attachToFlkty(photos) {
        c.flktyPhotos.append(photos);
    }

    function getPhotoHtml(img) {
        let html;

        if (typeof img === 'object') {
            html = document.createElement('div');
            html.className = 'pv-photo js-photo';
            html.innerHTML = `<div class="intrinsic-ratio intrinsic-ratio--product is-loading">
                <div class="desktop-only">
                    <a class="MagicZoom" href="${img.src}">
                        <img class="lazyload" data-srcset="${_.getSizedImageUrl(img.src, c.photo_size.full)} 1x, ${_.getSizedImageUrl(img.src, c.photo_size.full_retina)} 2x" alt="${img.alt}" />
                    </a>
                </div>
                <div class="mobile-only">
                    <img class="lazyload" data-srcset="${_.getSizedImageUrl(img.src, c.photo_size.mobile)} 1x, ${_.getSizedImageUrl(img.src, c.photo_size.mobile_retina)} 2x" alt="{{ image.alt | escape }}" />
                </div>
            </div>`;
        }

        return html;
    }

    function hasSomeSwatchJson() {
        return Object.keys(SDG.Product.swatchJson).some(hasSwatchJson);
    }

    function hasSwatchJson(color) {
        return SDG.Product.swatchJson[color].length;
    }

    /**
     * on window resize
     */
    function onWindowResize() {

        // desktop
        _.mq({
            view: 'desktop',
            callback: () => {
                if (view !== 'desktop') {
                    flktyOpts.draggable = false;

                    if (c.flktyPhotos) {
                        c.flktyPhotos.destroy();
                        initGallery();
                    }

                    view = 'desktop';
                }
            },
        });

        // mobile
        _.mq({
            view: 'mobile',
            callback: () => {
                if (view !== 'mobile') {
                    flktyOpts.draggable = true;

                    if (c.flktyPhotos) {
                        c.flktyPhotos.destroy();
                        initGallery();
                    }

                    view = 'mobile';
                }
            },
        });
    }

    return {
        init,
        buildSlides,
    };
};

export default SDG.Product.photos;