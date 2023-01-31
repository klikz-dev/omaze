import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { SummaryFeature: OriginalSummaryFeature }: any = jest.requireActual('../SummaryFeature.component');

export const SummaryFeature: FunctionComponent = createEmptyMock(OriginalSummaryFeature);
