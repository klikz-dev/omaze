import styles from '../WinnerPending.styles.css';

import {
    IWinnerPendingPresenterClassNames,
    IWinnerPendingPresenterConfig,
    WinnerPendingPresenter,
} from './WinnerPendingPresenter';

describe('WinnerPresenter', (): void => {
    const winnerPendingPresenterConfigMock: IWinnerPendingPresenterConfig = {
        projectedWinnerAnnounceDate: new Date(Date.parse('2019-11-06T08:00:00.000Z')),
        confirmedWinnerAnnounceDate: new Date(Date.parse('2019-12-06T08:00:00.000Z')),
        backgroundImage: 'mock.png',
    };

    const presenter: WinnerPendingPresenter = new WinnerPendingPresenter(winnerPendingPresenterConfigMock);
    const classNames: IWinnerPendingPresenterClassNames = presenter.getAllClassNames();

    it('should have header classname', (): void => {
        expect(classNames).toEqual({
            header: styles.header,
            pendingDate: styles.pendingDate,
            winnerPendingContainer: styles.winnerPendingContainer,
            winnerPendingContent: styles.winnerPendingContent,
        });
    });

    it('should have announcement with formatted date', (): void => {
        expect(presenter.getAnnouncedText()).toBe('Winner will be announced Dec. 6, 2019');
    });

    it('should have winner pending container styles', (): void => {
        expect(presenter.getWinnerPendingContainerStyles()).toEqual({
            background: `url('${winnerPendingPresenterConfigMock.backgroundImage}'), linear-gradient(269.88deg, #FFF3F2 0.1%, #FFFCF8 99.9%)`,
        });
    });

    describe('when confirmedWinnerAnnounceDate is not given', (): void => {
        const presenterWithNoConfirmedDate: WinnerPendingPresenter = new WinnerPendingPresenter({
            ...winnerPendingPresenterConfigMock,
            ...{ confirmedWinnerAnnounceDate: undefined },
        });

        it('should have announcement with formatted date with the projectedWinnerAnnounceDate', (): void => {
            expect(presenterWithNoConfirmedDate.getAnnouncedText()).toBe('Winner will be announced on or around Nov. 6, 2019');
        });
    });

    describe('when confirmedWinnerAnnounceDate and projectedWinnerAnnounceDate are not given', (): void => {
        const presenterWithNoDates: WinnerPendingPresenter = new WinnerPendingPresenter({
            projectedWinnerAnnounceDate: new Date(''),
            confirmedWinnerAnnounceDate: undefined,
            backgroundImage: 'mock.png',
        });

        it('should return an empty string', (): void => {
            expect(presenterWithNoDates.getAnnouncedText()).toBe('');
        });
    });
});
