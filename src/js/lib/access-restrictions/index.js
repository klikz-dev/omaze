import { UNAVAILABLE_IPS } from './unavailable-ips';
import JsonUtility from '../utility/json';

window.SDG = window.SDG || {};
SDG.AccessRestrictions = SDG.AccessRestrictions || {};

const PRODUCTION_ENV = 'production';
const ACCESS_TYPES = {
    FULL: 'full',
    LIMITED: 'limited',
    NONE: 'none',
};
const UNAVAILABLE_PAGE = '/pages/unavailable';

SDG.AccessRestrictions.init = function(config = {}) {
    const ENV = config.env || PRODUCTION_ENV;
    const IP_WHITELIST = config.IP_WHITELIST || [];
    const IP_BLACKLIST = config.IP_BLACKLIST || [];
    const INELIGIBLE_COUNTRIES = JsonUtility.parse(config.ineligibleCountries, 'SDG.AccessRestrictions') || [];
    const INELIGIBLE_REGIONS = JsonUtility.parse(config.ineligibleRegions, 'SDG.AccessRestrictions') || {};

    function run () {
        SDG.AccessRestrictions.CONFIG = {
            ENV: ENV,
            IP_WHITELIST: IP_WHITELIST,
            IP_BLACKLIST: IP_BLACKLIST,
            INELIGIBLE_COUNTRIES: INELIGIBLE_COUNTRIES,
            INELIGIBLE_REGIONS: INELIGIBLE_REGIONS,
        };
    }

    return run();
};

SDG.AccessRestrictions.restrictAccess = function() {
    const { pathname } = window.location;

    if (pathname === UNAVAILABLE_PAGE) {
        return;
    }

    geoTargeting();
};

const geoTargeting = () => {
    if (!window.ozGeolocation) {
        /* eslint-disable-next-line  no-console */
        console.error('[OZ ACCESS geoTargeting] window.ozGeolocation not available');

        return false;
    }

    window.ozGeolocation
        .getData()
        .then(handleAccessRestrictions)
        .catch(() => {
            // eslint-disable-next-line no-console
            console.error('[OZ ACCESS geoTargeting] ozGeolocation data missing');
        });
}

const handleAccessRestrictions = (geoData) => {
    const {
        ENV = PRODUCTION_ENV,
        IP_WHITELIST = [],
        IP_BLACKLIST = [],
        INELIGIBLE_COUNTRIES = [],
        INELIGIBLE_REGIONS = {},
    } = SDG.AccessRestrictions.CONFIG;

    if (!geoData) {
        /* eslint-disable-next-line  no-console */
        console.error('[OZ ACCESS handleAccessRestrictions] ozGeolocation data missing');

        return false;
    }

    const {
        COUNTRY_CODE,
        REGION_CODE,
        IP,
    } = geoData;

    if (!COUNTRY_CODE || !REGION_CODE || !IP) {
        /* eslint-disable-next-line  no-console */
        console.error('[OZ ACCESS handleAccessRestrictions] ozGeolocation data invalid');

        return false;
    }

    if (ENV !== PRODUCTION_ENV && IP_WHITELIST.includes(IP)) {
        SDG.AccessRestrictions.ACCESS = {
            type: ACCESS_TYPES.FULL,
        };

        return;
    }

    // NOTE: Omaze.com is available but may require some
    //       UI / UX modifications
    SDG.AccessRestrictions.ACCESS = {
        type: ACCESS_TYPES.LIMITED,
    };

    let ineligibleRegionList = INELIGIBLE_REGIONS[COUNTRY_CODE.toUpperCase()];

    // In case it's a single code. Just to be nice.
    if (!Array.isArray(ineligibleRegionList)) {
        ineligibleRegionList = [ineligibleRegionList];
    }

    const countryBlocked = INELIGIBLE_COUNTRIES.includes(COUNTRY_CODE.toUpperCase());
    const regionBlocked = ineligibleRegionList.includes(REGION_CODE.toUpperCase());
    const ipBlocked = UNAVAILABLE_IPS.includes(IP) || IP_BLACKLIST.includes(IP);

    // NOTE: Omaze.com is completely unavailable for anyone in
    //       the following lists countries, regions, ips, etc
    if (countryBlocked || regionBlocked || ipBlocked) {
        SDG.AccessRestrictions.ACCESS = {
            type: ACCESS_TYPES.NONE,
        };

        window.location.replace(UNAVAILABLE_PAGE);
    }
};
