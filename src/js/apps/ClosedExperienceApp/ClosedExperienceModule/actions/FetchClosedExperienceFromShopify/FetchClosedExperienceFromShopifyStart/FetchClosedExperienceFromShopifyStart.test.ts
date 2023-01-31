import { AnyAction } from 'redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import { CLOSED_EXPERIENCE_NAMESPACE } from '../../../ClosedExperience.factories';

import { createFetchClosedExperienceFromShopifyStartAction } from './FetchClosedExperienceFromShopifyStart';

describe(CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_START, (): void => {
    describe('createFetchClosedExperienceFromShopifyStartAction', (): void => {
        it('should be able to create createFetchClosedExperienceFromShopifyStartAction', (): void => {
            const action: AnyAction = createFetchClosedExperienceFromShopifyStartAction();

            expect(action).toEqual({
                namespace: CLOSED_EXPERIENCE_NAMESPACE,
                type: CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_SHOPIFY_START,
                payload: null,
            });
        });
    });
});
