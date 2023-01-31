window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.Tags = {
    getTagByRegex (tags, regex) {
        if (!Array.isArray(tags)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[Tags.getTagByRegex] tags must be array type: ', tags);

            return false;
        }

        if (!(regex instanceof RegExp)) {
            /* eslint-disable-next-line  no-console */
            console.warn('[Tags.getTagByRegex] regex not instanceof RegExp: ', regex);

            return false;
        }

        return tags.find((tag) => {
            if (regex.test(tag)) {
                return tag;
            }
        });
    },
};

export default SDG.Utility.Tags;
