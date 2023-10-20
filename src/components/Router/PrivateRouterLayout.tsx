import { useLazyLogoutQuery, useLazyTestQuery } from '../../api/auth-api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearUser } from '../../store/slices/authSlice';
import { authorizedUserSelector } from '../../store/selectors/authSelectors';
import { Outlet } from 'react-router-dom';
import Navigation from '../../layouts/Navigation/Navigation';
import styles from './Router.module.css';

const PrivateRouterLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authorizedUserSelector);
  const [logout] = useLazyLogoutQuery();
  const [test] = useLazyTestQuery();

  const handleLogout = async () => {
    // TODO: По хорошему, конечно, весь этот движ должен происходить не тут, но где именно не придумал, раз thunk нет
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.menuContainer}>
        <Navigation />
        <div className={styles.authContainer}>
          <p>
            {user?.role} {user?.lastName} {user?.firstName}
          </p>
          <p>здравствуйте!</p>
          <button onClick={handleLogout}>Выйти</button>
          <button
            type="button"
            onClick={() => test()}
          >
            Тест защищенной ручки
          </button>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouterLayout;
