import { IAppConfig, Namespace } from '@omaze/app';

export const APP_NAME: string = 'ActiveExperience';

export const ActiveExperienceConfig: IAppConfig = {
    COMPONENT_PREFIX: 'ActiveExperience',
    FEATURE_FLAG_PREFIX: 'ActiveExperience',
};

export const namespace: Namespace = new Namespace(ActiveExperienceConfig);
