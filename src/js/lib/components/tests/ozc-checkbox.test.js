import  {default as Component}  from '../form/ozc-checkbox.js';

describe('create Checkbox properties', () => {
    const testCases = [
        {
            name: 'should set default values',
            input: undefined,
            expected: {
                label: undefined,
                checked: false,
                name: undefined,
                value: undefined,
                disabled: false,
            },
        },
        {
            name: 'should set new values',
            input: {
                label: 'my label',
                checked: true,
                name: 'check_box',
                value: 'on',
                disabled: true,
                cssClasses: 'hello-css',
            },
            expected: {
                label: 'my label',
                checked: true,
                name: 'check_box',
                value: 'on',
                disabled: true,
                cssClasses: 'hello-css',
            },
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () => {
            expect(new Component(testCase.input)).toMatchObject(testCase.expected)
        });
    });
});

describe('create Checkbox', () => {
    test('should create basic HTML', () => {
        const component = new Component();

        const label = component.el.getElementsByClassName('ozc-checkbox__label');
        const checkbox = component.el.getElementsByClassName('ozc-checkbox__box');
        const input = component.el.getElementsByTagName('input');

        expect(label.length).toEqual(0);
        expect(checkbox.length).toEqual(1);
        expect(input.length).toEqual(1);
    });

    test('should not be checked by default', () => {
        const component = new Component();

        expect(component.checked).toEqual(false);

        expect(component.el.classList[0]).toEqual('ozc-checkbox');
        expect(component.el.classList[1]).toBeUndefined();
    });

    test('should create label element', () => {
        const component = new Component({
            label: 'my label',
        });

        const label = component.el.getElementsByClassName('ozc-checkbox__label');

        expect(label.length).toEqual(1);
    });

    test('should initialize a checked checkbox', () => {
        const component = new Component({
            checked: true,
        });

        const expected = {
            '0': 'ozc-checkbox',
            '1': 'ozc-checkbox--checked',
        }

        expect(component.el.classList).toMatchObject(expected);
    });

    test('should set default and optional CSS classes', () => {
        const component = new Component({
            cssClasses: 'my-css',
        });

        const expected = {
            '0': 'ozc-checkbox',
            '1': 'my-css',
        }

        expect(component.el.classList).toMatchObject(expected);
    });
});

describe('onClick', () => {
    test('should toggle checked property on click', () => {
        const component = new Component();

        expect(component.checked).toEqual(false);
        expect(component.el.classList[1]).toBeUndefined();

        component.onClick();

        expect(component.checked).toEqual(true);
        expect(component.el.classList[1]).toEqual('ozc-checkbox--checked');

        component.onClick();

        expect(component.checked).toEqual(false);
        expect(component.el.classList[1]).toBeUndefined();
    });
});
