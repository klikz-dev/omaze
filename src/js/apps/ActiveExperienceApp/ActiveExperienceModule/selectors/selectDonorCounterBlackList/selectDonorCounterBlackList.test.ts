import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';

import { getActiveExperienceModule } from '../../ActiveExperience.module';

import { selectDonorCounterBlackList } from './selectDonorCounterBlackList';

describe('selectDonorCounterBlackList', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        select = testFixture.select;
    });

    it('should be able to select DonorCounterBlackList', (): void => {
        const blacklist: string[] = select(selectDonorCounterBlackList);

        expect(blacklist).toEqual([]);
    });
});
