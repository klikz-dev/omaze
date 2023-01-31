import { IAdditionalWinner } from '../../../../../../../../ClosedExperienceModule/ClosedExperience.state';
import { createAdditionalWinnersMock } from '../../../../../../../../shared/tests/CosmicMock';

import { AdditionalWinnersPresenter, IAdditionalWinnersClassNames } from './AdditionalWinnersPresenter';

const additionalWinnersMock: IAdditionalWinner[] = createAdditionalWinnersMock();

describe(AdditionalWinnersPresenter, (): void => {
    const additionalWinnersPresenter: AdditionalWinnersPresenter = new AdditionalWinnersPresenter(
        true,
        additionalWinnersMock
    );

    const classNames: IAdditionalWinnersClassNames = additionalWinnersPresenter.getAllClassNames();

    it('should have all classnames', (): void => {
        expect(classNames).toEqual({
            container: 'container',
            buttonContainer: 'buttonContainer',
            title: 'title',
            icon: 'icon expandIcon',
            lineBreak: 'lineBreak',
        });
    });

    it('should have the correct title', (): void => {
        const title: string = additionalWinnersPresenter.getTitle();

        expect(title).toEqual('Additional Winners');
    });

    it('should have the correct icon alt', (): void => {
        const iconAlt: string = additionalWinnersPresenter.getIconAlt();

        expect(iconAlt).toEqual('Collapsed Icon');
    });

    it('should have the correct additional winner text', (): void => {
        expect(
            additionalWinnersPresenter.getAdditionalWinnerText(0)
        ).toEqual('Juan T. from Los Angeles, CA won $5,000!');
        expect(
            additionalWinnersPresenter.getAdditionalWinnerText(1)
        ).toEqual('Gabriel U. from Belgorod, Ru won a Kitty!');
    });

    it('should generate the correct additional winner class names', (): void => {
        expect(
            additionalWinnersPresenter.getAdditionalWinnerClassNames(0)
        ).toEqual('additionalWinner');

        expect(
            additionalWinnersPresenter.getAdditionalWinnerClassNames(1)
        ).toEqual('additionalWinner lastAdditionalWinner');
    });

    describe('when expanded is false', (): void => {
        const additionalWinnersPresenter: AdditionalWinnersPresenter = new AdditionalWinnersPresenter(
            false,
            additionalWinnersMock
        );

        const classNames: IAdditionalWinnersClassNames = additionalWinnersPresenter.getAllClassNames();

        it('should have all classnames', (): void => {
            expect(classNames).toEqual({
                container: 'container',
                buttonContainer: 'buttonContainer',
                title: 'title',
                icon: 'icon',
                lineBreak: 'lineBreak',
            });
        });

        it('should have correct icon alt', (): void => {
            const iconAlt: string = additionalWinnersPresenter.getIconAlt();

            expect(iconAlt).toEqual('Expanded Icon');
        });
    });
});
