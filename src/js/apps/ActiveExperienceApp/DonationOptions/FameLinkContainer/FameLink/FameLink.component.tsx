import { IFunctionComponent } from '@omaze/app';
import { OzButton } from '@omaze/omaze-ui';
import React, { ReactElement } from 'react';

import { namespace } from '../../../ActiveExperienceApp.namespace';

import { displayName, FAME_LINK_QA } from './FameLink.qa';
import {
    IFameLinkType,
    IFameLinkPresenterClassNames,
    FameLinkPresenter,
} from './FameLinkPresenter/FameLinkPresenter';

export interface IFameLinkProps {
    'data-testid'?: string;
    hostName: string;
    productId: number;
    productTitle: string;
    productHandle: string;
    upsellVariantId?: number;
    upsellVariantPrice?: number;
    prominent: boolean;
}

export const FameLink: IFunctionComponent<IFameLinkProps> = namespace.createComponent<IFameLinkProps>(
    displayName,
    (props: IFameLinkProps): ReactElement => {
        const {
            hostName,
            productId,
            productTitle,
            productHandle,
            upsellVariantId,
            upsellVariantPrice,
            prominent,
        }: IFameLinkProps = props;

        const presenter: FameLinkPresenter = new FameLinkPresenter({
            hostName: hostName,
            productId: productId,
            productTitle: productTitle,
            productHandle: productHandle,
            upsellVariantId: upsellVariantId,
            upsellVariantPrice: upsellVariantPrice,
            prominent: prominent,
        });

        const classNames: IFameLinkPresenterClassNames = presenter.getAllClassNames();
        const linkType: IFameLinkType = presenter.getFameLinkType();

        return (
            <OzButton
                href={presenter.getFameHref()}
                style={linkType.style}
                size={linkType.size}
                className={classNames.host}
                data-testid={FAME_LINK_QA.CONTAINER}
                referrerPolicy='no-referrer-when-downgrade'
            >
                Enter without contributing
            </OzButton>
        );
    }
);
