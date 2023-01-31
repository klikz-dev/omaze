import '@testing-library/jest-dom/extend-expect';

import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { within } from '@testing-library/dom';
import React from 'react';

import { APP_NAME } from '../ActiveExperienceApp.namespace';

import { DonationCardsContainer } from './DonationCardsContainer/DonationCardsContainer.component';
import { DonationOptions } from './DonationOptions.component';
import { FameLinkContainer } from './FameLinkContainer/FameLinkContainer.component';
import { LAYOUT_DONATION_OPTIONS_QA } from './LayoutDonationOptions/LayoutDonationOptions.qa';
import { TitleContainer } from './TitleContainer/TitleContainer.component';

jest.mock('./TitleContainer/TitleContainer.component');
jest.mock('./DonationCardsContainer/DonationCardsContainer.component');
jest.mock('./FameLinkContainer/FameLinkContainer.component');

describe(DonationOptions.displayName, (): void => {
    it('was created by the namespace', (): void => {
        expect(DonationOptions.displayName).toContain('DonationOptions');
        expect(DonationOptions.app).toContain(APP_NAME);
    });

    describe('content', (): void => {
        let portalEl: HTMLDivElement;

        beforeEach((): void => {
            portalEl = document.createElement('div');

            portalEl.id = 'active-experience-app__donation-cards';

            document.body.appendChild(portalEl);
        });

        afterEach((): void => {
            document.body.removeChild(portalEl);
        });

        it('should render within a portal', (): void => {
            bootstrapAndRender(<DonationOptions />);

            expect(within(portalEl).getByText(TitleContainer.displayName)).toBeInTheDocument();
            expect(within(portalEl).getByText(DonationCardsContainer.displayName)).toBeInTheDocument();
            expect(within(portalEl).getByText(FameLinkContainer.displayName)).toBeInTheDocument();
        });

        it('should be wrapped with layout component', (): void => {
            const { component }: ITestComponent = bootstrapAndRender(
                <DonationOptions />
            );

            expect(component.queryByTestId(LAYOUT_DONATION_OPTIONS_QA.CONTAINER)).toBeInTheDocument();
        });
    });
});
