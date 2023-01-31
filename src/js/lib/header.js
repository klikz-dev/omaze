/**
 * Header
 * @requires [lib/util.js]
 */

import {default as Style} from './utility/style.js';
import '../util/extend';

SDG.Header = (function(opts) {
    const config = {
        cls: {
            // Mobile Active
            oz_active: 'oz-nav-active',
            // Mobile List Active
            oz_list_active: 'oz-nav-list-is-active',
            // Mobile List Ready
            oz_list_ready: 'oz-nav-list-ready',
            // is-active
            active: 'is-active',
        },
        dom: {
            // Oz Nav
            oz_nav_overlay: '.oz-nav-overlay',
            // Navigation Close
            nav_close: '.js-nav-close',
            // Navigation List
            nav_list: '.js-nav-list',
            // Oz Nav
            oz_nav: '.js-oz-nav',
            // User accounts drop down menu
            nav_account_menu: '.oz-nav__account-menu',
        },
        id: {
            // Header element
            header: 'hdr',
            // Hamburger
            hamburger: 'hamburgerNav',
            // Nav
            nav: 'nav',
            nav_account_menu_toggle: 'oz_nav_btn_account_menu_toggle',
            nav_account_menu_close: 'oz_nav_btn_account_menu_close',
        },
    };

    const c = _.extend(config, opts);
    const $ozNavList = document.querySelector(c.dom.nav_list);
    const $ozNavOverlay = document.querySelector(c.dom.oz_nav_overlay);
    const $ozNavAccountMenu = document.querySelector(c.dom.nav_account_menu);

    let view;

    function init() {
        addEvents();
        trackNavMenu();
        _.windowResize(responsive);
    }

    function addEvents() {
        _.mq({
            view: 'mobile',
            callback: addNavClass,
        });

        _.addEvent({
            id: c.id.hamburger,
            event: 'click',
            fn: openMobileNav,
        });

        _.addEvent({
            id: c.id.nav,
            class: c.dom.nav_close,
            event: 'click',
            fn: closeMobileNav,
        });

        _.addEvent({
            id: c.id.nav_account_menu_toggle,
            event: 'click',
            fn: toggleAccountsMenu,
        });

        _.addEvent({
            id: c.id.nav_account_menu_close,
            event: 'click',
            fn: hideAccountsMenu,
        });
    }

    function trackNavMenu() {
        trackNavLinks();
        trackNavLogIn();
        trackCartIcon();
    }

    function trackNavLinks() {
        const links = document.querySelectorAll('.nav__btn');
        links.forEach((el) => {
            el.addEventListener('click', () => {
                const linkTitle = el.getAttribute('data-nav-link-title');
                const dataLayerEvent = {
                    event: 'click',
                    ga_category: 'Navigation',
                    ga_action: 'Nav Click',
                    ga_label: linkTitle,
                };
                SDG.Analytics.events.pushDataLayerEvent(dataLayerEvent);
            })
        })
    }

    function trackNavLogIn() {
        const logInIcon = document.querySelectorAll('.js-nav-btn--login-analytics');
        logInIcon.forEach((el) => {
            el.addEventListener('click', () => {
                const dataLayerEvent = {
                    event: 'click',
                    ga_category: 'Navigation',
                    ga_action: 'Nav Click',
                    ga_label: 'My Account',
                };
                SDG.Analytics.events.pushDataLayerEvent(dataLayerEvent);
            })
        })
    }

    function trackCartIcon() {
        const cartIcon = document.querySelectorAll('.js-nav__cart-analytics');
        cartIcon.forEach((el) => {
            el.addEventListener('click', () => {
                const dataLayerEvent = {
                    event: 'click',
                    ga_category: 'Navigation',
                    ga_action: 'Nav Click',
                    ga_label: 'Cart',
                };

                SDG.Analytics.events.pushDataLayerEvent(dataLayerEvent);
            })
        })
    }

    function responsive() {
        _.mq({
            view: 'mobile',
            callback: () => {
                addNavClass();
                if (view !== this.view) {
                    ({ view } = this);
                }
            },
        });

        _.mq({
            view: 'desktop',
            callback: () => {
                removeNavClass();
                if (view !== this.view) {
                    ({ view } = this);
                }
            },
        });

        onHeaderResize();
    }

    function addNavClass() {
        // mobile ready
        if (!_.hasClass($ozNavList, c.cls.oz_list_ready)) {
            _.addClass($ozNavList, c.cls.oz_list_ready);
        }
    }

    function removeNavClass() {
        // mobile ready
        if (_.hasClass($ozNavList, c.cls.oz_list_ready)) {
            _.removeClass($ozNavList, c.cls.oz_list_ready);
        }

        // mobile menu open
        if (_.hasClass($ozNavList, c.cls.oz_list_active)) {
            _.removeClass($ozNavList, c.cls.oz_list_active);
            _.removeClass($ozNavOverlay, c.cls.active);
        }
    }

    function openMobileNav() {
        _.addClass($ozNavList, c.cls.oz_list_active);
        _.addClass($ozNavOverlay, c.cls.active);
    }

    function closeMobileNav() {
        _.removeClass($ozNavList, c.cls.oz_list_active);
        _.removeClass($ozNavOverlay, c.cls.active);
    }

    function toggleAccountsMenu() {
        if (_.hasClass($ozNavAccountMenu, c.cls.active)) {
            hideAccountsMenu();
        } else {
            _.addClass($ozNavAccountMenu, c.cls.active);
        }
    }

    function hideAccountsMenu() {
        _.removeClass($ozNavAccountMenu, c.cls.active);
    }

    function getPageHeaderHeight (el) {
        const headerEl = el || document.getElementById(config.id.header);

        if (!headerEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Header.getPageHeaderHeight] cannot find Header by ID selector: [${config.id.header}].`);

            return false;
        }

        const headerHeight = Style.getComputedStyle(headerEl, 'height');

        return parseInt(headerHeight);
    }

    function onHeaderResize () {
        const headerEl = document.getElementById(config.id.header);

        if (!headerEl) {
            /* eslint-disable-next-line  no-console */
            console.warn(`[SDG.Header.onHeaderResize] cannot find Header by ID selector: [${config.id.header}].`);

            return false;
        }

        const headerPosition = Style.getComputedStyle(headerEl, 'position');

        // adjust padding only if header position is 'fixed'
        if (headerPosition !== 'fixed') {
            return false;
        }

        const headerHeight = getPageHeaderHeight(headerEl);
        const bodyEl = document.getElementsByTagName('body')[0];

        if (!headerHeight || !bodyEl) {
            return false;
        }

        bodyEl.style.paddingTop = `${headerHeight}px`;
    }

    return {
        init: init,
        onResize: onHeaderResize,
        getHeight: getPageHeaderHeight,
    };
}());

export default SDG.Header;
