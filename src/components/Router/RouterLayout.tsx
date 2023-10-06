import { NavLink, Outlet } from 'react-router-dom';
import styles from './Router.module.css';

const RouterLayout = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.activeLink : styles.link);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.navContainer}>
        {/* TODO: отдельный компонент */}
        <nav>
          <ul>
            {/* TODO: Пункты навигации (лишки) мапить из массива объектов (path и title) и отдавать как отдельный компонент (внутри этого же), сделать пропсом навигации */}
            <li className={styles.test}>
              <NavLink
                to="/"
                className={getLinkClass}
              >
                Страница авторизации без этого лэйаута
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={getLinkClass}
              >
                Товары
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={getLinkClass}
              >
                Пользователи
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/promotions"
                className={getLinkClass}
              >
                Акции
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shops"
                className={getLinkClass}
              >
                Филиалы (дизаблед)
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/head"
                className={getLinkClass}
              >
                Мета, хэад, тайтл, фавиконка, настройка страниц
              </NavLink>
            </li>
          </ul>
        </nav>
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
