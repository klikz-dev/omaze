import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { ImpactMessageContainer: OriginalImpactMessageContainer }: any = jest.requireActual('../ImpactMessageContainer.component');

export const ImpactMessageContainer: FunctionComponent = createEmptyMock(OriginalImpactMessageContainer);
