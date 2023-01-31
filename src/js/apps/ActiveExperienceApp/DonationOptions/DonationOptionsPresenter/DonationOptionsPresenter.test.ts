import { IDonationOptionsPresenterClassNames, DonationOptionsPresenter } from './DonationOptionsPresenter';

describe('DonationOptionsPresenter', (): void => {
    it('should have all classNames', (): void => {
        const presenter: DonationOptionsPresenter = new DonationOptionsPresenter({});
        const classNames: IDonationOptionsPresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            host: 'host',
        });
    });

    it('should allow a className config', (): void => {
        const presenter: DonationOptionsPresenter = new DonationOptionsPresenter({
            className: 'extra',
        });

        const classNames: IDonationOptionsPresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            host: 'host extra',
        });
    });

    it('should have the test id', (): void => {
        let presenter: DonationOptionsPresenter = new DonationOptionsPresenter({});

        expect(presenter.getTestId()).toBeUndefined();

        presenter = new DonationOptionsPresenter({
            dataTestId: 'test-id',
        });

        expect(presenter.getTestId()).toBe('test-id');
    });
});
