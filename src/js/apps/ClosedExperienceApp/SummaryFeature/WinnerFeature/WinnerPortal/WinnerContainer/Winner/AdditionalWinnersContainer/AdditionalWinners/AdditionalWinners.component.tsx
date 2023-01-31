import { IFunctionComponent } from '@omaze/app';
import { BUTTON_STYLE, ICON_SIZE, ICON_TYPE, OzButton, OzCollapse, OzIcon } from '@omaze/omaze-ui';
import React, { ReactElement, useState } from 'react';

import { IAdditionalWinner } from '../../../../../../../ClosedExperienceModule/ClosedExperience.state';
import { winnerFeatureNamespace } from '../../../../../WinnerFeature.namespace';

import { ADDITIONAL_WINNERS_QA, displayName } from './AdditionalWinners.qa';
import {
    AdditionalWinnersPresenter,
    IAdditionalWinnersClassNames,
} from './AdditionalWinnersPresenter/AdditionalWinnersPresenter';

export interface IAdditionalWinnersProps {
    additionalWinners: IAdditionalWinner[];
}

export const AdditionalWinners: IFunctionComponent<IAdditionalWinnersProps> = winnerFeatureNamespace.createComponent(
    displayName,
    (props: IAdditionalWinnersProps): ReactElement => {
        const [expanded, setExpanded]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
        const { additionalWinners }: IAdditionalWinnersProps = props;
        const presenter: AdditionalWinnersPresenter = new AdditionalWinnersPresenter(expanded, additionalWinners);

        const {
            container,
            buttonContainer,
            title,
            icon,
            lineBreak,
        }: IAdditionalWinnersClassNames = presenter.getAllClassNames();

        const toggleExpanded: () => void = (): void => {
            setExpanded(!expanded);
        };

        return (
            <div className={container} data-testid={ADDITIONAL_WINNERS_QA.CONTAINER}>
                <OzButton
                    style={BUTTON_STYLE.LINK}
                    onClick={toggleExpanded}
                    className={buttonContainer}
                >
                    <span className={title} data-testid={ADDITIONAL_WINNERS_QA.BUTTON_TEXT}>
                        {presenter.getTitle()}
                    </span>
                    <OzIcon
                        className={icon}
                        type={ICON_TYPE.OZ_ARROW_DOWN}
                        size={ICON_SIZE.SMALL}
                        alt={presenter.getIconAlt()}
                    />
                </OzButton>
                <OzCollapse expanded={expanded}>
                    <div className={lineBreak} data-testid={ADDITIONAL_WINNERS_QA.CONTENT} />
                    {
                        additionalWinners.map((_: IAdditionalWinner, index: number): ReactElement => {
                            return (
                                <div
                                    key={index}
                                    className={presenter.getAdditionalWinnerClassNames(index)}
                                >
                                    {presenter.getAdditionalWinnerText(index)}
                                </div>
                            );
                        })
                    }
                </OzCollapse>
            </div>
        );
    }
);
