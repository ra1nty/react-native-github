import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from "./reducers";

const persistConfig = {
    key: 'mp',
    storage,
    stateReconciler: false
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)