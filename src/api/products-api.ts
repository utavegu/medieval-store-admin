import { createApi } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../typespaces/interfaces/IProduct';
import baseQueryWithReauth from './baseQueryWithReauth';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: 'products',
      }),
      providesTags: (result) => ['Products'],
    }),
    addProduct: builder.mutation<IProduct, FormData>({
      query: (body) => ({
        url: 'products',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products' }],
    }),
    deleteProduct: builder.mutation<void, IProduct['_id']>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products' }],
    }),
    getTargetProduct: builder.query<IProduct, IProduct['_id']>({
      query: (id) => ({
        url: `products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation, useGetTargetProductQuery } =
  productsApi;
