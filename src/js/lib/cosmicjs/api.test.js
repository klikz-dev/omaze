import {cosmicURL, trimSlug} from './api.js';

describe('get cosmicURL', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    const testCases = [
        {
            input: ['my-slug', 'production', false],
            expected: 'https://api.cosmicjs.com/v1/omaze/object/my-slug?hide_metafields=true',
        },
        {
            input: ['my-handle?sometimes=with&query', 'production', false],
            expected: 'https://api.cosmicjs.com/v1/omaze/object/my-handle?hide_metafields=true',
        },
        {
            input: ['my-slug', 'non-prod', false],
            expected: 'https://api.cosmicjs.com/v1/omaze-staging/object/my-slug?hide_metafields=true&pretty=true',
        },
        {
            input: ['my-slug', 'production', true],
            expected: 'https://api.cosmicjs.com/v1/omaze/object/my-slug?hide_metafields=true&status=all',
        },
        {
            input: ['my-slug'],
            expected: false,
        },
    ];

    testCases.forEach((testCase) => {
        test(`slug: ${testCase.input[0]} - env:${testCase.input[1]} - preview:${testCase.input[2]}`, () => {
            expect(cosmicURL(testCase.input[0], testCase.input[1], testCase.input[2])).toBe(testCase.expected)
        });
    });
});


describe('trimSlug', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    const testCases = [
        ['hello', 'hello'],
        ['hello-slug', 'hello-slug'],
        ['hello-slug', '  hello-SLUG?hello=you  '],
        ['hello--there.slug', 'hello--there.slug'],
        ['hello-slug', 'hello-slug?hello=you'],
        ['', '  '],
        [false, 123],
        [false, undefined],
    ];

    testCases.forEach((testCase) => {
        test(`${testCase[0]}: ${testCase[1]}`, () => {
            expect(trimSlug(testCase[1])).toBe(testCase[0])
        })
    });
});
