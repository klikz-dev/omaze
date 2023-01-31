import { GRID_CELL_SIZE, OzGrid, OzGridCell, OzGridRow, OzPage } from '@omaze/omaze-ui';
import React, {
    Dispatch,
    ReactElement, SetStateAction, useCallback, useEffect, Fragment,
    useState,
} from 'react';

import { ISweepstakes, SweepstakesCard } from './SweepstakesCard/SweepstakesCard';
import { SweepstakesCardSkeleton } from './SweepstakesCard/SweepstakesCardSkeleton';
import styles from './SweepstakesList.styles.css';

interface ISweepstakesListProps {
    collection: ISweepstakes[];
    onScrollBottom?: () => void;
    isLoadingMore: boolean;
}

interface IRenderCallback<TType> {
    (node: TType | null): void;
}

type IUseState<TType> = [TType, Dispatch<SetStateAction<TType>>];

export function SweepstakesList (props: ISweepstakesListProps): ReactElement {
    const { collection, onScrollBottom, isLoadingMore }: ISweepstakesListProps = props;
    const [container, setContainer]: IUseState<HTMLDivElement | null> = useState<HTMLDivElement | null>(null);

    const onRender: IRenderCallback<HTMLDivElement | null> = useCallback((element: HTMLDivElement | null): void => {
        if (element === null) {
            return;
        }

        setContainer(element);
    }, [onScrollBottom]);

    useEffect((): (() => void) | undefined => {
        if (!container) {
            return;
        }

        const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
            if (entries[entries.length - 1].intersectionRatio === 1) {
                if (onScrollBottom) {
                    onScrollBottom();
                }
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        });

        observer.observe(container);

        return (): void => {
            if (observer && container) {
                observer.unobserve(container);
            }
        };
    }, [onScrollBottom, container]);

    return (
        <OzPage>
            <OzGrid>
                <OzGridRow>
                    {collection.map((sweepstakes: ISweepstakes): ReactElement => {
                        return (
                            <OzGridCell key={sweepstakes.url} size={GRID_CELL_SIZE.COLUMN_4} className="mb-4 rebrand-exp-container">
                                <SweepstakesCard sweepstakes={sweepstakes} />
                            </OzGridCell>
                        );
                    })}
                    {isLoadingMore && (
                        <Fragment>
                            <OzGridCell size={GRID_CELL_SIZE.COLUMN_4} className="mb-4">
                                <SweepstakesCardSkeleton />
                            </OzGridCell>
                            <OzGridCell size={GRID_CELL_SIZE.COLUMN_4} className={`mb-4 ${styles.card2}`}>
                                <SweepstakesCardSkeleton />
                            </OzGridCell>
                            <OzGridCell size={GRID_CELL_SIZE.COLUMN_4} className={`mb-4 ${styles.card3}`}>
                                <SweepstakesCardSkeleton />
                            </OzGridCell>
                        </Fragment>
                    )}
                </OzGridRow>
            </OzGrid>
            <div ref={onRender} />
        </OzPage>
    );
}
