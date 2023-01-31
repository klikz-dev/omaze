import { ILayoutDonationOptionsPresenterClassNames, LayoutDonationOptionsPresenter } from './LayoutDonationOptionsPresenter';

describe('LayoutDonationOptionsPresenter', (): void => {
    const presenter: LayoutDonationOptionsPresenter = new LayoutDonationOptionsPresenter({
        className: 'extra',
    });

    it('should have all classNames', (): void => {
        const classNames: ILayoutDonationOptionsPresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            host: 'host extra',
            innerWrapper: 'innerWrapper',
        });
    });
});
