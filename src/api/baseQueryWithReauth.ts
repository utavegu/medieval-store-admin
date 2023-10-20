/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { clearUser } from '../store/slices/authSlice';

const apiUrl =
  process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEV : process.env.REACT_APP_API_URL_PROD;

const baseQuery = fetchBaseQuery({
  baseUrl: `${apiUrl}`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // headers.set("Access-Control-Allow-Origin", "*")
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      // @ts-ignore
      localStorage.setItem('accessToken', refreshResult.data?.accessToken);
      // @ts-ignore
      if (args.url !== 'auth/checkauth') {
        await baseQuery(
          {
            // @ts-ignore
            url: args.url,
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          },
          api,
          extraOptions
        );
      }
    } else {
      // TODO: А вот как избавиться от протухшего рефреш-токена в куках - уже интереснее... Или они самовыпилятся? Забыл, уточни. Выстави им время жизни 3 минуты и потести уже
      localStorage.removeItem('accessToken');
      api.dispatch(clearUser());
    }
  }
  return result;
};

export default baseQueryWithReauth;
