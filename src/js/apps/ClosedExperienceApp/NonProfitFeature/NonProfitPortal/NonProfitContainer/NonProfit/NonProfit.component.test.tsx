import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { mocked } from 'ts-jest/utils';

import { Headline } from './Headline/Headline.component';
import { Messages } from './Messages/Messages.component';
import { NetRaiseAmountContainer } from './NetRaiseAmountContainer/NetRaiseAmountContainer.component';
import { NonProfit } from './NonProfit.component';
import { NON_PROFIT_QA } from './NonProfit.qa';
import { NonProfitPresenter } from './NonProfitPresenter/NonProfitPresenter';

jest.mock('./Headline/Headline.component');
jest.mock('./NetRaiseAmountContainer/NetRaiseAmountContainer.component');
jest.mock('./NonProfitPresenter/NonProfitPresenter');
jest.mock('./Messages/Messages.component');

describe(NonProfit.displayName, (): void => {
    let component: RenderResult;

    beforeEach((): void => {
        mocked(NonProfitPresenter).mockClear();
        mocked(NonProfitPresenter.getAllClassNames).mockReturnValue({
            container: 'container',
        });

        const testComponent: ITestComponent = bootstrapAndRender(<NonProfit />);

        component = testComponent.component;
    });

    it('should render', (): void => {
        expect(component.getByTestId(NON_PROFIT_QA.CONTAINER)).toBeInTheDocument();
        expect(component.getByText(Headline.displayName)).toBeInTheDocument();
        expect(component.getByText(NetRaiseAmountContainer.displayName)).toBeInTheDocument();
        expect(component.getByText(Messages.displayName)).toBeInTheDocument();
        expect(component.container.querySelector('.container')).toBeInTheDocument();
    });
});
