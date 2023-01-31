import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'ImpactMediaAssets';

export const impactMediaAssetsFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const impactMediaAssetsFeatureNamespace: Namespace = new Namespace(impactMediaAssetsFeatureConfig);

