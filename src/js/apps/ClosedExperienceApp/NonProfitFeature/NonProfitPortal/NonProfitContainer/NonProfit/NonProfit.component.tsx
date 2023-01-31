import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { nonProfitFeatureNamespace } from '../../../NonProfitFeature.namespace';

import { Headline } from './Headline/Headline.component';
import { Messages } from './Messages/Messages.component';
import { NetRaiseAmountContainer } from './NetRaiseAmountContainer/NetRaiseAmountContainer.component';
import { displayName, NON_PROFIT_QA } from './NonProfit.qa';
import { INonProfitPresenterClassNames, NonProfitPresenter } from './NonProfitPresenter/NonProfitPresenter';

export const NonProfit: IFunctionComponent = nonProfitFeatureNamespace.createComponent(
    displayName,
    (): ReactElement | null => {

        const { container }: INonProfitPresenterClassNames = NonProfitPresenter.getAllClassNames();

        return (
            <div className={container} data-testid={NON_PROFIT_QA.CONTAINER}>
                <Headline />
                <NetRaiseAmountContainer />
                <Messages />
            </div>
        );
    }
);
