export interface IShopify {
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
}
