import { IAppConfig, Namespace } from '@omaze/app';

export const APP_NAME: string = 'ClosedExperience';

export const ClosedExperienceConfig: IAppConfig = {
    COMPONENT_PREFIX: 'ClosedExperience',
    FEATURE_FLAG_PREFIX: 'ClosedExperience',
};

export const closedExperienceAppNamespace: Namespace = new Namespace(ClosedExperienceConfig);
