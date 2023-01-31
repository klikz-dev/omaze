import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

import { TitleFeature } from './TitleFeature.component';
import { FEATURE_NAME } from './TitleFeature.namespace';
import { TitlePortal } from './TitlePortal/TitlePortal.component';

jest.mock('./TitlePortal/TitlePortal.component');

describe(TitleFeature.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(TitleFeature.displayName).toContain('TitleFeature');
        expect(TitleFeature.app).toBe(FEATURE_NAME);
    });

    it('should contain a TitlePortal', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <TitleFeature />
        );

        expect(component.getByText(TitlePortal.displayName)).toBeInTheDocument();
    });
});
