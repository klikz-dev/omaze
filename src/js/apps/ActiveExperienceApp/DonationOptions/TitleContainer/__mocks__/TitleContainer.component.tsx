import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { TitleContainer: OriginalTitleContainer }: any = jest.requireActual('../TitleContainer.component');

export const TitleContainer: FunctionComponent = createEmptyMock(OriginalTitleContainer);
