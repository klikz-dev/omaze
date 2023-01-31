import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export const selectHasWinner: ISelector<IClosedExperienceState, boolean> =
    createClosedExperienceSelector((state: IClosedExperienceState): boolean => {
        return state.experience.hasWinner;
    });
