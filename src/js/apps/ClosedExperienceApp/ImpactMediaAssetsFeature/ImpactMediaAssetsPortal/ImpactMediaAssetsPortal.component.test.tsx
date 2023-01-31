import '@testing-library/jest-dom/extend-expect';
import { bootstrapAndRender } from '@omaze/test';
import { within } from '@testing-library/dom';
import React from 'react';

import { impactMediaAssetsFeatureConfig } from '../ImpactMediaAssetsFeature.namespace';

import { ImpactMediaAssetsContainer } from './ImpactMediaAssetsContainer/ImpactMediaAssetsContainer.component';
import { ImpactMediaAssetsPortal } from './ImpactMediaAssetsPortal.component';

jest.mock('./ImpactMediaAssetsContainer/ImpactMediaAssetsContainer.component');

describe(ImpactMediaAssetsPortal.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(ImpactMediaAssetsPortal.displayName).toContain('ImpactMediaAssetsPortal');
        expect(ImpactMediaAssetsPortal.app).toBe(impactMediaAssetsFeatureConfig.COMPONENT_PREFIX);
    });

    it('should have portal component', (): void => {
        const element: HTMLDivElement = document.createElement('div');

        element.id = 'oz-closed-sweepstakes__impact-media-assets';

        document.body.appendChild(element);

        bootstrapAndRender(<ImpactMediaAssetsPortal />);

        expect(within(element).getByText(ImpactMediaAssetsContainer.displayName)).toBeInTheDocument();

        document.body.removeChild(element);
    });
});
