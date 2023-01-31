import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';
import { Dispatch } from 'redux';

import { createFetchClosedExperienceFromCosmicErrorAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicError/FetchClosedExperienceFromCosmicError';
import { createFetchClosedExperienceFromCosmicStartAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';
import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { selectShouldRenderNonProfit } from './selectShouldRenderNonProfit';

jest.mock('../../sagas/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmic.saga');

describe('selectShouldRenderNonProfit', (): void => {
    let select: ISelect;
    let dispatch: Dispatch;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        dispatch = testFixture.dispatch;
        select = testFixture.select;
    });

    it('should be able to select selectShouldRenderNonProfit when we are not fetching from cosmic and no errors ', (): void => {
        const shouldRenderNonProfit: boolean = select(selectShouldRenderNonProfit);

        expect(shouldRenderNonProfit).toBe(true);
    });

    it('should be able to select selectShouldRenderNonProfit when fetching from cosmic', (): void => {
        dispatch(createFetchClosedExperienceFromCosmicStartAction());

        const shouldRenderNonProfit: boolean = select(selectShouldRenderNonProfit);

        expect(shouldRenderNonProfit).toBe(false);
    });

    it('should be able to select selectShouldRenderNonProfit when there in an error from cosmic', (): void => {
        dispatch(createFetchClosedExperienceFromCosmicErrorAction('Error Message'));

        const shouldRenderNonProfit: boolean = select(selectShouldRenderNonProfit);

        expect(shouldRenderNonProfit).toBe(false);
    });

    it('should be able to select selectShouldRenderNonProfit when fetching from cosmic and there is a cosmic error', (): void => {
        dispatch(createFetchClosedExperienceFromCosmicStartAction());
        dispatch(createFetchClosedExperienceFromCosmicErrorAction('Error Message'));

        const shouldRenderNonProfit: boolean = select(selectShouldRenderNonProfit);

        expect(shouldRenderNonProfit).toBe(false);
    });
});
