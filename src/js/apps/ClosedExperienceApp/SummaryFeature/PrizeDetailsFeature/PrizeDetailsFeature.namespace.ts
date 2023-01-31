import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'PrizeDetails';

export const prizeDetailsFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const prizeDetailsFeatureNamespace: Namespace = new Namespace(prizeDetailsFeatureConfig);

