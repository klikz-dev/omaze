import React, { ReactElement } from 'react';

import { AnimatedCounter } from '../../shared/AnimatedCounter/AnimatedCounter.component';

import styles from './DonorCounterContainer.styles.css';

export interface IDonorCounterContainerProps {
    donorCount: number;
    initialDonorCount?: number;
    delay?: number;
}

export function DonorCounterContainer (props: IDonorCounterContainerProps): ReactElement {
    const { initialDonorCount = 0, donorCount, delay = 250 }: IDonorCounterContainerProps = props;

    return (
        <div className='mt-3 mb-3 md:mb-2 rebrand-md:mb-3'>
            <h2 className={`${styles.header}`} data-testid="headline">
                Join today&apos;s&nbsp;
                <span className={`${styles.highlight}`}>
                    {<AnimatedCounter start={initialDonorCount} end={donorCount} delay={delay} />} donors
                </span>
            </h2>
        </div>
    );
}
