import { IFeaturedAd, usePage, IUsePage, IBlock } from '@omaze/cms';
import React, { ReactElement } from 'react';

import { FeaturedAd } from './FeaturedAd/FeaturedAd';
import { SkeletonLoading } from './SkeletonLoading/SkeletonLoading';

export function FeaturedAdList (): ReactElement | null {
    const { loading, error, page }: IUsePage = usePage(window.ozSanityConfig.pages['home_page']);

    if (loading) {
        return (
            <div data-testid='featuredAdLoadingTest'>
                <SkeletonLoading />;
            </div>
        );
    }

    if (error) {
        return <div>Error! Something went wrong.</div>;
    }

    if (!page) {
        return null;
    }

    const featuredAds: IFeaturedAd[] = page.blocks
        .filter((block: IBlock): boolean => {
            return block.type === 'FeaturedAd';
        })
        .map((block: IBlock): IFeaturedAd => {
            return block.content;
        });

    return (
        <div>
            {
                featuredAds.map((featuredAd: IFeaturedAd, index: number ): ReactElement => {
                    function trackFeaturedAd (): void {
                        window.dataLayer = window.dataLayer || [];

                        /* eslint-disable camelcase */
                        window.dataLayer.push({
                            event: 'click',
                            ga_category: 'Homepage Buttons',
                            ga_action: 'Click',
                            ga_label: `Homepage Hero ${index + 1}`,
                        });
                        /* eslint-enable camelcase */
                    }

                    return (
                        <FeaturedAd
                            key={featuredAd.title}
                            className="oz-mb-2 md:oz-mb-4"
                            {...featuredAd}
                            onClick={trackFeaturedAd}
                        />
                    );
                })
            }
        </div>
    );
}
