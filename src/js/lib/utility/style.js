window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.Style = {
    getComputedStyle (element, styleName) {
        if (!element || !styleName) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Utility.Style.getComputedStyle]: missing styleName or element. [styleName: ${styleName}]`);

            return false;
        }

        return (window.getComputedStyle(element, null) || {})[styleName];
    },
};

export default SDG.Utility.Style;
