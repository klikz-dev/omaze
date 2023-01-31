import { ITitlePresenterClassNames, TitlePresenter } from './TitlePresenter';

describe('TitlePresenter', (): void => {
    const presenter: TitlePresenter = new TitlePresenter(
        'Win A Pound Of Beats And Carrots',
        'Schrute Farms'
    );

    it('should have vendor', (): void => {
        const title: string = presenter.getThankYouTitle();

        expect(title).toBe('Thanks to everyone who supported Schrute Farms');
    });

    it('should have caption', (): void => {
        const caption: string = presenter.getCaption();

        expect(caption).toBe('for a chance to');
    });

    it('should have caption', (): void => {
        const productTitle: string = presenter.getExperienceTitle();

        expect(productTitle).toBe('Win A Pound Of Beats And Carrots');
    });

    it('should have all classNames', (): void => {
        const classNames: ITitlePresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            container: 'container',
            thankYouTitle: 'thankYouTitle',
            caption: 'caption',
            experienceTitle: 'experienceTitle',
        });
    });
});
