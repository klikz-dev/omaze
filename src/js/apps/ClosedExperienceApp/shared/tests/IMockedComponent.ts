import { FunctionComponent } from 'react';

export interface IMockedComponent extends FunctionComponent {
    testingProps: jest.MockedFunction<any>;
}
