import { ApolloProvider } from '@apollo/client';
import { getFeatureFlagModule } from '@omaze/feature';
import '@omaze/omaze-ui/dist/omaze-ui.cjs.development.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux-dynamic-modules';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

import './index.css';
import { ActiveExperienceApp } from './ActiveExperienceApp.component';
import { restClient } from './ApolloClient';

const store: IModuleStore<any> = createStore(
    {
        extensions: [getSagaExtension()],
    },
    getFeatureFlagModule(),
);

function bootstrapApp (): void {
    ReactDOM.render((
        <ApolloProvider client={restClient}>
            <Provider store={store}>
                <ActiveExperienceApp />
            </Provider>
        </ApolloProvider>
    ), document.getElementById('js-active-experience-app__root'));
}

bootstrapApp();
