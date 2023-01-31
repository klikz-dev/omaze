import { ISweepstakes } from '../SweepstakesList/SweepstakesCard/SweepstakesCard';
import { IShopifyCollection } from '../types/IShopifyCollection';
import { IShopifyEdge } from '../types/IShopifyConnection';
import { IShopifyProduct } from '../types/IShopifyProduct';

export interface ICollection {
    title: string;
    handle: string;
    sweepstakesList: ISweepstakes[];
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

export function transformShopifyCollection (shopifyCollection?: IShopifyCollection, collectionTitle?: string): ICollection | undefined {
    if (!shopifyCollection) {
        return undefined;
    }

    const sweepstakesList: ISweepstakes[] = shopifyCollection
        .products
        .edges
        .map((edge: IShopifyEdge<IShopifyProduct>): ISweepstakes => {
            const product: IShopifyProduct = edge.node;
            const imageSrc: string = product.images.edges[0].node.originalSrc;

            return {
                image: {
                    src: imageSrc,
                    alt: product.title,
                },
                charity: product.vendor,
                title: product.title,
                url: product.onlineStoreUrl || `/products/${product.handle}`,
                handle: product.handle,
                launchDate: getLaunchDateFromTags(product.tags),
                closeDate: getCloseDateFromTags(product.tags),
                hasWinner: product.metafield?.value === 'true',
            };
        });

    return {
        title: collectionTitle || shopifyCollection.title,
        handle: shopifyCollection.handle,
        sweepstakesList: sweepstakesList,
    };
}
