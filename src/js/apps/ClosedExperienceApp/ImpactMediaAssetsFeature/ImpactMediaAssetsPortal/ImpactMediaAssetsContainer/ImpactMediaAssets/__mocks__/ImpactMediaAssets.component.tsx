import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../shared/tests/IMockedComponent';

const { ImpactMediaAssets: OriginalImpactMediaAssets }: any = jest.requireActual('../ImpactMediaAssets.component');
const ImpactMediaAssetsProps: jest.MockedFunction<any> = jest.fn();

export const ImpactMediaAssets: IMockedComponent = (props: any): ReactElement => {
    ImpactMediaAssetsProps(props);

    return <MockedImpactMediaAssets {...props} />;
};

ImpactMediaAssets.displayName = OriginalImpactMediaAssets.displayName;

ImpactMediaAssets.testingProps = ImpactMediaAssetsProps;

export const MockedImpactMediaAssets: FunctionComponent = createEmptyMock(OriginalImpactMediaAssets);
