import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { Title: OriginalTitle }: any = jest.requireActual('../Title.component');
const TitleProps: jest.MockedFunction<any> = jest.fn();

export const Title: IMockedComponent = (props: any): ReactElement => {
    TitleProps(props);

    return <MockedTitle {...props} />;
};

Title.displayName = OriginalTitle.displayName;

Title.testingProps = TitleProps;

const MockedTitle: FunctionComponent = createEmptyMock(OriginalTitle);
