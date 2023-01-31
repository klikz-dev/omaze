/**
* recalculate totals
*/

SDG.Bag.recalc = function(price) {
    const c = SDG.Bag.config;
    const $sub = document.getElementById(c.dom.subtotal);
    let nt;
    let pt;

    if (typeof price !== 'undefined') {
        nt = _.formatPriceDisplay(price);
        pt = _.numberWithCommas(nt);
        $sub.innerHTML = pt;
    }
};