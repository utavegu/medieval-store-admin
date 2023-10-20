import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';
import { IUsersQueryParameters } from '../typespaces/interfaces/IUsersQueryParameters';
import { IUser } from '../typespaces/interfaces/IUser';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  tagTypes: ['Users'],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    // запросить с сервера всех пользователей (возможна фильтрация по параметрам)
    getUsers: build.query<IUser[], IUsersQueryParameters>({
      query: ({ limit = 10, offset = 0 }) => ({
        url: 'users',
        params: {
          limit: limit,
          offset: offset,
        },
      }),
      // Ну в общем-то эта порнография лишнее, всё корректно рабтает. Только на неиспользуемый резалт ругается, но, в данном случае можно и согрешить, заигнорив этот ворнинг
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
        url: 'users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),

    // удалить пользователя
    deleteUser: build.mutation<void, IUser['id']>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),

    // редактировать пользователя
    updateUser: build.mutation<IUser, Partial<IUser>>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),

    // запросить конкретного пользователя по id
    getTargetUser: build.query<IUser, IUser['id']>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useLazyGetTargetUserQuery } = usersAPI;
