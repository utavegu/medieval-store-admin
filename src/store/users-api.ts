import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO: НЕ ТУТ. И сам интерфейс пока фэйковый, бери с бэка
interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// TODO: научить Реакт кушать енвы из композа
const temporaryBaseApiUrl = 'http://localhost:4000/api';
// console.log(process.env);
// Проверять ноденв и менять ЕНВ, в зависимости от этого (контур)
const baseApiUrl = process.env.NODE_ENV === 'development' ? process.env.BASE_API_URL_DEV : 'чото другое';

export const usersAPI = createApi({
  reducerPath: 'usersAPI',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: `${temporaryBaseApiUrl}/users` }),
  endpoints: (build) => ({
    // запросить с сервера всех пользователей (возможна фильтрация по параметрам)
    getUsers: build.query<any, { limit: number; offset: number }>({
      // getUsers: build.query<IUser[], string>({
      query: ({ limit = 10, offset = 0 }) => ({
        url: '',
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
