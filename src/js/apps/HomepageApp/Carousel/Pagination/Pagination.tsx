import React, { ReactElement, useContext } from 'react';

import { CarouselContext, ICarouselContext } from '../CarouselContext';

import styles from './Pagination.styles.css';

export function Pagination (): ReactElement | null {
    const carouselContext: ICarouselContext | null = useContext<ICarouselContext | null>(CarouselContext);

    if (!carouselContext || !carouselContext.sliderRef) {
        return null;
    }

    const { paginationInfo }: ICarouselContext = carouselContext;

    if (!paginationInfo.shouldRenderPaginationInfo()) {
        return null;
    }

    return (
        <div className="oz-flex">
            <div data-testid="slide-position">
                <div className={`oz-font-primary oz-text-base oz-font-bold oz-whitespace-no-wrap ${styles.paginationInfo}`}>
                    <span aria-label="Current Page" data-testid="current-page">{paginationInfo.currentPage}</span> / <span aria-label="Total Pages" data-testid="total-pages">{paginationInfo.totalPages}</span>
                </div>
            </div>
            <nav aria-label="Carousel Navigation" className={`oz-relative oz-flex oz-items-center oz-ml-6 ${styles.paginationControls}`}>
                <button className={`oz-mr-5 ${styles.arrow} ${styles.prevArrow}`} onClick={paginationInfo.onPrevClick}>
                    <span className="oz-sr-only">Goto Page {paginationInfo.previousPage}</span>
                </button>
                <button className={`${styles.arrow} ${styles.nextArrow}`} onClick={paginationInfo.onNextClick}>
                    <span className="oz-sr-only">Goto Page {paginationInfo.nextPage}</span>
                </button>
            </nav>
        </div>
    );
}
