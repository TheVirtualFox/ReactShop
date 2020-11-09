import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import {persistStore} from "redux-persist";
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import {fetchCollectionsStart} from './shop/shopSagas';
import rootSaga from './rootSaga';

// const middlewares = [logger];


const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default {store, persistor};