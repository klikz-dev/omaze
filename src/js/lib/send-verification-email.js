import * as user from '@omaze/user';
import axios from 'axios';

/**
 * VerifyEmail namespace
 * @type {Object}
 */
SDG.VerifyEmail = SDG.VerifyEmail || {};

SDG.VerifyEmail.sendVerificationEmail = (function() {
    class SendVerificationEmailApp {
        constructor (userServiceURL, email) {
            this.email = email;

            const httpClient = axios.create({
                baseURL: userServiceURL,
            });

            this.userServiceClient = new user.UserServiceClient(httpClient);
        }

        run () {
            const button = document.getElementsByClassName('verification-email')[0];

            if (!button) {
                return;
            }

            function showMessage (className) {
                const element = document.getElementsByClassName(className)[0];
                element.style.display = 'block';
            }

            button.addEventListener('click', () => {
                user.sendVerificationEmail(this.email, this.userServiceClient).then(() => {
                    showMessage('js-success');
                }).catch(() => {
                    showMessage('js-error');
                }).finally(() => {
                    const buttonContainer = document.getElementsByClassName('support-text-container_button')[0];
                    buttonContainer.style.display = 'none';
                });
            });
        }
    }

    return (userServiceURL, email) => {
        const app = new SendVerificationEmailApp(userServiceURL, email)
        app.run();
    };
})();
