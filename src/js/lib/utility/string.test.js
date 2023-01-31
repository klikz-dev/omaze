import './string';

describe('capitalize', () => {
    const testCases = [
        {
            name: 'should capitalize 1 word string',
            input: 'example',
            expected: 'Example',
        },
        {
            name: 'should capitalize only 1st word of string',
            input: 'please capitalize me',
            expected: 'Please capitalize me',
        },
        {
            name: 'should return empty string for falsy input',
            input: false,
            expected: '',
        },
        {
            name: 'should stringify non-string input',
            input: 123,
            expected: '123',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(SDG.Utility.String.capitalize(testCase.input)).toEqual(testCase.expected)
        );
    });
});
