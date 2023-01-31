import { OzPage, OzGrid, OzGridRow, OzGridCell, GRID_CELL_SIZE, OzSkeletonBox, SKELETON_BOX_SIZE } from '@omaze/omaze-ui';
import classNames from 'classnames';
import React, { ReactElement } from 'react';

import styles from './SkeletonLoading.styles.css';

export function SkeletonLoading (): ReactElement {
    return (
        <div className={classNames('md:oz-relative')}>
            <div className={classNames('oz-aspect-w-16 oz-aspect-h-9 md:oz-aspect-h-7')}>
                <OzSkeletonBox className={classNames('', styles.image)} />
            </div>
            <div className={classNames('oz-py-3 md:oz-py-0 md:oz-absolute md:oz-left-0 md:oz-right-0 md:oz-transform md:oz--translate-y-1/2', styles.content)}>
                <OzPage>
                    <OzGrid>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_4} mdSize={GRID_CELL_SIZE.COLUMN_7} size={GRID_CELL_SIZE.COLUMN_10}>
                                <OzSkeletonBox className={classNames('oz-mb-0', styles.headline1)} />
                            </OzGridCell>
                        </OzGridRow>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_3} mdSize={GRID_CELL_SIZE.COLUMN_5} size={GRID_CELL_SIZE.COLUMN_8}>
                                <OzSkeletonBox className={classNames('md:oz-mt-2 md:oz-mb-0', styles.headline2)} />
                            </OzGridCell>
                        </OzGridRow>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_4} mdSize={GRID_CELL_SIZE.COLUMN_6} size={GRID_CELL_SIZE.COLUMN_9}>
                                <OzSkeletonBox className={classNames('oz-mt-3 md:oz-mt-4 lg:oz-mt-7 oz-mb-0', styles.subtitle1)} />
                            </OzGridCell>
                        </OzGridRow>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_3} mdSize={GRID_CELL_SIZE.COLUMN_4} size={GRID_CELL_SIZE.COLUMN_7}>
                                <OzSkeletonBox className={classNames('oz-mt-1 oz-mb-0', styles.subtitle2)} />
                            </OzGridCell>
                        </OzGridRow>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_4} size={GRID_CELL_SIZE.COLUMN_3}>
                                <OzSkeletonBox className={classNames('oz-mb-0 md:oz-mt-4 md:oz-mt-6 lg:oz-mt-7', styles.link)} size={SKELETON_BOX_SIZE.SIZE_7} />
                            </OzGridCell>
                        </OzGridRow>
                    </OzGrid>
                </OzPage>
            </div>
        </div>
    );
}
