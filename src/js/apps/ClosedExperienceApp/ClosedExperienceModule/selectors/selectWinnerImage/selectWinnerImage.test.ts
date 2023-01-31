import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { selectWinnerImage } from './selectWinnerImage';

describe('selectWinnerImage', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select the selectWinnerImage', (): void => {
        const winnerImage: string = select(selectWinnerImage);

        expect(winnerImage).toBe('');
    });
});
