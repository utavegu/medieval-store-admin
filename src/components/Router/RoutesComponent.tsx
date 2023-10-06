import { Routes, Route } from 'react-router-dom';
import RouterLayout from './RouterLayout';

// В элементах роутов также будут отрисовываться компоненты, только не пэйджес, а табс (tabs, вкладки)... Или... в общем подумаю как лучше назвать. Может и страницы (pages - ProductsPage, UsersPage и т.д.)

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
          element={<h1>products page</h1>}
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
