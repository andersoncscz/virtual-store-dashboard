import * as React from 'react';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';

import store from './modules/store';

const App = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
)

export default App;
