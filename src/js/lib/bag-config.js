/**
* namespace
* @type {Object}
*/
SDG.Bag = SDG.Bag || {};

/**
* data
* @type {Object}
*/
SDG.Bag.data = SDG.Bag.data || {};

/**
* config
* @type {Object}s
*/
SDG.Bag.config = {
    cls: {
        active: 'is-active',
        empty: 'is-empty',
        expose: 'is-bag-exposed',
        loading: 'is-loading',
    },
    dom: {
        bag: 'bag',
        bag_btn: 'bagBtn',
        bag_empty: 'bagEmpty',
        bag_close: 'bagContinue',
        donations: 'bagDonations',
        increment_input: '.js-increment-input',
        item: '.js-bag-item',
        item_messages: '.js-bag-item-messages',
        items: 'bagItems',
        remove: 'js-bag-item-remove',
        subtotal: 'bagSubtotal',
    },
    icon: {
        remove: 'icon--cart-close',
        add: 'icon--plus',
        substract: 'icon--minus',
    },
    img: {
        std: '80x',
        rtn: '160x',
        std_cart: '220x',
        rtn_cart: '440x',
    },
    show_event: 'click', // click, mouseenter
    timer: {
        hover: 1500,
        slide_up: 400, // This should match the animation speed of your slideup animation.
        // Typically this is set to $normal-timer in _timers.scss file.
    },
    url: {
        cart: '/cart.js',
        update: '/cart/change.js',
    },
    use: {
        count: true, // update bag count
        swatch: false, // sets whether to use a swatch in the bag item for color
        // display instead of the label. Set to false to show label instead.
    },
    exclude_selectors: '#bagBtn,#bagBtnCount,.icon,.screenreader',
};