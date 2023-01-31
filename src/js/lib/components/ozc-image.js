/**
 * Class representing an image element.
 * Generates an image component with an optimized image.
 * Has dependency on Imgix, an external processing service, to process images
 * using params passed in as url query strings.
 *
 * @export
 * @class Image
 * @extends BaseNode
 *
 * @param {Object} options - options for creating an image component.
 * @param {string|Object} options.src - image source to use for the image.
 *     Can optionally pass in an object with these properties (listed in priority):
 *         1. imgix_url
 *         2. url
 * @param {number} options.aspectW - width to use for image aspect ratio.
 * @param {number} options.aspectH - height to use for image aspect ratio.
 * @param {boolean} [options.lqip=false] - whether to inject a low quality image.
 * @param {boolean} [options.eagerLoad=false] - whether to load image right away. Do not lazyload.
 * @param {string} [options.imageFormat=defaults.imageFormat] - format query string to append to the image.
 * @param {string} [options.lqipFormat=defaults.lqipFormat] - format query string to append to the lqip image.
 * @param {string} [options.cropType=defaults.cropType] - crop format used for Shopify CDN images, only if width and height are provided. Use 'none' to skip any cropping. For ImgIx images crop use options.imageFormat.
 * @param {number} [options.baseWidth=812] - default image width.
 * @param {number} [options.lqipWidth=400] - default lqip image width.
 * @param {Array} [options.content=default.widths] - array of widths to use when generating image src set.
 * @param {string} [options.alt] - alt text for image.
 *
 * @example
 *
 *     const myImage = new Image({
 *         src: 'http://hello/myimg.jpg',
 *         aspectW: 4,
 *         aspectH: 3,
 *     });
 */

window.SDG = window.SDG || {};
SDG.Component = SDG.Component || {};

import {default as BaseNode} from './ozc-base-node.js';
import {default as Element} from './ozc-element.js';

