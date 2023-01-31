import '../../../utility/date.js';
import  {default as utils}  from './prize-data-utils';

describe('isValid', () => {
    const testCases = [
        {
            name: 'should be true for an array',
            input: [],
            expected: true,
        },
        {
            name: 'should be false for a non-array',
            input: 'hello',
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.isValid(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('filterByTier', () => {
    const tierDrawings = [
        {
            tier: 1,
        },
        {
            tier: 2,
        },
        {
            tier: 2,
        },
        {
            tier: 3,
        },
    ];

    const testCases = [
        {
            name: 'should return correct drawings',
            input: {
                drawings: tierDrawings,
                tier: 2,
            },
            expected: [{'tier': 2}, {'tier': 2}],
        },
        {
            name: 'should return emtpy array for bad drawings input',
            input: {
                drawings: {},
                tier: 3,
            },
            expected: [],
        },
        {
            name: 'should return emtpy array for bad tier input',
            input: {
                drawings: tierDrawings,
                tier: 'bad',
            },
            expected: [],
        },
        {
            name: 'should return emtpy array for missing tier input',
            input: {
                drawings: tierDrawings,
            },
            expected: [],
        },
        {
            name: 'should accept tier input as string',
            input: {
                drawings: tierDrawings,
                tier: 3,
            },
            expected: [{'tier': 3}],
        },
        {
            name: 'should accept tier input as integer',
            input: {
                drawings: tierDrawings,
                tier: '3',
            },
            expected: [{'tier': 3}],
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.filterByTier(testCase.input.drawings, testCase.input.tier))
            .toEqual(testCase.expected)
        );
    });
});

describe('filterByTiers', () => {
    const tierDrawings = [
        {
            tier: 1,
        },
        {
            tier: 2,
        },
        {
            tier: 2,
        },
        {
            tier: 3,
        },
    ];

    const testCases = [
        {
            name: 'should return correct drawings',
            input: {
                drawings: tierDrawings,
                tiers: [1, 3],
            },
            expected: [{'tier': 1}, {'tier': 3}],
        },
        {
            name: 'should return correct drawings for single tier integer',
            input: {
                drawings: tierDrawings,
                tiers: 3,
            },
            expected: [{'tier': 3}],
        },
        {
            name: 'should return emtpy array for bad drawings input',
            input: {
                drawings: {},
                tiers: 3,
            },
            expected: [],
        },
        {
            name: 'should return emtpy array for bad tier input',
            input: {
                drawings: tierDrawings,
                tier: 'bad',
            },
            expected: [],
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.filterByTiers(testCase.input.drawings, testCase.input.tiers))
            .toEqual(testCase.expected)
        );
    });
});

describe('getLastWinnerByDate', () => {
    const winner2016 = {
        announce_date: '2016-09-04T17:06:04.845Z',
        winner_name: 'Joe Not Recent',
        winner_location: 'SD',
    };

    const winner2017mostRecent = {
        announce_date: '2017-09-04T17:06:04.845Z',
        winner_name: 'Joe Most Recent',
        winner_location: 'NC',
    };

    const noWinner2018 = {
        announce_date: '2018-09-04T17:06:04.845Z',
    };

    const noWinner2500 = {
        announce_date: '2500-09-04T17:06:04.845Z',
    };

    const winner3000 = {
        announce_date: '3000-09-04T17:06:04.845Z',
        winner_name: 'Joe Future',
        winner_location: 'NC',
    };

    const noWinnerDrawings = [
        noWinner2018,
        noWinner2500,
    ];

    const winnerDrawings = [
        winner2016,
        winner2017mostRecent,
        noWinner2018,
        noWinner2500,
        winner3000,
    ];

    const winnerDrawingsRandomOrder = [
        winner3000,
        noWinner2018,
        noWinner2500,
        winner2017mostRecent,
        winner2016,
    ];

    const testCases = [
        {
            name: 'should return most recent winner drawing',
            input: {
                drawings: winnerDrawings,
                dateKey: 'announce_date',
            },
            expected: winner2017mostRecent,
        },
        {
            name: 'should return most recent winner drawings in random order',
            input: {
                drawings: winnerDrawingsRandomOrder,
                dateKey: 'announce_date',
            },
            expected: winner2017mostRecent,
        },
        {
            name: 'should return undefined if no winners exist',
            input: {
                drawings: noWinnerDrawings,
                dateKey: 'announce_date',
            },
            expected: undefined,
        },
        {
            name: 'should return undefined for invalid dateKey',
            input: {
                drawings: winnerDrawings,
                dateKey: 'invalid',
            },
            expected: undefined,
        },
        {
            name: 'should return false for invalid drawing input',
            input: {
                drawings: {},
                dateKey: 'announce_date',
            },
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.getLastWinnerByDate(testCase.input.drawings, testCase.input.dateKey))
            .toEqual(testCase.expected)
        );
    });
});

