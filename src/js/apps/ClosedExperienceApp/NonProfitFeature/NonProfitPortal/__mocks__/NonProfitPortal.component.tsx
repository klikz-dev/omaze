import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { NonProfitPortal: OriginalNonProfitPortal }: any = jest.requireActual('../NonProfitPortal.component');

export const NonProfitPortal: FunctionComponent = createEmptyMock(OriginalNonProfitPortal);
