import classNames from 'classnames';
import React, { ReactElement } from 'react';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

import { IDataLayer, IUseGTMDataLayer, useGTMDataLayer } from '../../shared/useGTMDataLayer';

import styles from './SweepstakesCard.styles.css';
import { SweepstakesTag } from './SweepstakesTag/SweepstakesTag';

export interface ISweepstakesImage {
    src: string;
    alt: string;
}

export interface ISweepstakes {
    image: ISweepstakesImage;
    charity: string;
    title: string;
    url: string;
    handle: string;
    launchDate: Date;
    closeDate: Date;
    hasWinner: boolean;
}

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

function createSweepstakeTracking (): IDataLayer {
    /* eslint-disable camelcase */
    return {
        event: 'click',
        ga_category: 'Ecommerce',
        ga_action: 'Click Product',
        ga_label: 'Click Product',
    };
    /* eslint-enable camelcase */
}

export function SweepstakesCard (props: ISweepstakesCardProps): ReactElement | null {
    const { sweepstakes, 'data-testid': dataTestid } : ISweepstakesCardProps = props;
    const { image, charity, title, url, handle, closeDate, hasWinner }: ISweepstakes = sweepstakes;
    const { src, alt }: ISweepstakesImage = image;
    const fallbackAltText: string = title;
    const fallbackUrl: string =`/products/${handle}`;
    const { pushEvent }: IUseGTMDataLayer = useGTMDataLayer(createSweepstakeTracking());

    function handleOnClick (): void {
        pushEvent();
    }

    return (
        <div className={`w-full relative ${styles.container} rebrand-pb-0-phone`} data-testid={dataTestid} onClick={handleOnClick}>
            <a href={url || fallbackUrl}>
                <div className={'aspect-w-16 aspect-h-9'}>
                    <img
                        className={classNames('lazyload w-full block min-h-full object-cover', {
                            'bg-black-10': !src,
                        })}
                        alt={alt || fallbackAltText}
                        data-src={src}
                        data-sizes="auto"
                        data-srcset={generateImageSrcset(src)}
                    />
                </div>
                <div className={`absolute ${styles.tag}`}>
                    <SweepstakesTag hasWinner={hasWinner} closeDate={closeDate} />
                </div>

                <div className="mt-1 rebrand-mt-0">
                    <p
                        className={classNames(
                            'experience-title font-primary text-sm lg:text-base font-bold text-black truncate pt-1/2',
                            styles.charity
                        )}
                    >
                        Support {charity}
                    </p>

                    <p
                        className={classNames(
                            'experience-text font-primary font-normal text-base lg:text-lg leading-6 overflow-hidden overflow-ellipsis',
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
