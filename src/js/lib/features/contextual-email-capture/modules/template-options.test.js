import { default as TemplateOptions } from './template-options';
import { default as EmailCapture } from './email-capture';
import Config from '../test-config';
import ActualConfig from '../config';


import '../../../cookies.js';
import '../../../utility/date';

ActualConfig.templates = Config.templates
ActualConfig.timeDelayInSeconds = Config.timeDelayInSeconds
ActualConfig.listName = Config.listName
ActualConfig.contextualEmailSessionCookieName = Config.contextualEmailSessionCookieName
ActualConfig.cookieExpirationInDays = Config.cookieExpirationInDays

describe('Template Options Test', () => {
    let getBaseCssClassSpy;
    let createTemplateHeaderSpy;
    let createTemplateOptionSpy;
    let combineTemplateOptionsSpy;
    let createModalSpy;
    let showModalSpy;
    let doesSessionExistSpy;
    let saveUserSessionSpy;
    let getContentSpy;

    beforeEach(() => {
        getBaseCssClassSpy = jest.spyOn(TemplateOptions, 'getBaseCssClass');
        createTemplateHeaderSpy = jest.spyOn(TemplateOptions, 'createTemplateHeader');
        createTemplateOptionSpy = jest.spyOn(TemplateOptions, 'createTemplateOption');
        combineTemplateOptionsSpy = jest.spyOn(TemplateOptions, 'combineTemplateOptions');
        createModalSpy = jest.spyOn(TemplateOptions, 'createModal');
        showModalSpy = jest.spyOn(TemplateOptions, 'showModal');
        doesSessionExistSpy = jest.spyOn(TemplateOptions, 'doesSessionExist');
        saveUserSessionSpy = jest.spyOn(TemplateOptions, 'saveUserSession');
        getContentSpy = jest.spyOn(EmailCapture, 'getContent');
        SDG.setCookie(Config.contextualEmailSessionCookieName, 'val', 1);
    });

    afterEach(() => {
        getBaseCssClassSpy.mockRestore();
        createTemplateHeaderSpy.mockRestore();
        createTemplateOptionSpy.mockRestore();
        combineTemplateOptionsSpy.mockRestore();
        createModalSpy.mockRestore();
        showModalSpy.mockRestore();
        doesSessionExistSpy.mockRestore();
        saveUserSessionSpy.mockRestore();
        getContentSpy.mockRestore();
        SDG.deleteCookie(Config.contextualEmailSessionCookieName);
    });

    test('should return the base css class', () => {
        const BASE_CSS_CLASS = 'oz-contextual-email-capture';
        const baseClass = TemplateOptions.getBaseCssClass();

        expect(baseClass).toEqual(BASE_CSS_CLASS);
    });

    test('should call methods when createModal is called', () => {
        TemplateOptions.showModal({
            target: 'Product',
            tags: ['$oz_sweepstake_primary-category:Entertainment', '$oz_sweepstake_status:active'],
        });

        expect(getBaseCssClassSpy).toHaveBeenCalled();
        expect(createTemplateHeaderSpy).toHaveBeenCalled();
        expect(createTemplateOptionSpy).toHaveBeenCalledWith(Config.templates[0].options[0], Config.templates[0]);
        expect(combineTemplateOptionsSpy).toHaveBeenCalled();
        expect(createModalSpy).toHaveBeenCalled();
    });

    test('should return the expected content when createModal is called', () => {
        const template = Config.templates[0];
        const modal = TemplateOptions.createModal(template);
        const modalContent = modal.panelHtml.children;

        expect(modalContent[0].cssClasses).toEqual('template-preferences');

        const templateHeader = modalContent[0].children;

        expect(templateHeader[0].cssClasses)
            .toEqual('template-preferences__header');
        expect(templateHeader[1].cssClasses)
            .toEqual('template-preferences__options');
    });

    test('should return true if the sweepstake tag matches the specified config', () => {
        const tags = [
            '$oz_sweepstake_primary-category:entertainment',
            '$oz_sweepstake_secondary-category:theatre',
            '$oz_sweepstake_status:active',
        ];
        const template = Config.templates[0];
        const config = {
            tags: tags,
            target: 'Product',
        };

        const hasSweepstakeTag = TemplateOptions.hasSweepstakeTagAndState(config, template);

        expect(hasSweepstakeTag).toEqual(true);
    });

    test('should return false if the sweepstake tag or state does not match config', () => {
        const tags = [
            '$oz_sweepstake_primary-category:entertainment',
            '$oz_sweepstake_secondary-category:theatre',
        ];
        const template = Config.templates[0];
        const config = {
            tags: tags,
            target: 'Product',
        };
        const hasSweepstakeTag = TemplateOptions.hasSweepstakeTagAndState(config, template);

        expect(hasSweepstakeTag).toEqual(false);
    });

    test('should return true for Thank You page when campaign is closed', () => {
        const tags = [
            '$oz_sweepstake_primary-category:entertainment',
            '$oz_sweepstake_secondary-category:theatre',
            '$oz_sweepstake_status:closed',
        ];
        const config = {
            tags: tags,
            target: 'Thank You',
        };
        const template = Config.templates[0];
        const hasSweepstakeTag = TemplateOptions.hasSweepstakeTagAndState(config, template);

        expect(hasSweepstakeTag).toEqual(true);
    });

    test('should call show modal if user session does not exist', () => {
        const option = {
            target: 'Product',
            tags: [],
        }
        SDG.deleteCookie(Config.contextualEmailSessionCookieName);
        TemplateOptions.init(option);

        expect(showModalSpy).toHaveBeenCalled();
        expect(doesSessionExistSpy).toHaveBeenCalled();
    });

    test('should not call show modal if user session already exists', () => {
        const option = {
            target: 'Product',
            tags: [],
        }
        SDG.setCookie(Config.contextualEmailSessionCookieName, 'val', 1);
        TemplateOptions.init(option);

        expect(doesSessionExistSpy).toHaveBeenCalled();
        expect(showModalSpy).not.toHaveBeenCalled();
    })

    test('should call email capture get content method when navigateToOption is called', () => {
        const option = Config.templates[0].options[0];
        TemplateOptions.navigateToOption(option, Config.templates[0]);
        expect(getContentSpy).toHaveBeenCalled();
    });

    test('should return valid templates when findTemplatesWithSweepstakeTagAndState is called', () => {
        const tags = [
            '$oz_sweepstake_primary-category:entertainment',
            '$oz_sweepstake_secondary-category:theatre',
            '$oz_sweepstake_status:active',
        ];
        const config = {
            tags: tags,
            target: 'Product',
        };
        const templateA = Config.templates[0];
        const templateB = Config.templates[1];
        const templateC = Config.templates[2];
        templateB.sweepstakeState = 'closed';
        templateC.tag = 'cars';
        const templates = [templateA, templateB, templateC]
        const validTemplates = TemplateOptions.findTemplatesWithSweepstakeTagAndState(config, templates);
        expect(validTemplates.length).toBe(1);
        expect(validTemplates[0].tag).toBe(templateA.tag);
        expect(validTemplates[0].sweepstakeState).toBe(templateA.sweepstakeState);
    });

    test('should return available templates when getAvailableTemplatesByDate is called', () => {
        const templates = [Config.templates[0], Config.templates[1], Config.templates[2]]
        const availableTemplates = TemplateOptions.getAvailableTemplatesByDate(templates);
        expect(availableTemplates.length).toBe(2);
        expect(availableTemplates[0].tag).toBe(Config.templates[0].tag);
        expect(availableTemplates[0].sweepstakeState).toBe(Config.templates[0].sweepstakeState);
        expect(availableTemplates[1].tag).toBe(Config.templates[1].tag);
        expect(availableTemplates[1].sweepstakeState).toBe(Config.templates[1].sweepstakeState);
    });
});
