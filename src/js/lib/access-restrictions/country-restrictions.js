window.SDG = window.SDG || {};
SDG.CountryRestrictions = SDG.CountryRestrictions || {};

function getStartDate (tags) {
     const startTagLabel = '$oz_sweepstake_dates-start:';
     let startDate = null;
     for (let i = 0; i < tags.length; i++) {
         const tag = tags[i];
         const tagIdx = tag.indexOf(startTagLabel);
         if (tagIdx !== 0) continue;
         if (tag.length === startTagLabel.length) break;
         startDate = new Date(tag.substring(startTagLabel.length));
         break;
     }
     if (!startDate || isNaN(startDate.getTime())) return null;
     return startDate;
}

function isIneligibleForDate (tags, geoLocationData, restrictedCountries, eligibilityDate) {
    if (!geoLocationData?.COUNTRY_CODE || !restrictedCountries || !eligibilityDate) return false;

    const countryCode = geoLocationData.COUNTRY_CODE.toUpperCase();
    const isRestrictedCountry = restrictedCountries.findIndex(restrictedCountry => restrictedCountry === countryCode);
    if (isRestrictedCountry === -1) return false;

    const startDate = getStartDate(tags);

    if (!startDate) return false;

    return startDate.getTime() >= eligibilityDate.getTime();
}

function checkEligibility (tags, restrictedCountries, eligibilityDate) {
    if (!window.ozGeolocation) return;
    if (!tags || !restrictedCountries || !eligibilityDate) return;

    function handleEligibility(geoLocationData) {
        if (!geoLocationData) return;

        const ineligible = isIneligibleForDate(
            tags, geoLocationData, restrictedCountries, eligibilityDate);

        // Redirect to home page
        if (ineligible) {
            window.location.href = '/';
        }
    }

    window.ozGeolocation.getData()
        .then(handleEligibility)
        .catch((e) => {
            // eslint-disable-next-line no-console
            console.error('[Geolocation restrictions] ozGeolocation data missing', e);
        });
}

SDG.CountryRestrictions.isIneligibleForDate = isIneligibleForDate;
SDG.CountryRestrictions.checkEligibility = checkEligibility;

export {
    checkEligibility,
    isIneligibleForDate,
}
