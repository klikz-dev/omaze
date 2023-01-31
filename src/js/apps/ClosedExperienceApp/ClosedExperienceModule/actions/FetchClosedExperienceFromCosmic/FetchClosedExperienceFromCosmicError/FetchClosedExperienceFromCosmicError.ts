import { INamespaceActionCreator, IReducer } from '@omaze/redux';
import { AnyAction } from 'redux';

import { CLOSED_EXPERIENCE_ACTION } from '../../../ClosedExperience.actions';
import {
    createClosedExperienceActionCreatorFactory,
    createClosedExperienceReducerFactory,
} from '../../../ClosedExperience.factories';
import { IClosedExperienceState } from '../../../ClosedExperience.state';

export const createFetchClosedExperienceFromCosmicErrorAction: INamespaceActionCreator = createClosedExperienceActionCreatorFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_ERROR,
    (payload: string): string => {
        return payload;
    },
);

export const fetchClosedExperienceFromCosmicErrorReducer: IReducer<IClosedExperienceState> = createClosedExperienceReducerFactory(
    CLOSED_EXPERIENCE_ACTION.FETCH_CLOSED_EXPERIENCE_FROM_COSMIC_ERROR,
    (state: IClosedExperienceState, action: AnyAction): void => {
        state.isFetchingCosmic = false;
        state.fetchingCosmicError = action.payload;
    }
);
