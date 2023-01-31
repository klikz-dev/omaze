import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';

import { getActiveExperienceModule } from '../../ActiveExperience.module';
import { INonProfit } from '../../ActiveExperience.state';

import { selectNonProfit } from './selectNonProfit';

describe('selectFameHostname', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        select = testFixture.select;
    });

    it('should be able to select NonProfit', (): void => {
        const nonProfit: INonProfit = select(selectNonProfit);

        expect(nonProfit.name).toBe('');
    });
});
