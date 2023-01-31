import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { NonProfitFeature } from './NonProfitFeature.component';
import { NonProfitPortal } from './NonProfitPortal/NonProfitPortal.component';

jest.mock('./NonProfitPortal/NonProfitPortal.component');

describe(NonProfitFeature.displayName, (): void => {
    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <NonProfitFeature />,
        );

        expect(component.getByText(NonProfitPortal.displayName)).toBeInTheDocument();
    });
});
