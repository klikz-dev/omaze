/**
* Page
*
* namespace
* config
* run
* fire functions
*/

/**
* Page namespace
* @type {Object}
*/
SDG.Page = SDG.Page || {};

/**
* config
* @type {Object}
*/
SDG.Page.config = {

    // elements
    el: {
        doNotSell: document.querySelector('#page_do_not_sell_my_personal_information'),
    },

    // ids
    id: {
        doNotSellForm: 'doNotSellForm',
    },

    dom: {
        field_container: 'oz-field__container',
    },

    // cookies
    cookie: {
        DO_NOT_SELL_DATA: 'oz__do_not_sell_data',
    },
};

/**
* validation
*/
import { emailValidation } from './lib/validation';

/**
* run
* @type {Function}
*/
SDG.Page.run = function() {
    const c = SDG.Page.config;

    // doNotSell
    if (c.el.doNotSell) {
        SDG.Page.doNotSell();

        // Input placeholders
        const placeholder = SDG.placeholder({
            id: c.id.doNotSellForm,
            sel: c.dom.field_container,
        });
        placeholder.init();
    }
};

/**
* doNotSell
* @return {SDG.Page.doNotSell~init}
*/
SDG.Page.doNotSell = function() {
    const c = SDG.Page.config;
    /**
    * init
    */
    function init() {
        validateForms();
        addEvents();
    }

    /**
    * add events
    */
    function addEvents() {
        // submit button click
        _.addEvent({
            id: c.id.doNotSellForm,
            event: 'submit',
            fn: submit,
        });
    }

    /**
    * validate form fields
    */
    function validateForms() {
        jQuery.validator.setDefaults({
            errorPlacement: (error, element) => {
                error.insertAfter(element.parent());
                element.parent().addClass('error');
            },
        });

        jQuery.validator.addMethod(
            'validateEmail',
            emailValidation,
            'Please enter a valid email address.'
        );

        jQuery.validator.addMethod('validateZipCode', function(value) {
            const ZIP_REGEX = /^(\d{5}(-\d{4})?)$/g;
            return ZIP_REGEX.test(value);
        }, 'Please enter a valid US zip code.');

        return jQuery(`#${c.id.doNotSellForm}`).validate({
            rules: {
                'email': {
                    required: true,
                    validateEmail: true,
                },
                'zip': {
                    required: true,
                    validateZipCode: true,
                },
            },
        });
    }

    /**
    * submit the form
    */
    function submit (e) {
        e.preventDefault();

        const MESSAGE_TYPE = 'msgType';
        const conf = SDG.Page.config;

        const form = document.forms[conf.id.doNotSellForm]
        const data = {
            name: form.name.value,
            email: form.email.value,
            zip: form.zip.value,
            state: form.state.value,
        };
        const { invalid } = validateForms()

        if (!jQuery.isEmptyObject(invalid)) {
            return false;
        }

        fetch('/apps/ccpa/ccpa-optouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            /**
            * on successful do not sell request, set cookie
            */
            if (response.ok || response.status === 409) {
                window.ozLocalStorageSet(MESSAGE_TYPE, 'success');
                window.ozCookieSet(conf.cookie.DO_NOT_SELL_DATA, true, 365);
                window.location.reload();
            } else {
                window.ozLocalStorageSet(MESSAGE_TYPE, 'failure');
                window.location.reload();
            }
        });
        return false;
    }

    /**
    * return
    * @type {Object}
    */
    return {
        init: init(),
    };
};

/**
* fire functions
*/
SDG.Page.run();
