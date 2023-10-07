import { useState } from 'react';
import { useGetProductsQuery } from '../api/products-api';
import ProductsTable from '../components/ProductsTable/ProductsTable';

/*
TODOs:
- Вместо тайтлов всплывашки из муи
- пагинация, не более 20 позиций на странице
- возможность сортировки по полям таблицы. Дефолтная - по названию
*/

const ProductsPage = () => {
  const [productsPageMode, setProductsPageMode] = useState<'viewing' | 'addition' | 'editing'>('viewing');

  const { data: products = [], isLoading: fetchProductsLoading, isError: fetchProductsError } = useGetProductsQuery('');

  return (
    <>
      {fetchProductsError && 'Ошибка загрузки товаров!'}
      {fetchProductsLoading && <div>Идёт загрузка товаров...</div>}
      {!fetchProductsLoading && !fetchProductsError && productsPageMode === 'viewing' && (
        <div>
          <button type="button">Добавить товар</button>
          {products && <ProductsTable products={products} />}
        </div>
      )}
    </>
  );
};

export default ProductsPage;
