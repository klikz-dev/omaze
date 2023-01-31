/* eslint no-console: 0 */
import { emailValidation } from './validation';

const Sailthru = {
    lists: {
        EVERGREEN_LIST: 'Evergreen email capture',
        MASTER_LIST: 'Master List',
    },

    getSailthruObject: function () {
        if (!window.Sailthru) {
            return false;
        }

        return window.Sailthru;
    },

    signupByEmail: function (config) {
        const S = this.getSailthruObject();

        if (!S || typeof(S.integration) !== 'function') {
            console.error('[Sailthru.signupByEmail] Sailthru lib not loaded.');
            return false;
        }

        const {
            email, 
            lists,
            vars,
            onSuccess,
            onError,
        } = config || {};

        if (!emailValidation(email)) {
            console.error('[Sailthru.signupByEmail] email is invalid.');
            return false;
        }

        if (typeof(onSuccess) !== 'function' || typeof(onError) !== 'function') {
            console.error('[Sailthru.signupByEmail] onSuccess or onError not a function.');
            return false;
        }

        return S.integration('userSignUp', {
            email: email,
            key: 'email',
            lists: lists,
            vars: vars,
            onSuccess: onSuccess,
            onError: onError,
        });
    },

    extractEmailListsFromString: function (emailListsString) {
        const list = [];

        // trim string
        emailListsString.split(',').forEach((emailList) => {
            const str = emailList.trim();
            if (str) {
                list.push(str);
            }
        });

        return list;
    },
}

export default Sailthru;
