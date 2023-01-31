import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../../shared/tests/IMockedComponent';

const { PrizeDetails: OriginalPrizeDetails }: any = jest.requireActual('../PrizeDetails.component');
const PrizeDetailsProps: jest.MockedFunction<any> = jest.fn();

export const PrizeDetails: IMockedComponent = (props: any): ReactElement => {
    PrizeDetailsProps(props);

    return <MockedPrizeDetails {...props} />;
};

PrizeDetails.displayName = OriginalPrizeDetails.displayName;

PrizeDetails.testingProps = PrizeDetailsProps;

export const MockedPrizeDetails: FunctionComponent = createEmptyMock(OriginalPrizeDetails);
