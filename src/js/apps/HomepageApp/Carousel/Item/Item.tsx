import { IPropsWithChildren } from '@omaze/app';
import React, { ReactElement } from 'react';

import styles from './Item.styles.css';

export function Item (props: IPropsWithChildren): ReactElement {
    return (
        <div data-testid="carousel-item" className={`oz-mx-1 ${styles.carouselItem}`}>{props.children}</div>
    );
}
