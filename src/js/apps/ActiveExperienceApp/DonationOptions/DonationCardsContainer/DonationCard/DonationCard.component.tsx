import { IFunctionComponent } from '@omaze/app';
import { BUTTON_STYLE, OzButton } from '@omaze/omaze-ui';
import React, { MouseEvent, ReactElement, useState } from 'react';

import { namespace } from '../../../ActiveExperienceApp.namespace';
import { IExperience, IVariant } from '../../../ActiveExperienceModule/ActiveExperience.state';

import { displayName, DONATION_CARD_QA } from './DonationCard.qa';
import { IDonationCardPresenterClassNames, DonationCardPresenter, IDonationCardAnalytics } from './DonationCardPresenter/DonationCardPresenter';

export interface IDonationCardProps {
    className?: string;
    variant: IVariant;
    experience: IExperience;
}

export const DonationCard: IFunctionComponent<IDonationCardProps> = namespace.createComponent<IDonationCardProps>(
    displayName,
    (props: IDonationCardProps): ReactElement => {
        const {
            variant,
            experience,
            className,
        }: IDonationCardProps = props;

        const [linkDisabled, setLinkDisabled]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false);

        // Prevent double clicking, which can place 2 items in cart.
        function handleClick (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void {
            if (linkDisabled) {
                event.preventDefault();

                return;
            }

            setLinkDisabled(true);
        }

        const presenter: DonationCardPresenter = new DonationCardPresenter({
            className: className,
            variant: variant,
            experience: experience,
        });

        const classNames: IDonationCardPresenterClassNames = presenter.getAllClassNames();
        const badgeText: string | undefined = presenter.getBadgeText();
        const analyticsData: IDonationCardAnalytics = presenter.getAnalytics();
        let calloutBadgeEl: any;

        if (badgeText) {
            calloutBadgeEl = <div className={classNames.badge}>{badgeText}</div >;
        }

        return (
            <a
                href={presenter.getCardLink()}
                data-testid={DONATION_CARD_QA.CONTAINER}
                data-oa-id={analyticsData.id}
                data-oa-track={analyticsData.track}
                data-oa-details={analyticsData.details}
                className={classNames.host}
                onClick={handleClick}
            >
                {calloutBadgeEl}
                <div className={classNames.entriesBlock}>
                    <div className={classNames.entriesAmount}>{presenter.getNumberEntries()}</div>
                    <div className={classNames.entriesText}>entries</div>
                </div>
                <OzButton
                    style={BUTTON_STYLE.PRIMARY}
                    className={classNames.ctaButton}
                >
                    <div>{presenter.getButtonText()}</div>
                </OzButton>
            </a>
        );
    }
);
