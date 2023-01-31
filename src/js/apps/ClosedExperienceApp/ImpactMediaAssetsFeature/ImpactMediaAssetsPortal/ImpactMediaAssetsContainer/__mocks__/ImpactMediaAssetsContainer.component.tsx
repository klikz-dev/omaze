import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { ImpactMediaAssetsContainer: OriginalImpactMediaAssetsContainer }: any = jest.requireActual('../ImpactMediaAssetsContainer.component');

export const ImpactMediaAssetsContainer: FunctionComponent = createEmptyMock(OriginalImpactMediaAssetsContainer);
