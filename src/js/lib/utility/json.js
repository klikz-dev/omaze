window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.Json = {
    parse (value, errorLabel = 'SDG.Utility.JSON') {
        try {
            return JSON.parse(value);
        } catch (e) {
            /* eslint-disable-next-line  no-console */
            console.error(`[${errorLabel}] could not parse JSON from value: ${value}`);
        }
    
        return false;
    },
};

export default SDG.Utility.Json;
