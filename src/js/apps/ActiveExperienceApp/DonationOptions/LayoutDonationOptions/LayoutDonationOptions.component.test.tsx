import '@testing-library/jest-dom/extend-expect';

import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { APP_NAME } from '../../ActiveExperienceApp.namespace';

import { LayoutDonationOptions } from './LayoutDonationOptions.component';
import { LayoutDonationOptionsPresenter } from './LayoutDonationOptionsPresenter/LayoutDonationOptionsPresenter';

jest.mock('./LayoutDonationOptionsPresenter/LayoutDonationOptionsPresenter');

describe(LayoutDonationOptions.displayName, (): void => {
    it('was created by the namespace', (): void => {
        expect(LayoutDonationOptions.displayName).toContain('LayoutDonationOptions');
        expect(LayoutDonationOptions.app).toContain(APP_NAME);
    });

    beforeEach((): void => {
        mocked(LayoutDonationOptionsPresenter).mockClear();
        mocked(LayoutDonationOptionsPresenter.prototype.getAllClassNames).mockReturnValue({
            host: 'host',
            innerWrapper: 'innerWrapper',
        });
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <LayoutDonationOptions />
        );

        expect(component.container.querySelector('.host')).toBeInTheDocument();
    });
});
