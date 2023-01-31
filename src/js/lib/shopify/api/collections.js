const DEFAULT_LOAD_LIMIT = 10;

const fetchCollectionProducts = function (slug, itemLimit) {
    if (!slug) {
        return Promise.reject(new Error('[Collections.api fetchProducts] collection slug missing'));
    }

    const limit = parseInt(itemLimit) || DEFAULT_LOAD_LIMIT;
    const url = `/collections/${slug}/products.json?limit=${limit}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject('fetch failed');
            }

            return response.json();
        })
        .then((response) => {
            return formatProducts(response.products);
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(`[Collections.api fetchProducts]: ${error}`);

            return Promise.reject(error);
        })
};

function fetchCollections (collectionNames, limit) {
    if (!Array.isArray(collectionNames)) {
        return Promise.reject(new Error('[shopify.api fetchCollections] collectionNames must be a non-empty array'));
    }

    const promises = collectionNames.map((collectionName) => {
        return fetchCollectionProducts(collectionName, limit);
    });

    return Promise.allSettled(promises)
        .then((response) => {
            return response.map((result) => result.value);
        });
}

const formatProducts = function (products) {
    return products.map((product) => {
        if (product.handle) {
            product.url = product.url || `/products/${product.handle}`;
        }

        if (product.images) {
            const defaultSrc = product.images[0] && product.images[0].src;

            product.featured_image = product.featured_image || defaultSrc;
        }

        return product;
    });
}

export {
    fetchCollections,
    fetchCollectionProducts,
}
