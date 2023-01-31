import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { ITitleContent, selectTitleContent } from './selectTitleContent';

describe('selectTitleContent', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectTitleContent', (): void => {
        const {
            experienceName,
            thankYouName,
        }: ITitleContent = select(selectTitleContent);

        expect(experienceName).toBe('');
        expect(thankYouName).toBe('');
    });
});
