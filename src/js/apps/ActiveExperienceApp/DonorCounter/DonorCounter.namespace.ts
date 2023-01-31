import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'DonorCounter';

export const NonProfitFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const donorCounterNamespace: Namespace = new Namespace(NonProfitFeatureConfig);
