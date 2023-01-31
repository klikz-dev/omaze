import { updateCart } from '../shopify/api/cart';

// sailthru_bid cookie – Set by Sailthru when a subscriber opens and clicks an email link
// to attribute onsite actions to a particular email campaign.
const ESP_ATTRIBUTION_COOKIE_NAME = 'sailthru_bid';

function gatherAttributes () {
    const attributes = {};

    const espAttributionId = SDG.getCookie(ESP_ATTRIBUTION_COOKIE_NAME);

    if (espAttributionId) {
        attributes.esp_attribution_id = espAttributionId;
    }

    return attributes;
}

function setCartAttributes () {
    const cartAttributes = gatherAttributes();

    if (!Object.keys(cartAttributes).length) {
        return false;
    }

    const payload = {
        attributes: cartAttributes,
    }

    return updateCart(payload)
        .catch(() => {
            // eslint-disable-next-line no-console
            console.error(`[setCartAttributes] failed to update cart with attributes: ${JSON.stringify(payload)}`);
        });
}


export {
    setCartAttributes,
}
