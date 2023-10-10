import { Routes, Route } from 'react-router-dom';
import RouterLayout from './RouterLayout';
import ProductsPage from '../../pages/ProductsPage';
import ProductPage from '../../pages/ProductPage';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<RouterLayout />}
      >
        <Route
          index
          element={<h1>main page</h1>}
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
          element={<>Добавление/удаление категорий, типов и подтипов товара. Только для админов</>}
        />
        <Route
          path="users"
          element={<h1>users page</h1>}
        />
        <Route
          path="promotions"
          element={<h1>promotions page</h1>}
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

export default RoutesComponent;
