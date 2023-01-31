import { getFeatureFlagModule } from '@omaze/feature';
import '@omaze/omaze-ui/dist/omaze-ui.cjs.development.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux-dynamic-modules';
import { IModuleStore } from 'redux-dynamic-modules-core/src/Contracts';
import { getSagaExtension } from 'redux-dynamic-modules-saga';

import './index.css';
import { ClosedExperienceApp } from './ClosedExperienceApp.component';

const store: IModuleStore<any> = createStore(
    {
        extensions: [getSagaExtension()],
    },
    getFeatureFlagModule(),
);

function bootstrapApp (): void {
    ReactDOM.render((
        <Provider store={store}>
            <ClosedExperienceApp />
        </Provider>
    ), document.getElementById('js-closed-experience-app__root'));
}

bootstrapApp();
