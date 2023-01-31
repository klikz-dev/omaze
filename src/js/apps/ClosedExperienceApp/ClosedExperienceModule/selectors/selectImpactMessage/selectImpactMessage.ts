import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export const selectImpactMessage: ISelector<IClosedExperienceState, string> =
    createClosedExperienceSelector((state: IClosedExperienceState): string => {
        return state.nonProfit.impactMessage;
    });
