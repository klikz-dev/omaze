import '@testing-library/jest-dom/extend-expect';
import { IPropsWithChildren } from '@omaze/app';
import { render } from '@testing-library/react';
import React, { Fragment, ReactElement } from 'react';

import { HomepageApp } from './HomepageApp';

function MockStorefrontProvider (props: IPropsWithChildren): ReactElement {
    return <Fragment>{props.children}</Fragment>;
}

function MockSanityProvider (props: IPropsWithChildren): ReactElement {
    return <Fragment>{props.children}</Fragment>;
}

describe('HomepageApp', (): void => {
    it('should exist', (): void => {
        expect(HomepageApp).toBeDefined();
    });

    it('should render', (): void => {
        expect((): void => {
            render(
                <HomepageApp
                    StorefrontProvider={MockStorefrontProvider}
                    SanityProvider={MockSanityProvider}
                />
            );
        }).not.toThrow();
    });
});
