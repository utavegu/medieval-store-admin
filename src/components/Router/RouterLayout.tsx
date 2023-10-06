import { Outlet } from 'react-router-dom';
import Navigation from '../../layouts/Navigation/Navigation';
import styles from './Router.module.css';

const RouterLayout = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.navContainer}>
        <Navigation />
        <div className={styles.authContainer}>Пользователь такой-то, выйти</div>
        {/* TODO: По пути "/"" должен быть экран авторизации, а если авторизован, то редирект на товары. И на этой странице навигации быть не должно. Но возможно тот способ, что я реализовал сейчас, ещё более шикарен. Однако то, что можно что угодно насрать в url мне не нравится, сделай всё-таки всё через роутер и редиректы */}
      </div>

      {/* Тоже отдельный компонент и аутлет живёт там */}
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default RouterLayout;
