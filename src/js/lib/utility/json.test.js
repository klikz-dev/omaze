import './json';

describe('parse', () => {
    it('should parse valid value', () => {
        expect(SDG.Utility.Json.parse('["AF","BE","BO","BS"]')).toBeTruthy();
    });

    it('should not parse invalid value', () => {
        expect(SDG.Utility.Json.parse('{"foo" : 1, }')).toBeFalsy();
    });
});
