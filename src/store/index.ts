import { configureStore } from '@reduxjs/toolkit';
// import usersReducer from './slices/usersSlice';
import { usersAPI } from '../api/users-api';

const store = configureStore({
  reducer: {
    // usersReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersAPI.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
