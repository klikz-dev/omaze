import { IAppConfig, Namespace } from '@omaze/app';

export const APP_NAME: string = 'Winners';

export const WinnersConfig: IAppConfig = {
    COMPONENT_PREFIX: APP_NAME,
    FEATURE_FLAG_PREFIX: APP_NAME,
};

export const namespace: Namespace = new Namespace(WinnersConfig);