SDG.Component.Image = class Image extends BaseNode {
    constructor (options) {
        options = options || {};

        super(options);

        this.src = this.constructor.extractSrc(options.src);
        this.aspectW = options.aspectW;
        this.aspectH = options.aspectH;

        this.lqip = options.lqip;
        this.eagerLoad = options.eagerLoad;
        this.widths = options.widths || this.constructor.defaults().widths;
        this.baseWidth = options.baseWidth || this.constructor.defaults().baseWidth;
        this.lqipWidth = options.lqipWidth || this.constructor.defaults().lqipWidth;
        this.cropType = options.cropType || this.constructor.defaults().cropType;
        this.imageFormat = options.imageFormat || this.constructor.defaults().imageFormat;
        this.lqipFormat = options.lqipFormat || this.constructor.defaults().lqipFormat;
        this.altText = options.alt;

        this.el = this.createEl();
    }

    getAspectRatio () {
        if (!this.aspectH || !this.aspectW) {
            return false;
        }

        return this.aspectH / this.aspectW;
    }

    getSrc (width, format) {
        const height = Math.round(width * this.getAspectRatio());

        const options = {
            width: width,
            height: height,
            format: format,
            cropType: this.cropType,
        };

        return this.constructor.getVariantSrc(this.src, options);
    }

    static getVariantSrc (src, options) {
        const shopifySrc = this.generateShopifyVariantSrc(src, options);

        if (shopifySrc) {
            return shopifySrc;
        }

        const imgixSrc = this.generateImgixVariantSrc(src, options);

        if (imgixSrc) {
            return imgixSrc;
        }

        return src;
    }

    // Check whether src filename contains a pattern which
    // may indicate that it already is a variant of original,
    // and further formatting could make the url invalid.
    // Examples of patterns that denote already processed images:
    // abc_x300.png
    // abc_300x.png
    // abc_300x100.png
    // abc_300x100_crop_center.png
    // abc_thumb.png

    static isProcessableShopifySrc (src) {
        /* eslint-disable-next-line  no-useless-escape */
        const bannedRegex = RegExp('_(x\\d+|\\d+x|\\d+x\\d+|crop_[a-zA-Z]+|thumb|small|medium|large|master)\.(jpe?g|png)');

        if (bannedRegex.test(src)) {
            return false;
        }

        return true;
    }

    static generateShopifyVariantSrc (src, options) {
        const allowedSuffixRegex = /\.(jpg|jpeg|png)/i;

        const isShopifyCdn = typeof(src) === 'string' && src.includes(this.shopifyCdnHostName);

        // Process only if Shopify CDN url.
        if (!isShopifyCdn) {
            return false;
        }

        // Yes it's a Shopify CDN, but process only if allowed.
        // otherwise return original url to be safe
        const canProcess = this.isProcessableShopifySrc(src);

        if (!canProcess) {
            return src;
        }

        const width = options && parseInt(options.width) || '';
        const height = options && parseInt(options.height) || '';
        const cropType = options.cropType || this.defaults().cropType;

        if (!width && !height) {
            return false;
        }

        let format = `_${width}x${height}`;

        if (width && height && this.validShopifyCropTypes.includes(cropType)) {
            format = `${format}_crop_${cropType}`;
        }

        return src.replace(allowedSuffixRegex, (match) => {
            return  `${format}${match}`;
        });
    }

    static generateImgixVariantSrc (src, options) {
        const width = parseInt(options.width);
        const height = parseInt(options.height);
        let format = options.format || this.defaults().imageFormat;

        format = format.replace(/^\?/, '');

        if (width) {
            format = `${format}&w=${width}`;
        }

        if (height) {
            format = `${format}&h=${height}`;
        }

        return `${src}?${format}`;
    }

    getSourceSet () {
        const srcSet = [];

        this.widths.forEach((width) => {
            const src = this.getSrc(width, this.imageFormat);

            srcSet.push(`${src} ${width}w,`);
        });

        return srcSet
            .join(' ')
            .replace(/,$/, '');
    }

    getLqipSrc () {
        return this.getSrc(this.lqipWidth, this.lqipFormat);
    }

    getDefaultSrc () {
        return this.getSrc(this.baseWidth);
    }

    getImage () {
        const conf = {
            tag: 'img',
            cssClasses: 'ozc-image__image',
            attributes: {},
        };

        if (this.altText) {
            conf.attributes.alt = this.altText;
        }

        if (!this.eagerLoad) {
            conf.cssClasses = `${conf.cssClasses} lazyload`;
        }

        if (!this.aspectW || !this.aspectH) {
            conf.attributes.src = this.src;
            conf.cssClasses = `${conf.cssClasses} ozc-image__image--relative`;

            return new Element(conf);
        }

        const responsiveAttrs = {
            'data-sizes': 'auto',
            'data-srcset': this.getSourceSet(),
            'data-src': this.getDefaultSrc(),
        }

        conf.attributes = Object.assign({}, conf.attributes, responsiveAttrs);

        return new Element(conf);
    }

    getLqipImage () {
        if (!this.lqip) {
            return false;
        }

        return new Element({
            tag: 'img',
            cssClasses: 'ozc-image__image ozc-image__image--lqip',
            attributes: {
                'src': this.getLqipSrc(),
            },
        });
    }

    getPlaceholder () {
        if (!this.aspectH || !this.aspectW) {
            return false;
        }

        const aspectRatio = this.getAspectRatio();
        const padding = (aspectRatio * 100).toFixed(2);

        return new Element({
            cssClasses: 'ozc-image__placeholder',
            styles: {
                'padding-top': `${padding}%`,
            },
        });
    }

    createEl () {
        if (!this.src) {
            return false;
        }

        const parent = new Element({
            cssClasses: this.cssClasses,
            children: [
                this.getLqipImage(),
                this.getPlaceholder(),
                this.getImage(),
            ],
        });

        parent.el.classList.add('ozc-image');

        return parent.el;
    }

    static extractSrc (srcItem) {
        // check if it's just a src string
        if (typeof srcItem === 'string') {
            return srcItem;
        }

        // Check if it's an image object from CosmicJs or elsewhere
        // Give priority to imgix_url
        if (typeof srcItem === 'object') {
            // If shallow object
            if (srcItem.imgix_url || srcItem.url) {
                return srcItem.imgix_url || srcItem.url;
            }

            // If nested get values, just in case the key is not 'image'
            const values = Object.values(srcItem);

            if (values.length) {
                return values[0].imgix_url || values[0].url;
            }

            return false;
        }

        return false;
    }

    static get shopifyCdnHostName () {
        const SHOPIFY_CDN_HOST_DEFAULT = 'cdn.shopify.com';

        return (window.Shopify && window.Shopify.cdnHost) || SHOPIFY_CDN_HOST_DEFAULT;
    }

    static get validShopifyCropTypes () {
        return [
            'top',
            'center',
            'bottom',
            'left',
            'right',
        ]
    }

    static defaults () {
        return {
            imageFormat: 'auto=format&fm=jpg&q=80&fit=crop&crop=entropy',
            lqipFormat: 'auto=format&fm=jpg&q=20&fit=crop&crop=entropy',
            baseWidth: 812,
            lqipWidth: 400,
            cropType: 'center',
            widths: [
                480,
                650,
                812,
                1049,
                1249,
                1439,
                1600,
                2000,
                2400,
            ],
        }
    }
};

export default SDG.Component.Image;
