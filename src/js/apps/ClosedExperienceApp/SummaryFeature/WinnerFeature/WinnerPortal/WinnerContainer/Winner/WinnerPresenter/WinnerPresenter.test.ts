import styles from '../Winner.styles.css';

import { IWinnerPresenterClassNames, IWinnerPresenterConfig, WinnerPresenter } from './WinnerPresenter';

describe('WinnerPresenter', (): void => {
    const winnerPendingPresenterConfigMock: IWinnerPresenterConfig = {
        projectedWinnerAnnounceDate: new Date(Date.parse('2019-11-06T08:00:00.000Z')),
        confirmedWinnerAnnounceDate: new Date(Date.parse('2019-12-06T08:00:00.000Z')),
        backgroundImage: 'mock.png',
        image: 'winner.png',
    };

    const presenter: WinnerPresenter = new WinnerPresenter(winnerPendingPresenterConfigMock);
    const classNames: IWinnerPresenterClassNames = presenter.getAllClassNames();

    it('should have all classnames', (): void => {
        expect(classNames).toEqual({
            backgroundImage: styles.backgroundImage,
            winnerContent: styles.winnerContent,
            header: styles.header,
            winnerName: styles.winnerName,
            winnerLocation: styles.winnerLocation,
            winnerDate: styles.winnerDate,
            winnerImageContainer: styles.winnerImageContainer,
            winnerImage: styles.winnerImage,
        });
    });

    it('should have background image styles', (): void => {
        expect(presenter.getBackgroundImageStyles()).toEqual({ background: `url('${winnerPendingPresenterConfigMock.backgroundImage}')` });
    });

    it('should have winner container styles', (): void => {
        expect(presenter.getWinnerContainerStyles()).toEqual({ background: 'linear-gradient(269.88deg, #FFF3F2 0.1%, #FFFCF8 99.9%)' });
    });

    it('should have announcement with formatted date', (): void => {
        expect(presenter.getAnnouncedText()).toBe('Announced Dec. 6, 2019');
    });

    it('should have winner image styles', (): void => {
        expect(presenter.getWinnerImageStyles()).toEqual({ background: `url('${winnerPendingPresenterConfigMock.image}')` });
    });

    describe('when confirmedWinnerAnnounceDate is not given', (): void => {
        const presenterWithNoConfirmedDate: WinnerPresenter = new WinnerPresenter({
            ...winnerPendingPresenterConfigMock,
            ...{ confirmedWinnerAnnounceDate: undefined },
        });

        it('should have announcement with formatted date with the projectedWinnerAnnounceDate', (): void => {
            expect(presenterWithNoConfirmedDate.getAnnouncedText()).toBe('Announced Nov. 6, 2019');
        });
    });

    describe('when confirmedWinnerAnnounceDate and projectedWinnerAnnounceDate are not given', (): void => {
        const presenterWithNoDates: WinnerPresenter = new WinnerPresenter({
            ...winnerPendingPresenterConfigMock,
            ...{
                projectedWinnerAnnounceDate: new Date(''),
                confirmedWinnerAnnounceDate: undefined,
            },
        });

        it('should return an empty string', (): void => {
            expect(presenterWithNoDates.getAnnouncedText()).toBe('');
        });
    });
});
