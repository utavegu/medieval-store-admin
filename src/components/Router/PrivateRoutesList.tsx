import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRouterLayout from './PrivateRouterLayout';
import SuitableRoleWrapper from './SuitableRoleWrapper';
import SuccessPage from '../../pages/SuccessPage';
import ErrorPage from '../../pages/ErrorPage';
import ProductsPage from '../../pages/products/ProductsPage';
import ProductPage from '../../pages/products/ProductPage';
import AddProductPage from '../../pages/products/AddProductPage';
import { IUser } from '../../typespaces/interfaces/IUser';

interface PropTypes {
  role: IUser['role'];
  isActivatedProfile: IUser['isActivated'];
}

const PrivateRoutesList: FC<PropTypes> = ({ role, isActivatedProfile }) => {
  // TODO: пока сделаю !, ибо никто свои учётки так и не активировал, лентяи -_-
  if (!isActivatedProfile === false) {
    return (
      <div>
        Ваша учётная запись не активна, закончите процедуру активации, прежде чем продолжить (разлониниться и
        попробовать ещё раз)
      </div>
    );
  }
  if (role === 'client') {
    return <div>Панель администратора недоступна клиентам! (разлониниться и попробовать ещё раз)</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRouterLayout />}
      >
        <Route
          index
          element={
            <Navigate
              to="products"
              replace
            />
          }
        />
        <Route
          path="success"
          element={<SuccessPage />}
        />
        <Route
          path="error"
          element={<ErrorPage />}
        />
        <Route
          path="products"
          element={<ProductsPage />}
        />
        <Route
          path="products/:id"
          element={<ProductPage />}
        />
        <Route
          path="products/add"
          element={<AddProductPage />}
        />
        <Route
          path="products/edit"
          // element={<ProductsPage />}
        />
        <Route
          path="products/categories"
          element={
            <SuitableRoleWrapper
              redirectPath="/products"
              isSuitableRole={role === 'admin'}
            >
              <>Добавление/удаление категорий, типов и подтипов товара. Только для админов</>
            </SuitableRoleWrapper>
          }
        />
        <Route
          path="users"
          element={<h1>users page</h1>}
        />
        <Route
          path="promotions"
          element={<h1>promotions page (акции и новости)</h1>}
        />
        <Route
          path="shops"
          element={<h1>branches (shops) page</h1>}
        />
        <Route
          path="head"
          element={
            <h1>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, atque? Molestiae culpa, aperiam
              molestias suscipit fuga asperiores tenetur deleniti adipisci recusandae doloribus quidem saepe provident
              fugit qui voluptatibus? Accusantium, quaerat! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Deserunt, atque? Molestiae culpa, aperiam molestias suscipit fuga asperiores tenetur deleniti adipisci
              recusandae doloribus quidem saepe provident fugit qui voluptatibus? Accusantium, quaerat! Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Deserunt, atque? Molestiae culpa, aperiam molestias suscipit
              fuga asperiores tenetur deleniti adipisci recusandae doloribus quidem saepe provident fugit qui
              voluptatibus? Accusantium, quaerat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt,
              atque? Molestiae culpa, aperiam molestias suscipit fuga asperiores tenetur deleniti adipisci recusandae
              doloribus quidem saepe provident fugit qui voluptatibus? Accusantium, quaerat! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Deserunt, atque? Molestiae culpa, aperiam molestias suscipit fuga
              asperiores tenetur deleniti adipisci recusandae doloribus quidem saepe provident fugit qui voluptatibus?
              Accusantium, quaerat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, atque? Molestiae
              culpa, aperiam molestias suscipit fuga asperiores tenetur deleniti adipisci recusandae doloribus quidem
              saepe provident fugit qui voluptatibus? Accusantium, quaerat! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Deserunt, atque? Molestiae culpa, aperiam molestias suscipit fuga asperiores tenetur
              deleniti adipisci recusandae doloribus quidem saepe provident fugit qui voluptatibus? Accusantium,
              quaerat!
            </h1>
          }
        />
        <Route
          path="*"
          element={
            <h1>
              not found page (404) (тоже неплохо бы без общего лэйаута с навигацией, кстати... и чтобы без перезагрузки
              страницы)
            </h1>
          }
        />
      </Route>
    </Routes>
  );
};

export default PrivateRoutesList;
