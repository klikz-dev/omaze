import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'AdditionalWinners';

export const ADDITIONAL_WINNERS_QA: IQAMap = {
    CONTAINER: createElementId(displayName, 'Container'),
    BUTTON_TEXT: createElementId(displayName, 'ButtonText'),
    CONTENT: createElementId(displayName, 'Content'),
};
