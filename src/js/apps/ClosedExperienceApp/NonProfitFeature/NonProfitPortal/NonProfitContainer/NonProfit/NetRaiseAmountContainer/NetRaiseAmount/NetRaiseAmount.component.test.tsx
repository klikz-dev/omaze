import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { mocked } from 'ts-jest/utils';

import { FEATURE_NAME } from '../../../../../NonProfitFeature.namespace';

import { NetRaiseAmount } from './NetRaiseAmount.component';
import { NetRaiseAmountPresenter } from './NetRaiseAmountPresenter/NetRaiseAmountPresenter';

jest.mock('./NetRaiseAmountPresenter/NetRaiseAmountPresenter');

describe(NetRaiseAmount.displayName, (): void => {
    it('should have displayName', (): void => {
        expect(NetRaiseAmount.displayName).toContain('NetRaiseAmount');
        expect(NetRaiseAmount.app).toBe(FEATURE_NAME);
    });

    let component: RenderResult;

    beforeEach((): void => {
        mocked(NetRaiseAmountPresenter).mockClear();
        mocked(NetRaiseAmountPresenter.prototype.getAllClassNames).mockReturnValue({
            container: 'net-raise-classnames',
            textContainer: 'text-container',
            amount: 'net-raise-amount',
            caption: 'net-raise-caption',
        });
        mocked(NetRaiseAmountPresenter.prototype.getImageDesktopClassNames).mockReturnValue('image-desktop');
        mocked(NetRaiseAmountPresenter.prototype.getImageMobileClassNames).mockReturnValue('image-mobile');

        const testComponent: ITestComponent = bootstrapAndRender(
            <NetRaiseAmount
                messageName='International Medical Corps'
                netRaiseAmount='2,000'
                ovalBackgroundDesktop={'ovalBackgroundDesktop.png'}
                ovalBackgroundMobile={'ovalBackgroundMobile.png'}
            />
        );

        component = testComponent.component;
    });

    it('should render', (): void => {
        expect(component.container.querySelector('.net-raise-classnames')).toBeInTheDocument();
        expect(component.container.querySelector('.image-desktop')).toBeInTheDocument();
        expect(component.container.querySelector('.image-mobile')).toBeInTheDocument();
        expect(component.container.querySelector('.net-raise-amount')).toBeInTheDocument();
        expect(component.container.querySelector('.net-raise-caption')).toBeInTheDocument();
        expect(component.getByText('2,000')).toBeInTheDocument();
    });
});
