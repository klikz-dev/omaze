import { IActionComparator, INamespaceActionCreator, IReducer } from '@omaze/redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import {
    createClosedExperienceActionComparator,
    createClosedExperienceActionCreatorFactory,
    createClosedExperienceReducerFactory,
} from '../../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../../ClosedExperience.state';

export const createFetchClosedExperienceFromCosmicStartAction: INamespaceActionCreator = createClosedExperienceActionCreatorFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START,
);

export const fetchClosedExperienceFromCosmicStartReducer: IReducer<IClosedExperienceState> = createClosedExperienceReducerFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START,
    (state: IClosedExperienceState): void => {
        state.isFetchingCosmic = true;
    }
);

export const isFetchClosedExperienceFromCosmicStartAction: IActionComparator = createClosedExperienceActionComparator(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_START
);
