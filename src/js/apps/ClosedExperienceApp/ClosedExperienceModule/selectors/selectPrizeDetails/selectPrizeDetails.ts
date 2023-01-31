import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export const selectPrizeDetails: ISelector<IClosedExperienceState, string> =
    createClosedExperienceSelector((state: IClosedExperienceState): string => {
        return state.experience.prizeDetails;
    });
