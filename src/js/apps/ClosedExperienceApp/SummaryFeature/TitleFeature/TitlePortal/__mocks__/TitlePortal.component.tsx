import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { TitlePortal: OriginalTitlePortal }: any = jest.requireActual('../TitlePortal.component');

export const TitlePortal: FunctionComponent = createEmptyMock(OriginalTitlePortal);
