import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { Messages: OriginalMessages }: any = jest.requireActual('../Messages.component');

export const Messages: FunctionComponent = createEmptyMock(OriginalMessages);
