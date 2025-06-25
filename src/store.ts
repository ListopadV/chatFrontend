import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginSlice from './redux/loginSlice';
import chatSlice from './redux/chatSlice';
import botsSlice from './redux/botsSlice';
import messagesSlice from './redux/messagesSlice';
import paramSlice from './redux/paramSlice';

const rootReducer = combineReducers({
    authentication: loginSlice,
    chats: chatSlice,
    bots: botsSlice,
    messages: messagesSlice,
    params: paramSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authentication', 'chats', 'bots', 'messages', 'params']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
