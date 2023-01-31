import { default as Feature } from './email-capture';
import { default as Success } from './success';
import Config from '../test-config';
import * as mockedConfig from '../config';
import * as analyticsFunctions from './analytics';


describe('Email Capture Test', () => {
    let getBaseCssClassSpy;
    let createEmailElementSpy;
    let createButtonElementSpy;
    let getSuccessSpy;
    let trackAnalyticsEventSpy;

    beforeEach(() => {
        getBaseCssClassSpy = jest.spyOn(Feature, 'getBaseCssClass');
        createEmailElementSpy = jest.spyOn(Feature, 'createEmailElement');
        createButtonElementSpy = jest.spyOn(Feature, 'createButtonElement');
        getSuccessSpy = jest.spyOn(Success, 'getContent');

        trackAnalyticsEventSpy = jest.spyOn(analyticsFunctions, 'trackAnalyticsEvent');
        trackAnalyticsEventSpy.mockImplementation(() => false);
    });

    afterEach(() => {
        getBaseCssClassSpy.mockRestore();
        createEmailElementSpy.mockRestore();
        createButtonElementSpy.mockRestore();
        getSuccessSpy.mockRestore();
        trackAnalyticsEventSpy.mockRestore();
    });

    test('should return the base css class', () => {
        const BASE_CSS_CLASS = 'email_capture_container';
        const baseClass = Feature.getBaseCssClass();
        expect(baseClass).toEqual(BASE_CSS_CLASS);
    });

    test('should call methods when getContent is called', () => {
        const option = Config.templates[0].options[0];
        Feature.getContent(option, Config.templates[0]);
        expect(getBaseCssClassSpy).toHaveBeenCalled();
        expect(createEmailElementSpy).toHaveBeenCalled();
        expect(createButtonElementSpy).toHaveBeenCalled();
    });

    test('should return the expected content when getContent is called', () => {
        const option = Config.templates[0].options[0];
        const content = Feature.getContent(option, Config.templates[0]);
        expect(content.children[0].content).toEqual(option.formTitle);
        expect(content.children[1].content).toEqual(option.formMessage);
        expect(content.children[2].cssClasses).toEqual('email_capture_container__image');
        expect(content.children[3].cssClasses).toEqual('email oz-field cec');
        expect(content.children[4].cssClasses).toEqual('button');
        expect(content.children[5].content).toEqual(option.legalCopy);
    });

    test('should return a link as the legal copy when legal url exists', () => {
        const option = Config.templates[0].options[0];
        option.legalUrl = '//www.google.com';
        const content = Feature.getContent(option, Config.templates[0]);
        expect(content.children[5].content).toEqual(option.legalCopy);
        expect(content.children[5].tag).toEqual('a');
        expect(content.children[5].cssClasses).toEqual('email_capture_container__legal link');
        expect(content.children[5].attributes.href).toEqual(option.legalUrl);
    });

    test('should return a paragraph as the legal copy when legal url does not exists', () => {
        const option = Config.templates[0].options[0];
        option.legalUrl = '';
        const content = Feature.getContent(option, Config.templates[0]);
        expect(content.children[5].content).toEqual(option.legalCopy);
        expect(content.children[5].tag).toEqual('p');
        expect(content.children[5].cssClasses).toEqual('email_capture_container__legal');
    });

    describe('should set correct lists options', () => {
        test('with no data', () => {
            // eslint-disable-next-line no-import-assign
            mockedConfig.default = false;
            const options = false;

            expect(Feature.emailOptinLists(options)).toEqual({})
        });

        test('with options only', () => {
            // eslint-disable-next-line no-import-assign
            mockedConfig.default = false;
            const options = { listName: 'hello' };

            expect(Feature.emailOptinLists(options)).toEqual({
                'hello': 1,
            })
        });

        test('with single config list', () => {
            // eslint-disable-next-line no-import-assign
            mockedConfig.default = { listName: 'string list' };
            const options = false;

            expect(Feature.emailOptinLists(options)).toEqual({
                'string list': 1,
            })
        });

        test('with multiple config lists', () => {
            // eslint-disable-next-line no-import-assign
            mockedConfig.default = { listName: [
                'list one',
                'list two',
            ]};
            const options = false;

            expect(Feature.emailOptinLists(options)).toEqual({
                'list one': 1,
                'list two': 1,
            })
        });

        test('with option and config list', () => {
            // eslint-disable-next-line no-import-assign
            mockedConfig.default = { listName: 'string list' };
            const options = { listName: 'hello' };

            expect(Feature.emailOptinLists(options)).toEqual({
                'string list': 1,
                'hello': 1,
            })
        });
    });

    describe('submitHandler', () => {
        function insertHTMLwithEmail (email) {
            const emailFieldID = 'customerEmailCapture';
            const errorMessageFieldClass = 'email-error-message';
            const emailFieldClass = 'cec';

            const emailEl = `<input id=${emailFieldID} value=${email} />`;
            const errorMessageField = `<div class=${errorMessageFieldClass}  />`;
            const emailField = `<div class=${emailFieldClass} />`;

            const html = [
                emailEl,
                errorMessageField,
                emailField,
            ].join();

            document.body.innerHTML = html;
        }

        let params;

        beforeEach(() => {
            document.body.innerHTML = '';

            window.Sailthru = {
                integration: jest.fn().mockReturnValue([]),
            };

            params = {
                option: {},
                template: {},
            };
        });

        test('should not call Sailthru with no email', () => {
            insertHTMLwithEmail('');
            Feature.submitHandler(params.option, params.template);

            expect(window.Sailthru.integration).not.toHaveBeenCalled();
        });

        test('should call Sailthru as \'userSignUp\'', () => {
            insertHTMLwithEmail('hello@email.com')

            Feature.submitHandler(params.option, params.template);
            const arg = window.Sailthru.integration.mock.calls[0][0];

            expect(arg).toBe('userSignUp');
        });

        test('should call Sailthru with correct email', () => {
            insertHTMLwithEmail('hello@email.com')

            Feature.submitHandler(params.option, params.template);

            const arg = window.Sailthru.integration.mock.calls[0][1];

            expect(arg.email).toBe('hello@email.com');
        });

        test('should call Sailthru with correct key', () => {
            insertHTMLwithEmail('hello@email.com')

            Feature.submitHandler(params.option, params.template);

            const arg = window.Sailthru.integration.mock.calls[0][1];

            expect(arg.key).toBe('email');
        });

        test('should call Sailthru with correct lists', () => {
            // eslint-disable-next-line no-import-assign
            mockedConfig.default = { listName: [
                'one',
                'two',
            ]};

            insertHTMLwithEmail('hello@email.com')

            Feature.submitHandler(params.option, params.template);

            const arg = window.Sailthru.integration.mock.calls[0][1];

            expect(arg.lists.one).toEqual(1);
            expect(arg.lists.two).toEqual(1);
        });

        test('should call Sailthru with callback functions', () => {
            insertHTMLwithEmail('hello@email.com')

            Feature.submitHandler(params.option, params.template);

            const arg = window.Sailthru.integration.mock.calls[0][1];

            expect(typeof(arg.onSuccess)).toBe('function');
            expect(typeof(arg.onError)).toBe('function');
        });

        test('should call trackAnalyticsEvent', () => {
            insertHTMLwithEmail('hello@email.com')

            Feature.submitHandler(params.option, params.template);

            expect(trackAnalyticsEventSpy).toHaveBeenCalled();
        });
    });
});
