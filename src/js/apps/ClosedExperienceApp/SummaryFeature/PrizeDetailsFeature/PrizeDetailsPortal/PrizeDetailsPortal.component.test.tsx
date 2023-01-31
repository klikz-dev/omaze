import '@testing-library/jest-dom/extend-expect';
import { bootstrapAndRender } from '@omaze/test';
import { within } from '@testing-library/dom';
import React from 'react';

import { prizeDetailsFeatureConfig } from '../PrizeDetailsFeature.namespace';

import { PrizeDetailsContainer } from './PrizeDetailsContainer/PrizeDetailsContainer.component';
import { PrizeDetailsPortal } from './PrizeDetailsPortal.component';

jest.mock('./PrizeDetailsContainer/PrizeDetailsContainer.component');

describe(PrizeDetailsPortal.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(PrizeDetailsPortal.displayName).toContain('PrizeDetailsPortal');
        expect(PrizeDetailsPortal.app).toBe(prizeDetailsFeatureConfig.COMPONENT_PREFIX);
    });

    it('should have portal component', (): void => {
        const element: HTMLDivElement = document.createElement('div');

        element.id = 'oz-closed-sweepstakes__prize-details';

        document.body.appendChild(element);

        bootstrapAndRender(<PrizeDetailsPortal />);

        expect(within(element).getByText(PrizeDetailsContainer.displayName)).toBeInTheDocument();

        document.body.removeChild(element);
    });
});
