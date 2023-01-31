import '@omaze/omaze-ui/dist/omaze-ui.cjs.development.css';
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { CollectionApp } from './CollectionApp';
import { shopifyClient } from './shopifyClient/shopifyClient';

function bootstrapApp (): void {
    ReactDOM.render(
        <ApolloProvider client={shopifyClient}>
            <CollectionApp />
        </ApolloProvider>,
        document.getElementById('js-collection-app__root'),
    );
}

bootstrapApp();
