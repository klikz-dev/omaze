import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { FEATURE_NAME } from '../../../../NonProfitFeature.namespace';

import { ImpactMessageContainer } from './ImpactMessageContainer/ImpactMessageContainer.component';
import { Messages } from './Messages.component';
import { MESSAGES_QA } from './Messages.qa';
import { ThankYouMessageContainer } from './ThankYouMessageContainer/ThankYouMessageContainer.component';

jest.mock('./ThankYouMessageContainer/ThankYouMessageContainer.component');
jest.mock('./ImpactMessageContainer/ImpactMessageContainer.component');

describe(Messages.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(Messages.displayName).toContain('Messages');
        expect(Messages.app).toBe(FEATURE_NAME);
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <Messages />
        );

        expect(component.getByTestId(MESSAGES_QA.CONTAINER)).toBeInTheDocument();
        expect(component.getByText(ThankYouMessageContainer.displayName)).toBeInTheDocument();
        expect(component.getByText(ImpactMessageContainer.displayName)).toBeInTheDocument();
    });
});
