window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.String = {
    capitalize (input) {
        input = input || '';

        const string = String(input);

        return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    },
};

export default SDG.Utility.String;
