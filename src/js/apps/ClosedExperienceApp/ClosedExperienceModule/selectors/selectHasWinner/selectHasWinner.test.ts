import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { selectHasWinner } from './selectHasWinner';

describe('selectHasWinner', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectHasWinner', (): void => {
        const hasWinner: string = select(selectHasWinner);

        expect(hasWinner).toBe(false);
    });
});
