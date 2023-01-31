import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export interface IThankYouMessageContent {
    message: string;
    imgixUrl: string;
}

export const selectThankYouMessageContent: ISelector<IClosedExperienceState, IThankYouMessageContent> =
    createClosedExperienceSelector((state: IClosedExperienceState): IThankYouMessageContent => {
        return {
            message: state.nonProfit.thankYouMessage,
            imgixUrl: state.nonProfit.logo.imgixUrl,
        };
    });
