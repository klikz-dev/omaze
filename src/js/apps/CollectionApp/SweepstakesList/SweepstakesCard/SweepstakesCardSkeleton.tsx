import { OzSkeletonBox } from '@omaze/omaze-ui';
import React, { Fragment, ReactElement } from 'react';

import styles from './SweepstakesCardSkeleton.styles.css';

export function SweepstakesCardSkeleton (): ReactElement {
    return (
        <Fragment>
            <OzSkeletonBox className={`${styles.cardImage}`} />
            <OzSkeletonBox className={`${styles.cardDesc1}`} />
            <OzSkeletonBox className={`${styles.cardDesc2}`} />
            <OzSkeletonBox className={`${styles.cardDesc3}`} />
        </Fragment>
    );
}
