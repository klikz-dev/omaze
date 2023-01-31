/**
 * Validate Configuration
 */
SDG.Validate = (function() {
    jQuery.validator.setDefaults({
        errorElement: 'em',

        // eslint-disable-next-line
        showErrors: function (errorMap) {
            this.defaultShowErrors();

            jQuery(document).trigger('form:validation', errorMap);
        },

        // if credit card field related error, insert one error element normally,
        // and insert a cloned copy inside a #card-combined-errors div
        // for display with single cc-card field on mobile
        errorPlacement: (error, element) => {

            if (jQuery(element).get(0).tagName !== 'SELECT') {
                error.insertAfter(element);
            }
        },
    });

    // custom validator methods
    jQuery.validator.addMethod(
        'cRequired',
        jQuery.validator.methods.required,
        'required'
    );

    jQuery.validator.addMethod(
        'cZipRequired',
        jQuery.validator.methods.required,
        'required'
    );

    jQuery.validator.addMethod(
        'bundleSelect',
        jQuery.validator.methods.required,
        'Please select a bundle'
    );

    jQuery.validator.addMethod(
        'cMinlength',
        jQuery.validator.methods.minlength,
        jQuery.validator.format('{0} characters minimum')
    );

    jQuery.validator.addMethod(
        'cPasswordMatch',
        jQuery.validator.methods.equalTo,
        'Passwords must match'
    );

    jQuery.validator.addMethod(
        'cEmail', (email) => {
            const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
            const trimmedEmail = jQuery.trim(email);
            const emailValid = emailReg.test(trimmedEmail);

            return emailValid;
        },
        'invalid'
    );

    // custom validator classes
    jQuery.validator.addClassRules({
        jqvRequired: {
            cRequired: true,
        },

        jqvPassword: {
            cRequired: true,
            cMinlength: 8,
        },

        jqvPasswordConfirm: {
            cMinlength: 8,
            cPasswordMatch: '#new_password',
        },

        jqvEmail: {
            cRequired: true,
            cEmail: true,
        },

        jqvBundleRequired: {
            bundleSelect: true,
        },

        jqvZipRequired: {
            cZipRequired: true,
        },
    });
});
