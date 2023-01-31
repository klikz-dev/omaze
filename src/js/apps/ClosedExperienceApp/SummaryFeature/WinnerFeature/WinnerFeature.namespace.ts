import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'WinnerFeature';

export const WinnerFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const winnerFeatureNamespace: Namespace = new Namespace(WinnerFeatureConfig);

