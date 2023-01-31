/**
* Global UI
*/

import validate from 'jquery-validation';

SDG.GlobalUI = (function() {
    const jQueryWithValidation = validate;

    function init() {
        window.jQuery = jQueryWithValidation;
        // eslint-disable-next-line no-import-assign, no-unused-vars
        jQuery = jQueryWithValidation;
        window.$ = jQueryWithValidation;

        SDG.Header.init();
        SDG.Footer.init();
    }

    return init();
}());
