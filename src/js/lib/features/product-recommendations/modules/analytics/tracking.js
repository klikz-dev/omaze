export const trackArrowClickEvent = function (currentSlide, nextSlide, numSlides) {
    const direction = determineArrowDirection(currentSlide, nextSlide, numSlides);

    if (!direction) {
        return;
    }

    const analyticsConf = {
        event: 'click',
        ga_category: 'Product Recs',
        ga_action: 'Carousel Click',
        ga_label: direction,
    };

    SDG.Analytics.events.pushDataLayerEvent(analyticsConf);
}

export const determineArrowDirection = function(currentSlide, nextSlide, numSlides) {
    if (currentSlide === nextSlide) {
        return;
    }

    const Direction = {
        right: 'Right',
        left: 'Left',
    }

    if (currentSlide === numSlides - 1 && nextSlide === 0) {
        return Direction.right;
    }

    if (currentSlide === 0 && nextSlide === numSlides - 1 ) {
        return Direction.left;
    }

    if (currentSlide < nextSlide) {
        return Direction.right;
    }

    return Direction.left;
}

export const trackProductClickEvent = function (product, index, element) {
    const data = {
        event: 'click',
        ga_category: 'Product Recs',
        ga_action: 'Product Tile',
        ga_label: product.handle,
        ga_value: index + 1,
    };

    SDG.Analytics.utils.trackAnalyticsEvent('click', element, data);
}
