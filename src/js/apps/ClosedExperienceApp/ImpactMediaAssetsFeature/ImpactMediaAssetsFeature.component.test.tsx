import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { ImpactMediaAssetsFeature } from './ImpactMediaAssetsFeature.component';
import { ImpactMediaAssetsPortal } from './ImpactMediaAssetsPortal/ImpactMediaAssetsPortal.component';

jest.mock('./ImpactMediaAssetsPortal/ImpactMediaAssetsPortal.component');

describe(ImpactMediaAssetsFeature.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(ImpactMediaAssetsFeature.displayName).toContain('ImpactMediaAssets');
    });

    it('should contain a ImpactMediaAssetsPortal', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <ImpactMediaAssetsFeature />
        );

        expect(component.getByText(ImpactMediaAssetsPortal.displayName)).toBeInTheDocument();
    });
});
