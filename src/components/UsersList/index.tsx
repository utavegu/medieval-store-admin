import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { createUser, removeUser, fetchUsers } from '../../store/slices/usersSlice';
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../../store/users-api';

const UsersList = () => {
  /*
  const { users, status, error } = useAppSelector((state) => state.usersReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const createNewUser = () => {
    dispatch(createUser({ name: 'Василий Пупкин' }));
  };

  const removeTargetUser = (id: string) => {
    dispatch(removeUser(id));
  };
  */

  const [count, setCount] = useState('');
  const [newUser, setNewUser] = useState('');
  const { data: users = [], isLoading: fetchUsersLoading, isError: fetchUsersError } = useGetUsersQuery(count);
  const [addUser, { isLoading: createUserLoading, isError: createUserError, isSuccess: createUserSuccess }] =
    useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleAddUser = async () => {
    if (newUser) {
      await addUser({ name: newUser }).unwrap();
      setNewUser('');
    }
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id).unwrap();
  };

  return (
    <>
      <h2>Пользователи</h2>
      <div>Добавить пользователя:</div>
      {/* Что-то тут с таргетами перемудрёжка */}
      <input
        type="text"
        value={newUser}
        onChange={(event) => setNewUser(event.target.value)}
      ></input>
      <button onClick={handleAddUser}>Добавить пользователя</button>
      {createUserLoading && <span>Пользователь добавляется...</span>}
      {createUserError && <span>Ошибка добавления пользователя!</span>}
      {/* Может там ещё есть что-нибудь, что и суцесс через 3 секунды само уберет по таймауту? */}
      {createUserSuccess && <span>Пользователь успешно добавлен!</span>}
      <hr />
      <div>Сколько пользователей показать?</div>
      <select
        value={count}
        onChange={(event) => setCount(event.target.value)}
      >
        <option value="">Всех</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <ul>
        {/* TODO: А вот тут самое время с кэшем подумать, чтобы пользователи повторно не грузились, если уже были загружены. Персист? */}
        {/* TODO: Интерфейс юзера пока что в юзер слайсе. Да и тот под джейсон плэйсхолдер заточен */}
        {/* Вообще по отображению лоадера мне видится так - во время любого запроса юзеров по сети (добавление, фетч, удаление, редактирование...) весить на список юзеров "невидимое стекло", через которое блочится интерфейс управления юзерами, а сами записи становятся серыми, а посредине его крутится лоадер */}
        {/* {error && <span>Ошибка загрузки пользователей: {error}</span>}
        {status === 'loading' && <div>Идёт загрузка пользователей!(спиннер из МУИ)</div>}
        {!!users.length &&
          users?.map((user: any, i: number) => (
            <li key={i}>
              {user.name} ({user.id})
              <button
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => removeTargetUser(user.id)}
              >
                &times;
              </button>
            </li>
          ))
        } */}

        {fetchUsersLoading && <div>Загрузка данных с сервера...</div>}
        {fetchUsersError && <div>Ошибка загрузки данных с сервера! </div>}
        {users.map((user: any) => (
          <li
            key={user.id}
            onClick={() => handleDeleteUser(user.id)}
            role="presentation"
          >
            Имя пользователя: {user.name}
          </li>
        ))}
      </ul>
      {/* <button onClick={createNewUser}>Добавить Василия!</button> */}
    </>
  );
};

export default UsersList;
