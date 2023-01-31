import { IPropsWithChildren } from '@omaze/app';
import React, { Fragment, ReactElement } from 'react';

interface IPortalProps extends IPropsWithChildren {
    el: string;
}

export function Portal (props: IPortalProps): ReactElement {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
}
