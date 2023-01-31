import { AnyAction } from 'redux';

import { ACTIVE_EXPERIENCE_ACTION } from '../../../ActiveExperience.actions';
import { ACTIVE_EXPERIENCE_NAMESPACE } from '../../../ActiveExperience.factories';

import { createFetchActiveExperienceFromShopifyStartAction } from './FetchActiveExperienceFromShopifyStart';

describe(ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_START, (): void => {
    describe('createFetchActiveExperienceFromShopifyStartAction', (): void => {
        it('should create action', (): void => {
            const action: AnyAction = createFetchActiveExperienceFromShopifyStartAction();

            expect(action).toEqual({
                namespace: ACTIVE_EXPERIENCE_NAMESPACE,
                type: ACTIVE_EXPERIENCE_ACTION.FETCH_ACTIVE_EXPERIENCE_FROM_SHOPIFY_START,
                payload: null,
            });
        });
    });
});
