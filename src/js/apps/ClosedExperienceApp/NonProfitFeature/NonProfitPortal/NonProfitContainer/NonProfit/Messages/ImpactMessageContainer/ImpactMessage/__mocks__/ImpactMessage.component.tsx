import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../../../../shared/tests/IMockedComponent';

const { ImpactMessage: OriginalImpactMessage }: any = jest.requireActual('../ImpactMessage.component');
const ImpactMessageProps: jest.MockedFunction<any> = jest.fn();

export const ImpactMessage: IMockedComponent = (props: any): ReactElement => {
    ImpactMessageProps(props);

    return <MockedImpactMessage {...props} />;
};

ImpactMessage.displayName = OriginalImpactMessage.displayName;

ImpactMessage.testingProps = ImpactMessageProps;

export const MockedImpactMessage: FunctionComponent = createEmptyMock(OriginalImpactMessage);
