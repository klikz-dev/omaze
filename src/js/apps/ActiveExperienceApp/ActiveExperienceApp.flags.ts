import { IFeatureEnum, IFeatureFlagMap } from '@omaze/feature';

export const FEATURE_FLAGS: IFeatureEnum = {
    DONATION_OPTIONS: 'DonationOptions',
};

export const INITIAL_FLAG_STATE: IFeatureFlagMap = {
    [FEATURE_FLAGS.DONATION_OPTIONS]: true,
};
