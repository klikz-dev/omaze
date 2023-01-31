import JsonUtility from '../utility/json';

SDG = SDG || {};
SDG.Features = SDG.Features || {};

SDG.Features.Validation = {
    invalidateFeature (featureName) {
        return this.removeCssClassForFeature(featureName);
    },

    removeCssClassForFeature (featureName) {
        const CSS_PREFIX = 'oz-external--';
        const cssClass = `${CSS_PREFIX}${featureName}`;
        const selector = `.${cssClass}`;
        const elements = document.querySelectorAll(selector);

        elements.forEach((el) => {
            el.classList.remove(cssClass);
        });
    },

    shouldSkipFeature (featureName) {
        // skipping 'closed-sweepstakes' because it is handled in react
        const FEATURES_TO_SKIP = ['closed-sweepstakes'];

        return FEATURES_TO_SKIP.includes(featureName);
    },

    // block feauture only if explicitly disabled. default to allow
    featureFlagDisabled (featureName, featureFlags = {}) {
        const flagValue = featureFlags[featureName];

        if (typeof(flagValue) !== 'boolean') {
            return Promise.resolve(false)
        }

        if (flagValue === false) {
            return Promise.resolve(true)
        }

        return this.featureGeoBlocked(featureFlags, featureName);
    },

    parseBlockedCountries (json) {
        const blockedCountries = JsonUtility.parse(json, 'SDG.Features.Validation.parseBlockedCountries');

        if (!Array.isArray(blockedCountries) || !blockedCountries.length) {
            return false;
        }

        return blockedCountries;
    },

    parseBlockedRegions (json) {
        const blockedRegions = JsonUtility.parse(json, 'SDG.Features.Validation.parseBlockedRegions');

        if (typeof(blockedRegions) !== 'object' ||
            !Object.keys(blockedRegions).length ||
            Array.isArray(blockedRegions)) {

            return false;
        }

        return blockedRegions;
    },

    featureGeoBlocked (featureFlags, featureName) {
        const blockedCountriesJSON = featureFlags[`${featureName}-blocked-countries`];
        const blockedRegionsJSON = featureFlags[`${featureName}-blocked-regions`];

        if (!blockedCountriesJSON && !blockedRegionsJSON) {
            return Promise.resolve(false);
        }

        const blockedCountries = this.parseBlockedCountries(blockedCountriesJSON);
        const blockedRegions = this.parseBlockedRegions(blockedRegionsJSON);

        if (!blockedCountries && !blockedRegions) {
            return Promise.resolve(false);
        }

        // If window.ozGeolocation fails in any way then block the feature.
        if (!window.ozGeolocation) {
            /* eslint-disable-next-line  no-console */
            console.error('[SDG.Features.Validation.featureGeoBlocked] window.ozGeolocation not available');

            return Promise.resolve(true);
        }

        return window.ozGeolocation
            .getData()
            .then((geoData) => {
                const blocked = this.isGeoBlockedCountry(geoData, blockedCountries) ||
                    this.isGeoBlockedRegion(geoData, blockedRegions);

                return Promise.resolve(blocked);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(`[SDG.Features.Validation.featureGeoBlocked] ozGeolocation: ${error}`);

                return Promise.resolve(true);
            });
    },

    isGeoBlockedRegion (geoData = {}, blockedRegions) {
        const {
            COUNTRY_CODE,
            REGION_CODE,
        } = geoData;

        // no list given. fail silently
        if (!blockedRegions) {
            return false;
        }

        // invalid list given
        if (typeof(blockedRegions) !== 'object' || Array.isArray(blockedRegions)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Features.Validation.isGeoBlockedRegion] invalid blockedRegions data.');

            return false;
        }

        if (!COUNTRY_CODE || !REGION_CODE) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Features.Validation.isGeoBlockedRegion] invalid geoData.');

            return false;
        }

        let blockedRegionList = blockedRegions[COUNTRY_CODE.toUpperCase()];

        // there's a country match, but region list not valid
        if (!Array.isArray(blockedRegionList)) {
            return false;
        }

        return blockedRegionList.includes(REGION_CODE.toUpperCase());
    },

    isGeoBlockedCountry (geoData = {}, blockedCountries) {
        const {
            COUNTRY_CODE,
        } = geoData;

        // no list given. fail silently
        if (!blockedCountries) {
            return false;
        }

        if (!Array.isArray(blockedCountries)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Features.Validation.isGeoBlockedCountry] blockedCountries invalid');

            return false;
        }

        if (!COUNTRY_CODE ) {
            /* eslint-disable-next-line  no-console */
            console.warn('[SDG.Features.Validation.isGeoBlockedCountry] COUNTRY_CODE missing');

            return false;
        }

        return blockedCountries.includes(COUNTRY_CODE.toUpperCase());
    },

    isFeatureEmpty (features, feature) {
        return !features[feature]
    },
};

export default SDG.Features.Validation;
