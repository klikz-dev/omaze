import  {default as Component}  from '../ozc-modal.js';

describe('create Modal properties', () => {
    const testCases = [
        {
            name: 'should set EL to false with no panelHtml option',
            input: {
                panelHtml: undefined,
            },
            expected: {
                el: false,
            },
        },
        {
            name: 'should set default values',
            input: undefined,
            expected: {
                appendToSelector: 'body',
                fullScreen: false,
                allowBodyOverflow: false,
                animation: undefined,
            },
        },
        {
            name: 'should set new values',
            input: {
                panelHtml: 'hello',
                closeLinkText: 'hello',
                appendToSelector: 'hello',
                fullScreen: true,
                allowBodyOverflow: true,
                cssClasses: 'hello-css',
            },
            expected: {
                panelHtml: 'hello',
                closeLinkText: 'hello',
                appendToSelector: 'hello',
                fullScreen: true,
                allowBodyOverflow: true,
                cssClasses: 'hello-css',
            },
        },
        {
            name: 'should not set invalid animation value',
            input: {
                animation: 'fly in on a unicorn and explode mid-air',
            },
            expected: {
                animation: undefined,
            },
        },
        {
            name: 'should set valid animation value',
            input: {
                animation: 'slideUp',
            },
            expected: {
                animation: 'slide-up',
            },
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () => {
            expect(new Component(testCase.input)).toMatchObject(testCase.expected)
        });
    });
});

describe('create Modal HTML', () => {
    test('should set body with string panelHtml', () => {
        const component = new Component({
            panelHtml: '<h1>hello</h1>',
        });

        const content = component.el.getElementsByClassName('ozc-modal__body')[0];
        const expected = '<h1>hello</h1>';

        expect(content.innerHTML).toEqual(expected);
    });

    test('should set body with HTMLElement panelHtml', () => {
        const component = new Component({
            panelHtml: document.createElement('h1'),
        });

        const content = component.el.getElementsByClassName('ozc-modal__body')[0];
        const expected = '<h1></h1>';

        expect(content.innerHTML).toEqual(expected);
    });

    test('should show close element icon by default', () => {
        const component = new Component({
            panelHtml: document.createElement('h1'),
        });

        const text = component.el.getElementsByClassName('ozc-modal__close-text');
        expect(text.length).toEqual(0);

        const icon = component.el.getElementsByClassName('ozc-modal__close-icon');
        expect(icon.length).toEqual(1);
    });

    test('should set close element text', () => {
        const component = new Component({
            panelHtml: document.createElement('h1'),
            closeLinkText: 'close me',
        });

        const content = component.el.getElementsByClassName('ozc-modal__close-text')[0];
        const expected = 'close me';

        expect(content.innerHTML).toEqual(expected);
    });

    test('should set default and optional CSS classes', () => {
        const component = new Component({
            panelHtml: document.createElement('h1'),
            cssClasses: 'my-css',
        });

        const expected = {
            '0': 'ozc-modal__mask',
            '1': 'my-css',
        }

        expect(component.el.classList).toMatchObject(expected);
    });

    test('should set fullScreen CSS class', () => {
        const component = new Component({
            panelHtml: document.createElement('h1'),
            fullScreen: true,
        });

        const content = component.el.querySelectorAll('.ozc-modal.ozc-modal--fullscreen');

        expect(content.length).toEqual(1);
    });

    test('should set animation CSS class', () => {
        const component = new Component({
            panelHtml: document.createElement('h1'),
            animation: 'slideUp',
        });

        const content = component.el.querySelectorAll('.ozc-modal.ozc-modal--animate-slide-up');

        expect(content.length).toEqual(1);
    });
});

describe('modal actions', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    test('show() should append modal to DOM', () => {
        const component = new Component({
            panelHtml: '<h1>hello</h1>',
        });
        component.show();

        const modal = document.getElementsByClassName('ozc-modal');

        expect(modal.length).toEqual(1);
    });

    test('show() should append modal to specified selector', () => {
        document.body.innerHTML = '<div class="hello"></div>';

        const component = new Component({
            panelHtml: '<h1>hello</h1>',
            appendToSelector: '.hello',
        });
        component.show();

        const parent = document.getElementsByClassName('hello')[0];
        const modal = parent.getElementsByClassName('ozc-modal');

        expect(modal.length).toEqual(1);
    });

    test('close click should remove modal from DOM', () => {
        const component = new Component({
            panelHtml: '<h1>hello</h1>',
        });
        component.show();

        let modal = document.getElementsByClassName('ozc-modal');

        expect(modal.length).toEqual(1);

        const closeEl = document.getElementsByClassName('ozc-modal__close')[0];

        closeEl.click();

        modal = document.getElementsByClassName('ozc-modal');

        expect(modal.length).toEqual(0);
    });
});
