import React, { ReactElement } from 'react';

import styles from './SweepstakesTag.styles.css';

export interface ISweepstakesTagProps {
    hasWinner: boolean;
    closeDate: Date;
    className?: string;
}

const millisecondsPerHour: number = 1000 * 60 * 60;

function getHoursFromNow (closeDate: Date): number {
    const milliseconds: number = closeDate.getTime() - Date.now();
    const hours: number = Math.ceil(milliseconds / millisecondsPerHour);

    return hours;
}

function getDaysFromNow (closeDate: Date): number {
    return Math.ceil(getHoursFromNow(closeDate) / 24);
}

const MAX_DAYS: number = 7;

export function SweepstakesTag (props: ISweepstakesTagProps): ReactElement | null {
    const {
        hasWinner,
        closeDate,
        className = '',
    }: ISweepstakesTagProps = props;

    const hours: number = getHoursFromNow(closeDate);
    const days: number = getDaysFromNow(closeDate);
    const tagClassName: string = `tag-text type-subtitle1 px-1 py-1/2 rounded ${className}`;

    if (days > MAX_DAYS) {
        return null;
    }

    if (days > 2) {
        return <div className={`${tagClassName} bg-rebrand-yellow-500`}>{days} days left!</div>;
    }

    if (hours > 0) {
        return <div className={`${tagClassName} bg-rebrand-yellow-500`}>{hours} hours left!</div>;
    }

    if (hasWinner) {
        return <div className={`${tagClassName} bg-white`}>See who won!</div>;
    }

    return <div className={`${tagClassName} ${styles.winnerPending}`}>Winner Pending</div>;
}
