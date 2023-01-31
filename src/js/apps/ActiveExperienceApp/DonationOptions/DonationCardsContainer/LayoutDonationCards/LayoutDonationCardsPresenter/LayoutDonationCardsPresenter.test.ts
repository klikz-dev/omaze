import { ILayoutDonationCardsPresenterClassNames, LayoutDonationCardsPresenter } from './LayoutDonationCardsPresenter';

describe('LayoutDonationCardsPresenter', (): void => {
    it('should allow a className config', (): void => {
        const presenter: LayoutDonationCardsPresenter = new LayoutDonationCardsPresenter({
            className: 'extra',
        });

        const classNames: ILayoutDonationCardsPresenterClassNames = presenter.getAllClassNames();

        expect(classNames).toEqual({
            host: 'host extra',
        });
    });

    describe('cards per row', (): void => {
        interface ITestCase {
            total: number;
            desktop: number;
            tablet: number;
        }

        /* eslint-disable object-curly-spacing, object-property-newline */
        const testCases: ITestCase[] = [
            {total: 1,  desktop: 0, tablet: 0},
            {total: 2,  desktop: 0, tablet: 0},
            {total: 3,  desktop: 0, tablet: 0},
            {total: 4,  desktop: 0, tablet: 0},
            {total: 5,  desktop: 3, tablet: 3},
            {total: 6,  desktop: 3, tablet: 3},
            {total: 7,  desktop: 4, tablet: 0},
            {total: 8,  desktop: 4, tablet: 0},
            {total: 9,  desktop: 0, tablet: 3},
            {total: 10, desktop: 0, tablet: 0},
            {total: 11, desktop: 0, tablet: 0},
            {total: 12, desktop: 0, tablet: 0},
        ];
        /* eslint-enable object-curly-spacing, object-property-newline */

        testCases.forEach((testCase: ITestCase): void => {
            test(`with ${testCase.total} children`, (): void => {
                expect(LayoutDonationCardsPresenter.cardsPerRowDesktop(testCase.total)).toEqual(testCase.desktop);
                expect(LayoutDonationCardsPresenter.cardsPerRowTablet(testCase.total)).toEqual(testCase.tablet);
            });
        });
    });

    describe('should set all cardsPerRow classes', (): void => {
        interface ITestCase {
            children: number;
            classes: string[];
        }

        /* eslint-disable object-curly-spacing, object-property-newline */
        const testCases: ITestCase[] = [
            { children: 4,  classes: [] },
            { children: 5,  classes: ['cardsPerRow-3--tablet', 'cardsPerRow-3--desktop'] },
            { children: 6,  classes: ['cardsPerRow-3--tablet', 'cardsPerRow-3--desktop'] },
            { children: 7,  classes: ['cardsPerRow-4--desktop'] },
        ];
        /* eslint-enable object-curly-spacing, object-property-newline */

        testCases.forEach((testCase: ITestCase): void => {
            test(`with ${testCase.children} children`, (): void => {
                const presenter: LayoutDonationCardsPresenter = new LayoutDonationCardsPresenter({
                    childrenCount: testCase.children,
                });

                const classNames: ILayoutDonationCardsPresenterClassNames = presenter.getAllClassNames();
                const hostClasses: string = classNames.host;
                const hostClassesArr: string[] = hostClasses.split(' ');

                const matchingClasses: string[] = hostClassesArr.filter((className: string): boolean => {
                    return className.startsWith('cardsPerRow');
                });

                expect(matchingClasses.length).toEqual(testCase.classes.length);

                testCase.classes.forEach((className: string): void => {
                    expect(hostClassesArr).toContain(className);
                });
            });
        });
    });
});
