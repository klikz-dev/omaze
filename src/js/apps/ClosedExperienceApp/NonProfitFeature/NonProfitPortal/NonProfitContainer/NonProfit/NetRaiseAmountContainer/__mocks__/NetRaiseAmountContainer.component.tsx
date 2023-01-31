import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { NetRaiseAmountContainer: OriginalNetRaiseAmountContainer }: any = jest.requireActual('../NetRaiseAmountContainer.component');

export const NetRaiseAmountContainer: FunctionComponent = createEmptyMock(OriginalNetRaiseAmountContainer);
