import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState, IImpactMedia } from '../../ClosedExperience.state';

export const selectImpactMedia: ISelector<IClosedExperienceState, IImpactMedia> =
    createClosedExperienceSelector((state: IClosedExperienceState): IImpactMedia => {
        return state.experience.impactMedia;
    });
