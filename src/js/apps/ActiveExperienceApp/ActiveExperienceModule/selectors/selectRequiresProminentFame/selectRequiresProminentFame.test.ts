import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';
import { Dispatch } from 'redux';

import { createTransformedGeolocationMock } from '../../../shared/tests/GeolocationMock';
import { createFetchGeolocationSuccessAction } from '../../actions/FetchGeolocation/FetchGeolocationSuccess/FetchGeolocationSuccess';
import { getActiveExperienceModule } from '../../ActiveExperience.module';
import { ITransformedGeolocation } from '../../sagas/FetchGeolocation/GeolocationTransformer/GeolocationTransformer';

import { selectRequiresProminentFame } from './selectRequiresProminentFame';

describe('selectRequiresProminentFame', (): void => {
    let select: ISelect;
    let dispatch: Dispatch;
    let transformedGeolocationMock: ITransformedGeolocation;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        dispatch = testFixture.dispatch;
        select = testFixture.select;
        transformedGeolocationMock = createTransformedGeolocationMock();
    });

    it('should be able to select selectRequiresProminentFame when true', (): void => {
        transformedGeolocationMock.regionCode = 'CA';
        transformedGeolocationMock.countryCode = 'US';

        dispatch(createFetchGeolocationSuccessAction(transformedGeolocationMock));

        const isCalifornia: string = select(selectRequiresProminentFame);

        expect(isCalifornia).toBe(true);
    });

    it('should be able to select selectRequiresProminentFame when false', (): void => {
        transformedGeolocationMock.regionCode = 'NY';

        dispatch(createFetchGeolocationSuccessAction(transformedGeolocationMock));

        const isCalifornia: string = select(selectRequiresProminentFame);

        expect(isCalifornia).toBe(false);
    });
});
