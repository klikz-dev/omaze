import classNames from 'classnames';
import React, { ReactElement } from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import { ISweepstakes, ISweepstakesImage } from '../shared/ISweepstakes';
import { SweepstakesTag } from '../SweepstakesTag/SweepstakesTag';

import styles from './SweepstakesCard.styles.css';

export interface ISweepstakesCardProps {
    'data-testid'?: string;
    sweepstakes: ISweepstakes;
    className?: string;
}

function generateImageSrcset (src: string): string {
    const widths: number[] =  [
        480,
        650,
        812,
        1049,
        1249,
        1439,
        1600,
        2000,
        2400,
    ];

    const srcSet: string[] = [];

    widths.forEach((width: number): void => {
        srcSet.push(`${src} ${width}w,`);
    });

    return srcSet
        .join(' ')
        .replace(/,$/, '');
}

export function SweepstakesCard (props: ISweepstakesCardProps): ReactElement | null {
    const { sweepstakes, 'data-testid': dataTestid } : ISweepstakesCardProps = props;
    const { image, charity, title, url, handle, closeDate, hasWinner }: ISweepstakes = sweepstakes;
    const { src, alt }: ISweepstakesImage = image;
    const fallbackAltText: string = title;
    const fallbackUrl: string =`/products/${handle}`;

    return (
        <div className={`oz-w-full oz-relative ${styles.container}`} data-testid={dataTestid}>
            <a href={url || fallbackUrl}>
                <div className={'oz-aspect-w-16 oz-aspect-h-9'}>
                    <img
                        className={classNames('lazyload oz-w-full oz-block oz-min-h-full oz-object-cover', {
                            'oz-bg-black-10': !src,
                        })}
                        alt={alt || fallbackAltText}
                        data-src={src}
                        data-sizes="auto"
                        data-srcset={generateImageSrcset(src)}
                    />
                </div>
                <div className={`oz-absolute ${styles.tag}`}>
                    <SweepstakesTag hasWinner={hasWinner} closeDate={closeDate} />
                </div>

                <div className="mt-1">
                    <p
                        className={classNames(
                            'oz-font-primary oz-text-sm lg:oz-text-base oz-font-bold oz-text-black oz-truncate oz-pt-1/2',
                            styles.charity
                        )}
                    >
                        Support {charity}
                    </p>

                    <p
                        className={classNames(
                            'oz-font-primary oz-font-normal oz-text-base lg:oz-text-lg oz-leading-6 oz-overflow-hidden oz-overflow-ellipsis',
                            styles.title
                        )}
                    >
                        {title}
                    </p>
                </div>
            </a>
        </div>
    );
}
