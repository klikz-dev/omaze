import optin from './optin';
import teaser from './teaser/teaser';

window.SDG = window.SDG || {};

SDG.Marketing = {
    loadOptinForm() {
        optin.init()
    },

    loadTeaser(config) {
        teaser.init(config);
    },
}

export default SDG.Marketing;
