import { default as Config } from './config';

describe('Config', () => {
    test('config values should not pass the character limits', () => {
        const majorHeadlineLimit = 42;
        const minorHeadlineLimit = 29;
        const selectionLabelLimit = 40;
        const legalTextLimit = 211;
        for (let i = 0; i < Config.templates.length; i++) {
            const template = Config.templates[i];
            const optionA = template.options[0];
            const optionB = template.options[1];
            expect(template.intro.title.length).toBeLessThanOrEqual(minorHeadlineLimit);
            expect(template.intro.message.length).toBeLessThanOrEqual(majorHeadlineLimit);
            expect(optionA.image.caption.length).toBeLessThanOrEqual(selectionLabelLimit);
            expect(optionA.formTitle.length).toBeLessThanOrEqual(minorHeadlineLimit);
            expect(optionA.formMessage.length).toBeLessThanOrEqual(majorHeadlineLimit);
            expect(optionA.successTitle.length).toBeLessThanOrEqual(minorHeadlineLimit);
            expect(optionA.successMessage.length).toBeLessThanOrEqual(majorHeadlineLimit);
            expect(optionA.legalCopy.length).toBeLessThanOrEqual(legalTextLimit);
            expect(optionB.image.caption.length).toBeLessThanOrEqual(selectionLabelLimit);
            expect(optionB.formTitle.length).toBeLessThanOrEqual(minorHeadlineLimit);
            expect(optionB.formMessage.length).toBeLessThanOrEqual(majorHeadlineLimit);
            expect(optionB.successTitle.length).toBeLessThanOrEqual(minorHeadlineLimit);
            expect(optionB.successMessage.length).toBeLessThanOrEqual(majorHeadlineLimit);
            expect(optionB.legalCopy.length).toBeLessThanOrEqual(legalTextLimit);
        }
    });
});
