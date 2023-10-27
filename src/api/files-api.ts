import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const filesApi = createApi({
  reducerPath: 'filesApi',
  tagTypes: ['Files'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFile: builder.query<any, string>({
      // Пока эни, но по идее это должен быть файл
      query: (path) => ({
        url: `file/${path}`,
      }),
    }),
  }),
});

export const { useLazyGetFileQuery } = filesApi;
