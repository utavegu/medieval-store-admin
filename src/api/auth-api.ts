import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // TODO: Первый аргумент - ацесс токен, строка; второй - логин и пароль, строки. Но не всё так просто. Потому пока эники.
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Auth' }],
    }),
    test: builder.query<string, void>({
      query: () => ({
        url: 'auth/test',
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: 'auth/logout',
      }),
    }),
    checkauth: builder.query<void, void>({
      query: () => ({
        url: 'auth/checkauth',
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyTestQuery, useLazyLogoutQuery, useCheckauthQuery } = authApi;
