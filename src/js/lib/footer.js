SDG.Footer = (function(){
    const FOOTER_LINKS_CONFIG = {
        social: {
            name: 'social',
            selector: '.js-footer__social-icon-btn',
            dataAttribute: 'data-social-link-title',
        },
        primary: {
            name: 'primary',
            selector: '.js-footer__nav-link',
            dataAttribute: 'data-primary-link-title',
        },
        secondary: {
            name: 'secondary',
            selector: '.js-footer__signature-nav-link',
            dataAttribute: 'data-secondary-link-title',
        },
        contact: {
            name: 'contact',
            selector: '.js-footer__contact-copy-link',
            dataAttribute: 'data-footer-contact',
        },
    }

    const analytics = {
        trackFooterLinks(type) {
            const links = document.querySelectorAll(FOOTER_LINKS_CONFIG[type].selector);

            links.forEach((el) => {
                el.addEventListener('click', () => {
                    const linkTitle = el.getAttribute(FOOTER_LINKS_CONFIG[type].dataAttribute.toLowerCase());

                    const dataLayerEvent = {
                        event: 'click',
                        ga_action: 'Footer Click',
                        ga_category: 'Navigation',
                        ga_label: SDG.Utility.String.capitalize(linkTitle),
                    };

                    SDG.Analytics.events.pushDataLayerEvent(dataLayerEvent);
                })
            })
        },
    }

    function init() {
        analytics.trackFooterLinks(FOOTER_LINKS_CONFIG.social.name);
        analytics.trackFooterLinks(FOOTER_LINKS_CONFIG.primary.name);
        analytics.trackFooterLinks(FOOTER_LINKS_CONFIG.secondary.name);
        analytics.trackFooterLinks(FOOTER_LINKS_CONFIG.contact.name);
    }

    return {
        init,
    }
})();
