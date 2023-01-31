import React, { useState, useEffect } from 'react';

import { useMediaQuery } from './useMediaQuery';

export const deviceBreakpoints: {[key: string]: number} = {
    TABLET: 1099,
    MOBILE: 719,
};

/*
* useMediaBreakpoint returns a breakpoint string based on the device width
*/
export function useMediaBreakpoint (): string {
    const [breakpoint, setBreakpoint]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');
    // width <= 719px
    const isMobile: boolean = useMediaQuery(`(max-width: ${deviceBreakpoints.MOBILE}px)`);
    // width <= 1099px  and >= 720 tablet
    const isTablet: boolean = useMediaQuery(`(min-width: ${deviceBreakpoints.MOBILE + 1}px) and (max-width: ${deviceBreakpoints.TABLET}px)`);
    // width >= 1100
    const isDesktop: boolean = useMediaQuery(`(min-width: ${deviceBreakpoints.TABLET + 1}px)`);

    useEffect((): void => {
        if (isMobile) {
            setBreakpoint('mobile');
        }

        if (isTablet) {
            setBreakpoint('tablet');
        }

        if (isDesktop) {
            setBreakpoint('desktop');
        }
    }, [isMobile, isTablet, isDesktop]);

    return breakpoint;
}
