import '@testing-library/jest-dom/extend-expect';

import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { APP_NAME } from '../../../ActiveExperienceApp.namespace';

import { LayoutDonationCards } from './LayoutDonationCards.component';
import { LAYOUT_DONATION_CARDS_QA } from './LayoutDonationCards.qa';
import { LayoutDonationCardsPresenter } from './LayoutDonationCardsPresenter/LayoutDonationCardsPresenter';

jest.mock('./LayoutDonationCardsPresenter/LayoutDonationCardsPresenter');

describe(LayoutDonationCards.displayName, (): void => {
    it('was created by the namespace', (): void => {
        expect(LayoutDonationCards.displayName).toContain('LayoutDonationCards');
        expect(LayoutDonationCards.app).toContain(APP_NAME);
    });

    beforeEach((): void => {
        mocked(LayoutDonationCardsPresenter).mockClear();
        mocked(LayoutDonationCardsPresenter.prototype.getAllClassNames).mockReturnValue({
            host: 'host',
        });
    });

    it('should render with a className', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <LayoutDonationCards />
        );

        expect(component.container.querySelector('.host')).toBeInTheDocument();
    });

    it('should render with a testId', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <LayoutDonationCards />
        );

        expect(component.getByTestId(LAYOUT_DONATION_CARDS_QA.CONTAINER)).toBeInTheDocument();
    });

    it('should accept a className prop and children', (): void => {
        bootstrapAndRender(
            <LayoutDonationCards className="extra" >
                <div></div>
                <div></div>
            </LayoutDonationCards>
        );

        expect(mocked(LayoutDonationCardsPresenter)).toHaveBeenCalledWith({
            className: 'extra',
            childrenCount: 2,
        });
    });
});
