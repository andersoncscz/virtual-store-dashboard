import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../ducks';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    rootReducer, 
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga)

export default store;