import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { INetRaiseContent, selectNetRaiseContent } from './selectNetRaiseContent';

describe('selectNetRaiseContent', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectNetRaiseContent', (): void => {
        const {
            messageName,
            amount,
        }: INetRaiseContent = select(selectNetRaiseContent);

        expect(messageName).toBe('');
        expect(amount).toBe('');
    });
});
