window.SDG = window.SDG || {};
SDG.Utility = SDG.Utility || {};

SDG.Utility.Uri = {
    parseUri (uri) {
        try {
            const parsedUri = new URL(uri);

            return parsedUri;
        }

        catch {
            return false;
        }
    },


    encode (uri) {
        const parsedUrl = this.parseUri(uri);

        if (!parsedUrl) {
            /* eslint-disable-next-line  no-console */
            console.error(`[SDG.Utility.Uri.encode]: cannot encode. Invlid URI: ${uri}`);

            return false;
        }

        const encodedHash =  parsedUrl.hash && encodeURIComponent(parsedUrl.hash);
        const encodedSearch = parsedUrl.search && encodeURIComponent(parsedUrl.search);

        const url = `${parsedUrl.origin}${parsedUrl.pathname}`;

        let encodedUrl = encodeURI(url);

        if (encodedHash) {
            encodedUrl = `${encodedUrl}${encodedHash}`;
        }

        if (encodedSearch) {
            encodedUrl = `${encodedUrl}${encodedSearch}`;
        }

        return encodedUrl;
    },
};

export default SDG.Utility.Uri;
