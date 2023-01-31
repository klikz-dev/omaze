import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { DonationOptions: OriginalDonationOptions }: any = jest.requireActual('../DonationOptions.component');
const DonationOptionsProps: jest.MockedFunction<any> = jest.fn();

export const DonationOptions: IMockedComponent = (props: any): ReactElement => {
    DonationOptionsProps(props);

    return <MockedDonationOptions {...props} />;
};

DonationOptions.displayName = OriginalDonationOptions.displayName;

DonationOptions.testingProps = DonationOptionsProps;

const MockedDonationOptions: FunctionComponent = createEmptyMock(OriginalDonationOptions);
