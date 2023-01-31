/**
* Account
*
* namespace
* config
* run
* login
* fire functions
*/

/**
* Account namespace
* @type {Object}
*/
SDG.Account = SDG.Account || {};

/**
* config
* @type {Object}
*/
SDG.Account.config = {

    // elements
    el: {
        login: new SDG.Utility.HtmlUtils({ id: 'acLogin' }).element,
        accountSection: new SDG.Utility.HtmlUtils({ id: 'acLogin' }).element,
        accountSettingsTab: new SDG.Utility.HtmlUtils({ id: 'info' }).element,
        donationHistoryFAQ: new SDG.Utility.HtmlUtils({ id: 'donationHistory_FAQ' }).element,
    },

    // ids
    id: {
        hideRecoverPassword: 'hideRecoverPasswordBtn',
        recoverPassword: 'recoverPassword',
        sectionLogin: 'acLoginForm',
        sectionRecoverPassword: 'acRecoverPasswordForm',
        accountRegister: 'accountRegister',
        customerLogin: 'customer_login',
        createCustomer: 'create_customer',
        recoverPasswordForm: 'recoverPasswordForm',
        resetPasswordForm: 'resetPasswordForm',
        loginSection: 'accountSection',
        addressNewForm: 'addressNewForm',
        registerPassword: 'registerPassword',
        resetPassword: 'resetPassword',
        passwordHint: 'passwordHint',
        existingAccountError: 'existingAccountError',
        registerEmailInput: 'registerEmail',
        registerEmailContainer: 'registerEmailContainer',
        registerPasswordError: 'registerPassword-error',
        hasAccount: 'hasAccount',
        activateAccountForm: 'activateAccountForm',
        activateAccountPassword: 'activateAccountPassword',
        activateAccountPasswordError: 'activateAccountPassword-error',
        accountSettingsTab: 'info',
        donationHistoryBreadcrumb: 'donationHistory_breadcrumb',
        donationHistoryFAQ: 'donationHistoryFAQ',
        donationHistoryHelpCenter: 'donationHistory_helpCenter',
        donationHistoryEmailUs: 'donationHistory_emailUs',
    },

    dom: {
        fieldContainer: 'oz-field__container',
    },

    // urls (hashes)
    url: {
        recover: '#recover',
    },
};

/**
* run
* @type {Function}
*/
SDG.Account.run = function() {
    const c = SDG.Account.config;

    // login
    if (c.el.login) {
        SDG.Account.login();

        // Input placeholders
        const placeholder = SDG.placeholder({
            id: c.id.loginSection,
            sel: c.dom.fieldContainer,
        });
        placeholder.init();
    }

    // Account Settings Tab
    if (c.el.accountSettingsTab) {
        _.addEvent({
            id: c.id.accountSettingsTab,
            event: 'click',
            fn: () => {
                const data = {
                    event: 'click',
                    ga_category: 'Account',
                    ga_action: 'Sub-Nav Click',
                    ga_label: 'Settings',
                }
                window.dataLayer && window.dataLayer.push(data);
            },
        });
    }
    
    // Donation History FAQ
    if (c.el.donationHistoryFAQ) {
        const faqList = c.el.donationHistoryFAQ.getElementsByClassName('content');
        for (let i=0; i < faqList.length; i++) {
            const id = 'donationHistoryFAQ-content' + i + 1;
            faqList[i].setAttribute('id', id);
            _.addEvent({
                id: id,
                event: 'click',
                fn: () => {
                    const data = {
                        event: 'click',
                        ga_category: 'Account',
                        ga_action: 'Link Click',
                        ga_label: 'FAQs',
                        ga_value: i + 1,
                    }
                    window.dataLayer && window.dataLayer.push(data);
                },
            });
        }
    }
    
    // Donation History Breadcrumb
    _.addEvent({
        id: c.id.donationHistoryBreadcrumb,
        event: 'click',
        fn: () => {
            const data = {
                event: 'click',
                ga_category: 'Account',
                ga_action: 'Breadcrumb Click',
                ga_label: 'History',
            }
            window.dataLayer && window.dataLayer.push(data);
        },
    });

    // Common Questions Help Center
    _.addEvent({
        id: c.id.donationHistoryHelpCenter,
        event: 'click',
        fn: () => {
            const data = {
                event: 'click',
                ga_category: 'Account',
                ga_action: 'Button Click',
                ga_label: 'help center',
            }
            window.dataLayer && window.dataLayer.push(data);
        },
    });

    // Common Questions Email Us
    _.addEvent({
        id: c.id.donationHistoryEmailUs,
        event: 'click',
        fn: () => {
            const data = {
                event: 'click',
                ga_category: 'Account',
                ga_action: 'Mail to CTA',
                ga_label: 'email us',
            }
            window.dataLayer && window.dataLayer.push(data);
        },
    });
};

