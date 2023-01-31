import { IStateTestFixture, createStateTestFixture, ISelect } from '@omaze/test';

import { getActiveExperienceModule } from '../../ActiveExperience.module';
import { IExperience } from '../../ActiveExperience.state';

import { selectExperience } from './selectExperience';

describe('selectExperience', (): void => {
    let select: ISelect;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(
            getActiveExperienceModule()
        );

        select = testFixture.select;
    });

    it('should be able to selectExperience', (): void => {
        const experience: IExperience = select(selectExperience);

        expect(experience.id).toBe(NaN);
        expect(experience.handle).toBe('');
        expect(experience.name).toBe('');
    });
});
