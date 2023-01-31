import { createEmptyMock } from '@omaze/test';
import { FunctionComponent } from 'react';

const { FameLinkContainer: OriginalFameLinkContainer }: any = jest.requireActual('../FameLinkContainer.component');

export const FameLinkContainer: FunctionComponent = createEmptyMock(OriginalFameLinkContainer);
