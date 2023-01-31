import { GRID_CELL_SIZE, OzGrid, OzGridCell, OzGridRow, OzSkeletonBox } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import styles from './CarouselLoading.styles.css';

function CardSkeleton (): ReactElement {
    return (
        <div>
            {/* Product Img */}
            <OzGridRow>
                <OzGridCell size={GRID_CELL_SIZE.COLUMN_3}>
                    <OzSkeletonBox className={`${styles.cardImage}`} />
                </OzGridCell>
            </OzGridRow>

            {/* Product Desc */}
            <OzGridRow>
                <OzGridCell size={GRID_CELL_SIZE.COLUMN_2}>
                    <OzSkeletonBox className={`${styles.cardDesc1}`} />
                </OzGridCell>
            </OzGridRow>

            <OzGridRow>
                <OzGridCell size={GRID_CELL_SIZE.COLUMN_3}>
                    <OzSkeletonBox className={`${styles.cardDesc2}`} />
                </OzGridCell>
            </OzGridRow>

            <OzGridRow>
                <OzGridCell size={GRID_CELL_SIZE.COLUMN_3}>
                    <OzSkeletonBox className={`${styles.cardDesc3}`} />
                </OzGridCell>
            </OzGridRow>
        </div>
    );
}

export function CarouselLoading (): ReactElement {
    return (
        <div className={`oz-pl-3 ${styles.container}`} data-testid="loading-collection">
            <OzGrid>
                <OzGridRow>
                    {/* Product Title */}
                    <OzGridCell size={GRID_CELL_SIZE.COLUMN_4} smHide lgShow>
                        <OzSkeletonBox className={`${styles.cardTitle}`} />
                    </OzGridCell>
                    <OzGridCell size={GRID_CELL_SIZE.COLUMN_3} lgHide>
                        <OzSkeletonBox className={`${styles.cardTitle}`} />
                    </OzGridCell>
                    <OzGridCell size={GRID_CELL_SIZE.COLUMN_7}></OzGridCell>
                    {/* Pagination */}
                    <OzGridCell size={GRID_CELL_SIZE.COLUMN_1} smHide lgShow>
                        <OzSkeletonBox className={`${styles.cardTitle}`}/>
                    </OzGridCell>
                </OzGridRow>

                <OzGridRow className={styles.cards}>
                    {Array(4).fill(0).map((_: number, index: number): ReactElement => {
                        return (
                            <CardSkeleton key={index} />
                        );
                    })}
                </OzGridRow>
            </OzGrid>
        </div>
    );
}
