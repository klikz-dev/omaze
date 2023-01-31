export interface ICounterParams {
    start: number;
    end: number;
    callback: (count: number) => void;
    durationInMilliseconds?: number;
    intervalInMilliseconds?: number;
}

export function easeInOut (step: number, totalSteps: number): number {
    const progress: number = step / totalSteps;

    // easeInOutCubic - https://easings.net/#easeInOutCubic
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function count (
    start: number, end: number,
    step: number, totalSteps: number,
    waitTime: number,
    ease: (step: number, totalSteps: number) => number,
    callback: (count: number) => void
): void {
    if (step >= totalSteps) {
        callback(end);
        return;
    }

    const newVal: number = Math.floor(((end - start) * ease(step, totalSteps)) + start); // Gets a number from 0 to 1

    callback(newVal);

    const timerId: ReturnType<typeof setTimeout> = setTimeout((): void => {
        count(start, end, step + 1, totalSteps, waitTime, ease, callback);
        clearTimeout(timerId);
    }, waitTime);
}

export function counter (
    start: number, end: number,
    ease: (step: number, totalSteps: number) => number,
    callback: (count: number) => void
): void {
    // To allow for easing functions, we want a defined number of "steps" or function calls
    // to match the defined 2 seconds, with 4 ms interval, we results in 500 steps
    const DURATION: number = 2000;
    const STEPS: number = 500;
    const waitTime: number = DURATION / STEPS;

    count(start, end, 1, STEPS, waitTime, ease, callback);
}
