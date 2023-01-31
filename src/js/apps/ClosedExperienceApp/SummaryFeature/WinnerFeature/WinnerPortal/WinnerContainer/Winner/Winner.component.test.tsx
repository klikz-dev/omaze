import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { mocked } from 'ts-jest/utils';

import { OzDate } from '../../../../../shared/OzDate/OzDate';

import { AdditionalWinnersContainer } from './AdditionalWinnersContainer/AdditionalWinnersContainer.component';
import { Winner } from './Winner.component';
import { WINNER_QA } from './Winner.qa';
import { WinnerPresenter } from './WinnerPresenter/WinnerPresenter';

jest.mock('./WinnerPresenter/WinnerPresenter');
jest.mock('./AdditionalWinnersContainer/AdditionalWinnersContainer.component');

describe(Winner.displayName, (): void => {
    it('should have displayName', (): void => {

        expect(Winner.displayName).toContain('Winner');
    });

    let component: RenderResult;

    beforeEach((): void => {
        mocked(WinnerPresenter).mockClear();
        mocked(WinnerPresenter.prototype.getAllClassNames).mockReturnValue({
            backgroundImage: 'background-image',
            winnerContent: 'winner-content',
            header: 'header',
            winnerName: 'winner-name',
            winnerLocation: 'winner-location',
            winnerDate: 'winner-date',
            winnerImageContainer: 'winner-image-container',
            winnerImage: 'winner-image',
        });
        mocked(WinnerPresenter.prototype.getAnnouncedText).mockReturnValue('formatted-date');
        mocked(WinnerPresenter.prototype.getWinnerContainerStyles).mockReturnValue({ background: 'url(\'mock.png\')' });
        mocked(WinnerPresenter.prototype.getBackgroundImageStyles).mockReturnValue({ background: 'url(\'mock.png\')' });

        const testComponent: ITestComponent = bootstrapAndRender(
            <Winner
                name='Josh'
                location='Wilmington'
                projectedWinnerAnnounceDate={OzDate.getDateFromDateString('2019-11-06T08:00:00.000Z')}
                confirmedWinnerAnnounceDate={OzDate.getDateFromDateString('2019-12-06T08:00:00.000Z')}
                image='test-image'
                backgroundImage='mock.png'
            />
        );

        component = testComponent.component;
    });

    it('should render', (): void => {
        expect(component.container.querySelector('.background-image')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-content')).toBeInTheDocument();
        expect(component.container.querySelector('.header')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-name')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-location')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-date')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-image-container')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-image')).toBeInTheDocument();
        expect(component.getByText('formatted-date')).toBeInTheDocument();
        expect(component.getByText('Josh')).toBeInTheDocument();
        expect(component.getByText('Wilmington')).toBeInTheDocument();
        expect(component.getByTestId(WINNER_QA.WINNER_IMAGE)).toBeInTheDocument();

        const backgroundDiv: HTMLDivElement | null = component.container.querySelector('.background-image');

        if (backgroundDiv === null) {
            throw new Error('background div is null');
        }

        expect(backgroundDiv.style.background).toBe('url(mock.png)');
    });

    it('should contain AdditionalWinners component', (): void => {
        expect(component.getByText(AdditionalWinnersContainer.displayName)).toBeInTheDocument();
    });
});
