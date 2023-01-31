import { GRID_CELL_SIZE, OzGrid, OzGridCell, OzGridRow } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import { SweepstakesCardSkeleton } from '../SweepstakesList/SweepstakesCard/SweepstakesCardSkeleton';

import styles from './CollectionLoading.styles.css';

interface ICollectionLoadingProps {
    count?: number;
}

export function CollectionLoading (props: ICollectionLoadingProps): ReactElement {
    const { count = 1 }: ICollectionLoadingProps = props;

    return (
        <div className={`${styles.container}`} data-testid="loading-collection">
            <OzGrid>
                <div className={`${styles.cards} mx-auto`}>
                    <OzGridRow>
                        {Array(count).fill(0).map((_: number, index: number): ReactElement => {
                            return (
                                <OzGridCell key={index} size={GRID_CELL_SIZE.COLUMN_4} className="mb-4">
                                    <SweepstakesCardSkeleton />
                                </OzGridCell>
                            );
                        })}
                    </OzGridRow>
                </div>
            </OzGrid>
        </div>
    );
}
