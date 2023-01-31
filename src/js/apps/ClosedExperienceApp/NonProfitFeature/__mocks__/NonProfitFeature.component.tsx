import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { NonProfitFeature: OriginalNonProfitFeature }: any = jest.requireActual('../NonProfitFeature.component');

export const NonProfitFeature: FunctionComponent = createEmptyMock(OriginalNonProfitFeature);
