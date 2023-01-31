import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import '@testing-library/jest-dom/extend-expect';

import { APP_NAME } from '../Auth0UnknownErrorApp.namespace';

import { UnknownErrorMessage } from './UnknownErrorMessage.component';
import { UnknownErrorMessagePresenter } from './UnknownErrorMessagePresenter/UnknownErrorMessagePresenter';

jest.mock('./UnknownErrorMessagePresenter/UnknownErrorMessagePresenter');

describe(UnknownErrorMessage.displayName, (): void => {
    it('should have been created by the app', (): void => {
        expect(UnknownErrorMessage.displayName).toContain('UnknownErrorMessage');
        expect(UnknownErrorMessage.app).toBe(APP_NAME);
    });

    let component: RenderResult;

    beforeEach((): void => {
        mocked(UnknownErrorMessagePresenter).mockClear();
        mocked(UnknownErrorMessagePresenter.getAllClassNames).mockReturnValue({
            container: 'container',
            title: 'title',
            action: 'action',
            support: 'support',
        });
        mocked(UnknownErrorMessagePresenter.getAllTextContent).mockReturnValue({
            title: 'title',
            description: 'description',
            action: 'action',
            support: 'support',
        });

        const testComponent: ITestComponent = bootstrapAndRender(
            <UnknownErrorMessage />
        );

        component = testComponent.component;
    });

    it('should have the correct classNames', (): void => {
        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.title')).toBeInTheDocument();
        expect(component.container.querySelector('.action')).toBeInTheDocument();
        expect(component.container.querySelector('.support')).toBeInTheDocument();
    });

    it('should have the correct text content', (): void => {
        expect(component.getByText('title')).toBeInTheDocument();
        expect(component.getByText('description')).toBeInTheDocument();
        expect(component.getByText('action')).toBeInTheDocument();
        expect(component.getByText('support')).toBeInTheDocument();
    });
});
