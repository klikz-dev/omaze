// collection template js

SDG.Collection = SDG.Collection || {};
// NOTE: window.products is getting set via <script> tag in liquid
//       it loads before this code
SDG.Collection.Products = SDG.Collection.Products || window.products || [];
// NOTE: remove from global scope as quickly as possible
delete window.products;

SDG.Collection.init = function() {
    function run() {
        addEventListeners();
    }

    return run();
};

function addEventListeners() {
    addDonateToAllEventListeners();
}

function addDonateToAllEventListeners() {
    const CLICK_EVENT = 'click';
    const SELECTOR = 'oz-donation-donate-to-all__cta';
    const DONATE_TO_ALL_CTAS = document.getElementsByClassName(SELECTOR);

    if (!DONATE_TO_ALL_CTAS) {
        // eslint-disable-next-line  no-console
        console.error('Failed to find *any* Donate to All Elements');

        return;
    }

    Array.from(DONATE_TO_ALL_CTAS).forEach(CTA => {
        CTA.addEventListener(CLICK_EVENT, handleDonateToAllOnClick);
    });
}

function handleDonateToAllOnClick(event) {
    const DATASET = event && event.srcElement && event.srcElement.dataset;
    const donationAmount = DATASET.donationAmount;
    const donationAmountInCents = parseInt(donationAmount, 10);
    let selectedVariants = [];

    if (Number.isNaN(donationAmountInCents)) {
        //TODO: debug / warn logging
        return;
    }

    selectedVariants = SDG.Collection.Products
        .map(product => {
            return product.variants
                .filter(variant => {
                    return variant.price === donationAmountInCents;
                })
                .map(variant => {
                    return variant.id;
                });
        })
        .reduce((acc, val) => {
            return acc.concat(val);
        }, []);

    addAll(selectedVariants);
}

function disableAllDonateToAllCtas() {
    const SELECTOR = 'oz-donation-donate-to-all__cta';
    const DONATE_TO_ALL_CTAS = document.getElementsByClassName(SELECTOR);

    if (!DONATE_TO_ALL_CTAS) {
        // eslint-disable-next-line  no-console
        console.error('Failed to find *any* Donate to All Elements');

        return;
    }

    Array.from(DONATE_TO_ALL_CTAS).forEach(ctaEl => {
        ctaEl.setAttribute('disabled', true);
    });
}

function enableAllDonateToAllCtas() {
    const SELECTOR = 'oz-donation-donate-to-all__cta';
    const DONATE_TO_ALL_CTAS = document.getElementsByClassName(SELECTOR);

    if (!DONATE_TO_ALL_CTAS) {
        // eslint-disable-next-line  no-console
        console.error('Failed to find *any* Donate to All Elements');

        return;
    }

    Array.from(DONATE_TO_ALL_CTAS).forEach(ctaEl => {
        ctaEl.removeAttribute('disabled');
    });
}

function addAll(products) {
    const QUANTITY = 1;
    const requestBody = [];

    if (!products) {
        // eslint-disable-next-line no-console
        console.error('Unable to add all items to cart; no products found');
        return;
    }

    products
        .forEach((product) => {
            requestBody.push({
                quantity: QUANTITY,
                id: product,
            });
        });

    disableAllDonateToAllCtas();

    return fetch('/cart/add.js', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: requestBody,
        }),
    })
    .then(addToCartSuccess)
    .catch(addToCartFailure);
}

function addToCartSuccess (response) {
    if (response.status !== 200) {
        addToCartFailure(response);

        return;
    }

    // eslint-disable-next-line  no-console
    console.error('Failed to add item(s) to cart:', response);

    redirectToCart();
}

function addToCartFailure (error) {
    // eslint-disable-next-line  no-console
    console.error('Donate to All - Failed to Add to Cart:', error);
    enableAllDonateToAllCtas();
}

function redirectToCart () {
    const CART_PATH = '/cart';
    window.location.href = CART_PATH;
}

SDG.Collection.init();
