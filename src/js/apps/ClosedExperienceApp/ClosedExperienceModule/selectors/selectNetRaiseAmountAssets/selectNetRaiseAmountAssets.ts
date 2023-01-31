import { ISelector } from '@omaze/redux';

import { createClosedExperienceSelector } from '../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../ClosedExperience.state';

export interface INetRaiseAmountAssets {
    ovalBackgroundDesktop: string;
    ovalBackgroundMobile: string;
}

export const selectNetRaiseAmountAssets: ISelector<IClosedExperienceState, INetRaiseAmountAssets> =
    createClosedExperienceSelector((state: IClosedExperienceState): INetRaiseAmountAssets => {
        return {
            ovalBackgroundDesktop: state.assets.ovalBackgroundDesktop,
            ovalBackgroundMobile: state.assets.ovalBackgroundMobile,
        };
    });
