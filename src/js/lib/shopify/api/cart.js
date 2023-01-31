const CART_UPDATE_PATH = '/cart/update.js';

function updateCart (cartProperties) {
    if (!cartProperties) {
        return false;
    }

    return fetch(CART_UPDATE_PATH, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartProperties),
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject('fetch failed');
        }

        return response.json();
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`[Cart.api updateCart]: ${error}`);

        return Promise.reject(error);
    })
}

export {
    updateCart,
}
