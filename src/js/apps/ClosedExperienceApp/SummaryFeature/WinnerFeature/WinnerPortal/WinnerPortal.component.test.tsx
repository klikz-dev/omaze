import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { createFetchClosedExperienceFromShopifySuccessAction } from '../../../ClosedExperienceModule/actions/FetchClosedExperienceFromShopify/FetchClosedExperienceFromShopifySuccess/FetchClosedExperienceFromShopifySuccess';
import { getClosedExperienceModule } from '../../../ClosedExperienceModule/ClosedExperience.module';
import { createTransformedShopifyMock } from '../../../shared/tests/ShopifyMock';

import { WinnerPortal } from './WinnerPortal.component';
import { WINNER_PORTAL_QA } from './WinnerPortal.qa';

describe(WinnerPortal.displayName, (): void => {
    function renderWinnerPortal (): ITestComponent {
        const testComponent: ITestComponent = bootstrapAndRender(
            <WinnerPortal />,
            [getClosedExperienceModule()]
        );

        testComponent.store.dispatch(createFetchClosedExperienceFromShopifySuccessAction(createTransformedShopifyMock()));
        return testComponent;
    }

    function createPortalDiv (id: string): HTMLDivElement {
        const portalDiv: HTMLDivElement = document.createElement('div');

        portalDiv.id = id;
        document.body.appendChild(portalDiv);
        return portalDiv;
    }

    let desktopDiv: HTMLDivElement;
    let mobileDiv: HTMLDivElement;

    beforeEach((): void => {
        desktopDiv = createPortalDiv('oz-closed-sweepstakes__winner--desktop');
        mobileDiv = createPortalDiv('oz-closed-sweepstakes__winner--mobile');
    });

    afterEach((): void => {
        try {
            document.body.removeChild(desktopDiv);
            document.body.removeChild(mobileDiv);
            // eslint-disable-next-line no-empty
        } catch (e) {
        }
    });

    it('should render', (): void => {
        const { component }: ITestComponent = renderWinnerPortal();

        expect(component.getAllByTestId(WINNER_PORTAL_QA.CONTAINER).length).toEqual(2);
    });

    it('should render', (): void => {
        document.body.removeChild(desktopDiv);
        document.body.removeChild(mobileDiv);

        const { component }: ITestComponent = renderWinnerPortal();

        expect(component.queryAllByTestId(WINNER_PORTAL_QA.CONTAINER).length).toEqual(0);
    });
});
