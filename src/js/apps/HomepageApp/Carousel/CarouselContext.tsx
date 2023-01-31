import { createContext } from 'react';
import Slider, { Settings } from 'react-slick';

export interface ICarouselContext {
    paginationInfo: {
        currentPage: number;
        previousPage: number;
        nextPage: number;
        totalPages: number;
        onNextClick: () => void;
        onPrevClick: () => void;
        shouldRenderPaginationInfo: () => boolean;
    };
    settings: Settings;
    sliderRef: React.MutableRefObject<Slider | null>;
}

export const CarouselContext: React.Context<ICarouselContext | null> = createContext<ICarouselContext | null>(null);
