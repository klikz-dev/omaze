import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { namespace } from '../../ActiveExperienceApp.namespace';
import { IExperience, IVariant } from '../../ActiveExperienceModule/ActiveExperience.state';
import { selectExperience } from '../../ActiveExperienceModule/selectors/selectExperience/selectExperience';
import { selectStandardVariants } from '../../ActiveExperienceModule/selectors/selectStandardVariants/selectStandardVariants';

import { DonationCard } from './DonationCard/DonationCard.component';
import { displayName } from './DonationCardsContainer.qa';
import { LayoutDonationCards } from './LayoutDonationCards/LayoutDonationCards.component';

export const DonationCardsContainer: IFunctionComponent = namespace.createComponent(displayName, (): ReactElement => {
    const variants: IVariant[] = useNamespaceSelector(selectStandardVariants);
    const experience: IExperience = useNamespaceSelector(selectExperience);

    return (
        <LayoutDonationCards>
            {
                variants.map((variant: IVariant, index: number): ReactElement => {
                    return (
                        <DonationCard key={index} variant={variant} experience={experience}/>
                    );
                })
            }
        </LayoutDonationCards>
    );
});
