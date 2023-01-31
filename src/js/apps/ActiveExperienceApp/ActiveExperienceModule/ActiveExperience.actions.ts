import { IActionMap } from '@omaze/redux';

import { createActiveExperienceActionType } from './ActiveExperience.factories';

interface IActiveExperienceAction extends IActionMap {
    FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_START: string;
    FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_SUCCESS: string;
    FETCH_GEOLOCATION_START: string;
    FETCH_GEOLOCATION_SUCCESS: string;
    FETCH_GEOLOCATION_ERROR: string;
}

export const ACTIVE_EXPERIENCE_ACTION: IActiveExperienceAction = {
    FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_START: createActiveExperienceActionType('fetch', 'activeexperiencefromshopify', 'start'),
    FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_SUCCESS: createActiveExperienceActionType('fetch', 'activeexperiencefromshopify', 'success'),
    FETCH_GEOLOCATION_START: createActiveExperienceActionType('fetch', 'geolocation', 'start'),
    FETCH_GEOLOCATION_SUCCESS: createActiveExperienceActionType('fetch', 'geolocation', 'success'),
    FETCH_GEOLOCATION_ERROR: createActiveExperienceActionType('fetch', 'geolocation', 'error'),
};
