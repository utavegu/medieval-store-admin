import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../typespaces/interfaces/IProduct';

// TODO: научить Реакт кушать енвы из композа
const temporaryBaseApiUrl = 'http://localhost:4000/api';
// console.log(process.env);
// Проверять ноденв и менять ЕНВ, в зависимости от этого (контур)
const baseApiUrl = process.env.NODE_ENV === 'development' ? process.env.BASE_API_URL_DEV : 'чото другое';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: `${temporaryBaseApiUrl}/products` }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: () => ({
        url: '',
      }),
      providesTags: (result) => ['Products'],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
