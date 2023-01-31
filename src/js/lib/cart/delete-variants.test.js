import { initDeleteFromCartListeners } from './delete-variants';
import { updateCart } from '../shopify/api/cart';

jest.mock('../shopify/api/cart', () => {
    const original = jest.requireActual('../shopify/api/cart');
    return {
        ...original,
        updateCart: jest.fn(),
    };
});

describe('Delete variants from cart', () => {
    beforeAll(() => {
        window._ = window._ || {};

        jest.spyOn(console, 'info').mockImplementation(jest.fn());
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    describe('initDeleteFromCartListeners', () => {
        const REMOVE_ENTRIES_EL_SELECTOR_CLASS = 'js-remove-entries';
        const REMOVE_ENTRIES_EL_SELECTOR = `.${REMOVE_ENTRIES_EL_SELECTOR_CLASS}`;

        beforeEach(() => {
            updateCart.mockImplementation(() => {
                return Promise.resolve(true);
            });
        });

        afterEach(() => {
            updateCart.mockRestore();
        });

        test('with no cart data-variantid on element', () => {
            document.body.innerHTML =
                '<div>' +
                `  <span class="${REMOVE_ENTRIES_EL_SELECTOR_CLASS}" />` +
                '</div>';

            const cartItems = [{
                variant_id: 100,
            }];

            initDeleteFromCartListeners(cartItems);

            const el = document.querySelectorAll(REMOVE_ENTRIES_EL_SELECTOR)[0];

            el.click();

            expect(updateCart).not.toHaveBeenCalled()
        });

        test('with no cart properties', () => {
            document.body.innerHTML =
                '<div>' +
                `  <span class="${REMOVE_ENTRIES_EL_SELECTOR_CLASS}" data-variantid=100 />`
                '</div>';

            const cartItems = [{
                variant_id: 100,
            }];

            initDeleteFromCartListeners(cartItems);

            const el = document.querySelectorAll(REMOVE_ENTRIES_EL_SELECTOR)[0];

            el.click();

            expect(updateCart).toHaveBeenCalledWith({
                updates: {
                    100: 0,
                },
            })
        });

        test('with combo item in cart properties', () => {
            document.body.innerHTML =
                '<div>' +
                `  <span class="${REMOVE_ENTRIES_EL_SELECTOR_CLASS}" data-variantid=100 />` +
                `  <span class="${REMOVE_ENTRIES_EL_SELECTOR_CLASS}" data-variantid=300 />` +
                '</div>';

            const cartItems = [{
                variant_id: 100,
                properties: {
                    combo_primary_variant_id: 100,
                    combo_secondary_variant_id: 300,
                },
            }];

            initDeleteFromCartListeners(cartItems);

            const el = document.querySelectorAll(REMOVE_ENTRIES_EL_SELECTOR)[0];

            el.click();

            expect(updateCart).toHaveBeenCalledWith({
                updates: {
                    100: 0,
                    300: 0,
                },
            })
        });
    });
});
