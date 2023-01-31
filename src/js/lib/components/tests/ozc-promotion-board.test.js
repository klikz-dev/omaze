import {default as Component} from '../../components/ozc-promotion-board';

describe('PromotionBoard component', () => {
    beforeAll(() => {
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    describe('validateURL', () => {
        const validCases = [
            'http://hello.com',
            'https://hello.com',
            'https://www.hello.com',
            'https://www.my.hello.com',
            'https://www.hello.com/path?myparam=true',
        ];

        const invalidCases = [
            'hello.com',
            '/hello.com',
            'www.hello.com',
            'https//hello.com',
            'https//hello',
            '  https//whitespace-before.com',
            'https//whitespace-after.com  ',
            'https//hel lo.com',
            'https//he"llo.com',
            'hello',
            '',
            '  ',
            undefined,
            false,
        ];

        validCases.forEach((testCase) => {
            test(`valid: ${testCase}`, () =>
                expect(Component.validateURL(testCase)).toBe(testCase)
            );
        });

        invalidCases.forEach((testCase) => {
            test(`invalid: ${testCase}`, () =>
            expect(Component.validateURL(testCase)).toBe(false)
            );
        });
    });

    describe('create Board', () => {
        test('should create board', () => {
            const component = new Component({
                content: 'hello',
                url: 'https://www.hello.com',
            });

            expect(component.url).toEqual('https://www.hello.com')
            expect(component.imageUrl).toBe(false)
        });

        test('should have correct CSS classes', () => {
            const component = new Component({
                content: 'hello',
            });

            const hasRootClass = component.el.className.includes('ozc-promotion-board');
            expect(hasRootClass).toBe(true);
        });

        test('should have correct content', () => {
            const component = new Component({
                content: 'hello',
            });

            const contentEl = component.el.getElementsByClassName('ozc-promotion-board__content')[0];

            expect(contentEl).toBeDefined();
            expect(contentEl.innerHTML).toBe('hello');
        });
    });
});