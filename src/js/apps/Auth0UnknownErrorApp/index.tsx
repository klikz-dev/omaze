import { getFeatureFlagModule } from '@omaze/feature';
import '@omaze/omaze-ui/dist/omaze-ui.cjs.development.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux-dynamic-modules';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

import { Auth0UnknownErrorApp } from './Auth0UnknownErrorApp.component';

const store: IModuleStore<any> = createStore(
    {
        extensions: [getSagaExtension()],
    },
    getFeatureFlagModule(),
);

function bootstrapApp (): void {
    ReactDOM.render((
        <Provider store={store}>
            <Auth0UnknownErrorApp />
        </Provider>
    ), document.getElementById('js-auth0-unknown-error-app__root'));
}

bootstrapApp();

