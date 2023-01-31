import React, { ReactElement } from 'react';

import { SweepstakesCarouselContainer } from '../SweepstakesCarousel/SweepstakesCarouselContainer';

interface IShopifyCuratedCollection {
    id: string;
    url: string;
    displayTitle?: string;
}

interface IShopifyDefaultCollection {
    id: string;
    url: string;
    displayTitle: string;
    products: any[];
}

interface IOzShopifyCuratedCollectionsData {
    curated: IShopifyCuratedCollection[];
    default: IShopifyDefaultCollection;
}

function getCollectionHandleFromUrl (url: string): string {
    const URL_PREFIX: string = '/collections/';

    return url.replace(URL_PREFIX, '');
}

function removeDuplicateCollections (collections: IShopifyCuratedCollection[]): IShopifyCuratedCollection[] {
    const collectionIds: { [key: string]: IShopifyCuratedCollection } = {};

    collections.forEach((collection: IShopifyCuratedCollection): void => {
        collectionIds[collection.id] = collection;
    });

    return Object.values(collectionIds);
}

function getCuratedCollectionsFromShopifyCMS () :IOzShopifyCuratedCollectionsData {
    return window.__OzShopifyCuratedCollectionsData;
}

export function CuratedCollections (): ReactElement {
    const { curated, default: defaultCollection }: IOzShopifyCuratedCollectionsData = getCuratedCollectionsFromShopifyCMS();
    const curatedCollections: IShopifyCuratedCollection[] = removeDuplicateCollections(curated);
    const [validCuratedCollectionsCount, setValidCuratedCollectionsCount]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState<number>(curatedCollections.length);
    const renderDefaultCollection: boolean = validCuratedCollectionsCount === 0;

    const decrementValidCuratedCollectionsCount: () => void = React.useCallback((): void => {
        setValidCuratedCollectionsCount((count: number): number => {
            return count - 1;
        });
    }, []);

    if (renderDefaultCollection) {
        return (
            <div className="oz-mt-5 lg:oz-mt-8">
                <SweepstakesCarouselContainer
                    collectionHandle={getCollectionHandleFromUrl(defaultCollection.url)}
                    collectionId={defaultCollection.id}
                    collectionDisplayTitle={defaultCollection.displayTitle}
                />
            </div>
        );
    }

    return (
        <div>
            {curatedCollections.map((collection: IShopifyCuratedCollection): ReactElement => {
                return (
                    <div key={collection.id} className="oz-mt-5 lg:oz-mt-8">
                        <SweepstakesCarouselContainer
                            collectionHandle={getCollectionHandleFromUrl(collection.url)}
                            collectionId={collection.id}
                            collectionDisplayTitle={collection.displayTitle}
                            decrementValidCuratedCollectionsCount={decrementValidCuratedCollectionsCount}
                        />
                    </div>
                );
            })}
        </div>
    );
}
