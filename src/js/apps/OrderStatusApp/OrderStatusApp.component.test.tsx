import '@testing-library/jest-dom/extend-expect';

import { OrderStatusApp } from './OrderStatusApp.component';
import { APP_NAME } from './OrderStatusApp.namespace';

describe('OrderStatusApp', (): void => {
    it('app was created', (): void => {
        expect(OrderStatusApp.displayName).toContain('OrderStatusApp');
        expect(OrderStatusApp.app).toBe(APP_NAME);
    });
});
