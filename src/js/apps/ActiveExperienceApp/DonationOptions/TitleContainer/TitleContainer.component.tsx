import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { namespace } from '../../ActiveExperienceApp.namespace';
import { INonProfit } from '../../ActiveExperienceModule/ActiveExperience.state';
import { selectNonProfit } from '../../ActiveExperienceModule/selectors/selectNonProfit/selectNonProfit';

import { Title } from './Title/Title.component';
import { displayName, TITLE_CONTAINER_QA } from './TitleContainer.qa';

export const TitleContainer: IFunctionComponent = namespace.createComponent(displayName, (): ReactElement => {
    const nonProfit: INonProfit = useNamespaceSelector(selectNonProfit);

    return (
        <Title nonProfitName={nonProfit.name} data-testid={TITLE_CONTAINER_QA.CONTAINER} />
    );
});
