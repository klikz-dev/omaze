import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from '../../../../NonProfitFeature.namespace';

import { displayName, HEADLINE_QA } from './Headline.qa';
import styles from './Headline.styles.css';

export const Headline: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement => {
        return (
            <div className={styles.container} data-testid={HEADLINE_QA.CONTAINER}>
                <img
                    className={styles.sectionIcon}
                    src="//images.omaze.com/web/assets/images/static/features/closed-sweepstakes/non-profit-fist-icon.svg"
                    alt="non profit section"
                />

                <p className={styles.text}>
                    It&apos;s a win-win.
                </p>
            </div>
        );
    }
);
