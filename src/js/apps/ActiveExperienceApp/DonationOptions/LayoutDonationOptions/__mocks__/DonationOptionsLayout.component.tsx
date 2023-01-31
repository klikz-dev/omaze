import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { LayoutDonationOptions: OriginalLayoutDonationOptions }: any = jest.requireActual('../LayoutDonationOptions.component');
const LayoutDonationOptionsProps: jest.MockedFunction<any> = jest.fn();

export const LayoutDonationOptions: IMockedComponent = (props: any): ReactElement => {
    LayoutDonationOptionsProps(props);

    return <MockedLayoutDonationOptions {...props} />;
};

LayoutDonationOptions.displayName = OriginalLayoutDonationOptions.displayName;

LayoutDonationOptions.testingProps = LayoutDonationOptionsProps;

export const MockedLayoutDonationOptions: FunctionComponent = createEmptyMock(OriginalLayoutDonationOptions);
