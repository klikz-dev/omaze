import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import {
    ITitleContent,
    selectTitleContent,
} from '../../../../ClosedExperienceModule/selectors/selectTitleContent/selectTitleContent';
import { titleFeatureNamespace } from '../../TitleFeature.namespace';

import { Title } from './Title/Title.component';
import { displayName } from './TitleContainer.qa';

export const TitleContainer: IFunctionComponent = titleFeatureNamespace.createComponent(displayName, (): ReactElement => {
    const {
        experienceName,
        thankYouName,
    }: ITitleContent = useNamespaceSelector(selectTitleContent);

    return (
        <Title experienceName={experienceName} thankYouName={thankYouName} />
    );
});
