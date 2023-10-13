import { Outlet } from 'react-router-dom';
import Navigation from '../../layouts/Navigation/Navigation';
import styles from './Router.module.css';

const PrivateRouterLayout = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.menuContainer}>
        <Navigation />
        <div className={styles.authContainer}>Пользователь такой-то, роль такая-то, выйти</div>
      </div>
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateRouterLayout;
