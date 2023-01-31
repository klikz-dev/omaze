import { OzDate } from './OzDate';

describe('OzDate', (): void => {
    describe('getDateFromDateString', (): void => {
        it('should return the correct date object when dateString is valid', (): void => {
            const date: Date = OzDate.getDateFromDateString('2019-11-06T08:00:00.000Z');

            expect(date instanceof Date).toBe(true);
            expect(date.getDay()).toBe(3);
            expect(date.getMonth()).toBe(10);
            expect(date.getFullYear()).toBe(2019);
        });
    });

    describe('isDateValid', (): void => {
        it('returns true when it is a valid date', (): void => {
            const isDateValid: boolean = OzDate.isDateValid(new Date());

            expect(isDateValid).toBe(true);
        });

        it('returns false when it is not a valid date', (): void => {
            const isDateValid: boolean = OzDate.isDateValid(new Date(''));

            expect(isDateValid).toBe(false);
        });
    });
});
