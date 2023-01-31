import { IPropsWithChildren } from '@omaze/app';
import React , { ReactElement } from 'react';

import styles from './Header.styles.css';

export function Header (props: IPropsWithChildren): ReactElement {
    return (
        <div className={`oz-font-secondary oz-text-lg oz-font-black oz-text-secondary-contrast md:oz-text-2xl md:oz-mr-5 oz-leading-8 ${styles.carouselTitle}`}>{props.children}</div>
    );
}
