import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'NonProfit';

export const NON_PROFIT_QA: IQAMap = {
    CONTAINER: createElementId(displayName, 'Container'),
    WITH_THANK_YOU_MESSAGE: createElementId(displayName, 'WithThankYouMessage'),
    WITHOUT_THANK_YOU_MESSAGE: createElementId(displayName, 'WithoutThankYouMessage'),
};
