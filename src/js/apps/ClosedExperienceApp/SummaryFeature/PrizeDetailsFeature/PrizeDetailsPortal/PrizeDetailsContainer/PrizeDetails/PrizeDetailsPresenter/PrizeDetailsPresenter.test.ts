import { PrizeDetailsPresenter } from './PrizeDetailsPresenter';

describe('PrizeDetailsPresenter', (): void => {
    it('should get all classnames', (): void => {
        let presenter: PrizeDetailsPresenter = new PrizeDetailsPresenter({
            expanded: false,
        });

        expect(presenter.getAllClassNames()).toEqual({
            title: 'title',
            prizeDetailsCollapse: 'prizeDetailsCollapse',
            prizeDetailsListContainer: 'prizeDetailsListContainer',
            titleContainer: 'titleContainer',
            icon: 'icon expandIcon',
            prizeDetailsContainer: 'prizeDetailsContainer',
            prizeDetailsButton: 'prizeDetailsButton',
        });

        presenter = new PrizeDetailsPresenter({
            expanded: true,
        });

        expect(presenter.getAllClassNames()).toEqual({
            title: 'title',
            prizeDetailsCollapse: 'prizeDetailsCollapse',
            prizeDetailsListContainer: 'prizeDetailsListContainer',
            titleContainer: 'titleContainer',
            icon: 'icon',
            prizeDetailsContainer: 'prizeDetailsContainer',
            prizeDetailsButton: 'prizeDetailsButton',
        });
    });

    it('should get icon alt', (): void => {
        let presenter: PrizeDetailsPresenter = new PrizeDetailsPresenter({
            expanded: true,
        });

        expect(presenter.getIconAlt()).toBe('Collapse Icon');

        presenter = new PrizeDetailsPresenter({
            expanded: false,
        });

        expect(presenter.getIconAlt()).toBe('Expand Icon');
    });
});
