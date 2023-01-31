export interface IAdditionalWinner {
    name: string;
    location: string;
    prize: string;
}

export interface INonProfit {
    thankYouName: string;
    messageName: string;
    netRaiseAmount: string;
    thankYouMessage: string;
    impactMessage: string;
    logo: {
        url: string;
        imgixUrl: string;
    };
}

export interface IImpactMediaAsset {
    caption: string;
    image: {
        imgixUrl: string | null;
        url: string | null;
    };
    youtubeVideoLink: string;
}

export interface IImpactMedia {
    assets: IImpactMediaAsset[];
    headline: string;
}

export interface IExperience {
    name: string;
    projectedWinnerAnnounceDate: Date;
    confirmedWinnerAnnounceDate?: Date;
    hasWinner: boolean;
    prizeDetails: string;
    additionalWinners: IAdditionalWinner[];
    impactMedia: IImpactMedia;
}

export interface IWinner {
    name: string;
    location: string;
    image: string;
}

export interface IAssets {
    winnerBackgroundImage: string;
    winnerPendingBackgroundImage: string;
    ovalBackgroundDesktop: string;
    ovalBackgroundMobile: string;
}

export interface IClosedExperienceState {
    isFetchingCosmic: boolean;
    fetchingCosmicError: string;
    assets: IAssets;
    nonProfit: INonProfit;
    experience: IExperience;
    winner: IWinner;
}
