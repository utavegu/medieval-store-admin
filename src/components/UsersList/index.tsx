import { FormEvent, useState } from 'react';
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery } from '../../api/users-api';

// TODO: Тут же тренируешься и в выставлении квери-параметров в строку. Вроде у объекта URL (смотри в базе, кстати), есть специальный механизм по работе с квери-параметрами. Туда пихаешь все, что не пустые. Пустые не пихаешь. Можно на этом же этапе лимит и оффсет преобразовывать в нумбер (если имя поля лимит или оффсет)

// не тут, тайпспэйсес
type HandleInputChangeType = {
  target:
    | (EventTarget & { name: string; value: string | number | boolean })
    | { name: string; value: boolean | string | [] };
};

interface IQueryParameters {
  limit?: string; // на сервере number, но там, вроде стоит преобразовывалка
  offset?: string; // на сервере number, но там, вроде стоит преобразовывалка
  email?: string;
  firstName?: string;
  contactPhone?: string;
}

const UsersList = () => {
  const [queryParameters, setQueryParameters] = useState<IQueryParameters>({
    limit: '10',
    offset: '0',
    email: '',
    firstName: '',
    contactPhone: '',
  });

  const formInitialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  const [form, setForm] = useState(formInitialState);

  // Поисковая строка - претендент на хранение в сторе
  const [searchString, setSearchString] = useState('');

  const {
    data: users = [],
    isLoading: fetchUsersLoading,
    isError: fetchUsersError,
  } = useGetUsersQuery(queryParameters);

  const [addUser, { isLoading: createUserLoading, isError: createUserError, isSuccess: createUserSuccess }] =
    useAddUserMutation();

  const [deleteUser] = useDeleteUserMutation();

  const handleFormInputChange = ({ target }: HandleInputChangeType) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleQueryParametersChange = ({ target }: HandleInputChangeType) => {
    setQueryParameters((prevParams) => ({ ...prevParams, [target.name]: target.value }));
  };

  const handleAddUser = async (event: FormEvent) => {
    event.preventDefault();
    // если нет валидатора, можно проверить что поля формы не пусты, но по хорошему делать нормальную валидацию и не париться
    await addUser(form).unwrap();
    setForm(formInitialState); // если ошибка отправки - не затирать
  };

  // TODO: и для ошибки используй не isError, а error - чтобы отображать детали ошибки на экран. Хотя, по хорошему, конечно, валидатор на фронтенде должен максимально не допускать такой ситуации, чтобы с бэка прилетала ошибка. Потому для экстренных случаев лучше показывать ее в консоль-еррор, а не в юзер интерфейс

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id).unwrap();
  };

  // Классная штука ниже, мультипоиск, но конкретно тут, скорее всего не понадобится. Тут нужна будет поисковая строка для забирания значения и 3 радиокнопки - по какому конкретно полю ищем. Стэйт - объект.
  /*
  const allFoundTerminals: TerminalType[] = queryString
    .split(' ')
    .map((word) => {
      if (word !== '') {
        const isFoundInField = (terminal: any) => (field: string) =>
          terminal[field].toLowerCase().indexOf(word.toLowerCase().trim()) > -1;
        const foundTerminals = filteredTerminals?.filter(
          (terminal) =>
            isFoundInField(terminal)('address') ||
            isFoundInField(terminal)('name') ||
            isFoundInField(terminal)('identifier') ||
            isFoundInField(terminal)('district')
        );
        return foundTerminals;
      } else {
        return [];
      }
    })
    .flat()
    .filter(
      (item: TerminalType | undefined, index: number, array: (TerminalType | undefined)[]) =>
        array.indexOf(item) === index && item !== undefined
    );

    Так, вспоминаем, что я тут понагородил полтора года назад...
      1) Первым делом берем значение поисковой строки
      2) По пробелу каждое отдельное слово разбивает на массив строк
      3) Мапимся по массиву слов
      ...
  */

  // .filter(item => item.name.toLowerCase().indexOf(searchQuery.toLowerCase().trim()) > -1)

  return (
    <>
      <h2>Пользователи</h2>
      <div>Поиск пользователя по имени, почте или телефону:</div>
      <form onSubmit={(event) => event.preventDefault()}>
        <label
          htmlFor="search-products"
          className="visually-hidden"
        >
          Поиск
        </label>
        <input
          type="search"
          // id="search-products"
          placeholder="Поиск"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
        />
      </form>
      <hr />
      <div>Добавить пользователя:</div>
      {/* TODO: Валидацию и правильную верстку пока целенаправленно опускаю, в публичной части уже поработал над этим. Но, по-хорошему, и тут тоже это реализовать */}
      <form onSubmit={handleAddUser}>
        <input
          placeholder="Почта"
          type="email"
          name="email"
          value={form.email}
          onChange={handleFormInputChange}
        ></input>
        <input
          placeholder="Пароль"
          type="password"
          name="password"
          value={form.password}
          onChange={handleFormInputChange}
        ></input>
        <input
          placeholder="Имя"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleFormInputChange}
        ></input>
        <input
          placeholder="Фамилия"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleFormInputChange}
        ></input>
        <button type="submit">Зарегистрировать пользователя</button>
      </form>
      {createUserLoading && <span>Отправляем форму на сервер...</span>}
      {createUserError && <span>Ошибка добавления пользователя!</span>}
      {/* Может там ещё есть что-нибудь, что и суцесс через 3 секунды само уберет по таймауту? */}
      {createUserSuccess && <span>Пользователь успешно добавлен!</span>}
      <hr />

      <div>Limit (показывать не более)</div>
      <select
        name="limit"
        value={queryParameters.limit}
        onChange={handleQueryParametersChange}
      >
        <option value="10">10</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <div>Offset (сдвиг по списку, скольких от начала пропустить)</div>
      <select
        name="offset"
        value={queryParameters.offset}
        onChange={handleQueryParametersChange}
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <div>Всего пользователей в базе: {users?.totalUsersCount}</div>

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
