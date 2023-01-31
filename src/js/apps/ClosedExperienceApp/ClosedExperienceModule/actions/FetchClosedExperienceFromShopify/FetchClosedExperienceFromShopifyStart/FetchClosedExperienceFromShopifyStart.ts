import { IActionComparator, INamespaceActionCreator } from '@omaze/redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import {
    createClosedExperienceActionComparator,
    createClosedExperienceActionCreatorFactory,
} from '../../../ClosedExperience.factories';

export const createFetchClosedExperienceFromShopifyStartAction: INamespaceActionCreator = createClosedExperienceActionCreatorFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_START,
);

export const isFetchClosedExperienceFromShopifyStartAction: IActionComparator = createClosedExperienceActionComparator(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_START,
);
