import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { PrizeDetailsPortal: OriginalPrizeDetailsPortal }: any = jest.requireActual('../PrizeDetailsPortal.component');

export const PrizeDetailsPortal: FunctionComponent = createEmptyMock(OriginalPrizeDetailsPortal);