describe('sortDrawingsByDate', () => {
    const drawing1 = {
        announce_date: '2019-09-04T17:06:04.845Z',
    };

    const drawing2 = {
        announce_date: '2019-09-05T17:06:04.845Z',
    };

    const drawing3 = {
        announce_date: '2019-09-05T18:06:04.845Z',
    };

    const drawing4 = {
        announce_date: '2019-09-06T17:06:04.845Z',
    };

    const drawingsRandomOrder = [
        drawing3,
        drawing2,
        drawing1,
        drawing4,
    ];

    const drawingsSorted = [
        drawing1,
        drawing2,
        drawing3,
        drawing4,
    ];

    const drawingsSortedReverseOrder = [
        drawing4,
        drawing3,
        drawing2,
        drawing1,
    ];

    const noSortKeyArray1 = ['no', 'key'];

    const testCases = [
        {
            name: 'should return sorted drawings',
            input: {
                drawings: drawingsRandomOrder,
                sortKey: 'announce_date',
            },
            expected: drawingsSorted,
        },
        {
            name: 'should return reverse sorted drawings',
            input: {
                drawings: drawingsRandomOrder,
                sortKey: 'announce_date',
                reverse: true,
            },
            expected: drawingsSortedReverseOrder,
        },
        {
            name: 'should return false if drawings not an array',
            input: {
                drawings: 'not array',
                sortKey: 'announce_date',
            },
            expected: false,
        },
        {
            name: 'should return orignal array if sortKey data not found',
            input: {
                drawings: noSortKeyArray1,
                sortKey: 'announce_date',
            },
            expected: noSortKeyArray1,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.sortDrawingsByDate(
                testCase.input.sortKey,
                testCase.input.drawings,
                testCase.input.reverse)
            )
            .toEqual(testCase.expected)
        );
    });
});

describe('getMinMaxDrawingDates', () => {
    const drawing1 = {
        enter_by_date: '2019-09-04T17:06:04.845Z',
        drawing_date: '2019-09-04T17:06:04.845Z',
        announce_date: '2019-09-04T17:06:04.845Z',
    };

    const drawing2 = {
        enter_by_date: '2019-10-04T17:06:04.845Z',
        drawing_date: '2019-10-04T17:06:04.845Z',
        announce_date: '2019-10-04T17:06:04.845Z',
    };

    const drawing3 = {
        enter_by_date: '2019-11-04T17:06:04.845Z',
        drawing_date: '2019-11-04T17:06:04.845Z',
        announce_date: '2019-11-04T17:06:04.845Z',
    };

    const drawingsRandomOrder = [
        drawing2,
        drawing3,
        drawing1,
    ];

    const validResponse = {
        enter_by_date_min: drawing1['enter_by_date'],
        enter_by_date_max: drawing3['enter_by_date'],
        drawing_date_min: drawing1['drawing_date'],
        drawing_date_max: drawing3['drawing_date'],
        announce_date_min: drawing1['announce_date'],
        announce_date_max: drawing3['announce_date'],
    }

    const testCases = [
        {
            name: 'should return sorted drawings',
            input: {
                drawings: drawingsRandomOrder,
            },
            expected: validResponse,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.getMinMaxDrawingDates(testCase.input.drawings))
            .toEqual(testCase.expected)
        );
    });
});

describe('flattenDrawingData', () => {
    const missingDrawings = {
        metadata: {},
    };

    const singleDrawing = {
        metadata: {
            name: 'prize name',
            drawings: [{
                date: '2001',
            }],
        },
    };

    const singleDrawingMerged = {
        name: 'prize name',
        date: '2001',
    };

    const overrideDrawing = {
        metadata: {
            name: 'prize name',
            drawings: [{
                name: 'new name',
            }],
        },
    };

    const overrideDrawingMerged = {
        name: 'new name',
    }

    const testCases = [
        {
            name: 'should require drawings',
            input: missingDrawings,
            expected: false,
        },
        {
            name: 'should return array of merged drawing data',
            input: singleDrawing,
            expected: [singleDrawingMerged],
        },
        {
            name: 'should override parent data and delete drawings array',
            input: overrideDrawing,
            expected: [overrideDrawingMerged],
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.flattenDrawingData(testCase.input))
            .toEqual(testCase.expected)
        );
    });
});

