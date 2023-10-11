import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../typespaces/interfaces/IProduct';
import { IProductFormInputs } from '../typespaces/interfaces/IProductFormInputs';

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
    addProduct: builder.mutation<IProduct, FormData>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products' }],
    }),
    deleteProduct: builder.mutation<void, IProduct['_id']>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products' }],
    }),
    getTargetProduct: builder.query<IProduct, IProduct['_id']>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useGetTargetProductQuery } =
  productsApi;