/**
* login
* @return {SDG.Account.login~init}
*/
SDG.Account.login = function() {
    const c = SDG.Account.config;

    // globals
    const animate = 'animate';
    const notificationBoxSelector = 'login-notification';
    const errorClass = 'error';

    // Elements
    const notificationBox = new SDG.Utility.HtmlUtils({ className: notificationBoxSelector }).element;

    // Element instances (includes all the methods on SDG.Utility.HtmlUtils)
    const accountRegister = new SDG.Utility.HtmlUtils({ id: c.id.accountRegister });
    const sectionLogin = new SDG.Utility.HtmlUtils({ id: c.id.sectionLogin });
    const sectionRecoverPassword = new SDG.Utility.HtmlUtils({ id: c.id.sectionRecoverPassword });
    const hideRecoverPassword = new SDG.Utility.HtmlUtils({ id: c.id.hideRecoverPassword });
    const recoverPassword = new SDG.Utility.HtmlUtils({ id: c.id.recoverPassword });
    const registerPassword = new SDG.Utility.HtmlUtils({ id: c.id.registerPassword });
    const activateAccountPassword = new SDG.Utility.HtmlUtils({ id: c.id.activateAccountPassword });
    const resetPassword = new SDG.Utility.HtmlUtils({ id: c.id.resetPassword });
    const passwordHint = new SDG.Utility.HtmlUtils({ id: c.id.passwordHint });
    const existingAccountError = new SDG.Utility.HtmlUtils({ id: c.id.existingAccountError });
    const hasAccount = new SDG.Utility.HtmlUtils({ id: c.id.hasAccount });
    const registerEmailInput = new SDG.Utility.HtmlUtils({ id: c.id.registerEmailInput });
    const registerEmailContainer = new SDG.Utility.HtmlUtils({ id: c.id.registerEmailContainer });

    const INVALID_EMAIL_ERROR_MESSAGE = 'Oops, that doesn\'t seem to be a valid email!';
    const INVALID_PASSWORD_ERROR_MESSAGE = 'Password must be at least 5 characters.';
    const REQUIRED_EMAIL_ERROR_MESSAGE = 'Email address is required.';
    const REQUIRED_PASSWORD_ERROR_MESSAGE = 'Password is required.';
    const NONMATCHING_PASSWORD_ERROR_MESSAGE = 'Oops! Passwords must match.';

    /**
    * init
    */
    function init() {
        detectRecover();
        validateForms();
        addEvents();
        addExistingAccountError();
    }

    /**
     *  recover password events
     */
    function addRecoverPasswordEvents() {
        if (!recoverPassword.element) {
            return;
        }
        // forgot password click
        _.addEvent({
            id: c.id.recoverPassword,
            event: 'click',
            fn: showRecoverPasswordForm,
        });

        // go back click
        _.addEvent({
            id: c.id.hideRecoverPassword,
            event: 'click',
            fn: hideRecoverPasswordForm,
        });
    }

    /**
     *  register password events
     */
    function addRegisterPasswordEvents() {
        if (!registerPassword.element) {
            return;
        }
        _.addEvent({
            id: c.id.registerPassword,
            event: 'focus',
            fn: showPasswordHint,
        });
        _.addEvent({
            id: c.id.registerPassword,
            event: 'input',
            fn: hidePasswordHint,
        });
    }

    /**
     *  activate account password events
     */
    function addActivateAccountPasswordEvents() {
        if (!activateAccountPassword.element) {
            return;
        }
        _.addEvent({
            id: c.id.activateAccountPassword,
            event: 'focus',
            fn: showPasswordHint,
        });
        _.addEvent({
            id: c.id.activateAccountPassword,
            event: 'input',
            fn: hidePasswordHint,
        });
    }

    /**
     *  reset password events
     */
    function addResetPasswordEvents() {
        if (!resetPassword.element) {
            return;
        }
        _.addEvent({
            id: c.id.resetPassword,
            event: 'focus',
            fn: showPasswordHint,
        });
        _.addEvent({
            id: c.id.resetPassword,
            event: 'input',
            fn: hidePasswordHint,
        });
    }

    /**
     *  register password events
     */
    function addExistingAccountEvents() {
        if (!hasAccount.element) {
            return;
        }
        _.addEvent({
            id: c.id.registerEmailInput,
            event: 'input',
            fn: clearExistingAccountError,
        });
    }

    /**
    * add events
    */
    function addEvents() {
        addRecoverPasswordEvents();
        addRegisterPasswordEvents();
        addExistingAccountEvents();
        addActivateAccountPasswordEvents();
        addResetPasswordEvents();
    }

    /**
     * custom email validation method
     */
    function validateEmail (value, element) {
        const EMAIL_REGEX = /^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*.)+\.+[a-zA-Z]{2,}$/;

        return element && EMAIL_REGEX.test(value);
    }

    /**
     * custom password validation method
     */
    function validatePassword (value, element) {
        const PASSWORD_LENGTH = 5;

        return element && value && value.length >= PASSWORD_LENGTH;
    }

    /**
    * validate form fields
    */
    let isValidated = false;
    function validateForms() {
        jQuery.validator.setDefaults({
            errorPlacement: (error, element) => {
                isValidated = true;
                if (passwordHint) {
                    passwordHint.hide();
                }
                error.insertAfter(element.parent());
                element.parent().addClass(errorClass);
            },
            success: (label) => {
                label.prev().removeClass(errorClass);
                label.remove();
            },
        });

        const VALIDATE_EMAIL_RULE = 'validateEmail';
        const VALIDATE_PASSWORD_RULE = 'validatePassword';
        const CUSTOMER_LOGIN_SELECTOR = `#${c.id.customerLogin}`;
        const CUSTOMER_CREATE_SELECTOR = `#${c.id.createCustomer}`;
        const RECOVER_PASSWORD_FORM_SELECTOR = `#${c.id.recoverPasswordForm}`;
        const RESET_PASSWORD_FORM_SELECTOR = `#${c.id.resetPasswordForm}`;
        const ACTIVATE_ACCOUNT_FORM_SELECTOR = `#${c.id.activateAccountForm}`;

        jQuery.validator.addMethod(VALIDATE_EMAIL_RULE, validateEmail, INVALID_EMAIL_ERROR_MESSAGE);
        jQuery.validator.addMethod(VALIDATE_PASSWORD_RULE, validatePassword, INVALID_PASSWORD_ERROR_MESSAGE);

        jQuery(CUSTOMER_LOGIN_SELECTOR).validate({
            rules: {
                'customer[email]': {
                    required: true,
                    validateEmail: true,
                },
                'customer[password]': {
                    required: true,
                },
            },
            messages: {
                'customer[email]': {
                    required: REQUIRED_EMAIL_ERROR_MESSAGE,
                    // NOTE: need to override the default by specifiying email, otherwise
                    //       we end up with a 3rd message in this interstitial state
                    email: INVALID_EMAIL_ERROR_MESSAGE,
                },
                'customer[password]': {
                    required: REQUIRED_PASSWORD_ERROR_MESSAGE,
                },
            },
            invalidHandler: function() {
                const data = {
                    id: 'customer_login',
                    errors: 1,
                    fields: '2',
                    messages: [{
                        id: 'customer_login_error',
                        text: 'Invalid email address',
                        type: 'error',
                    }],
                    type: 'login',
                }
                window.dataLayer && window.dataLayer.push({
                    'event': 'login',
                    'form': data,
                });
            },
            submitHandler: function(form) {
                const data = {
                    id: 'customer_login',
                    errors: 0,
                    fields: '2',
                    messages: [],
                    type: 'login',
                }
                window.dataLayer && window.dataLayer.push({
                    'event': 'login',
                    'form': data,
                });

                form.submit();
            },
        });

        jQuery(CUSTOMER_CREATE_SELECTOR).validate({
            rules: {
                'customer[email]': {
                    required: true,
                    validateEmail: true,
                },
                'customer[password]': {
                    validatePassword: true,
                },
            },
            messages: {
                'customer[email]': {
                    required: REQUIRED_EMAIL_ERROR_MESSAGE,
                    // NOTE: need to override the default by specifiying email, otherwise
                    //       we end up with a 3rd message in this interstitial state
                    email: INVALID_EMAIL_ERROR_MESSAGE,
                },
                'customer[password]': {
                    required: INVALID_PASSWORD_ERROR_MESSAGE,
                    validatePassword: INVALID_PASSWORD_ERROR_MESSAGE,
                },
            },
            invalidHandler: function() {
                passwordHint.hide();

                const data = {
                    id: 'create_customer',
                    errors: 1,
                    fields: '2',
                    messages: [{
                        id: 'create_customer_error',
                        text: 'Invalid email address',
                        type: 'error',
                    }],
                    type: 'account',
                }
                window.dataLayer && window.dataLayer.push({
                    'event': 'signup',
                    'form': data,
                });
            },
            submitHandler: function(form) {
                const data = {
                    id: 'create_customer',
                    errors: 0,
                    fields: '2',
                    messages: [],
                    type: 'account',
                }
                window.dataLayer && window.dataLayer.push({
                    'event': 'signup',
                    'form': data,
                });

                form.submit();
            },
        });

        jQuery(RECOVER_PASSWORD_FORM_SELECTOR).validate({
            rules: {
                email: {
                    required: true,
                    validateEmail: true,
                },
            },
            messages: {
                email: {
                    required: REQUIRED_EMAIL_ERROR_MESSAGE,
                    email: INVALID_EMAIL_ERROR_MESSAGE,
                },
            },
            onfocusout: function(element) {
                this.element(element);
            },
        });

        jQuery(RESET_PASSWORD_FORM_SELECTOR).validate({
            rules: {
                'customer[password]': {
                    validatePassword: true,
                },
                'customer[password_confirmation]': {
                    required: true,
                    equalTo: '#resetPassword',
                },
            },
            messages: {
                'customer[password]': {
                    validatePassword: INVALID_PASSWORD_ERROR_MESSAGE,
                },
                'customer[password_confirmation]': {
                    equalTo: NONMATCHING_PASSWORD_ERROR_MESSAGE,
                },
            },
        });

        jQuery(ACTIVATE_ACCOUNT_FORM_SELECTOR).validate({
            rules: {
                'customer[password]': {
                    required : true,
                    validatePassword: true,
                },
                'customer[password_confirmation]': {
                    required : true,
                    equalTo: '#activateAccountPassword',
                },
            },
            messages: {
                'customer[password]': {
                    validatePassword: INVALID_PASSWORD_ERROR_MESSAGE,
                },
                'customer[password_confirmation]': {
                    equalTo: NONMATCHING_PASSWORD_ERROR_MESSAGE,
                },
            },
        });
    }

    /**
    * show recover password form
    */
    function showRecoverPasswordForm() {
        if (window.location.hash != c.url.recover) {
            window.location.hash = c.url.recover;
        }

        recoverPassword.hide();
        hideRecoverPassword.show('inline-block');

        sectionLogin.hide();
        sectionRecoverPassword.show();

        accountRegister.hide();
        if (notificationBox) {
            notificationBox.classList.remove(animate);
        }
    }

    /**
    * hide recover password form
    */
    function hideRecoverPasswordForm() {
        if (window.location.hash == c.url.recover) {
            removeHash();
        }

        recoverPassword.show();
        hideRecoverPassword.hide();

        sectionRecoverPassword.hide();
        sectionLogin.show();

        accountRegister.show();

        if (notificationBox) {
            notificationBox.classList.add(animate);
        }
    }

    /**
     * remove url hash with history preserved
     */
    function removeHash() {
        history.pushState(
            '',
            document.title,
            window.location.pathname + window.location.search
        );
    }

    /**
    * show password hint based on state of validation errors injected by jquery
    */
    const MIN_PASSWORD_LENGTH = 5;
    function showPasswordHint(event) {
        const PASSWORD_LENGTH = event.target.value.length;
        if (!isValidated && PASSWORD_LENGTH < MIN_PASSWORD_LENGTH) {
            passwordHint.text(INVALID_PASSWORD_ERROR_MESSAGE).show();
        }
    }

    /**
    * hide password reset based on state of validation errors injected by jquery
    */
    function hidePasswordHint(event) {
        const PASSWORD_LENGTH = event.target.value.length;

        if ( isValidated || PASSWORD_LENGTH >= MIN_PASSWORD_LENGTH) {
            passwordHint.hide();
        } else {
            passwordHint.text(INVALID_PASSWORD_ERROR_MESSAGE).show();
        }
    }

    /**
    * clear existing account error
    */
    function clearExistingAccountError() {
        existingAccountError.hide();
        registerEmailContainer.removeClass(errorClass);
        registerEmailInput.removeClass(errorClass);
    }

    /**
    * add existing account error
    */
    function addExistingAccountError() {
        if (hasAccount.element) {
            existingAccountError.show();
            registerEmailContainer.addClass(errorClass);
            registerEmailInput.addClass(errorClass);
        }
    }

    /**
    * detect recover
    */
    function detectRecover() {
        if (window.location.hash === c.url.recover) {
            showRecoverPasswordForm();
        }
    }

    /**
    * return
    * @type {Object}
    */
    return {
        init: init(),
    };
};

window.addPasswordVisibilityListeners = function(id) {
    const togglePasswordVisibility = 'togglePasswordVisibility';
    const passwordInputField = new SDG.Utility.HtmlUtils({ id: id }).element;
    const passwordVisibilityElement = new SDG.Utility.HtmlUtils({ id: togglePasswordVisibility }).element;

    if (passwordInputField) {
        passwordVisibilityElement.addEventListener('click', () => {
            if (passwordInputField.type === 'text') {
                passwordInputField.type = 'password';
                passwordVisibilityElement.innerHTML = 'show';
            } else {
                passwordInputField.type = 'text';
                passwordVisibilityElement.innerHTML = 'hide';
            }
        });
    }
};

/**
* fire functions
*/
SDG.Account.run();
