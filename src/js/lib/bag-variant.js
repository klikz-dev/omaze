/**
* bag variantId
* @param  {number|string} variantId
* @param  {Array}         variantsArray
* @return {Object}
*/
SDG.Bag.variant = function(variantId, variantsArray) {
    const c = SDG.Bag.config;

    // cached globals
    variantId = _.toNumber(variantId);
    const [variant] = variantsArray.filter(obj => obj.id === variantId);

    /**
     * get data
     */
    function getData() {
        return variant;
    }

    /**
     * is max
     * @param  {number}  qty
     * @return {Boolean}
     */
    function isMax(qty = 0) {
        const $bagItem = document.getElementById(`bagItem${variantId}`);
        const $bagItemInput = $bagItem ? $bagItem.querySelector(c.dom.increment_input) : null;
        const bagItemQty = $bagItemInput ? parseInt($bagItemInput.value, 10) : 0;
        const maxQty = variant.inventory_quantity;

        return qty + bagItemQty > maxQty;
    }

    /**
    * return
    * @type {Object}
    */
    return {
        getData,
        isMax,
    };
};