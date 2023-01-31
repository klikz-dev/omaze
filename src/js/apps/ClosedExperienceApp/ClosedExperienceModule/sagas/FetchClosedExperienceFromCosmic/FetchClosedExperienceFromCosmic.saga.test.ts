import { expectSaga, RunResult } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';

import { IShopify } from '../../../shared/Shopify/IShopify';
import { createCosmicMetadataMock, createTransformedCosmicMock } from '../../../shared/tests/CosmicMock';
import { createShopifyMock } from '../../../shared/tests/ShopifyMock';
import { createFetchClosedExperienceFromCosmicErrorAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicError/FetchClosedExperienceFromCosmicError';
import { createFetchClosedExperienceFromCosmicStartAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { fetchClosedExperience } from '../../fetchClosedExperience/fetchClosedExperience';
import { ICosmicMetadata } from '../../fetchClosedExperience/ICosmicMetadata';

import {
    CosmicClosedExperienceTransformer,
    ITransformedCosmic,
} from './CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';
import { watchFetchClosedExperienceFromCosmic } from './FetchClosedExperienceFromCosmic.saga';

const shopifyMock: IShopify = createShopifyMock();
const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();
const responseMock: ICosmicMetadata = createCosmicMetadataMock();

describe('watchFetchClosedExperienceFromCosmic', (): void => {
    window.ozClosedExperienceApp = shopifyMock;

    const cosmicClosedExperienceTransformer: CosmicClosedExperienceTransformer = new CosmicClosedExperienceTransformer(createCosmicMetadataMock());

    it('should fetch a closed experience from cosmic when a get closed experience start action occurs', (): Promise<RunResult> => {

        return expectSaga(watchFetchClosedExperienceFromCosmic)
            .provide([
                [call(fetchClosedExperience, shopifyMock.config), responseMock],
                [call([cosmicClosedExperienceTransformer, cosmicClosedExperienceTransformer.getCosmic]), transformedCosmicMock],
            ])
            .call(fetchClosedExperience, shopifyMock.config)
            .call([cosmicClosedExperienceTransformer, cosmicClosedExperienceTransformer.getCosmic])
            .put(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock))
            .dispatch(createFetchClosedExperienceFromCosmicStartAction())
            .run();
    },
    );

    it('should fail to fetch a closed experience from cosmic when a get closed experience start action occurs', (): Promise<RunResult> => {
        const responseMock: undefined = undefined;

        return expectSaga(watchFetchClosedExperienceFromCosmic)
            .provide([
                [call(fetchClosedExperience, shopifyMock.config), responseMock],
            ])
            .call(fetchClosedExperience, shopifyMock.config)
            .put(createFetchClosedExperienceFromCosmicErrorAction('[getClosedExperience]: could not fetch closed experience data from cosmic api'))
            .dispatch(createFetchClosedExperienceFromCosmicStartAction())
            .run();
    },
    );
});
