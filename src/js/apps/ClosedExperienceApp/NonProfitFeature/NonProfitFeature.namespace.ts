import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'NonProfitFeature';

export const NonProfitFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const nonProfitFeatureNamespace: Namespace = new Namespace(NonProfitFeatureConfig);

