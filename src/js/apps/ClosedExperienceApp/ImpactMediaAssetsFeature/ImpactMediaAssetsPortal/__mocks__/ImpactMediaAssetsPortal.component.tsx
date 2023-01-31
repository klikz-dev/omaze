import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { ImpactMediaAssetsPortal: OriginalImpactMediaAssetsPortal }: any = jest.requireActual('../ImpactMediaAssetsPortal.component');

export const ImpactMediaAssetsPortal: FunctionComponent = createEmptyMock(OriginalImpactMediaAssetsPortal);
