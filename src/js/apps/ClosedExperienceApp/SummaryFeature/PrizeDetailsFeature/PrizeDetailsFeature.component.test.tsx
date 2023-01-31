import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { PrizeDetailsFeature } from './PrizeDetailsFeature.component';
import { PrizeDetailsPortal } from './PrizeDetailsPortal/PrizeDetailsPortal.component';

jest.mock('./PrizeDetailsPortal/PrizeDetailsPortal.component');

describe(PrizeDetailsFeature.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(PrizeDetailsFeature.displayName).toContain('PrizeDetails');
    });

    it('should contain a PrizeDetailsPortal', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <PrizeDetailsFeature />
        );

        expect(component.getByText(PrizeDetailsPortal.displayName)).toBeInTheDocument();
    });
});
