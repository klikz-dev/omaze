import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IAdditionalWinner, IClosedExperienceState } from '../../ClosedExperience.state';

export const selectAdditionalWinners: ISelector<IClosedExperienceState, IAdditionalWinner[]> =
    createClosedExperienceSelector((state: IClosedExperienceState): IAdditionalWinner[] => {
        return state.experience.additionalWinners;
    });
