import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { DonationCard: OriginalDonationCard }: any = jest.requireActual('../DonationCard.component');
const DonationCardProps: jest.MockedFunction<any> = jest.fn();

export const DonationCard: IMockedComponent = (props: any): ReactElement => {
    DonationCardProps(props);

    return <MockedDonationCard {...props} />;
};

DonationCard.displayName = OriginalDonationCard.displayName;

DonationCard.testingProps = DonationCardProps;

export const MockedDonationCard: FunctionComponent = createEmptyMock(OriginalDonationCard);
