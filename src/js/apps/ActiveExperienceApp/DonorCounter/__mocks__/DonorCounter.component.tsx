import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { DonorCounter: OriginalDonorCounter }: any = jest.requireActual('../DonorCounter.component');
const DonorCounterProps: jest.MockedFunction<any> = jest.fn();

export const DonorCounter: IMockedComponent = (props: any): ReactElement => {
    DonorCounterProps(props);

    return <MockedDonationOptions {...props} />;
};

DonorCounter.displayName = OriginalDonorCounter.displayName;

DonorCounter.testingProps = DonorCounterProps;

const MockedDonationOptions: FunctionComponent = createEmptyMock(OriginalDonorCounter);
