import React, { ReactElement } from 'react';

import { ISweepstakes } from '../shared/ISweepstakes';
import { IShopifyCollection } from '../useShopifyCollection/IShopifyCollection';
import { IShopifyEdge } from '../useShopifyCollection/IShopifyConnection';
import { IShopifyProduct } from '../useShopifyCollection/IShopifyProduct';
import { IUseShopifyCollection, useShopifyCollection } from '../useShopifyCollection/useShopifyCollection';

import { CarouselLoading } from './CarouselLoading';
import { ICollection, SweepstakesCarousel } from './SweepstakesCarousel';

interface ISweepstakesCarouselContainer {
    collectionId: string;
    collectionHandle: string;
    collectionDisplayTitle?: string;
    decrementValidCuratedCollectionsCount?: () => void;
}

function getLaunchDateFromTags (tags: string[]): Date {
    const START_DATE_TAG_PREFIX: string = '$oz_sweepstake_dates-start:';

    const startDateTag: string | undefined = tags.find((tag: string): boolean => {
        return tag.startsWith(START_DATE_TAG_PREFIX);
    });

    if (!startDateTag) {
        return new Date('invalid date');
    }

    return new Date(startDateTag.replace(START_DATE_TAG_PREFIX, ''));
}

function getCloseDateFromTags (tags: string[]): Date {
    const END_DATE_TAG_PREFIX: string = '$oz_sweepstake_dates-end:';

    const endDateTag: string | undefined = tags.find((tag: string): boolean => {
        return tag.startsWith(END_DATE_TAG_PREFIX);
    });

    if (!endDateTag) {
        return new Date('invalid date');
    }

    return new Date(endDateTag.replace(END_DATE_TAG_PREFIX, ''));
}

function transformShopifyCollection (shopifyCollection: IShopifyCollection | undefined, collectionDisplayTitle: string | undefined): ICollection | undefined {
    if (!shopifyCollection) {
        return undefined;
    }

    const sweepstakesList: ISweepstakes[] = shopifyCollection
        .products
        .edges
        .map((product: IShopifyEdge<IShopifyProduct>): ISweepstakes => {
            const imageSrc: string = product.node.images.edges[0].node.originalSrc;

            return {
                image: {
                    src: imageSrc,
                    alt: product.node.title,
                },
                charity: product.node.vendor,
                title: product.node.title,
                url: '',
                handle: product.node.handle,
                launchDate: getLaunchDateFromTags(product.node.tags),
                closeDate: getCloseDateFromTags(product.node.tags),
                hasWinner: !!(product.node.metafield?.value === 'true'),
            };
        });

    return {
        title: shopifyCollection.title,
        displayTitle: collectionDisplayTitle,
        handle: shopifyCollection.handle,
        sweepstakesList: sweepstakesList,
    };
}

function isValidCuratedCollection (shopifyCollection: IShopifyCollection | undefined): boolean {
    if (!shopifyCollection) {
        return false;
    }

    const MIN_CAROUSEL_PRODUCTS: number = 4;
    const productCount: number = shopifyCollection.products.edges.length;

    return productCount >= MIN_CAROUSEL_PRODUCTS;
}

export function SweepstakesCarouselContainer (props: ISweepstakesCarouselContainer): ReactElement | null {
    const { collectionHandle, collectionDisplayTitle, decrementValidCuratedCollectionsCount }:ISweepstakesCarouselContainer = props;
    const { collection: shopifyCollection, loading, error }: IUseShopifyCollection = useShopifyCollection(collectionHandle);

    React.useEffect((): void => {
        if (shopifyCollection && !isValidCuratedCollection(shopifyCollection) && decrementValidCuratedCollectionsCount) {
            decrementValidCuratedCollectionsCount();
        }
    }, [shopifyCollection, decrementValidCuratedCollectionsCount]);

    if (loading) {
        return (
            <CarouselLoading />
        );
    }

    if (error) {
        return <div>An error occurred</div>;
    }

    if (!shopifyCollection || !isValidCuratedCollection(shopifyCollection)) {
        return null;
    }

    const collection: ICollection | undefined = transformShopifyCollection(shopifyCollection, collectionDisplayTitle);

    if (!collection) {
        return null;
    }

    return (
        <SweepstakesCarousel
            data-testid='sweepstakes-carousel'
            collection={collection}
        />
    );
}
