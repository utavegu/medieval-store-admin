import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';
import { IProduct } from '../typespaces/interfaces/IProduct';
import { IProductCategory, IProductType, IProductSubtype } from '../typespaces/interfaces/IProductsCategories';

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
    getProductsCategories: builder.query<IProductCategory[], void>({
      query: () => ({
        url: 'products/categories',
      }),
    }),
    getAllProductTypesInCategory: builder.query<IProductType[], IProductCategory['_id']>({
      query: (id) => ({
        url: `products/types/${id}`,
      }),
    }),
    getAllProductSubtypesInType: builder.query<IProductSubtype[], IProductType['_id']>({
      query: (id) => ({
        url: `products/subtypes/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetTargetProductQuery,
  useGetProductsCategoriesQuery,
  useLazyGetAllProductTypesInCategoryQuery,
  useLazyGetAllProductSubtypesInTypeQuery,
} = productsApi;
