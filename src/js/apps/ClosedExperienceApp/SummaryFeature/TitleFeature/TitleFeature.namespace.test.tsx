import { IFunctionComponent } from '@omaze/app';
import React, { ReactElement } from 'react';

import { FEATURE_NAME, titleFeatureNamespace } from './TitleFeature.namespace';

describe('app Config', (): void => {
    describe('app.createComponent', (): void => {

        it('should have the correct APP_NAME', (): void => {
            expect(FEATURE_NAME).toBe('Title');
        });

        it('should be a function', (): void => {
            expect(typeof titleFeatureNamespace.createComponent).toBe('function');
        });

        it('should create component', (): void => {
            const component: IFunctionComponent = titleFeatureNamespace.createComponent(
                'TestComponent',
                (): ReactElement => {
                    return (
                        <div>Hello</div>
                    );
                }
            );

            expect(component.displayName).toBe('Title:TestComponent');
            expect(component.app).toBe(FEATURE_NAME);
        });
    });
});
