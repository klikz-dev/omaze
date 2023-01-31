const ANALYTICS_EVENTS = {
    CEC_MODAL_VISIBLE: 'cecImpression',
    CEC_OPTION_SELECTED: 'cecOptionCTA',
    CEC_EMAIL_SUBMITTED: 'cecEmailSubmitCTA',
};

const dataValid = function (data) {
    const eventName = data && data.event;

    return Object.values(ANALYTICS_EVENTS).includes(eventName);
};

const trackAnalyticsEvent = function (data) {
    if (!dataValid(data)) {
        /* eslint-disable-next-line  no-console  */
        console.error(`[CEC trackAnalyticsEvent] invalid data: ${JSON.stringify(data)}`);

        return false;
    }

    SDG.Analytics.events.pushDataLayerEvent(data);
};

export {
    trackAnalyticsEvent,
    ANALYTICS_EVENTS,
}
