import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { TitleFeature: OriginalTitleFeature }: any = jest.requireActual('../TitleFeature.component');

export const TitleFeature: FunctionComponent = createEmptyMock(OriginalTitleFeature);
