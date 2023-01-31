import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import { WinnerFeature } from './WinnerFeature.component';
import { WinnerPortal } from './WinnerPortal/WinnerPortal.component';

jest.mock('./WinnerPortal/WinnerPortal.component');

describe(WinnerFeature.displayName, (): void => {
    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <WinnerFeature />,
        );

        expect(component.getByText(WinnerPortal.displayName)).toBeInTheDocument();
    });
});
