import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export interface ITitleContent {
    experienceName: string;
    thankYouName: string;
}

export const selectTitleContent: ISelector<IClosedExperienceState, ITitleContent> =
    createClosedExperienceSelector((state: IClosedExperienceState): ITitleContent => {
        return {
            experienceName: state.experience.name,
            thankYouName: state.nonProfit.thankYouName,
        };
    });
