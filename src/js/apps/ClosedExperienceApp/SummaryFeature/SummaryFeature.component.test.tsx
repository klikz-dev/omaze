import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { PrizeDetailsFeature } from './PrizeDetailsFeature/PrizeDetailsFeature.component';
import { SummaryFeature } from './SummaryFeature.component';
import { TitleFeature } from './TitleFeature/TitleFeature.component';
import { WinnerFeature } from './WinnerFeature/WinnerFeature.component';

jest.mock('./WinnerFeature/WinnerFeature.component');
jest.mock('./TitleFeature/TitleFeature.component');
jest.mock('./PrizeDetailsFeature/PrizeDetailsFeature.component');

describe('Summary', (): void => {
    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <SummaryFeature />,
        );

        expect(component.getByText(TitleFeature.displayName)).toBeInTheDocument();
        expect(component.getByText(PrizeDetailsFeature.displayName)).toBeInTheDocument();
        expect(component.getByText(WinnerFeature.displayName)).toBeInTheDocument();
    });
});
