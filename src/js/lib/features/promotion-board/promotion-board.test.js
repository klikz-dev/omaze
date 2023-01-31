/* eslint no-console: 0 */
import { default as PromotionBoard } from './index';

describe('Promotion Board Feature', () => {
    beforeAll(() => {
        window._ = window._ || {};

        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    describe('getPrimaryBoard', () => {
        const ends1 = {
            endTs: 100,
            createdAt: '2020-06-02T01:37:31.541Z',
        };
        const ends2 = {
            endTs: 200,
            createdAt: '2020-06-02T01:37:31.541Z',
        };
        const ends3 = {
            endTs: 300,
            createdAt: '2020-06-02T01:37:31.541Z',
        };

        const testCases = [
            {
                name: 'single board',
                boards: [ends1],
                expected: ends1,
            },
            {
                name: 'earliest end date first',
                boards: [ends1, ends2, ends3],
                expected: ends1,
            },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.name}`, () =>
                expect(PromotionBoard.getPrimaryBoard(testCase.boards)).toBe(testCase.expected)
            );
        });
    });

    describe('validTimeFrame', () => {
        const testCases = [
            {
                input: {
                    start: -1000,
                    end: +1000,
                },
                expected: true,
            },
            {
                input: {
                    start: +1000,
                    end: +3000,
                },
                expected: false,
            },
            {
                input: {
                    start: -1000,
                    end: -2000,
                },
                expected: false,
            },
        ];

        testCases.forEach((testCase) => {
            const nowTs = Date.now();

            const startTs = nowTs + testCase.input.start;
            const endTs = nowTs + testCase.input.end;

            test(`${testCase.expected} - start: ${testCase.input.start} end: ${testCase.input.end}`, () =>
                expect(PromotionBoard.validTimeFrame(startTs, endTs)).toBe(testCase.expected)
            );
        });
    });
});

