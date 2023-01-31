import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { PrizeDetailsContainer: OriginalPrizeDetailsContainer }: any = jest.requireActual('../PrizeDetailsContainer.component');

export const PrizeDetailsContainer: FunctionComponent = createEmptyMock(OriginalPrizeDetailsContainer);
