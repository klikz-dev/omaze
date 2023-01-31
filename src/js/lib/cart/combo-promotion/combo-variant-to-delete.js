export function getComboVariantIdToDelete (cartItems, variantId) {
    if (!variantId || !Array.isArray(cartItems)) {
        return false;
    }

    // cart item user wants to delete
    const selectedToDelete = cartItems.find((item) => {
        return variantId == item.variant_id;
    });

    if (!selectedToDelete || !selectedToDelete.properties) {
        return false;
    }

    // associated secondary combo ID
    const primaryComboId = selectedToDelete.properties.combo_primary_variant_id;
    const secondaryComboId = selectedToDelete.properties.combo_secondary_variant_id;
    const isPrimaryComboVariant = selectedToDelete.variant_id == primaryComboId;
    const isSecondaryComboVariant = selectedToDelete.variant_id == secondaryComboId; // shows that `variantId` is a combo variant

    if (isSecondaryComboVariant) {
        return parseInt(primaryComboId);
    }

    if (isPrimaryComboVariant) {
        return parseInt(secondaryComboId);
    }

    return false;
}
