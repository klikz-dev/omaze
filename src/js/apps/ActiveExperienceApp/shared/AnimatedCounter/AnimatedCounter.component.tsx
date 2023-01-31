import React, { ReactElement, useEffect, useState } from 'react';

import { counter, easeInOut } from './utils/counter';

export interface IAnimatedCounterProps {
    end: number;
    start?: number;
    delay?: number;
    formatCount?: (count: number) => string;
}

export function AnimatedCounter (props: IAnimatedCounterProps): ReactElement {
    const { end, start = 0, delay = 0, formatCount }: IAnimatedCounterProps = props;
    const [count, setCount]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(start);

    function delayedCounter (start: number, end: number, delay: number): ReturnType<typeof setTimeout> {
        return setTimeout((): void => {
            counter(start, end, easeInOut, setCount);
        }, delay);
    }

    useEffect((): () => void => {
        const timerId: ReturnType<typeof setTimeout> = delayedCounter(start, end, delay);

        return (): void => {
            clearTimeout(timerId);
        };
    }, [start, end, delay]);

    const formattedCount: string = formatCount ? formatCount(count) : Number(count).toLocaleString('en');

    return (
        <>{formattedCount}</>
    );
}
