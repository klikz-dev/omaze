import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../../../../shared/tests/IMockedComponent';

const { AdditionalWinners: OriginalAdditionalWinners }: any = jest.requireActual('../AdditionalWinners.component');
const AdditionalWinnersProps: jest.MockedFunction<any> = jest.fn();

export const AdditionalWinners: IMockedComponent = (props: any): ReactElement => {
    AdditionalWinnersProps(props);

    return <MockedAdditionalWinners {...props} />;
};

AdditionalWinners.displayName = OriginalAdditionalWinners.displayName;

AdditionalWinners.testingProps = AdditionalWinnersProps;

export const MockedAdditionalWinners: FunctionComponent = createEmptyMock(OriginalAdditionalWinners);
