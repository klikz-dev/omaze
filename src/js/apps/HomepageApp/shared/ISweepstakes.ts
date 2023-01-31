export interface ISweepstakesImage {
    src: string;
    alt: string;
}

export interface ISweepstakes {
    image: ISweepstakesImage;
    charity: string;
    title: string;
    url: string;
    handle: string;
    launchDate: Date;
    closeDate: Date;
    hasWinner: boolean;
}
