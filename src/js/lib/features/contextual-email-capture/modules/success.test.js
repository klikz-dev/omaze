import { default as Feature } from './success';
import Config from '../test-config';

describe('Success Screen Test', () => {
    test('should return the expected content when getContent is called', () => {
        const option = Config.templates[0].options[0];
        const content = Feature.getContent(option);
        expect(content.children[0].content).toEqual(option.successTitle);
        expect(content.children[1].content).toEqual(option.successMessage);
    });
});
