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

import { IActiveExperienceState } from './ActiveExperience.state';

export const ACTIVE_EXPERIENCE_NAMESPACE: string = 'active-experience';

export const createActiveExperienceActionType: IActionTypeFactory = createActionTypeFactory(ACTIVE_EXPERIENCE_NAMESPACE);

export const createActiveExperienceActionCreatorFactory: INamespaceActionCreatorFactory = createNamespaceActionCreatorFactory(ACTIVE_EXPERIENCE_NAMESPACE);

export const createActiveExperienceReducerFactory: IActionReducerFactory<IActiveExperienceState> = createNamespaceReducerFactory<IActiveExperienceState>(ACTIVE_EXPERIENCE_NAMESPACE);

export const createActiveExperienceSelector: ISelectorFactory<IActiveExperienceState> = createNamespaceSelectorFactory<IActiveExperienceState>(ACTIVE_EXPERIENCE_NAMESPACE);

export const createActiveExperienceActionComparator: IActionComparatorFactory =
    createActionComparatorFactory(ACTIVE_EXPERIENCE_NAMESPACE);
