import { determineArrowDirection } from './tracking';

describe('determineArrowDirection', () => {
    const testCases = [
        {
            name: 'should return "Right" if slide moves to next item',
            input: {
                currentSlide: 2,
                nextSlide: 3,
                numSlides: 4,
            },
            expected: 'Right',
        },
        {
            name: 'should return "Right" if slide moves to previous item',
            input: {
                currentSlide: 1,
                nextSlide: 2,
                numSlides: 4,
            },
            expected: 'Right',
        },
        {
            name: 'should return "Left" if slide moves to previous item',
            input: {
                currentSlide: 3,
                nextSlide: 2,
                numSlides: 4,
            },
            expected: 'Left',
        },
        {
            name: 'should return "Right" if slide moves to the next item',
            input: {
                currentSlide: 3,
                nextSlide: 0,
                numSlides: 4,
            },
            expected: 'Right',
        },
        {
            name: 'should return "Left" if slide moves to previous item',
            input: {
                currentSlide: 0,
                nextSlide: 3,
                numSlides: 4,
            },
            expected: 'Left',
        },
    ];

    testCases.forEach((testCase) => {
        test(testCase.name, () => {
            const {
                currentSlide,
                nextSlide,
                numSlides,
            } = testCase.input;
            expect(determineArrowDirection(currentSlide, nextSlide, numSlides)).toEqual(testCase.expected);
        });
    });
});
