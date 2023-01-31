/**
 * remap size values
 * @type {Function}
 * @return {String}
 * @desc This is used to remap short hand size values to full words
 */
_.remapSizeValues = function(val) {
    let label;

    if (val) {
        val = val.toLowerCase();
    }

    switch(val) {
        case 'xs':
            label = 'XS';
            break;
        case 's':
            label = 'small';
            break;
        case 'm':
            label = 'medium';
            break;
        case 'l':
            label = 'large';
            break;
        case 'xl':
            label = 'XL';
            break;
        case 'xxl':
            label = 'XXL';
            break;
        case 'xxxl':
            label = 'XXXL';
            break;
        default:
            label = val;
            break;
    }

    return label;
};