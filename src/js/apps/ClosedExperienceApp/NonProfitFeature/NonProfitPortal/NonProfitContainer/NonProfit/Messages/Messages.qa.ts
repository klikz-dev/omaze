import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'Messages';

export const MESSAGES_QA: IQAMap = {
    CONTAINER: createElementId(displayName, 'Container'),
    IMGIX_URL: createElementId(displayName, 'ImgixUrl'),
    THANK_YOU_MESSAGE: createElementId(displayName, 'ThankYouMessage'),
};
