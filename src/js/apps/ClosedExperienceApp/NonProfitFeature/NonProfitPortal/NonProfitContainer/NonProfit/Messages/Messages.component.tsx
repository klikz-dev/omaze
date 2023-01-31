import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from '../../../../NonProfitFeature.namespace';

import { ImpactMessageContainer } from './ImpactMessageContainer/ImpactMessageContainer.component';
import { displayName, MESSAGES_QA } from './Messages.qa';
import styles from './Messages.styles.css';
import { ThankYouMessageContainer } from './ThankYouMessageContainer/ThankYouMessageContainer.component';

export const Messages: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {
        return (
            <div className={styles.container} data-testid={MESSAGES_QA.CONTAINER}>
                <ThankYouMessageContainer />
                <ImpactMessageContainer />
            </div>
        );
    }
);