describe('flattenPrizeData', () => {
    const missingDrawings = {
        metadata: {},
    };

    const prize = {
        metadata: {
            name: 'prize name',
            drawings: [{
                enter_by_date: 1,
                drawing_date: 2,
                announce_date: 3,
                hello: 'mergeme',
            }],
        },
    };

    const prizeMerged = {
        recurring: false,
        name: 'prize name',
        enter_by_date: 1,
        enter_by_date_max: 1,
        enter_by_date_min: 1,
        drawing_date: 2,
        drawing_date_max: 2,
        drawing_date_min: 2,
        announce_date: 3,
        announce_date_max: 3,
        announce_date_min: 3,
        hello: 'mergeme',
        drawings: [{
            announce_date: 3,
            drawing_date: 2,
            enter_by_date: 1,
            hello: 'mergeme',
        }],
    };

    const recurringPrize = {
        metadata: {
            name: 'recurring',
            drawings: [
                {
                    enter_by_date: 10,
                    drawing_date: 11,
                    announce_date: 12,
                },
                {
                    enter_by_date: 20,
                    drawing_date: 21,
                    announce_date: 22,
                },
            ],
        },
    };

    const recurringPrizeMerged = {
        name: 'recurring',
        recurring: true,
        enter_by_date_min: 10,
        enter_by_date_max: 20,
        announce_date_min: 12,
        announce_date_max: 22,
        drawing_date_min: 11,
        drawing_date_max: 21,
        drawings: [
            {
                announce_date: 12,
                drawing_date: 11,
                enter_by_date: 10,
            },
            {
                announce_date: 22,
                drawing_date: 21,
                enter_by_date: 20,
            },
        ],
    };

    const testCases = [
        {
            name: 'should require drawings',
            input: missingDrawings,
            expected: false,
        },
        {
            name: 'should flatten singular prize data',
            input: prize,
            expected: prizeMerged,
        },
        {
            name: 'should flatten recurring prize data',
            input: recurringPrize,
            expected: recurringPrizeMerged,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.flattenPrizeData(testCase.input))
            .toEqual(testCase.expected)
        );
    });
});

describe('getNextDrawingByDateKey', () => {
    const drawingPast1 = {
        announce_date: '2010-09-04T17:06:04.845Z',
    };

    const drawingPast2 = {
        announce_date: '2011-09-04T17:06:04.845Z',
    };

    const drawingFuture1 = {
        announce_date: '3000-09-05T17:06:04.845Z',
    };

    const drawingFuture2 = {
        announce_date: '4000-09-05T18:06:04.845Z',
    };

    const drawings = [
        drawingPast2,
        drawingFuture2,
        drawingPast1,
        drawingFuture1,
    ];

    const noFutureDrawings = [
        drawingPast2,
        drawingPast1,
    ];


    const testCases = [
        {
            name: 'should return future drawing',
            input: {
                drawings: drawings,
                dateKey: 'announce_date',
            },
            expected: drawingFuture1,
        },
        {
            name: 'should return false if not array input',
            input: {
                drawings: {},
                dateKey: 'announce_date',
            },
            expected: false,
        },
        {
            name: 'should return false if date key missing',
            input: {
                drawings: drawings,
            },
            expected: false,
        },
        {
            name: 'should return undefined if no future drawing found',
            input: {
                drawings: noFutureDrawings,
                dateKey: 'announce_date',
            },
            expected: undefined,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.getNextDrawingByDateKey(testCase.input.drawings, testCase.input.dateKey))
            .toEqual(testCase.expected)
        );
    });
});

describe('formatDrawings', () => {
    const prizes = [
        {
            metadata: {
                name: 'prize1',
                drawings: [
                    {
                        enter_by_date: 1,
                    },
                ],
            },
        },
        {
            metadata: {
                name: 'prize2',
                drawings: [
                    {
                        enter_by_date: 10,
                    },
                    {
                        enter_by_date: 20,
                    },
                ],
            },
        },
    ];

    const formattedDrawings = [
        {
            name: 'prize1',
            enter_by_date: 1,
        },
        {
            name: 'prize2',
            enter_by_date: 10,
        },
        {
            name: 'prize2',
            enter_by_date: 20,
        },
    ];

    const testCases = [
        {
            name: 'should require prizes array',
            input: {},
            expected: false,
        },
        {
            name: 'should format drawings',
            input: prizes,
            expected: formattedDrawings,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.formatDrawings(testCase.input))
            .toEqual(testCase.expected)
        );
    });
});


