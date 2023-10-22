import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../api/products-api';
import ProductsTable from '../../components/ProductsTable/ProductsTable';

/*
TODOs:
- Вместо тайтлов всплывашки из муи
- пагинация, не более 20 позиций на странице
- возможность сортировки по полям таблицы. Дефолтная - по названию
- Переход на страницу добавления категорий и тд, только для админов (защищенный роут)
*/

const ProductsPage = () => {
  const [productsPageMode, setProductsPageMode] = useState<'viewing' | 'addition' | 'editing'>('viewing');

  // TODO: эсинк-эвэйт для data под капотом?
  const { data: products = [], isLoading: fetchProductsLoading, isError: fetchProductsError } = useGetProductsQuery();

  return (
    <>
      {/* TODO: В хроме всегда ошибка загрузки товаров. Вроде поправил? */}
      {fetchProductsError && 'Ошибка загрузки товаров!'}
      {fetchProductsLoading && <div>Идёт загрузка товаров...</div>}
      {!fetchProductsLoading && !fetchProductsError && productsPageMode === 'viewing' && (
        <div>
          <Link to="add">Добавить товар</Link>
          {products && <ProductsTable products={products} />}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
