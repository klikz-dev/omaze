import React, { MouseEvent, ReactElement } from 'react';
import { Settings } from 'react-slick';

import { Carousel } from '../Carousel/Carousel';
import { ISweepstakes } from '../shared/ISweepstakes';
import { SweepstakesCard } from '../SweepstakesCard/SweepstakesCard';
import { useEligibleCollection } from '../useEligibleCollection/useEligibleCollection';
import { useUserCountry } from '../useUserCountry/useUserCountry';

export interface ICollection {
    title: string;
    displayTitle?: string;
    handle: string;
    sweepstakesList: ISweepstakes[];
}

export interface ISweepstakesCarouselProps {
    'data-testid'?: string;
    collection: ICollection;
}

function trackCardClick (options: {collectionTitle: string, productHandle: string, index: number}): void {
    const {
        collectionTitle,
        productHandle,
        index,
    }: {collectionTitle: string, productHandle: string, index: number} = options;

    window.SDG.Analytics.events.pushDataLayerEvent({
        event: 'click',
        /* eslint-disable camelcase */
        ga_category: 'Homepage Curated Collections',
        ga_action: 'Product Click',
        ga_label: `${collectionTitle} ${productHandle}`,
        ga_value: index + 1,
        /* eslint-enable camelcase */
    });
}

function trackCollectionHeaderClick (options: {collectionTitle: string}): void {
    const { collectionTitle }: {collectionTitle: string} = options;

    window.SDG.Analytics.events.pushDataLayerEvent({
        event: 'click',
        /* eslint-disable camelcase */
        ga_category: 'Homepage Curated Collections',
        ga_action: 'Collection Page Link',
        ga_label: collectionTitle,
        /* eslint-enable camelcase */
    });
}

export function SweepstakesCarousel (props: ISweepstakesCarouselProps): ReactElement | null {
    const { 'data-testid': dataTestid, collection }: ISweepstakesCarouselProps = props;
    const { title, displayTitle, handle, sweepstakesList }: ICollection = collection;
    const country: string | null = useUserCountry();
    const filteredSweepstakes: ISweepstakes[] = useEligibleCollection(country, sweepstakesList);

    if (!filteredSweepstakes.length) {
        return null;
    }

    const slickSettings: Settings = {};

    slickSettings.beforeChange = function (current: number): void {
        window.SDG.Analytics.events.slickCuratedCollectionsCallback(null, null, current);
    };

    function onHeaderClick (event: MouseEvent<HTMLAnchorElement>, collectionTitle: string, collectionHandle: string) : void {
        event.preventDefault();
        trackCollectionHeaderClick({ collectionTitle: collectionTitle });
        window.location.href = `/collections/${collectionHandle}`;
    }

    return (
        <section data-testid={dataTestid} role="contentinfo" aria-label={displayTitle || title}>
            <Carousel settings={slickSettings} sweepstakesList={filteredSweepstakes}>
                <div className="oz-flex oz-justify-between oz-items-center oz-mb-2">
                    <Carousel.Header>
                        <a href={`/collections/${handle}`} onClick={(e: MouseEvent<HTMLAnchorElement>):void => {
                            onHeaderClick(e, title, handle);
                        }}
                        >{displayTitle || title}</a>
                    </Carousel.Header>
                    <Carousel.Pagination />
                </div>
                <Carousel.Content>
                    {filteredSweepstakes.map((sweepstake: ISweepstakes, index: number): ReactElement => {
                        return (
                            <Carousel.Item key={index}>
                                <div data-testid="ga-card" onClick={(): void => {
                                    trackCardClick({
                                        collectionTitle: title,
                                        productHandle: sweepstake.handle,
                                        index: index,
                                    });
                                }}
                                >
                                    <SweepstakesCard sweepstakes={sweepstake} />
                                </div>
                            </Carousel.Item>
                        );
                    })}
                </Carousel.Content>
            </Carousel>
        </section>
    );
}
