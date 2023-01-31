window.matchMedia = window.matchMedia || function () {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {},
    };
};

window.ozAppConfig = window.ozAppConfig || {};

// Jest does not include IntersectionObserver, so we need to create our own
window.IntersectionObserver = class {
    constructor (callback, config) {
        this.root = config?.root || null;
        this.rootMargin = config?.rootMargin || '0px';
        this.thresholds = [0];

        this.callback = callback;
    }

    disconnect = jest.fn();
    observe = jest.fn();
    takeRecords = jest.fn();
    unobserve = jest.fn();
};
