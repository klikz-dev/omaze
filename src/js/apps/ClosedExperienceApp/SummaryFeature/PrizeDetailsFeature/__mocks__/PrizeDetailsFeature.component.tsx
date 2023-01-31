import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { PrizeDetailsFeature: OriginalPrizeDetailsFeature }: any = jest.requireActual('../PrizeDetailsFeature.component');

export const PrizeDetailsFeature: FunctionComponent = createEmptyMock(OriginalPrizeDetailsFeature);