describe('formatPrizes', () => {
    const prizes = [
        {
            metadata: {
                name: 'prize1',
                drawings: [
                    {
                        enter_by_date: 1,
                        drawing_date: 2,
                        announce_date: 3,
                    },
                ],
            },
        },
        {
            metadata: {
                name: 'prize2',
                drawings: [
                    {
                        enter_by_date: 10,
                        drawing_date: 20,
                        announce_date: 30,
                    },
                ],
            },
        },
    ];

    const formattedPrizes = [
        {
            name: 'prize1',
            recurring: false,
            enter_by_date: 1,
            enter_by_date_max: 1,
            enter_by_date_min: 1,
            drawing_date: 2,
            drawing_date_max: 2,
            drawing_date_min: 2,
            announce_date: 3,
            announce_date_max: 3,
            announce_date_min: 3,
            drawings: [
                {
                    enter_by_date: 1,
                    drawing_date: 2,
                    announce_date: 3,
                },
            ],
        },
        {
            name: 'prize2',
            recurring: false,
            enter_by_date: 10,
            enter_by_date_max: 10,
            enter_by_date_min: 10,
            drawing_date: 20,
            drawing_date_max: 20,
            drawing_date_min: 20,
            announce_date: 30,
            announce_date_max: 30,
            announce_date_min: 30,
            drawings: [
                {
                    enter_by_date: 10,
                    drawing_date: 20,
                    announce_date: 30,
                },
            ],
        },
    ];

    const testCases = [
        {
            name: 'should require prizes array',
            input: {},
            expected: false,
        },
        {
            name: 'should format prizes',
            input: prizes,
            expected: formattedPrizes,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(utils.formatPrizes(testCase.input))
            .toEqual(testCase.expected)
        );
    });
});


describe('setData', () => {
    let formatPrizesSpy;

    beforeEach(() => {
        formatPrizesSpy = jest.spyOn(utils, 'formatPrizes');
    });

    afterEach(() => {
        formatPrizesSpy.mockRestore();
    });

    test('calls formatPrizes with data', () => {
        utils.setData([]);

        expect(formatPrizesSpy).toHaveBeenCalledWith([]);
    });

    test('sets contests cache', () => {
        formatPrizesSpy.mockImplementation(() => 'formatted');

        utils.setData();
        expect(utils.cache.contests).toEqual('formatted');
    });
});

describe('getContests', () => {
    beforeEach(() => {
        utils.cache = {
            contests: undefined,
        };

        Object.defineProperty(utils.cache, 'contests', { get: jest.fn() });
    });

    afterEach(() => {
        utils.cache = {};
    });

    test('returns false if no cached contests', () => {
        jest.spyOn(utils.cache, 'contests', 'get').mockReturnValue(undefined);

        expect(utils.getContests()).toEqual(false)
    });

    test('returns cached contests if exist', () => {
        jest.spyOn(utils.cache, 'contests', 'get').mockReturnValue('contests');

        expect(utils.getContests()).toEqual('contests')
    });
});

describe('getContestByTier', () => {
    let getContestsSpy;

    beforeEach(() => {
        getContestsSpy = jest.spyOn(utils, 'getContests');
    });

    afterEach(() => {
        getContestsSpy.mockRestore();
    });

    test('returns emtpy array if no cached contests', () => {
        getContestsSpy.mockImplementation(() => false);

        expect(utils.getContestByTier(1)).toEqual([]);
    });

    test('returns contests', () => {
        const oneA = { tier: 1 };
        const oneB = { tier: 1 };
        const two = { tier: 2 };

        const tierDrawings = [oneA, oneB, two];
        getContestsSpy.mockImplementation(() => tierDrawings);

        const contests = utils.getContestByTier(1)

        expect(contests.length).toBe(2);
        expect(contests[0]).toBe(oneA);
        expect(contests[1]).toBe(oneB);
    });
});

describe('getGrandPrize', () => {
    let getContestsSpy;

    beforeEach(() => {
        getContestsSpy = jest.spyOn(utils, 'getContests');
    });

    afterEach(() => {
        getContestsSpy.mockRestore();
    });

    test('returns undefined if no Tier 1 contest', () => {
        const two = { tier: 2 };
        const three = { tier: 3 };

        const tierDrawings = [two, three];
        getContestsSpy.mockImplementation(() => tierDrawings);

        expect(utils.getGrandPrize()).toBeUndefined();
    });

    test('returns first Tier 1 contest', () => {
        const oneA = { tier: 1 };
        const oneB = { tier: 1 };
        const two = { tier: 2 };

        const tierDrawings = [two, oneA, oneB];
        getContestsSpy.mockImplementation(() => tierDrawings);

        expect(utils.getGrandPrize()).toBe(oneA);
    });
});
