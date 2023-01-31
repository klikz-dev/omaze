import { IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement } from 'react';

import { namespace } from '../../ActiveExperienceApp.namespace';
import {
    IExperience,
    IVariant,
} from '../../ActiveExperienceModule/ActiveExperience.state';
import { selectExperience } from '../../ActiveExperienceModule/selectors/selectExperience/selectExperience';
import { selectFameHostname } from '../../ActiveExperienceModule/selectors/selectFameHostname/selectFameHostname';
import { selectFameUpsellVariant } from '../../ActiveExperienceModule/selectors/selectFameUpsellVariant/selectFameUpsellVariant';
import { selectRequiresProminentFame } from '../../ActiveExperienceModule/selectors/selectRequiresProminentFame/selectRequiresProminentFame';

import { FameLink } from './FameLink/FameLink.component';
import { displayName } from './FameLinkContainer.qa';

export const FameLinkContainer: IFunctionComponent = namespace.createComponent(displayName, (): ReactElement | null => {
    const {
        id: experienceId,
        name,
        handle,
    }: IExperience = useNamespaceSelector(selectExperience);

    const fameUpsellVariant: IVariant | undefined = useNamespaceSelector(selectFameUpsellVariant);
    const fameHostname: string = useNamespaceSelector(selectFameHostname);
    const requiresProminentFame: boolean = useNamespaceSelector(selectRequiresProminentFame);

    if (!experienceId || !fameHostname) {
        return null;
    }

    return (
        <FameLink
            hostName={fameHostname}
            productId={experienceId}
            productTitle={name}
            productHandle={handle}
            upsellVariantId={fameUpsellVariant && fameUpsellVariant.id}
            upsellVariantPrice={fameUpsellVariant && fameUpsellVariant.price}
            prominent={requiresProminentFame}
        />
    );
});
