import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../typespaces/interfaces/IUser';

type AuthorizedUserType = IUser | null;

interface AuthState {
  authorizedUser: AuthorizedUserType;
}

const initialState: AuthState = {
  authorizedUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAuthorizedUser(state, action: PayloadAction<IUser>) {
      state.authorizedUser = action.payload;
    },
    clearUser(state) {
      state.authorizedUser = null;
    },
  },
});

export const { addAuthorizedUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
