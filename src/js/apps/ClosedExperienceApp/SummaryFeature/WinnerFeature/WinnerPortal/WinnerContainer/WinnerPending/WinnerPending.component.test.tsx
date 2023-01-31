import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { mocked } from 'ts-jest/utils';

import {
    confirmedWinnerAnnounceDateMock,
    projectedWinnerAnnounceDateMock,
} from '../../../../../shared/tests/ShopifyMock';

import { WinnerPending } from './WinnerPending.component';
import { WinnerPendingPresenter } from './WinnerPendingPresenter/WinnerPendingPresenter';

jest.mock('./WinnerPendingPresenter/WinnerPendingPresenter');

describe(WinnerPending.displayName, (): void => {
    it('should have displayName', (): void => {

        expect(WinnerPending.displayName).toContain('WinnerPending');
    });

    let component: RenderResult;

    beforeEach((): void => {
        mocked(WinnerPendingPresenter).mockClear();
        mocked(WinnerPendingPresenter.prototype.getAllClassNames).mockReturnValue({
            header: 'header',
            pendingDate: 'pending-date',
            winnerPendingContainer: 'winner-pending-container',
            winnerPendingContent: 'winner-pending-content',
        });
        mocked(WinnerPendingPresenter.prototype.getAnnouncedText).mockReturnValue('pending-formatted-date');
        mocked(WinnerPendingPresenter.prototype.getWinnerPendingContainerStyles).mockReturnValue({ background: 'url(mock.png)' });

        const testComponent: ITestComponent = bootstrapAndRender(
            <WinnerPending
                projectedWinnerAnnounceDate={projectedWinnerAnnounceDateMock}
                confirmedWinnerAnnounceDate={confirmedWinnerAnnounceDateMock}
                backgroundImage='mock.png'
            />
        );

        component = testComponent.component;
    });

    it('should render', (): void => {
        expect(component.container.querySelector('.header')).toBeInTheDocument();
        expect(component.container.querySelector('.pending-date')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-pending-container')).toBeInTheDocument();
        expect(component.container.querySelector('.winner-pending-content')).toBeInTheDocument();
        expect(component.getByText('pending-formatted-date')).toBeInTheDocument();

        const backgroundDiv: HTMLDivElement | null = component.container.querySelector('.winner-pending-container');

        if (backgroundDiv === null) {
            throw new Error('background div is null');
        }

        expect(backgroundDiv.style.background).toBe('url(mock.png)');
    });
});
