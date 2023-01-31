import { createEmptyMock, IMockedComponent } from '@omaze/test';
import React, { FunctionComponent, ReactElement } from 'react';

const { FameLink: OriginalFameLink }: any = jest.requireActual('../FameLink.component');
const FameLinkProps: jest.MockedFunction<any> = jest.fn();

export const FameLink: IMockedComponent = (props: any): ReactElement => {
    FameLinkProps(props);

    return <MockedFameLink {...props} />;
};

FameLink.displayName = OriginalFameLink.displayName;

FameLink.testingProps = FameLinkProps;

const MockedFameLink: FunctionComponent = createEmptyMock(OriginalFameLink);
