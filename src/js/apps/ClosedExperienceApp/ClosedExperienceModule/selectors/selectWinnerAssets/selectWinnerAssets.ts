import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export interface IWinnerAssets {
    winnerImage: string;
    winnerBackgroundImage: string;
    winnerPendingBackgroundImage: string;
}

export const selectWinnerAssets: ISelector<IClosedExperienceState, IWinnerAssets> =
    createClosedExperienceSelector((state: IClosedExperienceState): IWinnerAssets => {
        return {
            winnerImage: state.winner.image,
            winnerBackgroundImage: state.assets.winnerBackgroundImage,
            winnerPendingBackgroundImage: state.assets.winnerPendingBackgroundImage,
        };
    });
