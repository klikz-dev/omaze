import { App, IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from '../ActiveExperienceApp.namespace';
import { Portal } from '../shared/Portal/Portal.component';

import { DonationCardsContainer } from './DonationCardsContainer/DonationCardsContainer.component';
import { displayName } from './DonationOptions.qa';
import { FameLinkContainer } from './FameLinkContainer/FameLinkContainer.component';
import { LayoutDonationOptions } from './LayoutDonationOptions/LayoutDonationOptions.component';
import { TitleContainer } from './TitleContainer/TitleContainer.component';

export const DonationOptions: IFunctionComponent = namespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
                <Portal el="active-experience-app__donation-cards">
                    <LayoutDonationOptions>
                        <TitleContainer />
                        <DonationCardsContainer />
                        <FameLinkContainer />
                    </LayoutDonationOptions>
                </Portal>
            </App>
        );
    }
);
