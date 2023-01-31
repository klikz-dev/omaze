import React, { ReactElement, useCallback } from 'react';

import { CollectionLoading } from './CollectionLoading/CollectionLoading';
import { ISweepstakes } from './SweepstakesList/SweepstakesCard/SweepstakesCard';
import { SweepstakesList } from './SweepstakesList/SweepstakesList';
import { ICollection, transformShopifyCollection } from './transformShopifyCollection/transformShopifyCollection';
import { useEligibleCollection } from './useEligibleCollection/useEligibleCollection';
import { IUseShopifyCollection, useShopifyCollection } from './useShopifyCollection/useShopifyCollection';
import { useUserCountry } from './useUserCountry/useUserCountry';

export function CollectionApp (): ReactElement | null {
    const handle: string = window.location.pathname.split('/').pop() || '';
    const { collection: shopifyCollection, loading, pagination, fetchMore }: IUseShopifyCollection = useShopifyCollection(handle);
    const country: string | null = useUserCountry();
    const collection: ICollection | undefined = transformShopifyCollection(shopifyCollection);
    const filteredSweepstakes: ISweepstakes[] = useEligibleCollection(country, collection?.sweepstakesList || []);

    const handleScrollBottom: any = useCallback((): void => {
        if (!loading && pagination?.hasNextPage) {
            fetchMore();
        }
    }, [pagination]);

    if (!collection) {
        return (
            <div key="loading" data-testid="collection-loading">
                <CollectionLoading count={10} />
            </div>
        );
    }

    return <SweepstakesList key="sweepstakes-list" collection={filteredSweepstakes} onScrollBottom={handleScrollBottom} isLoadingMore={loading} />;
}
