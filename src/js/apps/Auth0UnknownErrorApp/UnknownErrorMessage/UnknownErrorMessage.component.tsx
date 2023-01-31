import { IFunctionComponent } from '@omaze/app';
import { OzPage } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import { namespace } from '../Auth0UnknownErrorApp.namespace';

import { displayName } from './UnknownErrorMessage.qa';
import {
    IUnknownErrorMessagePresenterClassNames, IUnknownErrorMessagePresenterTextContent,
    UnknownErrorMessagePresenter,
} from './UnknownErrorMessagePresenter/UnknownErrorMessagePresenter';

export const UnknownErrorMessage: IFunctionComponent = namespace.createComponent(
    displayName,
    (): ReactElement => {
        const classNames: IUnknownErrorMessagePresenterClassNames = UnknownErrorMessagePresenter.getAllClassNames();
        const textContent: IUnknownErrorMessagePresenterTextContent = UnknownErrorMessagePresenter.getAllTextContent();

        return (
            <OzPage className={classNames.container}>
                <h1 className={classNames.title}>
                    <span>{textContent.title}</span>
                    <br />
                    {textContent.description}
                </h1>
                <p className={classNames.action}>{textContent.action}</p>
                <p className={classNames.support} dangerouslySetInnerHTML={{ __html: textContent.support }} />
            </OzPage>
        );
    }
);
