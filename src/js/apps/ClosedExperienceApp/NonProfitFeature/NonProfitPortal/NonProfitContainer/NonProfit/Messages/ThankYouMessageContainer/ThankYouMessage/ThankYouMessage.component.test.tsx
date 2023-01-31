import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { FEATURE_NAME } from '../../../../../../NonProfitFeature.namespace';

import { ThankYouMessage } from './ThankYouMessage.component';
import { THANK_YOU_MESSAGE_QA } from './ThankYouMessage.qa';

describe(ThankYouMessage.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(ThankYouMessage.displayName).toContain('ThankYouMessage');
        expect(ThankYouMessage.app).toBe(FEATURE_NAME);
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <ThankYouMessage thankYouMessage={'thankYouMessage'} imgixUrl={'imgixUrl'} impactMessage={'impactMessage'} />
        );

        expect(component.getByTestId(THANK_YOU_MESSAGE_QA.CONTAINER)).toBeInTheDocument();
        expect(component.getByTestId(THANK_YOU_MESSAGE_QA.IMGIX_URL)).toBeInTheDocument();
        expect(component.getByTestId(THANK_YOU_MESSAGE_QA.MESSAGE)).toBeInTheDocument();
    });

    it('should not render imgixUrl when is missing', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <ThankYouMessage thankYouMessage={'thankYouMessage'} imgixUrl={''} impactMessage={'impactMessage'}  />
        );

        expect(component.getByTestId(THANK_YOU_MESSAGE_QA.CONTAINER)).toBeInTheDocument();
        expect(component.queryByTestId(THANK_YOU_MESSAGE_QA.IMGIX_URL)).not.toBeInTheDocument();
        expect(component.getByTestId(THANK_YOU_MESSAGE_QA.MESSAGE)).toBeInTheDocument();
    });
});
