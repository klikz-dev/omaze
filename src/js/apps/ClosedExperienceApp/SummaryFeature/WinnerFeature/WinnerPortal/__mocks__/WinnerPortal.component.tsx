import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { WinnerPortal: OriginalWinnerPortal }: any = jest.requireActual('../WinnerPortal.component');

export const WinnerPortal: FunctionComponent = createEmptyMock(OriginalWinnerPortal);
