import { createStateTestFixture, ISelect, IStateTestFixture } from '@omaze/test';
import { Dispatch } from 'redux';

import { createTransformedCosmicMock } from '../../../shared/tests/CosmicMock';
import { createFetchClosedExperienceFromCosmicSuccessAction } from '../../actions/FetchClosedExperienceFromCosmic/FetchClosedExperienceFromCosmicSuccess/FetchClosedExperienceFromCosmicSuccess';
import { getClosedExperienceModule } from '../../ClosedExperience.module';
import { IImpactMedia } from '../../ClosedExperience.state';
import { ITransformedCosmic } from '../../sagas/FetchClosedExperienceFromCosmic/CosmicClosedExperienceTransformer/CosmicClosedExperienceTransformer';

import { selectImpactMedia } from './selectImpactMedia';

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

describe('selectImpactMedia', (): void => {
    let select: ISelect;
    let dispatch: Dispatch;

    beforeEach((): void => {
        const testFixture: IStateTestFixture = createStateTestFixture(getClosedExperienceModule());

        dispatch = testFixture.dispatch;
        select = testFixture.select;
    });

    it('should be able to select the media assets details', (): void => {
        dispatch(createFetchClosedExperienceFromCosmicSuccessAction(transformedCosmicMock));

        const mediaDetails: IImpactMedia = select(selectImpactMedia);

        expect(mediaDetails.headline).toBe(transformedCosmicMock.experience.impactMedia.headline);
        expect(mediaDetails.assets[0].caption).toBe(transformedCosmicMock.experience.impactMedia.assets[0].caption);
        expect(mediaDetails.assets[0].youtubeVideoLink).toBe(transformedCosmicMock.experience.impactMedia.assets[0].youtubeVideoLink);
        expect(mediaDetails.assets[1].caption).toBe(transformedCosmicMock.experience.impactMedia.assets[1].caption);
        expect(mediaDetails.assets[1].image.imgixUrl).toBe(transformedCosmicMock.experience.impactMedia.assets[1].image.imgixUrl);
        expect(mediaDetails.assets[1].image.url).toBe(transformedCosmicMock.experience.impactMedia.assets[1].image.url);
    });
});
