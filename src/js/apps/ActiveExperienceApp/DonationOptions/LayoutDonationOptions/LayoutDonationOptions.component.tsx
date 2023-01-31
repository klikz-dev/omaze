import { IFunctionComponent, IPropsWithChildren } from '@omaze/app';
import React, { ReactElement } from 'react';

import { namespace } from '../../ActiveExperienceApp.namespace';

import { displayName, LAYOUT_DONATION_OPTIONS_QA } from './LayoutDonationOptions.qa';
import { ILayoutDonationOptionsPresenterClassNames, LayoutDonationOptionsPresenter } from './LayoutDonationOptionsPresenter/LayoutDonationOptionsPresenter';

export interface ILayoutDonationOptionsProps extends IPropsWithChildren {
    className?: string;
}

export const LayoutDonationOptions: IFunctionComponent<ILayoutDonationOptionsProps> = namespace.createComponent<ILayoutDonationOptionsProps>(
    displayName,
    (props: ILayoutDonationOptionsProps): ReactElement => {
        const {
            className,
            children,
        }: ILayoutDonationOptionsProps = props;

        const presenter: LayoutDonationOptionsPresenter = new LayoutDonationOptionsPresenter({
            className: className,
        });

        const classNames: ILayoutDonationOptionsPresenterClassNames = presenter.getAllClassNames();

        return (
            <div data-testid={LAYOUT_DONATION_OPTIONS_QA.CONTAINER} className={classNames.host}>
                <div className={classNames.innerWrapper}>
                    {children}
                </div>
            </div>
        );
    }
);
