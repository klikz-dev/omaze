import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'Winner';

export const WINNER_QA: IQAMap = {
    WINNER: createElementId(displayName, 'Winner'),
    WINNER_IMAGE: createElementId(displayName, 'WinnerImage'),
};
