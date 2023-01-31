import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { UnknownErrorMessage: OriginalUnknownErrorMessage }: any = jest.requireActual('../UnknownErrorMessage.component');

export const UnknownErrorMessage: FunctionComponent = createEmptyMock(OriginalUnknownErrorMessage);
