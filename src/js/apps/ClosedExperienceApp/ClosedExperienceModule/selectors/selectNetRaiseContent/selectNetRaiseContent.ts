import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export interface INetRaiseContent {
    messageName: string;
    amount: string;
}

export const selectNetRaiseContent: ISelector<IClosedExperienceState, INetRaiseContent> =
    createClosedExperienceSelector((state: IClosedExperienceState): INetRaiseContent => {
        return {
            messageName: state.nonProfit.messageName,
            amount: state.nonProfit.netRaiseAmount,
        };
    });
