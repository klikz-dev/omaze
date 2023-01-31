import { IAdditionalWinner, IImpactMediaAsset } from '../../../ClosedExperience.state';
import { ICosmicMetadata, ICosmicImpactMediaAsset } from '../../../fetchClosedExperience/ICosmicMetadata';

export interface ITransformedCosmic {
    nonProfit: {
        messageName: string;
        netRaiseAmount: string;
        thankYouMessage: string;
        impactMessage: string;
        logo: {
            url: string;
            imgixUrl: string;
        };
    };
    experience: {
        prizeDetails: string;
        additionalWinners: IAdditionalWinner[];
        impactMedia: {
            assets: IImpactMediaAsset[];
            headline: string;
        };
    };
}

export class CosmicClosedExperienceTransformer {
    protected cosmicResponse: ICosmicMetadata;

    public constructor (cosmicResponse: ICosmicMetadata) {
        this.cosmicResponse = cosmicResponse;
    }

    public getCosmic (): ITransformedCosmic {
        return {
            nonProfit: {
                messageName: this.cosmicResponse.nonprofit_name || '',
                netRaiseAmount: this.cosmicResponse.nonprofit_net_raise_amount || '',
                thankYouMessage: this.cosmicResponse.nonprofit_thank_you_message || '',
                impactMessage: this.cosmicResponse.nonprofit_stat || '',
                logo: {
                    url: this.cosmicResponse.nonprofit_logo?.url || '',
                    imgixUrl: this.cosmicResponse.nonprofit_logo?.imgix_url || '',
                },
            },
            experience: {
                additionalWinners: this.getAdditionalWinners(),
                prizeDetails: this.cosmicResponse.prize_details || '',
                impactMedia: {
                    assets: this.getImpactMediaAssets(),
                    headline: this.cosmicResponse?.win_win_media_headline || '',
                },
            },
        };
    }

    public static transformImpactMediaAsset (mediaAsset: ICosmicImpactMediaAsset): IImpactMediaAsset {
        return {
            caption: mediaAsset.caption,
            image: {
                imgixUrl: mediaAsset.image.imgix_url,
                url: mediaAsset.image.url,
            },
            youtubeVideoLink: mediaAsset.youtube_video_link && mediaAsset.youtube_video_link.replace('watch?v=', 'embed/'),
        };
    }

    private getImpactMediaAssets (): IImpactMediaAsset[] {
        if (!this.cosmicResponse.win_win_media) {
            return [];
        }

        return this.cosmicResponse.win_win_media.map(CosmicClosedExperienceTransformer.transformImpactMediaAsset);
    }

    private getAdditionalWinners (): IAdditionalWinner[] {
        if (this.cosmicResponse.additional_winners === undefined) {
            return [];
        }

        return this.cosmicResponse.additional_winners;
    }
}

