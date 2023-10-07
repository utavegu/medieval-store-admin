import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './slices/usersSlice';
import { usersAPI } from '../api/users-api';
import { productsApi } from '../api/products-api';

const store = configureStore({
  reducer: {
    // usersReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersAPI.middleware).concat(productsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
