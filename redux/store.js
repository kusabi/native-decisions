import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from "./reducers";
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'kusabi:question-app',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}