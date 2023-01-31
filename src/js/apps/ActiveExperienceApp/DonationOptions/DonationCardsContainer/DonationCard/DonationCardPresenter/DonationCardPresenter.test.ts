import { IExperience, IVariant } from '../../../../ActiveExperienceModule/ActiveExperience.state';

import { IDonationCardPresenterClassNames, DonationCardPresenter, IDonationCardAnalytics } from './DonationCardPresenter';

describe('DonationCardPresenter', (): void => {
    const baseVariant: IVariant = {
        id: 1,
        sku: 'hello SKU',
        title: 'title',
        name: 'name',
        price: 1000,
        metafields: {
            calloutText: 'hello',
        },
    };

    const baseExperience: IExperience = {
        id: 1,
        handle: 'mock-handle',
        name: 'mock-name',
    };

    it('should have all classNames', (): void => {
        const presenter: DonationCardPresenter = new DonationCardPresenter({
            className: 'extra',
            variant: baseVariant,
            experience: baseExperience,
        });

        const classNames: IDonationCardPresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            'host': 'host extra',
            'badge': 'badge',
            'ctaButton': 'ctaButton',
            'entriesAmount': 'entriesAmount',
            'entriesBlock': 'entriesBlock',
            'entriesText': 'entriesText',
        });
    });

    it('should present button text', (): void => {
        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.getButtonText()).toBe('Donate $10');
    });

    it('should present badge text', (): void => {
        baseVariant.metafields.calloutText = 'badger';

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.getBadgeText()).toBe('badger');
    });

    it('isEntryMultiplier should be false when callout is a valid muliplier tag', (): void => {
        baseVariant.metafields.calloutText = 'hello';

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.isEntryMultiplier()).toBe(false);
    });

    it('isEntryMultiplier should be true when callout is not a vaid multiplier tag', (): void => {
        baseVariant.metafields.calloutText = '5X Entries!';

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.isEntryMultiplier()).toBe(true);
    });

    it('should present number of entries', (): void => {
        baseVariant.sku = 'standard_99';

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.getNumberEntries()).toBe('99');
    });

    it('should present number of entries with commas', (): void => {
        baseVariant.sku = 'standard_2000';

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.getNumberEntries()).toBe('2,000');
    });

    it('should present the cart link', (): void => {
        baseVariant.id = 123;

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        const expected: string = '/cart/add?id=123&quantity=1';

        expect(presenter.getCardLink()).toBe(expected);
    });

    it('should present the price', (): void => {
        baseVariant.price = 1000;

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.getPrice()).toBe('10');
    });

    it('should present the price with commas', (): void => {
        baseVariant.price = 100000;

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        expect(presenter.getPrice()).toBe('1,000');
    });

    it('should present analytics data', (): void => {
        baseVariant.id = 100;
        baseExperience.id = 200;

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            variant: baseVariant,
            experience: baseExperience,
        });

        const analytics: IDonationCardAnalytics = presenter.getAnalytics();

        expect(analytics.id).toBe('addToCart');
        expect(analytics.track).toBe('click');
        expect(analytics.details).toBe('product_id:200;variant_id:100');
    });
});
