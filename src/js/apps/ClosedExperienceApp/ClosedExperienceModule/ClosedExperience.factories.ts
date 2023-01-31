import {
    createActionComparatorFactory,
    createActionTypeFactory,
    createNamespaceActionCreatorFactory,
    createNamespaceReducerFactory,
    createNamespaceSelectorFactory,
    IActionComparatorFactory,
    IActionReducerFactory,
    IActionTypeFactory,
    INamespaceActionCreatorFactory,
    ISelectorFactory,
} from '@omaze/redux';

import { IClosedExperienceState } from './ClosedExperience.state';

export const CLOSED_EXPERIENCE_NAMESPACE: string = 'closed-experience';

export const createClosedExperienceActionType: IActionTypeFactory = createActionTypeFactory(CLOSED_EXPERIENCE_NAMESPACE);

export const createClosedExperienceActionCreatorFactory: INamespaceActionCreatorFactory = createNamespaceActionCreatorFactory(CLOSED_EXPERIENCE_NAMESPACE);

export const createClosedExperienceReducerFactory: IActionReducerFactory<IClosedExperienceState> = createNamespaceReducerFactory<IClosedExperienceState>(CLOSED_EXPERIENCE_NAMESPACE);

export const createClosedExperienceSelector: ISelectorFactory<IClosedExperienceState> = createNamespaceSelectorFactory<IClosedExperienceState>(CLOSED_EXPERIENCE_NAMESPACE);

export const createClosedExperienceActionComparator: IActionComparatorFactory =
    createActionComparatorFactory(CLOSED_EXPERIENCE_NAMESPACE);
