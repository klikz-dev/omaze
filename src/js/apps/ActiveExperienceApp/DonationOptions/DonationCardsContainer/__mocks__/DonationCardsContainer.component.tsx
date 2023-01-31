import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { DonationCardsContainer: OriginalDonationCardsContainer }: any = jest.requireActual('../DonationCardsContainer.component');

export const DonationCardsContainer: FunctionComponent = createEmptyMock(OriginalDonationCardsContainer);
