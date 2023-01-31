import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { Headline } from './Headline.component';
import { HEADLINE_QA } from './Headline.qa';

describe(Headline.displayName, (): void => {
    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(<Headline />);

        expect(component.getByTestId(HEADLINE_QA.CONTAINER)).toBeInTheDocument();
    });
});
