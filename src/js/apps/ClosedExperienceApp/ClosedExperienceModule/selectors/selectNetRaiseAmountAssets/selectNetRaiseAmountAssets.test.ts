import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { INetRaiseAmountAssets, selectNetRaiseAmountAssets } from './selectNetRaiseAmountAssets';

describe('selectNetRaiseAmountAssets', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectNetRaiseAmountAssets', (): void => {
        const {
            ovalBackgroundDesktop,
            ovalBackgroundMobile,
        }: INetRaiseAmountAssets = select(selectNetRaiseAmountAssets);

        expect(ovalBackgroundDesktop).toBe('');
        expect(ovalBackgroundMobile).toBe('');
    });
});
