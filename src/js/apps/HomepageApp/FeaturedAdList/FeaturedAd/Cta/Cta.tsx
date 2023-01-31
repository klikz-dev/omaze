import classNames from 'classnames';
import React, { MouseEventHandler, ReactElement } from 'react';

import styles from './Cta.styles.css';

interface ICtaProps {
    link: string;
    cta: string;
    onClick?: MouseEventHandler;
}

export function Cta (props: ICtaProps): ReactElement | null {
    const { link, cta, onClick }: ICtaProps = props;

    return (
        <a href={link}
            className={classNames('oz-px-4 oz-bg-rebrand-yellow-500 oz-focus:bg-rebrand-yellow-500 oz-font-bold oz-text-xl oz-leading-5 oz-w-full', styles.cta)}
            onClick={onClick}
        >
            {cta}
        </a>
    );
}
