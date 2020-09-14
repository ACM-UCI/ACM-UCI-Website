import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './scss/custom.css';
import './index.css';
import App from './App';

import feather from 'feather-icons';

ReactDOM.render(
    <BrowserRouter forceRefresh={true} basename={process.env.PUBLIC_URL}>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

feather.replace();
