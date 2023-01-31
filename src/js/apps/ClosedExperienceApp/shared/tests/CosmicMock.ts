import { IAdditionalWinner } from '../../ClosedExperienceModule/ClosedExperience.state';
import { ICosmicMetadata } from '../../ClosedExperienceModule/fetchClosedExperience/ICosmicMetadata';
import { ITransformedCosmic } from '../../ClosedExperienceModule/sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

export function createAdditionalWinnersMock (): IAdditionalWinner[] {
    return [
        {
            name: 'Juan T.',
            location: 'Los Angeles, CA',
            prize: '$5,000',
        },
        {
            name: 'Gabriel U.',
            location: 'Belgorod, Ru',
            prize: 'a Kitty',
        },
    ];
}

export function createTransformedCosmicMock (): ITransformedCosmic {
    return {
        nonProfit: {
            messageName: 'Schrute Farms',
            netRaiseAmount: '$9,999,9999',
            thankYouMessage: '<strong>Thank you</strong>',
            impactMessage: 'Sponsor beets',
            logo: {
                url: 'beet1.png',
                imgixUrl: 'beet2.png',
            },
        },
        experience: {
            prizeDetails: '<p>Great prices</p>',
            additionalWinners: createAdditionalWinnersMock(),
            impactMedia: {
                assets: [
                    {
                        caption: 'Sebastian got his Mustang',
                        image: {
                            imgixUrl: null,
                            url: null,
                        },
                        youtubeVideoLink: 'https://www.youtube.com/embed/5wShHM7cxWU',
                    },
                    {
                        caption: 'International Medical Corps can keep saving lives',
                        image: {
                            imgixUrl: 'https://imgix.cosmicjs.com/8df1f270-31a5-11ea-96a7-8146ec741192-OrientExpressMWQ419ClosedPrizeThumbsHeadphones.png',
                            url: 'https://cdn.cosmicjs.com/8df1f270-31a5-11ea-96a7-8146ec741192-OrientExpressMWQ419ClosedPrizeThumbsHeadphones.png',
                        },
                        youtubeVideoLink: '',
                    },
                ],
                headline: 'Win this, fund that.',
            },
        },
    };
}

export function createEmptyTransformedCosmicMock (): ITransformedCosmic {
    return {
        nonProfit: {
            messageName: '',
            netRaiseAmount: '',
            thankYouMessage: '',
            impactMessage: '',
            logo: {
                url: '',
                imgixUrl: '',
            },
        },
        experience: {
            prizeDetails: '',
            additionalWinners: [],
            impactMedia: {
                assets: [],
                headline: '',
            },
        },
    };
}

/* eslint-disable camelcase */
export function createCosmicMetadataMock (): ICosmicMetadata {
    return {
        nonprofit_name: 'Schrute Farms',
        nonprofit_net_raise_amount: '$9,999,9999',
        nonprofit_thank_you_message: '<strong>Thank you</strong>',
        nonprofit_stat: 'Sponsor beets',
        nonprofit_logo: {
            url: 'beet1.png',
            imgix_url: 'beet2.png',
        },
        prize_details: '<p>Great prices</p>',
        additional_winners: createAdditionalWinnersMock(),
        win_win_media: [
            {
                caption: 'Sebastian got his Mustang',
                image: {
                    imgix_url: null,
                    url: null,
                },
                youtube_video_link: 'https://www.youtube.com/watch?v=5wShHM7cxWU',
            },
            {
                caption: 'International Medical Corps can keep saving lives',
                image: {
                    imgix_url: 'https://imgix.cosmicjs.com/8df1f270-31a5-11ea-96a7-8146ec741192-OrientExpressMWQ419ClosedPrizeThumbsHeadphones.png',
                    url: 'https://cdn.cosmicjs.com/8df1f270-31a5-11ea-96a7-8146ec741192-OrientExpressMWQ419ClosedPrizeThumbsHeadphones.png',
                },
                youtube_video_link: '',
            },
        ],
        win_win_media_headline: 'Win this, fund that.',
    };
}
/* eslint-enable camelcase */

/* eslint-disable camelcase */
export function createEmptyCosmicMetadataMock (): ICosmicMetadata {
    return {
        nonprofit_name: '',
        nonprofit_net_raise_amount: '',
        nonprofit_thank_you_message: '',
        nonprofit_stat: '',
        nonprofit_logo: {
            url: '',
            imgix_url: '',
        },
        prize_details: '',
    };
}
/* eslint-enable camelcase */
