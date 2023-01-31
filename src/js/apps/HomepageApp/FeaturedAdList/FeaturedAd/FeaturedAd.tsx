import { IFeaturedAdImage } from '@omaze/cms';
import { OzPage, OzGrid, OzGridRow, OzGridCell, GRID_CELL_SIZE } from '@omaze/omaze-ui';
import classNames from 'classnames';
import React, { MouseEventHandler, ReactElement } from 'react';

import { Cta } from './Cta/Cta';
import styles from './FeaturedAd.styles.css';
import { HeroImage } from './HeroImage/HeroImage';

export interface IFeaturedAdProps {
    className?: string;
    title: string;
    subtitle: string;
    cta?: string;
    image?: IFeaturedAdImage;
    onClick?: MouseEventHandler;
    link: string;
    publishedAt: Date;
}

export function FeaturedAd (props: IFeaturedAdProps): ReactElement {
    const { title, subtitle, link, cta, image, className, onClick }: IFeaturedAdProps = props;

    return (
        <div className={classNames('md:oz-relative', className, styles.featuredAdWrapper)}>
            <HeroImage image={image} link={link} onClick={onClick} />
            <div className={classNames('oz-py-3 md:oz-py-0 md:oz-absolute md:oz-transform md:oz--translate-x-1/2 md:oz--translate-y-1/2 md:oz-overflow-hidden', styles.featuredAdContent)}>
                <OzPage>
                    <OzGrid className='oz-overflow-x-hidden'>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_4} size={GRID_CELL_SIZE.COLUMN_9}>
                                <h1 className={classNames('oz-uppercase oz-font-medium', styles.headline)}>{title}</h1>
                            </OzGridCell>
                        </OzGridRow>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_4} size={GRID_CELL_SIZE.COLUMN_9}>
                                <p className={classNames('oz-mt-2 lg:oz-mt-4 oz-font-medium', styles.subtitle)}>{subtitle}</p>
                            </OzGridCell>
                        </OzGridRow>
                        <OzGridRow>
                            <OzGridCell smSize={GRID_CELL_SIZE.COLUMN_4} size={GRID_CELL_SIZE.COLUMN_3}>
                                <div className={classNames('oz-mt-3 md:oz-mt-4 lg:oz-mt-6 oz-flex oz-text-center')}>
                                    {cta && <Cta link={link} cta={cta} onClick={onClick} />}
                                </div>
                            </OzGridCell>
                        </OzGridRow>
                    </OzGrid>
                </OzPage>
            </div>
        </div>
    );
}
