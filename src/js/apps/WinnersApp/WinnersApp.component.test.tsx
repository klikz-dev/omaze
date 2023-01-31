import '@testing-library/jest-dom/extend-expect';

import { WinnersApp } from './WinnersApp.component';
import { APP_NAME } from './WinnersApp.namespace';

describe('WinnersApp', (): void => {
    it('app was created', (): void => {
        expect(WinnersApp.displayName).toContain('WinnersApp');
        expect(WinnersApp.app).toBe(APP_NAME);
    });
});
