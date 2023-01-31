/**
 * Newsletter
 * @requires [lib/jquery-validate-config.js]
 */

import './jquery-validate-config';

SDG.Newsletter = function() {

    function init (parentSelector) {
        let $newsletterForm;
        SDG.Validate();

        if (parentSelector) {
            $newsletterForm = jQuery(parentSelector).find('.oz-newsletter-form');
        } else {
            $newsletterForm = jQuery('.oz-newsletter-form');
        }

        if ($newsletterForm.length) {
            $newsletterForm.each(function () {
                signupNewsletter(jQuery(this));
            });
        }
    }

    function signupNewsletter (form) {
        form.on('submit', (e) => {
            const emailEl = form.find('.js-newsletter-text-input');
            let data = {};

            e.preventDefault();

            // use jqvEmail validation
            if (!emailEl || !emailEl.valid()) {
                /* eslint-disable-next-line  no-console */
                console.log(form, emailEl);

                return;
            }

            data = {
                email: emailEl.val(),
            };
            processForm(data, form);
        });
    }

    function processForm (data, form) {
        jQuery.ajax({
            cache: false,
            url: 'https://www.omaze.com/newsletter',
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            dataType: 'JSON',
            data: JSON.stringify(data),

            success: (result) => {
                if (result.data.response === 'ok') {
                    let brontoSyncUrl = 'http://app.bronto.com/public/?q=direct_add&fn=Public_DirectAddForm&id=ccixboncqupunxwuzuipmrtficaubpo&createCookie=1&list1=0bb903ec000000000000000000000006318d';

                    brontoSyncUrl = `${brontoSyncUrl}&email=${data.email}`;
                    brontoSyncUrl = `${brontoSyncUrl}&field1=referral_source,set&encodeURIComponent(window.location.pathname)`;

                    const syncImg = new Image();
                    syncImg.width = 0;
                    syncImg.height = 0;
                    syncImg.border = 0;
                    syncImg.src = brontoSyncUrl;

                    onSignUpSuccess(form);
                }
            },

            error: () => {
                onSignUpFailure(form);
            },
        });
    }

    function onSignUpSuccess (form) {
        form.html(`
            <div class="oz-newsletter-form__title-container">
                <div class="js-newsletter-success oz-newsletter-form__title oz-section-title oz-centered">
                    Thanks, you're all set!
                </div>
            </div>
            <p class="oz-newsletter-form__desc oz-section-title__subtitle oz-color--dark-gray oz-centered">
                This is the beginning of something special.
            </p>
        `);
    }

    function onSignUpFailure (form) {
        const $emailInput = form.find('.newsletterTextInput');

        if (!$emailInput.length) {
            return;
        }

        $emailInput.val('');
        $emailInput.attr('placeholder', 'Uh oh! Invalid email address');
    }

    return init();
};
