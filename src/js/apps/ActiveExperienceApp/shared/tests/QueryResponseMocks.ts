import { MockedResponse } from '@apollo/client/testing';

import { GET_DONOR_COUNT }  from '../../DonorCounter/queries.graphql';

export function createGetDonorCountMock (): MockedResponse {
    return {
        request: {
            query: GET_DONOR_COUNT,
            variables: {
                productID: 123,
            },
        },
        result: {
            data: {
                getDonorsCount: {
                    // eslint-disable-next-line camelcase
                    donor_count: 100,
                },
            },
        },
    };
}
