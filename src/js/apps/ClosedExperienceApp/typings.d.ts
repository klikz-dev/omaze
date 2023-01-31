declare module '*.styles.css' {
    const classes: { [key: string]: string };
    // eslint-disable-next-line import/no-default-export
    export default classes;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
    SDG: any;
    ozClosedExperienceApp: {
        experience: {
            name: string;
            hasWinner: string;
            projectedWinnerAnnounceDate: string;
            confirmedWinnerAnnounceDate: string;
        };
        winner: {
            name: string;
            location: string;
            image: string;
        };
        nonProfit: {
            name: string;
        };
        assets: {
            winnerBackgroundImage: string;
            winnerPendingBackgroundImage: string;
            ovalBackgroundDesktop: string;
            ovalBackgroundMobile: string;
        };
        config: {
            slug: string;
            env: string;
        };
    };
}
