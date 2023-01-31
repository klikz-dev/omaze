import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { Headline: OriginalHeadline }: any = jest.requireActual('../Headline.component');

export const Headline: FunctionComponent = createEmptyMock(OriginalHeadline);
