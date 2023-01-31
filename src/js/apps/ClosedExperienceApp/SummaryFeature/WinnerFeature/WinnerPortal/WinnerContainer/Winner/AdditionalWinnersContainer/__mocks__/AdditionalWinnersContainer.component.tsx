import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { AdditionalWinnersContainer: OriginalAdditionalWinnersContainer }: any = jest.requireActual('../AdditionalWinnersContainer.component');

export const AdditionalWinnersContainer: FunctionComponent = createEmptyMock(OriginalAdditionalWinnersContainer);
