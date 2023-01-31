import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { NonProfit: OriginalNonProfit }: any = jest.requireActual('../NonProfit.component');

export const NonProfit: FunctionComponent = createEmptyMock(OriginalNonProfit);
