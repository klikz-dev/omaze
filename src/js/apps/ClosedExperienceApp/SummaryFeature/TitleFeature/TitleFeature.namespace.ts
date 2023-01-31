import { IAppConfig, Namespace } from '@omaze/app';

export const FEATURE_NAME: string = 'Title';

export const TitleFeatureConfig: IAppConfig = {
    COMPONENT_PREFIX: FEATURE_NAME,
    FEATURE_FLAG_PREFIX: FEATURE_NAME,
};

export const titleFeatureNamespace: Namespace = new Namespace(TitleFeatureConfig);

