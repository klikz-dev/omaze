import '@testing-library/jest-dom/extend-expect';

import { BUTTON_SIZE, BUTTON_STYLE } from '@omaze/omaze-ui';
import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { APP_NAME } from '../../../ActiveExperienceApp.namespace';

import { FameLink } from './FameLink.component';
import { FAME_LINK_QA } from './FameLink.qa';
import { FameLinkPresenter } from './FameLinkPresenter/FameLinkPresenter';

jest.mock('./FameLinkPresenter/FameLinkPresenter');

describe(FameLink.displayName, (): void => {
    beforeEach((): void => {
        mocked(FameLinkPresenter).mockClear();
        mocked(FameLinkPresenter.prototype.getAllClassNames).mockReturnValue({
            host: 'host',
        });
        mocked(FameLinkPresenter.prototype.getFameHref).mockReturnValue('fame-href');
        mocked(FameLinkPresenter.prototype.getFameLinkType).mockReturnValue({
            size: BUTTON_SIZE.SMALL,
            style: BUTTON_STYLE.SECONDARY,
        });
    });

    it('was created by the namespace', (): void => {
        expect(FameLink.displayName).toContain('FameLink');
        expect(FameLink.app).toContain(APP_NAME);
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <FameLink
                hostName='will mock'
                productId={123}
                productTitle='will mock'
                productHandle='will mock'
                prominent={true}
            />
        );

        expect(component.container.querySelector('.host')).toBeInTheDocument();
        expect(component.getByTestId(FAME_LINK_QA.CONTAINER)).toHaveAttribute('href', 'fame-href');
        expect(component.getByTestId(FAME_LINK_QA.CONTAINER)).toHaveAttribute('referrerPolicy', 'no-referrer-when-downgrade');
    });
});
