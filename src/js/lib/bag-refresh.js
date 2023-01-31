/**
* refresh
* @type {Function}
*/
SDG.Bag.refresh = function() {
    const c = SDG.Bag.config;

    // cached globals
    const $bag = document.getElementById(c.dom.bag);
    const $list = document.getElementById(c.dom.items);

    function init() {
        _.ajax({
            error: onError,
            success: onSuccess,
            type: 'GET',
            url: c.url.cart,
        });
    }

    function onError() {
        /* eslint-disable-next-line  no-console */
        console.log('Bag refresh error with ajax request.');
    }

    function onSuccess(e) {
        if (e) {
            if (e.items.length > 0) {
                getItems(e);
                SDG.Bag.empty(false);
            } else {
                SDG.Bag.empty(true);
            }

            if (c.use.count) {
                SDG.Bag.Count.set(e.item_count);
            }
        }
    }

    function getItems(data) {

        const { items } = data;
        let html = '';
        let item;

        _.removeClass($bag, c.cls.empty);

        Object.keys(items).forEach((k) => {
            item = getItemHtml(items[k]);
            html += item;
        });

        $list.innerHTML = html;

        SDG.incrementer({
            cb: SDG.Bag.updateItemQty,
        });

        bindEvents();

        SDG.Bag.recalc(data.total_price);
    }

    function bindEvents() {
        _.addEvent({
            id: $list,
            className: c.dom.remove,
            event: 'click',
            fn: beforeRemoveItem,
        });
    }

    function beforeRemoveItem(e) {
        e.preventDefault();
        const item = getItem(this);
        SDG.Bag.updateItemQty(item, 0);
    }

    function getItemHtml(obj) {
        const {
            product_title: title,
            original_price: originalPrice,
            total_discount: salePrice,
            variant_id: variantId,
            quantity: currentQty,
            sku,
            url,
        } = obj;
        const imgAlt = `'Photo -  ${title}`;
        const originalPriceDisplay = _.formatPriceDisplay(originalPrice);
        let img = obj.image;
        let item = '';
        let salePriceDisplay;

        // set img
        if (!img) {
            img = `${assetUrl}'no-image.gif`;
        }

        const imgStd = _.getSizedImageUrl(img, c.img.std);
        const imgRtn = _.getSizedImageUrl(img, c.img.rtn);

        // Item Start
        item = `

        <article class="bag-item js-bag-item" id="bagItem${variantId}" data-variant-id="${variantId}" data-qty="${currentQty}">

            <div class="bag-item__photo">
                <a href="${url}" class="bag-item__photo-intrinsic-ratio intrinsic-ratio intrinsic-ratio--product-photo">
                    <img class="lazyload" data-srcset="${imgStd} 1x, ${imgRtn} 2x" alt="${imgAlt}" />
                </a>
            </div>

            <div class="bag-item__info">
                <a href="/cart/change/${variantId}?quantity=0" title="Remove item" class="bag-item__remove js-bag-item-remove btn-icon" role="button" data-variant-id="${variantId}"><span class="bag-item__remove-label">Remove</span></a>
                <div class="bag-item__desc">
                    <header class="bag-item__header">
                        <h4 class="bag-item__title">
                            <a href="${obj.url}">
                                ${obj.product_title}
                            </a>
                        </h4>
                        <p class="bag-item__sku">#${sku}</p>
                    </header>
                    <p class="bag-item__variants">
                        ${getItemVariants(obj)}
                    </p>
                </div>

                <div class="bag-item__actions">
                    <div class="bag-item__qty increment js-increment">
                        <input type="number" name="quantity" value="${currentQty}" size="3" class="increment__input js-increment-input" tabindex="-1" />
                        <button type="button" class="increment__btn increment__add js-increment-btn" data-action="add">
                            <i class="increment__icon increment__icon--add icon icon--plus"></i>
                            <span class="screenreader">Add</span>
                        </button>
                        <button type="button" class="increment__btn increment__subtr js-increment-btn" data-action="remove">
                            <i class="increment__icon increment__icon--subtr icon icon--minus"></i>
                            <span class="screenreader">Subtract</span>
                        </button>
                    </div>
                    <p class="bag-item__price">
                        <span class="bag-item__original-price">
                            ${originalPriceDisplay}
                        </span>
                        ${salePrice !== 0 ? `<span class="bag-item__sale-price">
                        ${salePriceDisplay}</span>` : ''}
                    </p>

                    <a href="/cart/change/${variantId}?quantity=0" title="Remove item" class="bag-item__remove js-bag-item-remove btn-icon" role="button" data-variant-id="${variantId}"><span class="bag-item__remove-label">Remove</span></a>
                </div>

                <div class="bag-item__messages messages js-bag-item-messages"></div>

            </div>
        </article>
        `;

        return item;

    }

    function getItemVariants(obj) {
        const cnf = SDG.Bag.config;
        const { variant_options: variants, handle } = obj;
        let isColor = false;
        let html = '';
        let count;
        let i;
        let label;
        let variant;
        let swatch;
        let swatchRetina;

        if (variants) {
            count = variants.length;

            for (i = 0; i < count; i += 1) {
                variant = variants[i].toLowerCase();

                label = _.remapSizeValues(variant);

                isColor = handle.indexOf(label) !== -1;

                if (label && label !== 'default title') {
                    if (isColor && cnf.use.swatch) {
                        swatch = assetUrl + _.getSizedImageUrl(`swatch-${label}.jpg`);
                        swatchRetina = assetUrl + _.getSizedImageUrl(`swatch-${label}.jpg`);

                        html += `
                        <span class="bag-item__variant bag-item__variant-color">
                            <img data-srcset="${swatch} 1x, ${swatchRetina} 2x" class="lazyload" alt="${label}" />'+
                        </span>
                        `;
                    } else {
                        html += `<span class="bag-item__variant">${label}</span>`;
                    }
                }
            }
        }

        return html;
    }

    function getItem($el) {
        const item = {};

        [item.el] = _.parents($el, c.dom.item);

        item.id = item.el.getAttribute('data-variant-id');

        return item;
    }

    return init();
};
