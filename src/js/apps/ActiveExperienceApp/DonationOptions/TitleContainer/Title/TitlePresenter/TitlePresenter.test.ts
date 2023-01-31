import { TitlePresenter } from './TitlePresenter';

describe('TitlePresenter', (): void => {
    const presenter: TitlePresenter = new TitlePresenter({
        className: 'extra',
        dataTestId: 'test-id',
        nonProfitName: 'charityName',
    });

    it('should present a title', (): void => {
        expect(presenter.getTitleCopy()).toBe('Support charityName today and enter for your chance to win!');
    });

    it('should have all classNames', (): void => {
        expect(presenter.getAllClassNames()).toEqual({
            host: 'host extra',
        });
    });

    it('should have the test id', (): void => {
        expect(presenter.getTestId()).toBe('test-id');
    });
});
