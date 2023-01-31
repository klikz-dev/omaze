import { IFunctionComponent } from '@omaze/app';
import { BUTTON_STYLE, ICON_SIZE, ICON_TYPE, OzButton, OzCollapse, OzIcon } from '@omaze/omaze-ui';
import React, { ReactElement, useState } from 'react';

import { prizeDetailsFeatureNamespace } from '../../../PrizeDetailsFeature.namespace';

import { displayName, PRIZE_DETAILS_QA } from './PrizeDetails.qa';
import { IPrizeDetailsClassNames, PrizeDetailsPresenter } from './PrizeDetailsPresenter/PrizeDetailsPresenter';

export interface IPrizeDetailsProps {
    prizeDetails: string;
}

export const PrizeDetails: IFunctionComponent<IPrizeDetailsProps> = prizeDetailsFeatureNamespace.createComponent(
    displayName,
    (props: IPrizeDetailsProps): ReactElement => {
        const [expanded, setExpanded]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);
        const { prizeDetails }: IPrizeDetailsProps = props;

        const presenter: PrizeDetailsPresenter = new PrizeDetailsPresenter({
            expanded: expanded,
        });

        const classNames: IPrizeDetailsClassNames = presenter.getAllClassNames();

        const toggleExpanded: () => void = (): void => {
            setExpanded(!expanded);
        };

        return (
            <div data-testid={PRIZE_DETAILS_QA.CONTAINER} className={classNames.prizeDetailsContainer}>
                <OzButton
                    style={BUTTON_STYLE.LINK}
                    onClick={toggleExpanded}
                    className={classNames.prizeDetailsButton}
                >
                    <span className={classNames.title} data-testid={PRIZE_DETAILS_QA.BUTTON_TEXT}>Prize details</span>
                    <OzIcon
                        className={classNames.icon}
                        type={ICON_TYPE.OZ_CLOSE}
                        size={ICON_SIZE.SMALL}
                        alt={presenter.getIconAlt()}
                    />
                </OzButton>
                <OzCollapse expanded={expanded} className={classNames.prizeDetailsCollapse}>
                    <div
                        className={classNames.prizeDetailsListContainer}
                        data-testid={PRIZE_DETAILS_QA.CONTENT}
                        dangerouslySetInnerHTML={{ __html: prizeDetails }}
                    />
                </OzCollapse>
            </div>
        );
    });
