import { updateCart } from '../shopify/api/cart';
import { getComboVariantIdToDelete } from './combo-promotion/combo-variant-to-delete';

export function initDeleteFromCartListeners (cartItems) {
    const REMOVE_ENTRIES_EL_SELECTOR = '.js-remove-entries';

    if (!cartItems || !cartItems.length) {
        return false;
    }

    const deleteItemEls = document.querySelectorAll(REMOVE_ENTRIES_EL_SELECTOR);

    deleteItemEls.forEach((el) => {
        el.addEventListener('click', function() {
            const selectedVariantId = parseInt(el.dataset.variantid);

            if (!selectedVariantId) {
                return false;
            }

            const variantsToDelete = [selectedVariantId];
            const comboVariantIdToDelete = getComboVariantIdToDelete(cartItems, selectedVariantId);

            if (comboVariantIdToDelete) {
                variantsToDelete.push(comboVariantIdToDelete);
            }

            onDeleteFromCart(variantsToDelete);
        });
    });
}

function onDeleteFromCart (variantIdList) {
    if (!Array.isArray(variantIdList)) {
        // eslint-disable-next-line no-console
        console.error('[Cart onDeleteFromCart] variantIdList must be an array.');

        return false;
    }

    if (!variantIdList.length) {
        return false;
    }

    const cartUpdateData =  {};

    variantIdList.forEach((variantId) => {
        if (variantId) {
            cartUpdateData[variantId] = 0;
        }
    });

    const updatePayload = {
        updates: cartUpdateData,
    };

    return updateCart(updatePayload)
        .then(() => {
            window.location.reload();

            return true;
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('[SDG.Cart.onDeleteFromCart]: ', error);

            return false;
        });
}
