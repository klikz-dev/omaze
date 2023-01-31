interface IAdditionalWinner {
    name: string;
    location: string;
    prize: string;
}

/* eslint-disable camelcase */
export interface ICosmicImpactMediaAsset {
    caption: string;
    image: {
        imgix_url: string | null;
        url: string | null;
    };
    youtube_video_link: string;
}
/* eslint-enable camelcase */

/* eslint-disable camelcase */
export interface ICosmicMetadata {
    nonprofit_name: string;
    nonprofit_net_raise_amount: string;
    nonprofit_thank_you_message: string;
    nonprofit_stat: string;
    nonprofit_logo: {
        url: string;
        imgix_url: string;
    };
    prize_details: string;
    additional_winners?: IAdditionalWinner[];
    win_win_media?: ICosmicImpactMediaAsset[];
    win_win_media_headline?: string;
}
/* eslint-enable camelcase */
