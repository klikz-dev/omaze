import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { FEATURE_NAME } from '../../../../../../NonProfitFeature.namespace';

import { ImpactMessage } from './ImpactMessage.component';
import { IMPACT_MESSAGE_QA } from './ImpactMessage.qa';

describe(ImpactMessage.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(ImpactMessage.displayName).toContain('ImpactMessage');
        expect(ImpactMessage.app).toBe(FEATURE_NAME);
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <ImpactMessage message={'impactMessage'} />
        );

        expect(component.getByTestId(IMPACT_MESSAGE_QA.CONTAINER)).toBeInTheDocument();
    });
});
