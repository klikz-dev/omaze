import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';

import { getActiveExperienceModule } from '../../ActiveExperience.module';

import { selectFameHostname } from './selectFameHostname';

describe('selectFameHostname', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        select = testFixture.select;
    });

    it('should be able to select FameHostname', (): void => {
        const hostName: string = select(selectFameHostname);

        expect(hostName).toBe('');
    });
});
