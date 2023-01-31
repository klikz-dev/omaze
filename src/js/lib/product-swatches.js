/**
 * swatch json array
 * @type {Object}
 */

import Flickity from 'flickity';


SDG.Product.swatchJson = {};

/**
 * active swatch
 */
SDG.Product.activeColor = '';

/**
 * swatches
 * @return {Function} builds swatchJson array
 */
SDG.Product.swatches = function() {
    /**
     * shorthand config
     */
    const p = productJson;
    const options = _.arrayToLower(JSON.parse(JSON.stringify(p.options)));
    const idx = options.indexOf('color');

    /**
     * build
     */
    function init() {

        if (options.indexOf('color') !== -1) {
            buildJson();
        } else {
            SDG.Product.photos(Flickity).buildSlides();
        }
    }

    /**
     * build json
     * @param  {Object} p productJson defined in the init function
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function buildJson() {
        addColorNodes();
        parseImages();
    }

    function addColorNodes() {
        const colors = [];
        let color;
        let i;
        const v = p.variants;
        const cnt = v.length;

        for (i = 0; i < cnt; i += 1) {
            color = v[i].options[idx].toLowerCase();

            if (colors.indexOf(color) === -1) {
                colors.push(color);
                SDG.Product.swatchJson[color] = [];
            }
        }
    }

    function parseImages() {
        let img;
        let color;

        Object.keys(imageJson).forEach((key) => {
            img = imageJson[key];
            color = img.alt.toLowerCase();

            if (typeof SDG.Product.swatchJson[color] !== 'undefined') {
                SDG.Product.swatchJson[color].push(img);
            }
        });
    }

    function update(variant) {
        const color = variant.options[idx] ? variant.options[idx].toLowerCase() : null;

        if (typeof SDG.Product.swatchJson[color] !== 'undefined') {
            if (SDG.Product.activeColor !== color) {
                SDG.Product.photos(Flickity).buildSlides(SDG.Product.swatchJson[color]);
                SDG.Product.activeColor = color;
            }
        }
    }

    return {
        init,
        update,
    };
};

export default SDG.Product.swatches;