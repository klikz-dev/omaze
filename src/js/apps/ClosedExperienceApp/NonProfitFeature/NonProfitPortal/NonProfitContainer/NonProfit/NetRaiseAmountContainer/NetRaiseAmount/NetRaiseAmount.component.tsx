import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from '../../../../../NonProfitFeature.namespace';

import { displayName } from './NetRaiseAmount.qa';
import { INetRaiseAmountClassNames, NetRaiseAmountPresenter } from './NetRaiseAmountPresenter/NetRaiseAmountPresenter';

export interface INetRaiseAmountProps {
    messageName: string;
    netRaiseAmount: string;
    ovalBackgroundDesktop: string;
    ovalBackgroundMobile: string;
}

export const NetRaiseAmount: IFunctionComponent<INetRaiseAmountProps> = nonProfitFeatureNamespace.createComponent(
    displayName,
    (props: INetRaiseAmountProps): ReactElement | null => {
        const {
            netRaiseAmount,
            messageName,
            ovalBackgroundDesktop,
            ovalBackgroundMobile,
        }: INetRaiseAmountProps = props;

        const presenter: NetRaiseAmountPresenter = new NetRaiseAmountPresenter(messageName);

        const {
            container,
            textContainer,
            amount,
            caption,
        }: INetRaiseAmountClassNames = presenter.getAllClassNames();

        return (
            <div className={container}>
                <img className={presenter.getImageDesktopClassNames()} src={ovalBackgroundDesktop} />
                <img className={presenter.getImageMobileClassNames()} src={ovalBackgroundMobile} />
                <div className={textContainer}>
                    <h3 className={amount}>{netRaiseAmount}</h3>
                    <h6 className={caption}>{presenter.getCaption()}</h6>
                </div>
            </div>
        );
    }
);
