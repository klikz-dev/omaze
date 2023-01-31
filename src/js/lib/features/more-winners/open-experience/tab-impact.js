SDG.MoreWinners = SDG.MoreWinners || {};

SDG.MoreWinners.impactTab = function(tabData) {
    function getStickyCtaButtonEl () {
        const conf = {
            cssClasses: 'ozc-sticky-button ozc-sticky-button--mobile-only',
            children: [
                {
                    type: 'Element',
                    tag: 'a',
                    attributes: {
                        href: '#cart',
                        'data-oa-track': 'click',
                        'data-oa-id': 'impactPageCartCTA',
                    },
                    cssClasses: 'oz-btn oz-btn--cta',
                    text: 'enter now',
                },
            ],
        };

        const component = new SDG.Component.Element(conf);

        return component.el;
    }

    function getCtaButtonEl () {
        const conf = {
            children: [
                {
                    type: 'Element',
                    tag: 'a',
                    attributes: {
                        href: '#cart',
                        'data-oa-track': 'click',
                        'data-oa-id': 'impactPageCartCTA',
                    },
                    cssClasses: 'oz-btn oz-btn--cta',
                    text: 'enter now',
                },
            ],
        };

        const ctaElement = new SDG.Component.Element(conf);

        return ctaElement.el;
    }

    function getHeroEl () {
        const body = new SDG.Component.Element({
            tag: 'p',
            cssClasses: 'text-block',
            text: tabData.hero.body,
        });

        const heroImage = new SDG.Component.Image({
            src: tabData.hero.image.imgix_url,
            aspectW: 16,
            aspectH: 9,
            lqip: true,
        })

        const conf = {
            image: heroImage.el,
            header: tabData.hero.header,
            body: body.el,
        };

        const template = new SDG.Component.PageHero(conf);

        const ctaButtonEl = getCtaButtonEl();

        if (template.contentEl && ctaButtonEl) {
            ctaButtonEl.classList = 'desktop-only';

            template.contentEl.appendChild(ctaButtonEl);
        }

        return template;
    }

    function getCalloutEl () {
        if (!tabData.text_callout) {
            return false;
        }

        const conf = {
            'cssClasses': 'ozc-callout ozc__panel--base',
            'children': [
                {
                    'type': 'Element',
                    'tag': 'h2',
                    'text': tabData.text_callout,
                },
            ],
        };

        const component = new SDG.Component.Element(conf);

        return component.el;
    }

    function getSection1El () {
        if (!tabData.section_1_html) {
            return false;
        }

        const component = document.createElement('div');
        component.classList = 'ozc__panel-width-desktop--medium';
        component.innerHTML = tabData.section_1_html;

        return component;
    }

    function getSection2El () {
        if (!tabData.section_2_html) {
            return false;
        }

        const component = document.createElement('div');
        component.classList = 'ozc__panel-width-desktop--medium ozc__panel--base';
        component.innerHTML = tabData.section_2_html;

        return component;
    }

    function run () {
        if (!tabData) {
            return false;
        }

        const heroEl = getHeroEl();
        const section1El = getSection1El();
        const calloutEl = getCalloutEl();
        const section2El = getSection2El();
        const stickyCtaButtonEl = getStickyCtaButtonEl();

        const component = new SDG.Component.Element({
            cssClasses: 'ozc__page',
            children: [
                heroEl,
                section1El,
                calloutEl,
                section2El,
                stickyCtaButtonEl,
            ],
        });

        return component.el;
    }

    return run();
};
