const PATH = '/recommendations/products.json';
const DEFAULT_LOAD_LIMIT = 10;

const fetchProductRecommendations = function (productId, itemLimit) {
    if (!productId) {
        return Promise.reject(new Error('[Shopify.api fetchProductRecommendations] productId missing'));
    }

    const limit = itemLimit || DEFAULT_LOAD_LIMIT;
    const url = `${PATH}?product_id=${productId}&limit=${limit}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject('fetch failed');
            }

            return response.json();
        })
        .then((response) => {
            return response.products;
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(new Error(`[Shopify.api fetchProductRecommendations]: ${error}`));

            return Promise.reject(error);
        })
}


export {
    fetchProductRecommendations,
}
