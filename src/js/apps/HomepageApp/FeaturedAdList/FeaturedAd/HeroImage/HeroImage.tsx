import { IFeaturedAdImage } from '@omaze/cms';
import classNames from 'classnames';
import React, { MouseEventHandler, ReactElement } from 'react';

import styles from './HeroImage.styles.css';

interface IHeroImageProps {
    link: string;
    image?: IFeaturedAdImage;
    onClick?: MouseEventHandler;
}

export function HeroImage (props: IHeroImageProps): ReactElement {
    const { image, link, onClick }: IHeroImageProps = props;

    if (!image || !image.sizes || !image.alt) {
        return (
            <div
                className={classNames('oz-aspect-w-16 md:oz-aspect-h-7 oz-hidden md:oz-block', styles['desktopHero--blank'])}
            />
        );
    }

    return (
        <a href={link} onClick={onClick}>
            <div className="oz-aspect-w-16 oz-aspect-h-9 md:oz-aspect-h-7">
                <img className="oz-w-full oz-h-full oz-object-cover" src={image.sizes['16/9']} alt={image.alt}/>
                <div className="oz-absolute oz-top-0 oz-left-0 oz-right-0 oz-w-full oz-z-10 oz-opacity-00"></div>
                <div className={classNames('oz-hidden md:oz-block oz-absolute oz-top-0 oz-left-0 oz-right-0 oz-w-full', styles.heroGradient)}></div>
            </div>
        </a>
    );
}
