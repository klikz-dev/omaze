import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { WinnerFeature: OriginalWinnerFeature }: any = jest.requireActual('../WinnerFeature.component');

export const WinnerFeature: FunctionComponent = createEmptyMock(OriginalWinnerFeature);
