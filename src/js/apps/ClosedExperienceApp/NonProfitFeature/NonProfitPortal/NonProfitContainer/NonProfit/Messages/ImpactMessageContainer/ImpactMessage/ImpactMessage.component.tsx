import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from '../../../../../../NonProfitFeature.namespace';

import { displayName, IMPACT_MESSAGE_QA } from './ImpactMessage.qa';
import styles from './ImpactMessage.styles.css';

export interface IImpactMessageProps {
    message: string;
}

export const ImpactMessage: IFunctionComponent<IImpactMessageProps> = nonProfitFeatureNamespace.createComponent(
    displayName,
    (props: IImpactMessageProps): ReactElement => {
        const { message }: IImpactMessageProps = props;

        return (
            <div className={styles.container} data-testid={IMPACT_MESSAGE_QA.CONTAINER}>
                <h6 className={styles.header}>This Omaze experience can:</h6>
                <p className={styles.content}>{message}</p>
            </div>
        );
    }
);
