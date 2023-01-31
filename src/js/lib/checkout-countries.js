import loadCountries from './countries';
import './utility/json';

SDG.Checkout = SDG.Checkout || {};
SDG.Checkout.LoadCountries = SDG.Checkout.LoadCountries || {};

SDG.Checkout.LoadCountries.init = function (config = {}) {
    if (!SDG.SelectOptions || !SDG.SelectOptions.init) {
        return;
    }

    const INELIGIBLE_COUNTRIES = SDG.Utility.Json.parse(config.ineligibleCountries, 'SDG.Checkout.LoadCountries') || [];
    const countryList = loadCountries();
    const countries = countryList.filter((country) => {
        return !INELIGIBLE_COUNTRIES.includes(country.code);
    })

    const BILLING_COUNTRY_SELECT_ELEMENT = document.querySelector(
        '#checkout_billing_address_country'
    );
    const SHIPPING_COUNTRY_SELECT_ELEMENT = document.querySelector(
        '#checkout_shipping_address_country'
    );

    if (BILLING_COUNTRY_SELECT_ELEMENT) {
        SDG.SelectOptions.init({
            list: countries,
            parentElement: BILLING_COUNTRY_SELECT_ELEMENT,
        });
    }

    if (SHIPPING_COUNTRY_SELECT_ELEMENT) {
        SDG.SelectOptions.init({
            list: countries,
            parentElement: SHIPPING_COUNTRY_SELECT_ELEMENT,
        });
    }
};
