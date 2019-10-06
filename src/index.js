import React from 'react';
import ReactDOM from 'react-dom';

import initializeToastfy from './config/toasts';
import initializeFireBase from './config/firebase';
import initializeFontAwesomeIcons from './config/icons';

import './App.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './App';

initializeToastfy()
initializeFireBase()
initializeFontAwesomeIcons()

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
