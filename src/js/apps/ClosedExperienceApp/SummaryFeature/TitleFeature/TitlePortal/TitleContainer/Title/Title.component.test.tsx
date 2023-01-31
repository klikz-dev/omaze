import '@testing-library/jest-dom/extend-expect';

import { bootstrapAndRender, ITestComponent } from '@omaze/test';
import { RenderResult } from '@testing-library/react';
import React from 'react';
import { mocked } from 'ts-jest/utils';

import { FEATURE_NAME } from '../../../TitleFeature.namespace';

import { Title } from './Title.component';
import { TitlePresenter } from './TitlePresenter/TitlePresenter';

jest.mock('./TitlePresenter/TitlePresenter');

describe(Title.displayName, (): void => {
    it('was created by the app', (): void => {
        expect(Title.displayName).toContain('Title');
        expect(Title.app).toContain(FEATURE_NAME);
    });

    let component: RenderResult;

    beforeEach((): void => {
        mocked(TitlePresenter).mockClear();
        mocked(TitlePresenter.prototype.getAllClassNames).mockReturnValue({
            container: 'container',
            thankYouTitle: 'thankYouTitle',
            caption: 'caption',
            experienceTitle: 'experienceTitle',
        });
        mocked(TitlePresenter.prototype.getThankYouTitle).mockReturnValue('thankYouTitle');
        mocked(TitlePresenter.prototype.getCaption).mockReturnValue('caption');
        mocked(TitlePresenter.prototype.getExperienceTitle).mockReturnValue('experienceTitle');

        const testComponent: ITestComponent = bootstrapAndRender(
            <Title experienceName={'experienceName'} thankYouName={'nonProfitShopifyName'} />
        );

        component = testComponent.component;
    });

    it('should render', (): void => {
        expect(component.container.querySelector('.container')).toBeInTheDocument();
        expect(component.container.querySelector('.thankYouTitle')).toBeInTheDocument();
        expect(component.container.querySelector('.caption')).toBeInTheDocument();
        expect(component.container.querySelector('.experienceTitle')).toBeInTheDocument();
        expect(component.getByText('thankYouTitle')).toBeInTheDocument();
        expect(component.getByText('caption')).toBeInTheDocument();
        expect(component.getByText('experienceTitle')).toBeInTheDocument();
    });
});
