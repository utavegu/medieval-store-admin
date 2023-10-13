import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRouterLayout from './PrivateRouterLayout';
import SuitableRoleWrapper from './SuitableRoleWrapper';
import ProductsPage from '../../pages/ProductsPage';
import ProductPage from '../../pages/ProductPage';

const PrivateRoutesList = () => {
  const isAdmin = false; // TODO: Вообще лучше пропсом сверху из апп, так как стор планирую прокинуть туда
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
          path="products"
          element={<ProductsPage />}
        />
        <Route
          path="products/:id"
          element={<ProductPage />}
        />
        <Route
          path="products/categories"
          element={
            <SuitableRoleWrapper
              redirectPath="/products"
              isSuitableRole={isAdmin}
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
