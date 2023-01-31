import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export interface IWinnerContent {
    winnerName: string;
    winnerLocation: string;
    projectedWinnerAnnounceDate: Date;
    confirmedWinnerAnnounceDate: Date | undefined;
}

export const selectWinnerContent: ISelector<IClosedExperienceState, IWinnerContent> =
    createClosedExperienceSelector((state: IClosedExperienceState): IWinnerContent => {
        return {
            winnerName: state.winner.name,
            winnerLocation: state.winner.location,
            projectedWinnerAnnounceDate: state.experience.projectedWinnerAnnounceDate,
            confirmedWinnerAnnounceDate: state.experience.confirmedWinnerAnnounceDate,
        };
    });
