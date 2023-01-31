import { ISweepstakes } from '../SweepstakesList/SweepstakesCard/SweepstakesCard';

import { useEligibleCollection } from './useEligibleCollection';

const commonSweepstakesProps: Pick<ISweepstakes, 'charity' | 'handle' | 'image' | 'title' | 'url' | 'hasWinner' | 'closeDate'> = {
    image: {
        src: '',
        alt: '',
    },
    charity: '',
    title: '',
    url: '',
    handle: '',
    closeDate: new Date(),
    hasWinner: false,
};

function testIneligibleCountries (test: (countryCode: string, country: string) => void): void {
    const ineligibleCountry: { [key: string]: string } = {
        UK: 'United Kingdom',
        DE: 'Germany',
        AU: 'Australia',
    };

    Object.keys(ineligibleCountry).forEach((countryCode: string): void => {
        test(countryCode, ineligibleCountry[countryCode]);
    });
}

describe('useEligibleCollection', (): void => {
    beforeEach((): void => {
        window.ozEligibilitySettings = {
            restrictedCountries: ['UK', 'DE', 'AU'],
            eligibilityDate: new Date('July 21, 2021'),
        };
    });

    it('returns no sweepstakes if there are no given sweepstakes', (): void => {
        const collection: ISweepstakes[] = [];
        const sweepstakesList: ISweepstakes[] = useEligibleCollection('US', collection);

        expect(sweepstakesList).toHaveLength(0);
    });

    it('returns all sweepstakes if the country is not restricted, regardless of the launch date', (): void => {
        let collection: ISweepstakes[] = [{
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }];

        let sweepstakesList: ISweepstakes[] = useEligibleCollection('US', collection);

        expect(sweepstakesList).toHaveLength(3);

        collection = [{
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 22, 2021'),
        }];
        sweepstakesList = useEligibleCollection('US', collection);

        expect(sweepstakesList).toHaveLength(5);
    });

    it('returns all sweepstakes when a user\'s geolocation is unknown', (): void => {
        const collection: ISweepstakes[] = [{
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 22, 2021'),
        }];

        const sweepstakesList: ISweepstakes[] = useEligibleCollection(null, collection);

        expect(sweepstakesList).toHaveLength(2);
    });

    testIneligibleCountries(function testNoEligibleSweepstakes (countryCode: string, country: string): void {
        it(`returns nothing when ${country} is restricted and launch dates for all sweepstakes are on or after the eligibility date`, (): void => {
            const collection: ISweepstakes[] = [{
                ...commonSweepstakesProps,
                launchDate: new Date('July 22, 2021'),
            }, {
                ...commonSweepstakesProps,
                launchDate: new Date('July 22, 2021'),
            }, {
                ...commonSweepstakesProps,
                launchDate: new Date('July 22, 2021'),
            }];

            const sweepstakesList: ISweepstakes[] = useEligibleCollection(countryCode, collection);

            expect(sweepstakesList).toHaveLength(0);
        });
    });

    it('returns all sweepstakes when launch date is before eligibility date in United States', (): void => {
        const collection: ISweepstakes[] = [{
            ...commonSweepstakesProps,
            launchDate: new Date('July 5, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 5, 2021'),
        }];

        const sweepstakesList: ISweepstakes[] = useEligibleCollection('US', collection);

        expect(sweepstakesList).toHaveLength(2);
    });

    testIneligibleCountries(function testLaunchDateBeforeEligibilityDate (countryCode: string, country: string): void {
        it(`returns all sweepstakes when launch date is before eligibility date in restricted ${country}`, (): void => {
            const collection: ISweepstakes[] = [{
                ...commonSweepstakesProps,
                launchDate: new Date('July 5, 2021'),
            }, {
                ...commonSweepstakesProps,
                launchDate: new Date('July 5, 2021'),
            }];

            const sweepstakesList: ISweepstakes[] = useEligibleCollection(countryCode, collection);

            expect(sweepstakesList).toHaveLength(2);
        });
    });

    it('returns all sweepstakes when a launch date is before and one after the eligibility date in United States', (): void => {
        const collection: ISweepstakes[] = [{
            ...commonSweepstakesProps,
            launchDate: new Date('July 5, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 20, 2021'),
        }];

        const sweepstakesList: ISweepstakes[] = useEligibleCollection('US', collection);

        expect(sweepstakesList).toHaveLength(2);
    });

    testIneligibleCountries(function testLaunchDateBeforeAndAfterEligibilityDate (countryCode: string, country: string): void {
        it(`returns one eligible sweepstakes when one launch date is before and one is after the eligibility date in a restricted ${country}`, (): void => {
            const collection: ISweepstakes[] = [{
                ...commonSweepstakesProps,
                launchDate: new Date('July 5, 2021'),
            }, {
                ...commonSweepstakesProps,
                launchDate: new Date('July 21, 2021'),
            }];

            const sweepstakesList: ISweepstakes[] = useEligibleCollection(countryCode, collection);

            expect(sweepstakesList).toHaveLength(1);
            expect(sweepstakesList[0].launchDate.toDateString()).toBe(collection[0].launchDate.toDateString());
        });
    });

    it('returns all sweepstakes when a launch date is on the eligibility date for United States', (): void => {
        const collection: ISweepstakes[] = [{
            ...commonSweepstakesProps,
            launchDate: new Date('July 21, 2021'),
        }, {
            ...commonSweepstakesProps,
            launchDate: new Date('July 21, 2021'),
        }];

        const sweepstakesList: ISweepstakes[] = useEligibleCollection('US', collection);

        expect(sweepstakesList).toHaveLength(2);
    });

    testIneligibleCountries(function testLaunchDateIsOnEligibilityDate (countryCode: string, country: string): void {
        it(`should return no sweepstakes when a launch date is on the eligibility date for restricted ${country}`, (): void => {
            const collection: ISweepstakes[] = [{
                ...commonSweepstakesProps,
                launchDate: new Date('July 21, 2021'),
            }, {
                ...commonSweepstakesProps,
                launchDate: new Date('July 21, 2021'),
            }];

            const sweepstakesList: ISweepstakes[] = useEligibleCollection(countryCode, collection);

            expect(sweepstakesList).toHaveLength(0);
        });
    });
});
