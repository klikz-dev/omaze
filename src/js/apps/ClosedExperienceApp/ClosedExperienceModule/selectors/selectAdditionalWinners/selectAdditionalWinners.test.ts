import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';
import { Dispatch } from 'redux';

import { createTransformedCosmicMock } from '../../../shared/tests/CosmicMock';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../ClosedExperience.module';
import { IAdditionalWinner } from '../../ClosedExperience.state';
import { ITransformedCosmic } from '../../sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

import { selectAdditionalWinners } from './selectAdditionalWinners';

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe('selectAdditionalWinners', (): void => {
    let select: ISelect;
    let dispatch: Dispatch;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        dispatch = testFixture.dispatch;
        select = testFixture.select;
    });

    it('should be able to select selectAdditionalWinners', (): void => {
        const additionalWinners: IAdditionalWinner[] = select(selectAdditionalWinners);

        expect(additionalWinners.length).toBe(0);
    });

    it('should be able to select selectAdditionalWinners after updating the state', (): void => {
        dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        const additionalWinners: IAdditionalWinner[] = select(selectAdditionalWinners);

        expect(additionalWinners[0]).toEqual(transformedCosmicMock.experience.additionalWinners[0]);
        expect(additionalWinners[1]).toEqual(transformedCosmicMock.experience.additionalWinners[1]);
    });
});
