import React, { useEffect } from 'react';

export function useMediaQuery (query: string): boolean {
    const mediaQuery: MediaQueryList = window.matchMedia(query);
    const [match, setMatch]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = React.useState(!!mediaQuery.matches);

    useEffect((): () => void => {
        const handler: () => void = (): void => {
            return setMatch(!!mediaQuery.matches);
        };

        mediaQuery.addListener(handler);

        return (): void => {
            return mediaQuery.removeListener(handler);
        };
    }, [mediaQuery]);

    return match;
}
