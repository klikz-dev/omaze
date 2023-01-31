import { createEmptyMock } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

import { IMockedComponent } from '../../../../../../shared/tests/IMockedComponent';

const { Title: OriginalTitle }: any = jest.requireActual('../Title.component');
const titleProps: jest.MockedFunction<any> = jest.fn();

export const Title: IMockedComponent = (props: any): ReactElement => {
    titleProps(props);

    return <MockedTitle {...props} />;
};

Title.displayName = OriginalTitle.displayName;

Title.testingProps = titleProps;

export const MockedTitle: FunctionComponent = createEmptyMock(OriginalTitle);
