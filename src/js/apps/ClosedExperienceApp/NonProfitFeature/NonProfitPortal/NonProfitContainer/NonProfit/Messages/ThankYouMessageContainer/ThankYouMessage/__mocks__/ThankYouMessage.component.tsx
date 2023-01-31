import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../../../../shared/tests/IMockedComponent';

const { ThankYouMessage: OriginalThankYouMessage }: any = jest.requireActual('../ThankYouMessage.component');
const ThankYouMessageProps: jest.MockedFunction<any> = jest.fn();

export const ThankYouMessage: IMockedComponent = (props: any): ReactElement => {
    ThankYouMessageProps(props);

    return <MockedThankYouMessage {...props} />;
};

ThankYouMessage.displayName = OriginalThankYouMessage.displayName;

ThankYouMessage.testingProps = ThankYouMessageProps;

export const MockedThankYouMessage: FunctionComponent = createEmptyMock(OriginalThankYouMessage);
