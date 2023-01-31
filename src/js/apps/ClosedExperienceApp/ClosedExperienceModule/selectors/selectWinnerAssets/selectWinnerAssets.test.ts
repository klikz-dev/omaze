import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { IWinnerAssets, selectWinnerAssets } from './selectWinnerAssets';

describe('selectWinnerAssets', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectWinnerAssets', (): void => {
        const {
            winnerImage,
            winnerBackgroundImage,
            winnerPendingBackgroundImage,
        }: IWinnerAssets = select(selectWinnerAssets);

        expect(winnerImage).toBe('');
        expect(winnerBackgroundImage).toBe('');
        expect(winnerPendingBackgroundImage).toBe('');
    });
});
