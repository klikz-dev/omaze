import  {default as Loader}  from './feature-load.js';

describe('toFeatureName', () => {
    const testCases = [
        { input: 'hello_there_feature',
expected: 'hello-there' },
        { input: 'hello__there___feature',
expected: 'hello-there' },
        { input: 'hello__- there___feature',
expected: 'hello-there' },
        { input: 'hello-there_feature',
expected: 'hello-there' },
        { input: 'hello_there',
expected: 'hello-there' },
        { input: 'Hello_TheRe',
expected: 'hello-there' },
        { input: 'Hello TheRe',
expected: 'hello-there' },
        { input: 'hello-there',
expected: 'hello-there' },
    ];


    testCases.forEach((testCase) => {
        test(`${testCase.input}`, () => {
            expect(Loader.toFeatureName(testCase.input)).toBe(testCase.expected)
        });
    });
});

describe('toModuleName', () => {
    const testCases = [
        { input: 'hello_there_feature',
expected: 'HelloThere' },
        { input: 'hello__there_-feature',
expected: 'HelloThere' },
        { input: 'hello__- there___feature',
expected: 'HelloThere' },
        { input: 'hello_feature',
expected: 'Hello' },
        { input: 'hello_there',
expected: 'HelloThere' },
        { input: 'Hello_TheRe',
expected: 'HelloThere' },
        { input: 'Hello TheRe',
expected: 'HelloThere' },
        { input: 'hello-there',
expected: 'HelloThere' },
        { input: 'hello',
expected: 'Hello' },
    ];


    testCases.forEach((testCase) => {
        test(`${testCase.input}`, () => {
            expect(Loader.toModuleName(testCase.input)).toBe(testCase.expected)
        });
    });
});
