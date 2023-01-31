import { emailValidation } from '../validation.js';

describe('Email Validation', () => {
    const bannedCases = [
        '',
        'a',
        'aa',
        'aa@',
        'aa@a',
        'aa@a.',
        'aa@a.a',
        'aa@a.a.a',
        'aa@a..aa',
        'a-@a.aa',
        'aa..a@aa.aaa',
    ];

    const allowedCases = [
        'aa@aa.aa',
        'a_a@aa.aa.aa',
        'a-a@aa.aa',
        'a.a@a-a.aa',
    ];

    bannedCases.forEach((testCase) => {
        test(`not allowed: ${testCase}`, () => {
            expect(emailValidation(testCase)).toEqual(false)
        });
    });

    allowedCases.forEach((testCase) => {
        test(`allowed: ${testCase}`, () => {
            expect(emailValidation(testCase)).toEqual(true)
        });
    });
});
