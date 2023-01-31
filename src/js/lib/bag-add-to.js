/**
* bag
* @requires [lib/util.js,lib/bag-config.js,lib/bag-refresh.js,lib/bag-init.js]
*
* bag namespace
* bag config
* add to bag config
* extend bag config
* form
* add item
* on error
* on success
*/

/**
 * bag namespace
 * @type {Object}
 */
SDG.Bag = SDG.Bag || {};

/**
 * bag config
 * @type {Object}
 */
SDG.Bag.config = SDG.Bag.config || {};

/**
 * add to bag config
 * @type {Object}
 */
SDG.Bag.config_addto = {
    dom: {
        add_form: 'addToBagForm',
        bag_btn_text: 'btnAddToBagText',
        id: 'id',
        quantity: 'quantity',
        quantity_messages: 'quantityMessages',
    },
    text: {
        bag_default: 'Add to Bag',
        bag_adding: 'Adding...',
        bag_added: 'Added!',
    },
    url: {
        add: '/cart/add.js',
        clear: '/cart/clear.js',
    },
    timer: {
        reset_text: 600,
    },
    productData: productJson,
};

/**
 * extend bag config
 * @type {Object}
 */
SDG.Bag.config = _.extend(SDG.Bag.config, SDG.Bag.config_addto);

/**
 * form
 */
SDG.Bag.form = function(opts) {
    const c = _.extend(SDG.Bag.config, opts);

    /**
     * init
     */
    function init() {
        _.addEvent({
            id: c.dom.add_form,
            event: 'submit',
            fn: addToBag,
        });
    }

    /**
     * add to bag
     * @type {Function}
     */
    function addToBag(e) {
        e.preventDefault();

        // form values
        const id = this[c.dom.id].value;
        const qty = parseInt(this[c.dom.quantity].value, 10);

        // variant and qty
        const variant = SDG.Bag.variant(id, c.productData.variants);
        const variantData = variant.getData();
        const variantMaxQty = variantData.inventory_quantity;
        const isMax = variant.isMax(qty);

        // message
        const message = SDG.Messages.init({
            id: c.dom.quantity_messages,
            msgs: {
                error: `<p>Sorry, ${variantMaxQty} is the max quantity available in this size.</p>`,
            },
        });

        // other
        const $btnText = document.getElementById(c.dom.bag_btn_text);
        let data;

        // if max
        if (isMax) {

            // flag user
            message.error();

        } else {

            // clear messages
            message.clear();

            data = _.serialize(this);
            $btnText.innerHTML = c.text.bag_adding;
            $btnText.disabled = true;

            SDG.Bag.addItem(data, variantMaxQty);
        }
    }

    return init();
};

/**
 * add item
 * @param {Object} data
 * @param {number} inventoryQty
 */
SDG.Bag.addItem = function(data, inventoryQty) {
    const c = SDG.Bag.config;

    _.ajax({
        error: SDG.Bag.onError,
        success: () => addItemToEmptyCart(data, inventoryQty),
        type: 'POST',
        url: c.url.clear,
    });
};

function addItemToEmptyCart(data, inventoryQty) {
    const c = SDG.Bag.config;

    _.ajax({
        data: data,
        error: SDG.Bag.onError,
        success: (itemData) => {
            SDG.Bag.onSuccess(itemData, inventoryQty);
        },
        type: 'POST',
        url: c.url.add,
    });
}

/**
 * on error
 */
SDG.Bag.onError = function() {
    /* eslint-disable-next-line  no-console */
    console.warn('There has been an error.');
};

/**
 * on success
 * @param {Object} data
 * @param {number} inventoryQty
 */
SDG.Bag.onSuccess = function(data, inventoryQty) {
    const c = SDG.Bag.config;
    const $btnText = document.getElementById(c.dom.bag_btn_text);
    const variantIsInBag = SDG.Bag.Items.get(data.variant_id, 'id');

    if ($btnText) {
        $btnText.innerHTML = c.text.bag_added;
    }

    // add item to bagItems array if it isn't already there
    if (!variantIsInBag) {
        SDG.Bag.Items.add({
            id: data.variant_id,
            inventory_quantity: inventoryQty,
            quantity: data.quantity,
            sku: data.sku,
        });
    } else {
        SDG.Bag.Items.update(data.variant_id, 'quantity', data.quantity);
    }

    window.location.href = `${window.location.origin}/checkout`;
};

export default SDG.Bag.form;
