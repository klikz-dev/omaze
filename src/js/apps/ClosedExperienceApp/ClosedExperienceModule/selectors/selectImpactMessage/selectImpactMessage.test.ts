import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { selectImpactMessage } from './selectImpactMessage';

describe('selectImpactMessage', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectImpactMessage', (): void => {
        const impactMessage: string = select(selectImpactMessage);

        expect(impactMessage).toBe('');
    });
});
