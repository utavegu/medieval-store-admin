import ProductsTableRow from './ProductsTableRow';
import { IProduct } from '../../typespaces/interfaces/IProduct';
import styles from './ProductsTable.module.css';

const ProductsTable = ({ products }: { products: IProduct[] }) => {
  return (
    <table className={styles.productsTable}>
      <caption>Товары</caption>
      <thead>
        <tr>
          <th scope="col">Название</th>
          <th scope="col">Цена</th>
          <th scope="col">Добавлен</th>
          {/* TODO: Время маленько от балды выставляет, надо разобраться */}
          <th scope="col">Обновлен</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td
            colSpan={4}
            style={{ textAlign: 'right' }}
          >
            Всего уникальных позиций:
          </td>
          <td>{products.length}</td>
        </tr>
      </tfoot>
      <tbody>
        {products?.map((product, i) => (
          <ProductsTableRow
            key={i}
            {...product}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
