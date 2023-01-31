import '@testing-library/jest-dom/extend-expect';

import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { APP_NAME } from '../../../ActiveExperienceApp.namespace';
import { IExperience, IVariant } from '../../../ActiveExperienceModule/ActiveExperience.state';

import { DonationCard } from './DonationCard.component';
import { DONATION_CARD_QA } from './DonationCard.qa';
import { DonationCardPresenter, IDonationCardAnalytics } from './DonationCardPresenter/DonationCardPresenter';

jest.mock('./DonationCardPresenter/DonationCardPresenter');

describe(DonationCard.displayName, (): void => {
    const mockVariant: IVariant = {
        id: 1,
        sku: 'hello SKU',
        title: 'title',
        name: 'name',
        price: 1000,
        metafields: {
            calloutText: 'hello',
        },
    };

    const mockExperience: IExperience = {
        id: 1,
        handle: 'mock-handle',
        name: 'mock-name',
    };

    const mockAnalyticsData: IDonationCardAnalytics = {
        id: 'addToCart',
        track: 'click',
        details: 'product_id:100;variant_id:200',
    };

    it('was created by the namespace', (): void => {
        expect(DonationCard.displayName).toContain('DonationCard');
        expect(DonationCard.app).toContain(APP_NAME);
    });

    beforeEach((): void => {
        mocked(DonationCardPresenter).mockClear();
        mocked(DonationCardPresenter.prototype.getAnalytics).mockReturnValue(mockAnalyticsData);
        mocked(DonationCardPresenter.prototype.getAllClassNames).mockReturnValue({
            host: 'host',
            entriesBlock: 'entriesBlock',
            entriesAmount: 'entriesAmount',
            entriesText: 'entriesText',
            ctaButton: 'ctaButton',
            badge: 'badge',
        });
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <DonationCard variant={mockVariant} experience={mockExperience}/>
        );

        expect(component.container.querySelector('.host')).toBeInTheDocument();
        expect(component.getByTestId(DONATION_CARD_QA.CONTAINER)).toBeInTheDocument();
    });

    it('should render badge if text exists', (): void => {
        mocked(DonationCardPresenter.prototype.getBadgeText).mockReturnValue('hello badge');

        const { component }: ITestComponent = bootstrapAndRender(
            <DonationCard variant={mockVariant} experience={mockExperience}/>
        );

        expect(component.container.querySelector('.badge')).toBeInTheDocument();
    });

    it('should not render badge with no text', (): void => {
        mocked(DonationCardPresenter.prototype.getBadgeText).mockReturnValue(undefined);

        const { component }: ITestComponent = bootstrapAndRender(
            <DonationCard variant={mockVariant} experience={mockExperience}/>
        );

        expect(component.container.querySelector('.badge')).not.toBeInTheDocument();
    });
});
