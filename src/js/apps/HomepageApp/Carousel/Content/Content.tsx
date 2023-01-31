import { IPropsWithChildren } from '@omaze/app';
import React, { ReactElement, useContext } from 'react';
import Slider from 'react-slick';

import { CarouselContext, ICarouselContext } from '../CarouselContext';

export function Content (props: IPropsWithChildren): ReactElement | null {
    const carouselContext: ICarouselContext | null = useContext<ICarouselContext | null>(CarouselContext);

    if (!carouselContext) {
        return null;
    }

    const { settings, sliderRef }: ICarouselContext = carouselContext;

    return (
        <Slider ref={sliderRef} data-testid="carousel-list" {...settings}>{props.children}</Slider>
    );
}
