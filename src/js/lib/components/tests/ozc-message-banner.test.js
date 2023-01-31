import {default as Component} from '../../components/ozc-message-banner.js';

describe('MessageBanner component', () => {
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

    describe('create Banner', () => {
        test('should set defaults', () => {
            const component = new Component({
                content: 'hello',
            });

            expect(component.type).toBe('info')
            expect(component.url).toBe(false)
            expect(component.linkSameWindow).toBe(false)
        });

        test('should have correct CSS classes', () => {
            const component = new Component({
                content: 'hello',
            });

            const hasRootClass = component.el.className.includes('ozc-message-banner');
            expect(hasRootClass).toBe(true);

            const hasTypeClass = component.el.className.includes('ozc-message-banner--info');
            expect(hasTypeClass).toBe(true);
        });

        test('should have correct content', () => {
            const component = new Component({
                content: 'hello',
            });

            const contentEl = component.el.getElementsByClassName('ozc-message-banner__content')[0];

            expect(contentEl).toBeDefined();
            expect(contentEl.innerHTML).toBe('hello');
        });

        test('should create a link opening in new window', () => {
            const component = new Component({
                content: 'hello',
                url: 'https://omaze.com',
            });

            expect(component.el.outerHTML).toContain('<a');
            expect(component.el.outerHTML).toContain('target="_blank');
        });

        test('should create a link opening in same window', () => {
            const component = new Component({
                content: 'hello',
                url: 'https://omaze.com',
                linkSameWindow: true,
            });

            expect(component.el.outerHTML).toContain('<a');
            expect(component.el.outerHTML).not.toContain('target="_blank');
        });
    });
});
