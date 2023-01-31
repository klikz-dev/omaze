import {SilentError} from '../../lib/errors/silent-error';

const HOST_URL = 'https://api.cosmicjs.com/';

export function cosmicURL (rawSlug, env, preview) {
    const slug = trimSlug(rawSlug);

    if (!slug || !env) {
        /* eslint-disable-next-line  no-console */
        console.error(`[cosmicjs.api.cosmicURL]: invalid data with slug: [${rawSlug}], env: [${env}]`);

        return false;
    }

    let urlOptions = 'hide_metafields=true';
    let bucket = 'omaze';

    if (env !== 'production') {
        bucket = `${bucket}-staging`;
        urlOptions = `${urlOptions}&pretty=true`;
    }

    if (preview) {
        urlOptions = `${urlOptions}&status=all`;
    }

    const urlPath = `v1/${bucket}/object/${slug}`;

    return `${HOST_URL}${urlPath}?${urlOptions}`;
}

export function cosmicFetchBySlug (slug, env, preview) {
    if (!slug || !env) {
        return Promise.reject(new Error(`invalid inputs: slug [${slug}], env [${env}]`));
    }

    const sourceUrl = cosmicURL(slug, env, preview);

    return fetch(sourceUrl)
        .then((response) => {
            if (response && response.status === 404) {
                return Promise.reject(new SilentError());
            }

            if (!response || !response.ok) {
                return Promise.reject(
                    new Error(`failed to fetch data for slug: [${slug}], env: [${env}]`)
                );
            }

            return response.json();
        })
        .then((response) => {
            return response.object && response.object.metadata;
        });
}

export function trimSlug (slug) {
    if (typeof(slug) !== 'string') {
        return false;
    }

    return slug
        .trim()
        .toLowerCase()
        .split('?')[0];
}
