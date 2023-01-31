import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'SummaryFeature';

export const SummaryFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const summaryFeatureNamespace: Namespace = new Namespace(SummaryFeatureConfig);
