import { IActionMap } from '@omaze/redux';

import { createClosedExperienceActionType } from './ClosedExperience.factories';

interface IClosedExperienceAction extends IActionMap {
    FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START: string;
    FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_SUCCESS: string;
    FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_ERROR: string;
    FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_START: string;
    FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_SUCCESS: string;
}

export const CLOSED_EXPERIENCE_ACTION: IClosedExperienceAction = {
    FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START: createClosedExperienceActionType('fetch', 'closedexperiencefromcosmic', 'start'),
    FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_SUCCESS: createClosedExperienceActionType('fetch', 'closedexperiencefromcosmic', 'success'),
    FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_ERROR: createClosedExperienceActionType('fetch', 'closedexperiencefromcosmic', 'error'),
    FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_START: createClosedExperienceActionType('fetch', 'closedexperiencefromshopify', 'start'),
    FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_SUCCESS: createClosedExperienceActionType('fetch', 'closedexperiencefromshopify', 'success'),
};
