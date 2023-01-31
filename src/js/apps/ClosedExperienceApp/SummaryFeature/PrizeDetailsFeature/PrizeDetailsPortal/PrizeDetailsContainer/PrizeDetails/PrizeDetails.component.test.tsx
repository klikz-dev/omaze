import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import '@testing-library/jest-dom/extend-expect';

import { PrizeDetails } from './PrizeDetails.component';
import { PRIZE_DETAILS_QA } from './PrizeDetails.qa';
import { PrizeDetailsPresenter } from './PrizeDetailsPresenter/PrizeDetailsPresenter';

jest.mock('./PrizeDetailsPresenter/PrizeDetailsPresenter');

describe(PrizeDetails.displayName, (): void => {
    let component: RenderResult;

    beforeEach((): void => {
        mocked(PrizeDetailsPresenter).mockClear();
        mocked(PrizeDetailsPresenter.prototype.getAllClassNames).mockReturnValue({
            title: 'title',
            titleContainer: 'titleContainer',
            prizeDetailsListContainer: 'prizeDetailsListContainer',
            icon: 'icon',
            prizeDetailsContainer: 'prizeDetailsContainer',
            prizeDetailsButton: 'prizeDetailsButton',
        });

        const testComponent: ITestComponent = bootstrapAndRender(<PrizeDetails prizeDetails='<p>prize details</p>' />);

        component = testComponent.component;
    });

    it('should hide the prize details by default', (): void => {
        expect(component.queryByTestId(PRIZE_DETAILS_QA.CONTENT)).not.toBeInTheDocument();
    });

    it('should toggle the visibility of the prize details', async (): Promise<void> => {
        const toggleButton: HTMLElement = component.getByTestId(PRIZE_DETAILS_QA.BUTTON_TEXT);

        fireEvent.click(toggleButton);
        await waitFor((): void => {
            expect(component.getByTestId(PRIZE_DETAILS_QA.CONTENT)).toBeInTheDocument();
            expect(component.getByTestId(PRIZE_DETAILS_QA.CONTENT).innerHTML).toBe('<p>prize details</p>');
        });

        fireEvent.click(toggleButton);
        await waitFor((): void => {
            expect(component.queryByTestId(PRIZE_DETAILS_QA.CONTENT)).not.toBeInTheDocument();
        });
    });
});
