import templateOptions from './modules/template-options';

window.SDG = window.SDG || {};

SDG.ContextualEmailCapture = {
    /**
     *
     * @param {object} config
     * @param {string} [config.target=] - target page
     * @param {array} [config.tags=] - product tags
     */
    load(config) {
        templateOptions.init(config);
    },
};

export default SDG.ContextualEmailCapture;
