/**
* input placeholder
* @requires [lib/util.js]
* @return   {Object}
*/
SDG.placeholder = function(opts) {
    const config = {
        id: 'main',
        sel: 'input-placeholder',
        cls: 'has-value',
    };
    const c = _.extend(config, opts);

    // cached globals
    const domId = document.getElementById(c.id);
    const domInputWraps = domId.querySelectorAll(`.${c.sel}`);
    let domInputWrap;
    let domInput;

    /**
    * init
    * @return {Function}
    */
    function init() {
        addEvents();
        checkForExistingValues();
    }

    /**
    * add events
    * @return {Function}
    */
    function addEvents() {

        // keyup event for inputs
        _.addEvent({
            id: c.id,
            className: `${c.sel} input`,
            event: 'keyup',
            fn: checkValue,
        });

        // change event for inputs
        _.addEvent({
            id: c.id,
            className: `${c.sel} input`,
            event: 'change',
            fn: checkValue,
        });

        // keyup event for textarea
        _.addEvent({
            id: c.id,
            className: `${c.sel} textarea`,
            event: 'keyup',
            fn: checkValue,
        });

        // change event for textarea
        _.addEvent({
            id: c.id,
            className: `${c.sel} textarea`,
            event: 'change',
            fn: checkValue,
        });

        // change event for select
        _.addEvent({
            id: c.id,
            className: `${c.sel} select`,
            event: 'change',
            fn: checkValue,
        });
    }

    /**
    * check for existing values
    * @type {Function}
    */
    function checkForExistingValues() {
        Object.keys(domInputWraps).forEach((key) => {
            domInputWrap = domInputWraps[key];
            domInput = (domInputWrap.querySelector('input') ? domInputWrap.querySelector('input') : domInputWrap.querySelector('textarea'));
            if (domInput) {
                checkValue(domInput);
            }
        });
    }

    /**
    * check value
    * @type {Function}
    */
    function checkValue(el) {
        const field = el.target ? el.target : el;

        if (field.value && field.value !== '') {
            _.addClass(field.parentNode, c.cls);
        } else {
            _.removeClass(field.parentNode, c.cls);
        }
    }

    /**
    * return
    * @type {Object}
    */
    return {
        init: init,
        refresh: checkForExistingValues,
    };
};