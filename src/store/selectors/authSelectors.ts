import type { RootState } from '..';

export const authorizedUserSelector = (state: RootState) => {
  return state.authReducer.authorizedUser;
};
