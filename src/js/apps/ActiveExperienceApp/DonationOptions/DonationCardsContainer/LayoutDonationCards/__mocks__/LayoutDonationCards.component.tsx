import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { LayoutDonationCards: OriginalLayoutDonationCards }: any = jest.requireActual('../LayoutDonationCards.component');
const LayoutDonationCardsProps: jest.MockedFunction<any> = jest.fn();

export const LayoutDonationCards: IMockedComponent = (props: any): ReactElement => {
    LayoutDonationCardsProps(props);

    return <MockedLayoutDonationCards {...props} />;
};

LayoutDonationCards.displayName = OriginalLayoutDonationCards.displayName;

LayoutDonationCards.testingProps = LayoutDonationCardsProps;

const MockedLayoutDonationCards: FunctionComponent = createEmptyMock(OriginalLayoutDonationCards);
