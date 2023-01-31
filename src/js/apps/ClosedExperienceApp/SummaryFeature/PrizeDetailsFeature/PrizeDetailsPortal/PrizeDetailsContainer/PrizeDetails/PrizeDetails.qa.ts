import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'PrizeDetails';

export const PRIZE_DETAILS_QA: IQAMap = {
    CONTAINER: createElementId(displayName, 'PrizeDetails'),
    CONTENT: createElementId(displayName, 'Content'),
    BUTTON_TEXT: createElementId(displayName, 'PrizeDetailsButtonText'),
};
