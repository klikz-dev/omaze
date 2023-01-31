import { ISweepstakes } from '../shared/ISweepstakes';

export function useEligibleCollection (country: string | null, collection: ISweepstakes[]): ISweepstakes[] {
    if (country && window.ozEligibilitySettings.restrictedCountries.includes(country)) {
        return collection.filter((sweepstakes: ISweepstakes): boolean => {
            return sweepstakes.launchDate < window.ozEligibilitySettings.eligibilityDate;
        });
    }

    return collection;
}
