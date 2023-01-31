import  {default as DateUtils}  from './date.js';

describe('isValid', () => {
    const DATE_AUG_30_2019 = '2019-08-30T21:05:35.581Z';
    const DATE_INVALID = 'invalid date';

    const testCases = [
        {
            name: 'should return Timestamp for a valid date',
            input: DATE_AUG_30_2019,
            expected: 1567199135581,
        },
        {
            name: 'should return False for invalid date',
            input: DATE_INVALID,
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(DateUtils.isValid(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('isInFuture', () => {
    const FUTURE_DATE_ISO = '3019-08-30T21:05:35.581Z';
    const PAST_DATE_ISO = '1019-08-30T21:05:35.581Z';

    const testCases = [
        {
            name: 'should validate future date',
            input: FUTURE_DATE_ISO,
            expected: true,
        },
        {
            name: 'should validate future date',
            input: PAST_DATE_ISO,
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(DateUtils.isInFuture(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('format', () => {
    const DATE_AUG_30_2019 = '2019-08-30T21:05:35.581Z';
    const DATE_INVALID = 'invalid date';

    const testCases = [
        {
            name: 'should return empty string for invalid date',
            input: {
                date: DATE_INVALID,
                format: false,
            },
            expected:  '',
        },
        {
            name: 'should correctly format: default',
            input: {
                date: DATE_AUG_30_2019,
                format: false,
            },
            expected:  'August 30, 2019',
        },
        {
            name: 'should correctly format: mmm:dd',
            input: {
                date: DATE_AUG_30_2019,
                format: 'mmm:dd',
            },
            expected:  'Aug 30',
        },
        {
            name: 'should correctly format: m:dd',
            input: {
                date: DATE_AUG_30_2019,
                format: 'm:dd',
            },
            expected:  'August 30',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(DateUtils.format(testCase.input.date, testCase.input.format)).toEqual(testCase.expected)
        );
    });
});

describe('getDateValues', () => {
    const CORRECT_DATE_ISO = '2020-01-14T22:48:35';
    const WRONG_DATE_ISO = 'wrong date';
    const hourFormat12 = '12h';
    const hourFormat24 = '24h';
    const wrongHourFormat = 'wrongHourFormat';

    const testCases = [
        {
            name: 'should return proper date value object with default 12 hours format',
            inputA: CORRECT_DATE_ISO,
            inputB: '',
            expected: {
                year: 2020,
                month: 'January',
                day: 14,
                hour: 10,
                minute: 48,
                seconds: 35,
                timeOfDay: 'pm',
                hourFormat: '12h',
            },
        },
        {
            name: 'should return proper date value object with 12 hour format',
            inputA: CORRECT_DATE_ISO,
            inputB: hourFormat12,
            expected: {
                year: 2020,
                month: 'January',
                day: 14,
                hour: 10,
                minute: 48,
                seconds: 35,
                timeOfDay: 'pm',
                hourFormat: '12h',
            },
        },
        {
            name: 'should return proper date value object with 24 hour format',
            inputA: CORRECT_DATE_ISO,
            inputB: hourFormat24,
            expected: {
                year: 2020,
                month: 'January',
                day: 14,
                hour: 22,
                minute: 48,
                seconds: 35,
                timeOfDay: '24h',
                hourFormat: '24h',
            },
        },
        {
            name: 'should return empty string for wrong date',
            inputA: WRONG_DATE_ISO,
            inputB: hourFormat24,
            expected: false,
        },
        {
            name: 'should return empty string for wrong hourFormat',
            inputA: CORRECT_DATE_ISO,
            inputB: wrongHourFormat,
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(DateUtils.getDateValues(testCase.inputA, testCase.inputB)).toEqual(testCase.expected)
        );
    });

    describe('getDaySuffix', () => {
        const testCases = [
            [ 1, 'st' ],
            [ 2, 'nd' ],
            [ 3, 'rd' ],
            [ 4, 'th' ],
            [ 17, 'th' ],
            [ 20, 'th' ],
            [ 21, 'st' ],
            [ 22, 'nd' ],
            [ 23, 'rd' ],
            [ 25, 'th' ],
            [ 30, 'th' ],
            [ 31, 'st' ],
        ];

        testCases.forEach((testCase) => {
            test(`${testCase[0]}: ${testCase[1]}`, () =>
                expect(DateUtils.getDaySuffix(testCase[0])).toEqual(testCase[1])
            );
        });
    });
});

describe('parseDateTimePattern', () => {
    describe('h:mm am', () => {
        const pattern = 'h:mm am';

        const baseResult = {
            original: '1:25 pm',
            hour: '1',
            minute: '25',
            ampm: 'pm',
            hour24: '13',
        }

        const testCases = [
            {
                input: '1:25 pm',
                expected: baseResult,
            },
            {
                input: '01:25 pm',
                expected: Object.assign({}, baseResult, {
                    original: '01:25 pm',
                    hour: '01',
                }),
            },
            {
                input: '1:25pm',
                expected: Object.assign({}, baseResult, {
                    original: '1:25pm',
                }),
            },
            {
                input: '1:25PM',
                expected: Object.assign({}, baseResult, {
                    original: '1:25pm',
                }),
            },
            {
                input: '1:25 am',
                expected: Object.assign({}, baseResult, {
                    original: '1:25 am',
                    ampm: 'am',
                    hour24: '1',
                }),
            },
            {
                input: '1:05 pm',
                expected: Object.assign({}, baseResult, {
                    original: '1:05 pm',
                    minute: '05',
                }),
            },

            { input: '1:25',
expected: false },
            { input: '1 am',
expected: false },
            { input: '125 am',
expected: false },
            { input: '1 25 am',
expected: false },
            { input: false,
expected: false },
            { input: undefined,
expected: false },
        ];

        testCases.forEach((testCase) => {
            test(`${!!testCase.expected}: ${testCase.input}`, () =>
                expect(DateUtils.parseDateTimePattern(testCase.input, pattern)).toEqual(testCase.expected)
            );
        });
    });

    describe('m/d/yyyy h:mm am', () => {
        const pattern = 'm/d/yyyy h:mm am';

        const baseResult = {
            original: '2/3/2022 1:25 pm',
            month: '2',
            day: '3',
            year: '2022',
            hour: '1',
            minute: '25',
            ampm: 'pm',
            hour24: '13',
        }

        const testCases = [
            {
                input: '2/3/2022 1:25 pm',
                expected: baseResult,
            },
            {
                input: '2/3/2022 1:25pm',
                expected: Object.assign({}, baseResult, {
                    original: '2/3/2022 1:25pm',
                }),
            },
            {
                input: '2/3/2022 1:25 PM',
                expected: Object.assign({}, baseResult, {
                    original: '2/3/2022 1:25 pm',
                }),
            },
            {
                input: '2/3/2022 1:25 aM',
                expected: Object.assign({}, baseResult, {
                    original: '2/3/2022 1:25 am',
                    ampm: 'am',
                    hour24: '1',
                }),
            },
            {
                input: '02/03/2022 01:25 pm',
                expected: Object.assign({}, baseResult, {
                    original: '02/03/2022 01:25 pm',
                    month: '02',
                    day: '03',
                    hour: '01',
                }),
            },
            {
                input: '12/30/2022 1:25 PM',
                expected: Object.assign({}, baseResult, {
                    original: '12/30/2022 1:25 pm',
                    month: '12',
                    day: '30',
                }),
            },
            { input: '2/15/20221:25 pm',
expected: false },
            { input: '2/15/202 1:25 pm',
expected: false },
            { input: '2/15/20222 1:25 pm',
expected: false },
            { input: '2-15-2022 1:25 pm',
expected: false },
            { input: '2.15.2022 1:25 pm',
expected: false },
            { input: '2 15 2022 1:25 pm',
expected: false },
            { input: '2/15/2022 125 pm',
expected: false },
            { input: '2/2022 1:25 pm',
expected: false },
            { input: '2/15/2022 1:25',
expected: false },
            { input: '2/15/2022',
expected: false },
        ];

        testCases.forEach((testCase) => {
            test(`${!!testCase.expected}: ${testCase.input}`, () =>
                expect(DateUtils.parseDateTimePattern(testCase.input, pattern)).toEqual(testCase.expected)
            );
        });
    });
});

describe('stringDateAsTimestampUTC', () => {
    describe('m/d/yyyy h:mm am', () => {
        const pattern = 'm/d/yyyy h:mm am';

        const testCases = [
            { input: '2/3/2022 1:25 am',
expected: 1643851500000 },
            { input: '2/3/2022 1:25 pm',
expected: 1643894700000 },
            { input: '02/03/2022 1:25PM',
expected: 1643894700000 },
            { input: 'invalid',
expected: false },
        ];

        testCases.forEach((testCase) => {
            test(`${testCase.input}: ${testCase.expected}`, () =>
                expect(DateUtils.stringDateAsTimestampUTC(testCase.input, pattern)).toBe(testCase.expected)
            );
        });
    });
});

describe('hoursTo24Hour', () => {
    const testCases = [
        [1, 'pm', 13],
        [1, 'PM', 13],
        ['1', 'pm', 13],
        [1, 'am', 1],
        [12, 'am', 0],
        [12, 'pm', 12],
        [1, 'xx', false],
        [undefined, undefined, false],
    ];

    testCases.forEach((testCase) => {
        test(`${testCase[0]} ${testCase[1]} -> ${testCase[2]}`, () =>
            expect(DateUtils.hoursTo24Hour(testCase[0], testCase[1])).toBe(testCase[2])
        );
    });
});
