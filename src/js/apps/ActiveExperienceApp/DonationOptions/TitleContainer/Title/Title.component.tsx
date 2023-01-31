import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from '../../../ActiveExperienceApp.namespace';

import { displayName } from './Title.qa';
import { ITitlePresenterClassNames, TitlePresenter } from './TitlePresenter/TitlePresenter';

export interface ITitleProps {
    className?: string;
    'data-testid'?: string;
    nonProfitName: string;
}

export const Title: IFunctionComponent<ITitleProps> = namespace.createComponent<ITitleProps>(
    displayName,
    (props: ITitleProps): ReactElement => {
        const {
            nonProfitName,
            className,
            'data-testid': dataTestId,
        }: ITitleProps = props;

        const presenter: TitlePresenter = new TitlePresenter({
            className: className,
            dataTestId: dataTestId,
            nonProfitName: nonProfitName,
        });

        const classNames: ITitlePresenterClassNames = presenter.getAllClassNames();

        return (
            <div data-testid={presenter.getTestId()} className={classNames.host}>
                <h2>
                    {presenter.getTitleCopy()}
                </h2>
            </div>
        );
    }
);
