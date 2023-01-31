import '@testing-library/jest-dom/extend-expect';

import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { APP_NAME } from '../../../ActiveExperienceApp.namespace';

import { Title } from './Title.component';
import { TitlePresenter } from './TitlePresenter/TitlePresenter';

jest.mock('./TitlePresenter/TitlePresenter');

describe(Title.displayName, (): void => {
    it('was created by the namespace', (): void => {
        expect(Title.displayName).toContain('Title');
        expect(Title.app).toContain(APP_NAME);
    });

    beforeEach((): void => {
        mocked(TitlePresenter).mockClear();
        mocked(TitlePresenter.prototype.getAllClassNames).mockReturnValue({
            host: 'host',
        });
        mocked(TitlePresenter.prototype.getTestId).mockReturnValue('test-id');
        mocked(TitlePresenter.prototype.getTitleCopy).mockReturnValue('mockTitle');
    });

    it('should render', (): void => {
        const { component }: ITestComponent = bootstrapAndRender(
            <Title nonProfitName={'whateva'} />
        );

        expect(component.container.querySelector('.host')).toBeInTheDocument();
        expect(component.getByTestId('test-id')).toBeInTheDocument();
        expect(component.getByText('mockTitle')).toBeInTheDocument();
    });
});
