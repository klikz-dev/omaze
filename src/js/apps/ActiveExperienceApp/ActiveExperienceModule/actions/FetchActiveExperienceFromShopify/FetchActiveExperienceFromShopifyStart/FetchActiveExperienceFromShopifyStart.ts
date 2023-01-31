import { IActionComparator, INamespaceActionCreator } from '@omaze/redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import {
    createActiveExperienceActionComparator,
    createActiveExperienceActionCreatorFactory,
} from '../../../ActiveExperience.factories';

export const createFetchActiveExperienceFromShopifyStartAction: INamespaceActionCreator = createActiveExperienceActionCreatorFactory(
    ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_START,
);

export const isFetchActiveExperienceFromShopifyStartAction: IActionComparator = createActiveExperienceActionComparator(
    ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_START,
);
