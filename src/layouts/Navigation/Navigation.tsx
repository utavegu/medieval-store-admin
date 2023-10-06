import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

interface INavigationData {
  title: string;
  path: string;
}

const navigationData: INavigationData[] = [
  {
    title: "Страница авторизации без этого лэйаута",
    path: "/",
  },
  {
    title: "Товары",
    path: "/products",
  },
  {
    title: "Пользователи",
    path: "/users",
  },
  {
    title: "Акции",
    path: "/promotions",
  },
  {
    title: "Филиалы / магазины (дизаблед)",
    path: "/shops",
  },
  {
    title: "Мета, хэад, тайтл, фавиконка, настройка страниц",
    path: "/head",
  }
]

const NavigationItem = (data: INavigationData) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => (isActive ? styles.activeLink : styles.link);

  return (
    <li>
      <NavLink
        to={data.path}
        className={getLinkClass}
      >
        {data.title}
      </NavLink>
    </li>
  )
}

const Navigation = () => {
  return (
    <nav>
      <ul>
        {navigationData.map(navItemData => <NavigationItem key={navItemData.path} {...navItemData} />)}
      </ul>
    </nav>
  )
}

export default Navigation;
