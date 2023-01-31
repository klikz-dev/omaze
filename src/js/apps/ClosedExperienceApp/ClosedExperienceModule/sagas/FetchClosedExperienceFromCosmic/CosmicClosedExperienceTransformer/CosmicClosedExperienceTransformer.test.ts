import {
    createCosmicMetadataMock,
    createEmptyCosmicMetadataMock,
    createEmptyTransformedCosmicMock,
    createTransformedCosmicMock,
} from '../../../../shared/tests/CosmicMock';
import { ICosmicMetadata } from '../../../fetchClosedExperience/ICosmicMetadata';

import { CosmicClosedExperienceTransformer, ITransformedCosmic } from './CosmicClosedExperienceTransformer';

const transformedCosmicMock: ITransformedCosmic = createTransformedCosmicMock();

function testCosmicWhenMissingAdditionalWinners (cosmicMetaData: ICosmicMetadata): void {
    const cosmicTransformer: CosmicClosedExperienceTransformer = new CosmicClosedExperienceTransformer(cosmicMetaData);
    const cosmic: ITransformedCosmic = cosmicTransformer.getCosmic();

    expect(cosmic.nonProfit).toEqual(transformedCosmicMock.nonProfit);
    expect(cosmic.experience.prizeDetails).toEqual(transformedCosmicMock.experience.prizeDetails);
    expect(cosmic.experience.additionalWinners instanceof Array).toBe(true);
    expect(cosmic.experience.additionalWinners.length).toBe(0);
}

describe('CosmicClosedExperienceTransformer', (): void => {
    describe('getCosmic', (): void => {
        it('should transform cosmic metadata to correct cosmic consumable data', (): void => {
            const cosmicMetadataMock: ICosmicMetadata = createCosmicMetadataMock();
            const cosmicTransformer: CosmicClosedExperienceTransformer = new CosmicClosedExperienceTransformer(cosmicMetadataMock);
            const cosmic: ITransformedCosmic = cosmicTransformer.getCosmic();

            expect(cosmic).toEqual(transformedCosmicMock);
        });

        describe('when getAdditionalWinners is not given', (): void => {
            it('should transform cosmic metadata to correct cosmic consumable when getAdditionalWinners is undefined', (): void => {
                const cosmicMetadataMock: ICosmicMetadata = createCosmicMetadataMock();

                // eslint-disable-next-line camelcase
                cosmicMetadataMock.additional_winners = undefined;

                testCosmicWhenMissingAdditionalWinners(cosmicMetadataMock);
            });

            it('should transform cosmic metadata to correct cosmic consumable when getAdditionalWinners is an empty array', (): void => {
                const cosmicMetadataMock: ICosmicMetadata = createCosmicMetadataMock();

                // eslint-disable-next-line camelcase
                cosmicMetadataMock.additional_winners = [];

                testCosmicWhenMissingAdditionalWinners(cosmicMetadataMock);
            });
        });

        it('should handle empty cosmic data', (): void => {
            const cosmicTransformer: CosmicClosedExperienceTransformer = new CosmicClosedExperienceTransformer(createEmptyCosmicMetadataMock());
            const cosmic: ITransformedCosmic = cosmicTransformer.getCosmic();

            expect(cosmic).toEqual(createEmptyTransformedCosmicMock());
        });
    });
});
