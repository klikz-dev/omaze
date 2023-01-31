import { IAppConfig, Namespace } from '@omaze/app';

export const APP_NAME: string = 'Auth0UnknownError';

export const Auth0UnknownErrorConfig: IAppConfig = {
    COMPONENT_PREFIX: APP_NAME,
    FEATURE_FLAG_PREFIX: APP_NAME,
};

export const namespace: Namespace = new Namespace(Auth0UnknownErrorConfig);
