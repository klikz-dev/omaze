import { IConfig } from '../shared/IConfig';

import { ICosmicMetadata } from './ICosmicMetadata';

interface ICosmicResponse {
    object: {
        metadata: {
            // eslint-disable-next-line camelcase
            closed_sweepstakes_feature: {
                metadata: ICosmicMetadata;
            };
        };
    };
}

export async function fetchClosedExperience (config: IConfig): Promise<void> {
    const { env, slug }: IConfig = config;

    function isValid (): boolean {
        if (!slug || !env) {
            /* eslint-disable-next-line  no-console */
            console.error(`[fetchClosedExperience.isValid]: invalid data with slug: [${slug}], env: [${env}]`);

            return false;
        }

        return true;
    }

    interface IParams {
        [preview: string]: string;
    }

    function getQueryParams (): IParams {
        if (!window.location.search) {
            return {};
        }

        return window.location.search.substr(1).split('&').reduce((params: IParams, param: string): IParams => {
            const keyVal: string[] = param.split('=');

            params[keyVal[0]] = keyVal[1];

            return params;
        }, {});
    }

    function getFeaturesSrcUrl (): string {
        const urlHost: string = 'https://api.cosmicjs.com/';
        let urlOptions: string = 'hide_metafields=true';
        let bucket: string = 'omaze';

        if (env !== 'production') {
            bucket = `${bucket}-staging`;
            urlOptions = `${urlOptions}&pretty=true`;
        }

        const params: IParams = getQueryParams();
        const preview: boolean = !!params.preview;

        if (preview) {
            urlOptions = urlOptions + '&status=all';
        }

        const urlPath: string = `v1/${bucket}/object/${slug}`;

        return `${urlHost}${urlPath}?${urlOptions}`;
    }

    if (!isValid()) {
        return;
    }

    const sourceUrl: string = getFeaturesSrcUrl();

    return fetch(sourceUrl)
        .then((response: Response): Promise<ICosmicResponse> => {
            if (!response || !response.ok) {
                return Promise.reject(
                    new Error(`[fetchClosedExperience]: failed to fetch data for: ${slug}, env: ${env}`)
                );
            }

            return response.json();
        })
        .then((response: ICosmicResponse): any => {
            return response.object?.metadata?.closed_sweepstakes_feature?.metadata as ICosmicMetadata | undefined;
        })
        .catch((error: any): void => {
            /* eslint-disable-next-line  no-console */
            console.error('[fetchClosedExperienced]: ', error);
        });
}
