import '@testing-library/jest-dom/extend-expect';
import { bootstrapAndRender } from '@omaze/test';
import { within } from '@testing-library/dom';
import React from 'react';

import { FEATURE_NAME } from '../NonProfitFeature.namespace';

import { NonProfitContainer } from './NonProfitContainer/NonProfitContainer.component';
import { NonProfitPortal } from './NonProfitPortal.component';

jest.mock('./NonProfitContainer/NonProfitContainer.component');

describe(NonProfitPortal.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(NonProfitPortal.displayName).toContain('NonProfitPortal');
        expect(NonProfitPortal.app).toBe(FEATURE_NAME);
    });

    it('should have portal component', (): void => {
        const element: HTMLDivElement = document.createElement('div');

        element.id = 'oz-closed-sweepstakes__non-profit';

        document.body.appendChild(element);

        bootstrapAndRender(<NonProfitPortal />);

        expect(within(element).getByText(NonProfitContainer.displayName)).toBeInTheDocument();

        document.body.removeChild(element);
    });
});
