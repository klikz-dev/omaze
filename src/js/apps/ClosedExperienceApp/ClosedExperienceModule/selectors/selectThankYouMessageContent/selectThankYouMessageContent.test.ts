import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';

import { getClosedExperienceModule } from '../../ClosedExperience.module';

import { IThankYouMessageContent, selectThankYouMessageContent } from './selectThankYouMessageContent';

describe('selectThankYouMessageContent', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        select = testFixture.select;
    });

    it('should be able to select selectThankYouMessageContent', (): void => {
        const {
            message,
            imgixUrl,
        }: IThankYouMessageContent = select(selectThankYouMessageContent);

        expect(message).toBe('');
        expect(imgixUrl).toBe('');
    });
});
