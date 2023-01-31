import { default as Element } from '../../components/ozc-element.js';

window.SDG = window.SDG || {};
SDG.SignupValueProposition = SDG.SignupValueProposition || {};

SDG.SignupValueProposition.init = function(options) {
    options = options || {};
    options.placement = options.placement || {};

    const {
        showCreateAccountButton,
        placement,
        showCreateAccountHeader,
        showDividers,
        showContactInfo,
        showTopText,
        showPromoOffer,
    } = options;
    const { position, referenceSelector } = placement;

    if (placement === undefined || referenceSelector === undefined) {
        // eslint-disable-next-line no-console
        console.warn(
            '[SDG.SignupValueProposition.init]: "placement" and  "referenceSelector" must be supplied'
        );
        return;
    }

    const container = createContainer();

    const targetEl = document.querySelector(referenceSelector);

    if (!targetEl) {
        // eslint-disable-next-line no-console
        console.warn(
            '"referenceSelector" must reference a valid element on the DOM'
        );
        return;
    }

    targetEl.insertAdjacentElement(position, container.el);

    function createContainer() {
        const CSS_CLASS_VALUE_PROPOSITION_CONTAINER =
            'oz-signup-value-proposition__container';

        const container = new Element({
            tag: 'div',
            cssClasses: CSS_CLASS_VALUE_PROPOSITION_CONTAINER,
            children: [
                showDividers && createDivider(),
                showTopText && createTopText(),
                showCreateAccountHeader && createAccountHeader(),
                showPromoOffer && createPromoOffer(),
                createListItems(),
                createListItemsRebrand(),
                showCreateAccountButton && createAccountButton(),
                showDividers && createDivider(),
            ],
        });

        return container;
    }

    function createListItems() {
        const itemMessages = [
            {
                icon:
                    '//images.omaze.com/web/assets/images/static/features/signup-value-proposition/benefits-clock.svg',
                text: 'Keep track of your experiences',
                alt: 'clock icon',
            },
            {
                icon:
                    '//images.omaze.com/web/assets/images/static/features/signup-value-proposition/benefits-tickets-solid.svg',
                text: 'See how many entries you have',
                alt: 'tickets icon',
            },
            {
                icon:
                    '//images.omaze.com/web/assets/images/static/features/signup-value-proposition/benefits-winner.svg',
                text: 'Stay up to date about winners & more',
                alt: 'winner icon',
            },
        ];
        const contactInfoMessage = {
            icon:
                '//images.omaze.com/web/assets/images/static/features/signup-value-proposition/noun-speech-2.svg',
            text: 'Keep your contact info up to date',
            alt: 'noun speech icon',
        };

        const CSS_CLASS_LIST_ITEMS = 'oz-signup-value-proposition__list';

        if (showContactInfo) {
            itemMessages.push(contactInfoMessage);
        }

        const listItems = new Element({
            tag: 'ul',
            cssClasses: CSS_CLASS_LIST_ITEMS,
            children: itemMessages.map(message => createListItem(message)),
        });

        return listItems;
    }

    function createListItem(message) {
        const { icon, text, alt } = message;

        const CSS_CLASS_LIST_ITEM = 'oz-signup-value-proposition__list-item';
        const CSS_CLASS_LIST_ITEM_TEXT =
            'oz-signup-value-proposition__list-item-text';
        const CSS_CLASS_LIST_ITEM_ICON =
            'oz-signup-value-proposition__list-item-icon';

        const listItem = new Element({
            tag: 'li',
            cssClasses: CSS_CLASS_LIST_ITEM,
            children: [
                new Element({
                    tag: 'div',
                    cssClasses: CSS_CLASS_LIST_ITEM_ICON,
                    children: [
                        new Element({
                            tag: 'img',
                            attributes: {
                                alt: alt,
                                src: icon,
                            },
                        }),
                    ],
                }),
                new Element({
                    tag: 'span',
                    cssClasses: CSS_CLASS_LIST_ITEM_TEXT,
                    content: text,
                }),
            ],
        });

        return listItem;
    }

    function createListItemsRebrand() {
        const itemMessages = [
            {
                icon:
                    'icon icon--benefits-clock-new',
                text: 'Keep track of your experiences',
            },
            {
                icon:
                    'icon icon--benefits-tickets-new',
                text: 'See how many entries you have',
            },
            {
                icon:
                    'icon icon--benefits-winner-new',
                text: 'Stay up to date about winners & more',
            },
        ];
        const contactInfoMessage = {
            icon:
                '//images.omaze.com/web/assets/images/static/features/signup-value-proposition/noun-speech-2.svg',
            text: 'Keep your contact info up to date',
            alt: 'noun speech icon',
        };

        const CSS_CLASS_LIST_ITEMS = 'oz-signup-value-proposition__list_rebrand';

        if (showContactInfo) {
            itemMessages.push(contactInfoMessage);
        }

        const listItems = new Element({
            tag: 'ul',
            cssClasses: CSS_CLASS_LIST_ITEMS,
            children: itemMessages.map(message => createListItemRebrand(message)),
        });

        return listItems;
    }

    function createListItemRebrand(message) {
        const { icon, text } = message;

        const CSS_CLASS_LIST_ITEM = 'oz-signup-value-proposition__list-item';
        const CSS_CLASS_LIST_ITEM_TEXT =
            'oz-signup-value-proposition__list-item-text';
        const CSS_CLASS_LIST_ITEM_ICON =
            'oz-signup-value-proposition__list-item-icon';

        const listItem = new Element({
            tag: 'li',
            cssClasses: CSS_CLASS_LIST_ITEM,
            children: [
                new Element({
                    tag: 'div',
                    cssClasses: CSS_CLASS_LIST_ITEM_ICON,
                    children: [
                        new Element({
                            tag: 'i',
                            attributes: {
                                class: icon,
                            },
                        }),
                    ],
                }),
                new Element({
                    tag: 'span',
                    cssClasses: CSS_CLASS_LIST_ITEM_TEXT,
                    content: text,
                }),
            ],
        });

        return listItem;
    }

    function createAccountButton() {
        const CSS_CLASS_BUTTON =
            'oz-btn oz-btn--block oz-btn--line oz-btn--line--pink oz-signup-value-proposition__btn';
        const CSS_CLASS_BUTTON_LABEL = 'btn__label';
        const BUTTON_LABEL_CONTENT = 'Create account';

        const button = new Element({
            tag: 'a',
            cssClasses: CSS_CLASS_BUTTON,
            attributes: {
                type: 'button',
                href: '/account/register',
            },
            children: [
                new Element({
                    tag: 'span',
                    cssClasses: CSS_CLASS_BUTTON_LABEL,
                    content: BUTTON_LABEL_CONTENT,
                }),
            ],
        });

        button.el.onclick = () => {
            const data = {
                event: 'click',
                ga_category: 'Thank You',
                ga_action: 'Button Click',
                ga_label: 'Sign Up',
            }
            SDG.Analytics.events.pushDataLayerEvent(data);
        };
        
        return button;
    }

    function createAccountHeader() {
        const CSS_CLASS_HEADER = 'oz-signup-value-proposition__header';
        const HEADER_CONTENT = 'Create your Omaze account!';

        const header = new Element({
            tag: 'h1',
            cssClasses: CSS_CLASS_HEADER,
            content: HEADER_CONTENT,
        });

        return header;
    }

    function createPromoOffer() {
        const CSS_CLASS_PROMO_OFFER = 'oz-signup-value-proposition__promo-offer';
        const PROMO_OFFER_CONTENT = 'Sign up today and score 150 extra chances to win on the next experience of your dreams';

        const header = new Element({
            tag: 'h3',
            cssClasses: CSS_CLASS_PROMO_OFFER,
            content: PROMO_OFFER_CONTENT,
        });

        return header;
    }

    function createTopText() {
        const CSS_CLASS_TOP_TEXT = 'oz-signup-value-proposition__top-text';
        const TOP_TEXT_CONTENT = 'Your new account is better than ever!';

        const header = new Element({
            tag: 'div',
            cssClasses: CSS_CLASS_TOP_TEXT,
            content: TOP_TEXT_CONTENT,
        });

        return header;
    }

    function createDivider() {
        const CSS_CLASS_DIVIDER = 'oz-divider';

        const header = new Element({
            tag: 'div',
            cssClasses: CSS_CLASS_DIVIDER,
        });

        return header;
    }
};
