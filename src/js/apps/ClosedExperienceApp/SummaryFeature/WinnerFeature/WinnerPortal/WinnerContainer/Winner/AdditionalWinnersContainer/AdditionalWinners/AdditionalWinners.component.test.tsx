import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { fireEvent, RenderResult } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { mocked } from 'ts-jest/utils';

import { IAdditionalWinner } from '../../../../../../../ClosedExperienceModule/ClosedExperience.state';
import { createAdditionalWinnersMock } from '../../../../../../../shared/tests/CosmicMock';
import { FEATURE_NAME } from '../../../../../WinnerFeature.namespace';

import { AdditionalWinners } from './AdditionalWinners.component';
import { ADDITIONAL_WINNERS_QA } from './AdditionalWinners.qa';
import { AdditionalWinnersPresenter } from './AdditionalWinnersPresenter/AdditionalWinnersPresenter';

jest.mock('./AdditionalWinnersPresenter/AdditionalWinnersPresenter');

const additionalWinnersMock: IAdditionalWinner[] = createAdditionalWinnersMock();

describe(AdditionalWinners.displayName, (): void => {
    let component: RenderResult;

    beforeEach((): void => {
        mocked(AdditionalWinnersPresenter).mockClear();
        mocked(AdditionalWinnersPresenter.prototype.getAllClassNames).mockReturnValue({
            container: 'container',
            title: 'title',
            buttonContainer: 'title',
            icon: 'icon',
            lineBreak: 'lineBreak',
        });
        mocked(AdditionalWinnersPresenter.prototype.getTitle).mockReturnValue('title');
        mocked(AdditionalWinnersPresenter.prototype.getIconAlt).mockReturnValue('iconAlt');
        mocked(AdditionalWinnersPresenter.prototype.getAdditionalWinnerClassNames).mockReturnValue('additionalClassnames');
        mocked(AdditionalWinnersPresenter.prototype.getAdditionalWinnerText).mockReturnValue('additionalWinnerText');

        const testComponent: ITestComponent = bootstrapAndRender(
            <AdditionalWinners additionalWinners={additionalWinnersMock} />
        );

        component = testComponent.component;
    });

    it('should render', (): void => {
        expect(AdditionalWinners.displayName).toContain('AdditionalWinners');
        expect(AdditionalWinners.app).toBe(FEATURE_NAME);
        expect(component.getByTestId(ADDITIONAL_WINNERS_QA.CONTAINER)).toBeInTheDocument();
        expect(component.getByText('title')).toBeInTheDocument();
        expect(component.getByAltText('iconAlt')).toBeInTheDocument();
        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.title')).toBeInTheDocument();
        expect(component.container.querySelector('.icon')).toBeInTheDocument();
    });

    it('should hide the additional winners by default', (): void => {
        expect(component.queryByTestId(ADDITIONAL_WINNERS_QA.CONTENT)).not.toBeInTheDocument();
    });

    it('should toggle the visibility of the additional winners', (): void => {
        const toggleButton: HTMLElement = component.getByTestId(ADDITIONAL_WINNERS_QA.BUTTON_TEXT);

        fireEvent.click(toggleButton);

        expect(component.getByTestId(ADDITIONAL_WINNERS_QA.CONTENT)).toBeInTheDocument();
        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.title')).toBeInTheDocument();
        expect(component.container.querySelector('.icon')).toBeInTheDocument();
        expect(component.container.querySelector('.lineBreak')).toBeInTheDocument();
        expect(component.container.querySelector('.additionalClassnames')).toBeInTheDocument();
        expect(component.getAllByText('additionalWinnerText').length).toBe(additionalWinnersMock.length);

        fireEvent.click(toggleButton);

        expect(component.queryByTestId(ADDITIONAL_WINNERS_QA.CONTENT)).not.toBeInTheDocument();
        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.title')).toBeInTheDocument();
        expect(component.container.querySelector('.icon')).toBeInTheDocument();
    });
});
