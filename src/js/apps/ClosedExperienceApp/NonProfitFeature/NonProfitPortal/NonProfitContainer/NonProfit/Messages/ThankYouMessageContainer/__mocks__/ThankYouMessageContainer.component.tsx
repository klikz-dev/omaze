import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { ThankYouMessageContainer: OriginalThankYouMessageContainer }: any = jest.requireActual('../ThankYouMessageContainer.component');

export const ThankYouMessageContainer: FunctionComponent = createEmptyMock(OriginalThankYouMessageContainer);
