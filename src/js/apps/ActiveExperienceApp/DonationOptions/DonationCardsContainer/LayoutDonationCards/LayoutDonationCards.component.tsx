import { IFunctionComponent, IPropsWithChildren } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from '../../../ActiveExperienceApp.namespace';

import { displayName, LAYOUT_DONATION_CARDS_QA } from './LayoutDonationCards.qa';
import { ILayoutDonationCardsPresenterClassNames, LayoutDonationCardsPresenter } from './LayoutDonationCardsPresenter/LayoutDonationCardsPresenter';

export interface ILayoutDonationCardsProps extends IPropsWithChildren {
    className?: string;
}

export const LayoutDonationCards: IFunctionComponent<ILayoutDonationCardsProps> = namespace.createComponent<ILayoutDonationCardsProps>(
    displayName,
    (props: ILayoutDonationCardsProps): ReactElement => {
        const {
            className,
            children,
        }: ILayoutDonationCardsProps = props;

        const presenter: LayoutDonationCardsPresenter = new LayoutDonationCardsPresenter({
            className: className,
            childrenCount: React.Children.count(children),
        });

        const classNames: ILayoutDonationCardsPresenterClassNames = presenter.getAllClassNames();

        return (
            <div data-testid={LAYOUT_DONATION_CARDS_QA.CONTAINER} className={classNames.host}>
                {children}
            </div>
        );
    }
);
