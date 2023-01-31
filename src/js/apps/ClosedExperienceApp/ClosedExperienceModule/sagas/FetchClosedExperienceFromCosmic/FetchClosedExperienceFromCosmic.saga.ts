import { call, put, takeLatest } from 'redux-saga/effects';

import { createFetchClosedExperienceFromCosmicErrorAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicError/FetchClosedExperienceFromCosmicError';
import { isFetchClosedExperienceFromCosmicStartAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicStart/FetchClosedExperienceFromCosmicStart';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { fetchClosedExperience } from '../../fetchClosedExperience/fetchClosedExperience';
import { ICosmicMetadata } from '../../fetchClosedExperience/ICosmicMetadata';
import { IConfig } from '../../shared/IConfig';

import { CosmicClosedExperienceTransformer } from './CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

export function* fetchClosedExperienceFromCosmicSaga (): Iterator<any> {
    try {
        const config: IConfig = window.ozClosedExperienceApp.config;
        const response: ICosmicMetadata | undefined = yield call(fetchClosedExperience, config);

        if (!response) {
            throw new Error('[getClosedExperience]: could not fetch closed experience data from cosmic api');
        }

        const cosmicClosedExperienceTransformer: CosmicClosedExperienceTransformer = new CosmicClosedExperienceTransformer(response);
        const transformedCosmic: any = yield call([cosmicClosedExperienceTransformer, cosmicClosedExperienceTransformer.getCosmic]);

        yield put(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmic));
    } catch (error) {
        yield put(createFetchClosedExperienceFromCosmicErrorAction(error.message));
    }
}

export function* watchFetchClosedExperienceFromCosmic (): Iterator<any> {
    yield takeLatest(isFetchClosedExperienceFromCosmicStartAction, fetchClosedExperienceFromCosmicSaga);
}
