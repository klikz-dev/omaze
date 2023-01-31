import { IPropsWithChildren } from '@omaze/app';
import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { PortalPresenter } from './PortalPresenter/PortalPresenter';

export interface IPortalProps extends IPropsWithChildren {
    el: string;
}

export function Portal (props: IPortalProps): ReactElement | null {
    const {
        el: elId,
        children,
    }: IPortalProps = props;

    const presenter: PortalPresenter = new PortalPresenter({
        el: document.getElementById(elId),
    });

    if (!presenter.isElReady()) {
        return null;
    }

    presenter.cleanEl();

    return ReactDOM.createPortal(children, presenter.el);
}
