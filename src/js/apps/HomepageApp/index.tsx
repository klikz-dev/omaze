import '@omaze/omaze-ui/dist/omaze-ui.cjs.development.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { HomepageApp } from './HomepageApp';

function bootstrapApp (): void {
    ReactDOM.render(
        <HomepageApp />,
        document.getElementById('js-homepage-app__root'),
    );
}

bootstrapApp();
