import { createRawGeolocationMock, createTransformedGeolocationMock } from '../../../../shared/tests/GeolocationMock';

import {
    IGeolocationRaw,
    ITransformedGeolocation,
    GeolocationTransformer,
} from './GeolocationTransformer';

describe('GeolocationTransformer', (): void => {
    describe('transform', (): void => {
        it('should transform data', (): void => {
            const inputMock: IGeolocationRaw = createRawGeolocationMock();
            const transformedMock: ITransformedGeolocation = createTransformedGeolocationMock();
            const transformer: GeolocationTransformer = new GeolocationTransformer(inputMock);
            const transformed: ITransformedGeolocation = transformer.transform();

            expect(transformed).toEqual(transformedMock);
        });
    });
});
