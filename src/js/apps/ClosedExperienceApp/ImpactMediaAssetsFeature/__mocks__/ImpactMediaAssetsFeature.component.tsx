import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { ImpactMediaAssetsFeature: OriginalImpactMediaAssetsFeature }: any = jest.requireActual('../ImpactMediaAssetsFeature.component');

export const ImpactMediaAssetsFeature: FunctionComponent = createEmptyMock(OriginalImpactMediaAssetsFeature);
