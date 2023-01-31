import { IPropsWithChildren } from '@omaze/app';
import React, { MutableRefObject, ReactElement, useMemo, useRef, useState } from 'react';
import Slider, { ResponsiveObject, Settings } from 'react-slick';

import { deviceBreakpoints, useMediaBreakpoint } from '../shared/hooks/useMediaBreakpoint';
import { ISweepstakes } from '../shared/ISweepstakes';

import styles from './Carousel.styles.css';
import { CarouselContext, ICarouselContext } from './CarouselContext';
import { Content } from './Content/Content';
import { Header } from './Header/Header';
import { Item } from './Item/Item';
import { Pagination } from './Pagination/Pagination';

interface ICarouselProps extends IPropsWithChildren {
    settings?: Settings;
    sweepstakesList: ISweepstakes[];
}

const defaultSettings: Settings = {
    dots: false,
    speed: 200,
    adaptiveHeight: false,
    className: `-mx-1 ${styles.carouselSlider}`,
    variableWidth: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    infinite: false,
    // responsiveness is desktop first by default from the library
    responsive: [
        {
            breakpoint: deviceBreakpoints.TABLET,
            settings: {
                variableWidth: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: false,
                infinite: false,
            },
        },
        {
            breakpoint: deviceBreakpoints.MOBILE,
            settings: {
                variableWidth: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: true,
            },
        },
    ],
};

// gets the settings for a particular breakpoint
function getBreakpointSettings (userSettings: Settings, breakpoint: string):Settings {
    const settings: Settings = Object.assign({}, userSettings);

    if (breakpoint === 'mobile' || breakpoint === 'tablet') {
        if (userSettings.responsive) {
            const breakpoints:  ResponsiveObject[] = userSettings.responsive;

            const deviceBreakpoint:  ResponsiveObject | undefined = breakpoints.find((bp: ResponsiveObject): boolean => {
                return bp.breakpoint === deviceBreakpoints[breakpoint.toUpperCase()];
            });

            if (deviceBreakpoint && deviceBreakpoint.settings !== 'unslick') {
                return deviceBreakpoint.settings;
            }
        }
    }

    return settings;
}

export function Carousel (props: ICarouselProps): ReactElement {
    const { sweepstakesList, settings: customSettings = {} }: ICarouselProps = props;

    const settings: Settings = useMemo((): Settings => {
        return Object.assign({}, defaultSettings, customSettings);
    }, [customSettings]);

    const [currentPage, setCurrentPage]: [number, React.Dispatch<React.SetStateAction<number>>] = useState<number>(1);
    const slideCount: number = sweepstakesList.length;
    const breakpoint: string = useMediaBreakpoint();
    const breakpointSettings: Settings = getBreakpointSettings(settings, breakpoint);
    let totalPages: number = 0;

    if (breakpointSettings.slidesToShow && breakpointSettings.slidesToShow > 0) {
        totalPages = Math.ceil(slideCount / (breakpointSettings.slidesToShow));
    }

    const previousPage: number = currentPage < 2 ? 1 : currentPage - 1;
    const nextPage: number = currentPage === totalPages ? 1 : currentPage + 1;
    const sliderRef: MutableRefObject<Slider | null> = useRef<Slider | null>(null);

    function onPrevClick (): void {
        if (!sliderRef?.current) {
            return;
        }

        const slider: Slider = sliderRef.current;

        slider.slickPrev();
        setCurrentPage(previousPage);
    }

    function onNextClick (): void {
        if (!sliderRef?.current) {
            return;
        }

        const slider: Slider = sliderRef.current;
        const isLastPage: boolean = currentPage === totalPages;

        if (isLastPage) {
            slider.slickGoTo(0);
            return setCurrentPage(nextPage);
        }

        slider.slickNext();
        setCurrentPage(nextPage);
    }

    function shouldRenderPaginationInfo (): boolean {
        if (breakpoint === 'mobile' || totalPages < 2) {
            return false;
        }

        return true;
    }

    const contextValue: ICarouselContext = {
        paginationInfo: {
            currentPage: currentPage,
            previousPage: previousPage,
            nextPage: nextPage,
            shouldRenderPaginationInfo: shouldRenderPaginationInfo,
            totalPages: totalPages,
            onPrevClick: onPrevClick,
            onNextClick: onNextClick,
        },
        settings: settings,
        sliderRef: sliderRef,
    };

    return (
        <CarouselContext.Provider value={contextValue}>
            <div className={`oz-mx-auto oz-overflow-hidden oz-pl-3 ${styles.carouselContainer}`}>
                {props.children}
            </div>
        </CarouselContext.Provider>
    );
}

Carousel.Header = Header;
Carousel.Pagination = Pagination;
Carousel.Content = Content;
Carousel.Item = Item;
