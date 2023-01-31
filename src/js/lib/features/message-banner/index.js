SDG.MessageBanner = SDG.MessageBanner || {};

SDG.MessageBanner.FEATURE_NAME = 'message-banner';

SDG.MessageBanner.init = function (options) {
    options = options || {};

    if (options.metadata) {
        options = options.metadata;
    }

    const {
        content,
        type: bannerType,
        placement_type: placementType,
        placement_selector: placementSelector,
    } = options;


    if (!content || !placementType || !placementSelector) {
        /* eslint-disable-next-line  no-console */
        console.error(`[SDG.MessageBanner.init]: cannot run feature. Invalid options: ${JSON.stringify(options)}`);

        onFeatureFail();

        return false;
    }

    function run () {
        const component = new SDG.Component.MessageBanner({
            content: content,
            type: bannerType,
        });

        if (!component || !component.el) {
            return false;
        }

        SDG.Utility.HtmlElement.placeElement(component.el, placementSelector, placementType);

    }

    function onFeatureFail () {
        return SDG.Features.Validation.invalidateFeature(SDG.MessageBanner.FEATURE_NAME);
    }

    return run();
};
