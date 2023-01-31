import  {default as TagUtils}  from './tags.js';

describe('getTagByRegex', () => {
    const testCases = [
        {
            name: 'should return tag when found',
            input: {
                tags: [
                    'tag1',
                    'myTag',
                ],
                regex: /^my/,
            },
            expected: 'myTag',
        },
        {
            name: 'should return undefined when not found',
            input: {
                tags: [
                    'tag1',
                    'tag2',
                ],
                regex: /^my/,
            },
            expected: undefined,
        },
        {
            name: 'should return false if no tags passed',
            input: {
                tags: false,
                regex: /^my/,
            },
            expected: false,
        },
        {
            name: 'should return false if regex not instanceof RegExp',
            input: {
                tags: [
                    'tag1',
                    'tag2',
                ],
                regex: 'not-a-regex',
            },
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(TagUtils.getTagByRegex(testCase.input.tags, testCase.input.regex)).toEqual(testCase.expected)
        );
    });
});
