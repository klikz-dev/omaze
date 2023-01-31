import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';
import { Dispatch } from 'redux';

import { createTransformedCosmicMock } from '../../../shared/tests/CosmicMock';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../ClosedExperience.module';
import { ITransformedCosmic } from '../../sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

import { selectPrizeDetails } from './selectPrizeDetails';

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe('selectPrizeDetails', (): void => {
    let select: ISelect;
    let dispatch: Dispatch;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        dispatch = testFixture.dispatch;
        select = testFixture.select;
    });

    it('should select the prize details from the store', (): void => {
        let prizeDetails: string = select(selectPrizeDetails);

        expect(prizeDetails).toBe('');

        dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        prizeDetails = select(selectPrizeDetails);

        expect(prizeDetails).toBe(transformedCosmicMock.experience.prizeDetails);
    });
});
