import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { NonProfitContainer: OriginalNonProfitContainer }: any = jest.requireActual('../NonProfitContainer.component');

export const NonProfitContainer: FunctionComponent = createEmptyMock(OriginalNonProfitContainer);
