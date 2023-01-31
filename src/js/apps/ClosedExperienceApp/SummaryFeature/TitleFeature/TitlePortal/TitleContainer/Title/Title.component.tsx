import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { titleFeatureNamespace } from '../../../TitleFeature.namespace';

import { displayName } from './Title.qa';
import { ITitlePresenterClassNames, TitlePresenter } from './TitlePresenter/TitlePresenter';

export interface ITitleProps {
    experienceName: string;
    thankYouName: string;
}

export const Title: IFunctionComponent<ITitleProps> = titleFeatureNamespace.createComponent<ITitleProps>(
    displayName,
    (props: ITitleProps): ReactElement => {
        const { experienceName, thankYouName }: ITitleProps = props;
        const presenter: TitlePresenter = new TitlePresenter(experienceName, thankYouName);
        const classNames: ITitlePresenterClassNames = presenter.getAllClassNames();

        return (
            <div className={classNames.container}>
                <h1 className={classNames.thankYouTitle}>
                    {presenter.getThankYouTitle()}
                </h1>
                <p className={classNames.caption}>
                    {presenter.getCaption()}
                </p>
                <h2 className={classNames.experienceTitle}>
                    {presenter.getExperienceTitle()}
                </h2>
            </div>
        );
    }
);
