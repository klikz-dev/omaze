import { QueryResult, useQuery } from '@apollo/client';
import { App, IFunctionComponent } from '@omaze/app';
import { useNamespaceSelector } from '@omaze/redux';
import React, { ReactElement, useMemo } from 'react';

import { IExperience } from '../ActiveExperienceModule/ActiveExperience.state';
import { selectDonorCounterBlackList } from '../ActiveExperienceModule/selectors/selectDonorCounterBlackList/selectDonorCounterBlackList';
import { selectDonorCounterMinDonors } from '../ActiveExperienceModule/selectors/selectDonorCounterMinDonors/selectDonorCounterMinDonors';
import { selectExperience } from '../ActiveExperienceModule/selectors/selectExperience/selectExperience';
import { Portal } from '../shared/Portal/Portal.component';

import { donorCounterNamespace, FEATURE_NAME } from './DonorCounter.namespace';
import { DonorCounterContainer } from './DonorCounterContainer/DonorCounterContainer.component';
import { GET_DONOR_COUNT } from './queries.graphql';

export const DonorCounter: IFunctionComponent = donorCounterNamespace.createComponent(
    FEATURE_NAME,
    (): ReactElement | null => {
        const experience: IExperience = useNamespaceSelector(selectExperience);
        const minimumDonors: number = useNamespaceSelector(selectDonorCounterMinDonors);
        const donorCounterBlacklist: string[] = useNamespaceSelector(selectDonorCounterBlackList);

        const { loading, error, data }: QueryResult<IDonorCounterAPIResponse> = useQuery(GET_DONOR_COUNT, {
            skip: !experience.id,
            variables: {
                productID: experience.id,
            },
        });

        const donorCount: number = data?.getDonorsCount?.donor_count || 0;

        const hideCounter: boolean = useMemo((): boolean => {
            return loading ||
                !!error ||
                donorCount < minimumDonors ||
                donorCounterBlacklist.includes(experience.handle);
        }, [loading, donorCount, minimumDonors, donorCounterBlacklist, experience.handle]);

        if (hideCounter) {
            return null;
        }

        return (
            <App
                featureFlags={{}}
                modules={[]}
            >
                <Portal el="active-experience-app__donor-counter">
                    <DonorCounterContainer donorCount={donorCount} />
                </Portal>
            </App>
        );
    }
);
