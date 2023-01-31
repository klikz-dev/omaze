import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';

import { getActiveExperienceModule } from '../../ActiveExperience.module';

import { selectDonorCounterMinDonors } from './selectDonorCounterMinDonors';

describe('selectDonorCounterMinDonors', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        select = testFixture.select;
    });

    it('should be able to select DonorCounterBlackList', (): void => {
        const minDonors: number = select(selectDonorCounterMinDonors);

        expect(minDonors).toBe(0);
    });
});
