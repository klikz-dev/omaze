import '@testing-library/jest-dom/extend-expect';
import { bootstrapAndRender } from '@omaze/test';
import { within } from '@testing-library/dom';
import React from 'react';

import { FEATURE_NAME } from '../TitleFeature.namespace';

import { TitleContainer } from './TitleContainer/TitleContainer.component';
import { TitlePortal } from './TitlePortal.component';

jest.mock('./TitleContainer/TitleContainer.component');

describe(TitlePortal.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(TitlePortal.displayName).toContain('TitlePortal');
        expect(TitlePortal.app).toBe(FEATURE_NAME);
    });

    it('should have portal component', (): void => {
        const element: HTMLDivElement = document.createElement('div');

        element.id = 'oz-closed-sweepstakes__title';

        document.body.appendChild(element);

        bootstrapAndRender(<TitlePortal />);

        expect(within(element).getByText(TitleContainer.displayName)).toBeInTheDocument();

        document.body.removeChild(element);
    });
});
