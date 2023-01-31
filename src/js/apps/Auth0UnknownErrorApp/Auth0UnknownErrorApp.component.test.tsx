import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';

import { Auth0UnknownErrorApp } from './Auth0UnknownErrorApp.component';
import { UnknownErrorMessage } from './UnknownErrorMessage/UnknownErrorMessage.component';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./UnknownErrorMessage/UnknownErrorMessage.component');

describe(Auth0UnknownErrorApp.displayName, (): void => {
    it('app was created', (): void => {
        expect(Auth0UnknownErrorApp.displayName).toContain('Auth0UnknownErrorApp');
        expect(Auth0UnknownErrorApp.app).toBe('Auth0UnknownError');
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <Auth0UnknownErrorApp />
        );

        expect(component.getByText(UnknownErrorMessage.displayName)).toBeInTheDocument();
    });
});
