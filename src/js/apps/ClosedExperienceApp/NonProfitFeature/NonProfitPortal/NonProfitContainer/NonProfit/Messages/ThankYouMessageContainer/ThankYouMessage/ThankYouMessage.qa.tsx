import { createElementId, IQAMap } from '@omaze/app';

export const displayName: string = 'ThankYouMessage';

export const THANK_YOU_MESSAGE_QA: IQAMap = {
    CONTAINER: createElementId(displayName, 'Container'),
    IMGIX_URL: createElementId(displayName, 'ImgixUrl'),
    MESSAGE: createElementId(displayName, 'Message'),
};
