import  {default as Component}  from '../ozc-base-node.js';

describe('create BaseNode', () => {
    const testCases = [
        {
            name: 'should create an empty object with no options',
            input: undefined,
            expected: {},
        },
        {
            name: 'should set valid properties',
            input: {
                styles: {
                    color: 'red',
                },
                cssClasses: 'oz-red',
                attributes: {
                    'attr': 'my-attr',
                },
                oaAnalytics: {
                    event: 'click',
                },
                content: 'my content',
                children: [{}, {}],
            },
            expected: {
                styles: 'color: red;',
                cssClasses: 'oz-red',
                oaAnalytics: {
                    event: 'click',
                },
                attributes: {
                    'attr': 'my-attr',
                    'data-oa-event': 'click',
                },
                content: 'my content',
                children: [{}, {}],
            },
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(new Component(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('validateObject', () => {
    const testCases = [
        {
            name: 'should return valid object',
            input: {
                key: 'val',
            },
            expected: {
                key: 'val',
            },
        },
        {
            name: 'should reject string',
            input: 'hello',
            expected: undefined,
        },
        {
            name: 'should reject array',
            input: ['hello'],
            expected: undefined,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(Component.validateObject(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('stringifyStyles', () => {
    const testCases = [
        {
            name: 'should return valid styles string',
            input: {
                color: 'red',
                'background-color': 'blue',
            },
            expected: 'color: red; background-color: blue;',
        },
        {
            name: 'should reject string input',
            input: 'color: \'red\'',
            expected: undefined,
        },
        {
            name: 'should reject array input',
            input: ['red'],
            expected: undefined,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(Component.stringifyStyles(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('stringifyCssClasses', () => {
    const testCases = [
        {
            name: 'should return valid CSS classes string',
            input: 'hello yay-yay',
            expected: 'hello yay-yay',
        },
        {
            name: 'should trim whitespace',
            input: '   hello    yay-yay  ',
            expected: 'hello yay-yay',
        },
        {
            name: 'should split on commas',
            input: 'hello,  , yay-yay,',
            expected: 'hello yay-yay',
        },
        {
            name: 'should require a string',
            input: ['hello'],
            expected: undefined,
        },
        {
            name: 'should require a non-empty string',
            input: '  ',
            expected: undefined,
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(Component.stringifyCssClasses(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('oaAnalytics', () => {
    const testCases = [
        {
            name: 'should set valid analytics attributes',
            input: {
                oaAnalytics: {
                    event: 'click',
                    details: 'details',
                },
            },
            expected: {
                attributes: {
                    'data-oa-event': 'click',
                    'data-oa-details': 'details',
                },
            },
        },
        {
            name: 'should append analytics to other attributes',
            input: {
                attributes: {
                    attr1: 'hello',
                },
                oaAnalytics: {
                    event: 'click',
                },
            },
            expected: {
                attributes: {
                    attr1: 'hello',
                    'data-oa-event': 'click',
                },
            },
        },
        {
            name: 'should not duplicate analytics prefix',
            input: {
                oaAnalytics: {
                    'data-oa-event': 'click',
                },
            },
            expected: {
                attributes: {
                    'data-oa-event': 'click',
                },
            },
        },
        {
            name: 'should reject input string',
            input: {
                oaAnalytics: 'hello',
            },
            expected: {},
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(new Component(testCase.input)).toMatchObject(testCase.expected)
        );
    });
});

describe('capitalizeString', () => {
    const testCases = [
        {
            name: 'should capitalize string',
            input: 'hellO',
            expected: 'HellO',
        },
        {
            name: 'should trim whitespace',
            input: '  hello ',
            expected: 'Hello',
        },
        {
            name: 'should return empty string if non-string type',
            input: ['hello'],
            expected: '',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () =>
            expect(Component.capitalizeString(testCase.input)).toEqual(testCase.expected)
        );
    });
});

describe('createParentEl', () => {
    test('returns an object', () => {
        const component = new Component();
        const el = component.createParentEl();

        expect(String(typeof el)).toEqual('object')
    });

    test('defaults to a DIV', () => {
        const component = new Component();
        const el = component.createParentEl();

        expect(el.tagName).toEqual('DIV')
    });

    test('accepts a tag argument', () => {
        const component = new Component();
        const el = component.createParentEl('a');

        expect(el.tagName).toEqual('A')
    });

    test('sets classList', () => {
        const options = {
            cssClasses: 'class-one, class-two',
        };

        const expected = {
            0: 'class-one',
            1: 'class-two',
        };

        const component = new Component(options);
        const el = component.createParentEl();

        expect(el.classList).toMatchObject(expected);
    });

    test('sets styles', () => {
        const options = {
            styles: {
                color: 'red',
                'background-color': 'blue',
            },
        };

        const expected = {
            color: 'red',
            'background-color': 'blue',
        }

        const component = new Component(options);
        const el = component.createParentEl();

        expect(el.style._values).toEqual(expected);
    });

    test('sets data attributes', () => {
        const options = {
            attributes: {
                'data-hello': 'hello',
            },
        };

        const expected = {
            hello: 'hello',
        }

        const component = new Component(options);
        const el = component.createParentEl();

        expect(el.dataset).toMatchObject(expected);
    });

    test('sets content as HTML', () => {
        const options = {
            content: 'my content',
        };

        const expected = 'my content'

        const component = new Component(options);
        const el = component.createParentEl();

        expect(el.innerHTML).toEqual(expected);
    });


    test('accept child HTML elements', () => {
        const child1 = document.createElement('h1');
        const child2 = document.createElement('h2');

        const options = {
            content: 'my content',
            children: [
                child1,
                child2,
            ],
        };

        const expected = 'my content<h1></h1><h2></h2>'

        const component = new Component(options);
        const el = component.createParentEl();

        expect(el.innerHTML).toEqual(expected);
    });
});
