import { NetRaiseAmountPresenter } from './NetRaiseAmountPresenter';

describe('NetRaiseAmountPresenter', (): void => {
    const nonProfitNameMock: string = 'International Medical Corps';
    const presenter: NetRaiseAmountPresenter = new NetRaiseAmountPresenter(nonProfitNameMock);

    it('should have imageDesktop classnames', (): void => {
        expect(presenter.getImageDesktopClassNames()).toBe('imageDesktop image');
    });

    it('should have imageMobile classnames', (): void => {
        expect(presenter.getImageMobileClassNames()).toBe('imageMobile image');
    });

    it('should have all net raise amount classnames', (): void => {
        expect(presenter.getAllClassNames()).toEqual({
            container: 'container',
            textContainer: 'textContainer',
            amount: 'amount',
            caption: 'caption',
        });
    });

    describe('when nonprofit name is given', (): void => {
        it('should display correct net raise amount text', (): void => {
            expect(presenter.getCaption()).toBe('was granted by CAF America to International Medical Corps thanks to the generosity of the Omaze donor community');
        });
    });

    describe('when nonprofit name is not given', (): void => {
        const emptyNonProfitMock: string = '';
        const presenter2: NetRaiseAmountPresenter = new NetRaiseAmountPresenter(emptyNonProfitMock);

        it('should display correct net raise amount text', (): void => {
            expect(presenter2.getCaption()).toBe('was granted by CAF America thanks to the generosity of the Omaze donor community');
        });
    });
});
