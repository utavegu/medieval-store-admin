/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// в общем перепиши тут всё на РТК
// рефактор по примеру админки, прикручивание твоего апи
// а по хорошему сразу RTK-query, там, вроде как, и с кэшем вопрос сразу решен

export const fetchUsers = createAsyncThunk<IUserInterface[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    if (!response.ok) {
      return rejectWithValue('Ошибочка!'); // Вариант без трай-кэтча. Но вообще, нынче это депрекейтед подход, я так понимаю.
    }
    const data = await response.json();
    return data;
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUsers',
  async (userId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Some error!'); // но сюда детали, сервер у меня уже обучен их отдавать и рассказывать, какая именно ошибка.
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(localDeleteUser(userId));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// или наоборт лучше внутренним методам добавлять префикс "локал, клиент"...
export const createUser = createAsyncThunk(
  'users/newUser',
  async (user: Omit<IUserInterface, 'id'>, { rejectWithValue, dispatch }) => {
    try {
      console.log(user);
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application-json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Some error!');
      }
      const data = await response.json();
      console.log({ ...data, ...user });
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(localCreateUser({ ...data, ...user })); // джейсон плэйсхолдер упорно возвращает только id, потому тут пока вот так. А ещё он его возвращает всегда одинаковым.
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IUserInterface {
  id: string;
  name: string;
  username?: string;
  email?: string;
  adress?: null;
  phone?: string;
  website?: string;
  company?: null;
}

const usersInitialState: IUserInterface[] = [
  /*
  {
    id: Date.now().toString(36),
    name: 'Василий Пупкин',
    // username: 'Василий же',
    // email: 'vasia@mail.ru',
    // adress: null,
    // phone: '8-922-251-21-75',
    // website: 'vasia.ru',
    // company: null,
  }
  */
];

const setLoading = (state: any) => {
  state.status = 'loading';
  state.error = null;
};

const setError = (state: any, action: any) => {
  state.status = 'rejected';
  state.error = action.payload;
};

//@ts-ignore
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: usersInitialState,
    status: null, // null или енумка статусов
    error: null,
  },
  reducers: {
    // TODO: Вообще выглядит так, будто тоже можно отдельно вынести, в reducers, например. Но, возможно, это будет уже избыточно.
    localCreateUser(state, action: PayloadAction<IUserInterface>) {
      state.users.push({
        id: action.payload.id, //Date.now().toString(36),
        name: action.payload.name,
      });
    },

    localDeleteUser(state, action: PayloadAction<IUserInterface['id']>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  // депрекейтед, говорят, экстра редюсерс. Да и мне вообще такой подход не очень. Управление статусами через трай-кэтч-файнали прямо в статусах выглядит поинтереснее. А, ну точнее он как раз меня билдеры юзать призывает...
  // The object notation for `createSlice.extraReducers` is deprecated, and will be removed in RTK 2.0. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice
  extraReducers:
    /*
  (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {

      })
  }
  */
    {
      // @ts-ignore
      [fetchUsers.pending]: setLoading,
      // @ts-ignore
      [fetchUsers.fulfilled]: (state, action) => {
        state.status = 'resolved';
        state.users = action.payload;
      },
      // @ts-ignore
      [fetchUsers.rejected]: setError,
      // @ts-ignore
      [removeUser.rejected]: setError,
    },
});

// console.log([fetchUsers.fulfilled]);

export const { localCreateUser, localDeleteUser } = usersSlice.actions;
export default usersSlice.reducer;

/*
const { actions, reducer } = usersSlice;
export const {
  fetchUsersResponse,
  fetchUsersSuccess,
  fetchUsersFailure,
  removeUserReducer,
  updateUserReducer,
  resetUserStatus,
} = actions;
export default reducer;
*/
