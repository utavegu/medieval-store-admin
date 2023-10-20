import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import usersReducer from './slices/usersSlice';
import { usersAPI } from '../api/users-api';
import { productsApi } from '../api/products-api';
import { authApi } from '../api/auth-api';
import authReducer from './slices/authSlice';

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat([usersAPI.middleware, productsApi.middleware, authApi.middleware]),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
