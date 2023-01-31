import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'ImpactMediaAssets';

export const IMPACT_MEDIA_ASSETS_QA: IQAMap = {
    CONTAINER: createElementId(displayName, 'ImpactMediaAssets'),
    FIRST_MEDIA_ASSET: createElementId(displayName, 'FirstMediaAsset'),
    FIRST_MEDIA_VIDEO: createElementId(displayName, 'FirstMediaVideo'),
    FIRST_MEDIA_IMAGE: createElementId(displayName, 'FirstMediaImage'),
    SECOND_MEDIA_ASSET: createElementId(displayName, 'SecondMediaAsset'),
    SECOND_MEDIA_VIDEO: createElementId(displayName, 'SecondMediaVideo'),
    SECOND_MEDIA_IMAGE: createElementId(displayName, 'SecondMediaImage'),
};
