import { IFunctionComponent } from '@omaze/app';
import React, { Fragment, ReactElement } from 'react';

import { Portal } from '../../../shared/Portal/Portal.component';
import { winnerFeatureNamespace } from '../WinnerFeature.namespace';

import { WinnerContainer } from './WinnerContainer/WinnerContainer.component';
import { displayName, WINNER_PORTAL_QA } from './WinnerPortal.qa';

export const WinnerPortal: IFunctionComponent = winnerFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        const container: ReactElement = (
            <div data-testid={WINNER_PORTAL_QA.CONTAINER}>
                <WinnerContainer />
            </div>
        );

        return (
            <Fragment>
                <Portal el='oz-closed-sweepstakes__winner--desktop'>
                    {container}
                </Portal>

                <Portal el='oz-closed-sweepstakes__winner--mobile'>
                    {container}
                </Portal>
            </Fragment>
        );
    }
);
