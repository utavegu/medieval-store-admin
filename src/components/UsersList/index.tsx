import { FormEvent, useState } from 'react';
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../../store/users-api';

// TODO: Тут же тренируешься и в выставлении квери-параметров в строку.

const UsersList = () => {
  // TODO: Вообще, по-хорошему, сделать стейт одним объектом и изменять через деструктуризацию
  // И добавить ещё 3 фильтра для поиска - имя, почта и что-то там ещё.
  const [limit, setLimit] = useState(10); // или всё-таки строка?
  const [offset, setOffset] = useState(0);

  // TODO: Тоже знатная порнография... объект
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');

  // TODO: и для ошибки используй не isError, а error - чтобы отображать детали ошибки на экран

  const {
    data: users = [],
    isLoading: fetchUsersLoading,
    isError: fetchUsersError,
  } = useGetUsersQuery({ limit, offset });
  const [addUser, { isLoading: createUserLoading, isError: createUserError, isSuccess: createUserSuccess }] =
    useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleAddUser = async (event: FormEvent) => {
    event.preventDefault();
    // if (newUser) { Проверка нужна, но выглядеть будет иначе... а может и оставить это на откуп валидатора
    await addUser({
      email: newUserEmail,
      password: newUserPassword,
      firstName: newUserFirstName,
      lastName: newUserLastName,
    }).unwrap();
    // setNewUser(''); когда объект - всем полям инишиал стейт (и это будет отдельный объект)
    // }
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id).unwrap();
  };

  return (
    <>
      <h2>Пользователи</h2>
      <div>Добавить пользователя:</div>
      {/* TODO: Валидацию и правильную верстку пока целенаправленно опускаю, в публичной части уже поработал над этим. Но, по-хорошему, и тут тоже это реализовать */}
      <form onSubmit={handleAddUser}>
        <input
          placeholder="Почта"
          type="email"
          name="email"
          value={newUserEmail}
          onChange={(event) => setNewUserEmail(event.target.value)}
        ></input>
        <input
          placeholder="Пароль"
          type="password"
          name="password"
          value={newUserPassword}
          onChange={(event) => setNewUserPassword(event.target.value)}
        ></input>
        <input
          placeholder="Имя"
          type="text"
          name="firstName"
          value={newUserFirstName}
          onChange={(event) => setNewUserFirstName(event.target.value)}
        ></input>
        <input
          placeholder="Фамилия"
          type="text"
          name="lastName"
          value={newUserLastName}
          onChange={(event) => setNewUserLastName(event.target.value)}
        ></input>
        <button type="submit">Зарегистрировать пользователя</button>
      </form>

      {createUserLoading && <span>Пользователь добавляется...</span>}
      {createUserError && <span>Ошибка добавления пользователя!</span>}
      {/* Может там ещё есть что-нибудь, что и суцесс через 3 секунды само уберет по таймауту? */}
      {createUserSuccess && <span>Пользователь успешно добавлен!</span>}
      <hr />

      <div>Limit (показывать не более)</div>
      <select
        value={limit}
        onChange={(event) => setLimit(Number(event.target.value))}
      >
        <option value="10">10</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <div>Offset (сдвиг по списку)</div>
      <select
        value={offset}
        onChange={(event) => setOffset(Number(event.target.value))}
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <div>Всего пользователей в базе: {users?.totalUsersCount}</div>

      {/* TODO: а сюда сложносоставной поиск из админки, который ищет сразу по трём полям - имя, почта... что-то ещё */}

      <ul>
        {/* Вообще по отображению лоадера мне видится так - во время любого запроса юзеров по сети (добавление, фетч, удаление, редактирование...) весить на список юзеров "невидимое стекло", через которое блочится интерфейс управления юзерами, а сами записи становятся серыми, а посредине его крутится лоадер */}

        {fetchUsersLoading && <div>Загрузка данных с сервера...</div>}
        {fetchUsersError && <div>Ошибка загрузки данных с сервера! </div>}
        {users?.findedUsers?.map((user: any) => (
          <li
            key={user._id}
            onClick={() => handleDeleteUser(user._id)}
            role="presentation"
          >
            {user.email} {user.lastName} {user.firstName}
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
