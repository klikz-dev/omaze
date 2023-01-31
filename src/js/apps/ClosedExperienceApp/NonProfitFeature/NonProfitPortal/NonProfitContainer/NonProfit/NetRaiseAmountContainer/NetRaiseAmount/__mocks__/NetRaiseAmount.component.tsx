import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../../../shared/tests/IMockedComponent';

const { NetRaiseAmount: OriginalNetRaiseAmount }: any = jest.requireActual('../NetRaiseAmount.component');
const NetRaiseAmountProps: jest.MockedFunction<any> = jest.fn();

export const NetRaiseAmount: IMockedComponent = (props: any): ReactElement => {
    NetRaiseAmountProps(props);

    return <MockedNetRaiseAmount {...props} />;
};

NetRaiseAmount.displayName = OriginalNetRaiseAmount.displayName;

NetRaiseAmount.testingProps = NetRaiseAmountProps;

export const MockedNetRaiseAmount: FunctionComponent = createEmptyMock(OriginalNetRaiseAmount);
