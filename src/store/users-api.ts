import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// НЕ ТУТ
interface IUser {
  id: number;
  name: string;
}

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  tagTypes: ['Users'],
  // бэйс юрл юрать из енв, а специфичный для апи путь, в целом, можно просто вынести в константу выше, прямо тут.
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/users' }),
  endpoints: (build) => ({
    // запросить с сервера всех пользователей (возможна фильтрация по параметрам)
    getUsers: build.query<IUser[], string>({
      query: (limit = '10') => ({
        url: '',
        params: {
          _limit: limit,
        },
      }),
      // `?${limit && `_limit=${limit}`}`,
      // providesTags: (result, error, arg) =>
      // result
      //   ? [...result.map(({ id }: any) => ({ type: 'Users' as const, id })), 'Users']
      //   : ['Users'],
      providesTags: (result) => ['Users'],
    }),

    // создать пользователя
    addUser: build.mutation<IUser, Omit<IUser, 'id'>>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),

    // удалить пользователя
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),

    // редактировать пользователя
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = usersAPI;
