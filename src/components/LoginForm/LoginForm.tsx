import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { parseJwt } from '../../utils/parseJwt';
import { useLoginMutation, useLazyTestQuery, useLazyLogoutQuery } from '../../api/auth-api';
import { useLazyGetTargetUserQuery } from '../../api/users-api';
import { addAuthorizedUser, clearUser } from '../../store/slices/authSlice';
import { HandleInputChangeType } from '../../typespaces/types/HandleInputChangeType';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: 'admin@mail.ru',
    password: 'ADMIN__!123slojno',
  });

  const dispatch = useAppDispatch();

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const [test] = useLazyTestQuery();
  const [getTargetUser] = useLazyGetTargetUserQuery();
  const [logout] = useLazyLogoutQuery();

  const handleFormInputChange = ({ target }: HandleInputChangeType) => {
    setLoginData((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.isSuccess) {
        localStorage.removeItem('accessToken');
        dispatch(clearUser());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await login(loginData);
      // TODO
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const accessToken = res.data.accessToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        const parsedToken = await parseJwt(accessToken);
        const user = await getTargetUser(parsedToken.sub);
        if (user.data) {
          dispatch(addAuthorizedUser(user.data));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: пока делаю супер-примитивную форму для теста логина
  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <p>
        <label htmlFor="email">Логин</label>
        <input
          type="email"
          id="email"
          placeholder="Логин"
          name="email"
          value={loginData.email}
          onChange={handleFormInputChange}
        />
      </p>
      <p>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          placeholder="Пароль"
          name="password"
          value={loginData.password}
          onChange={handleFormInputChange}
          autoComplete="off"
        />
      </p>
      <button type="submit">Залогиниться</button>
      <button
        type="button"
        onClick={() => test()}
      >
        Тест защищенной ручки
      </button>
      <button
        type="button"
        onClick={handleLogout}
      >
        Разлогиниться
      </button>
    </form>
  );
};

export default LoginForm;
