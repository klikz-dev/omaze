import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { IWinnerContent, selectWinnerContent } from './selectWinnerContent';

describe('selectWinnerContent', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectWinnerContent', (): void => {
        const {
            winnerName,
            winnerLocation,
            projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate,
        }: IWinnerContent = select(selectWinnerContent);

        expect(winnerName).toBe('');
        expect(winnerLocation).toBe('');
        expect(isNaN(projectedWinnerAnnounceDate.getDate())).toBe(true);
        expect(confirmedWinnerAnnounceDate).not.toBeDefined();
    });
});
