import { Link } from 'react-router-dom';
import { getPrettyDateTime } from '../../utils/getPrettyDateTime';
import { IProduct } from '../../typespaces/interfaces/IProduct';
import styles from './ProductsTable.module.css';

const ProductsTableRow = ({
  _id,
  productName,
  price,
  createdAt,
  updatedAt,
}: Pick<IProduct, '_id' | 'productName' | 'price' | 'createdAt' | 'updatedAt'>) => {
  return (
    <tr>
      <td>{productName}</td>
      <td>{price}</td>
      <td>{getPrettyDateTime(createdAt)}</td>
      <td>{updatedAt && getPrettyDateTime(updatedAt)}</td>
      <td className={styles.actions}>
        <Link to={`/products/${_id}`}>
          <button title="Смотреть товар">
            <span className="visually-hidden">Смотреть товар</span>
          </button>
        </Link>
        <button title="Редактировать товар">
          <span className="visually-hidden">Редактировать товар</span>
        </button>
        <button
          className={styles.buttonRemove}
          title="Удалить товар"
        >
          <span className="visually-hidden">Удалить товар</span>
        </button>
      </td>
    </tr>
  );
};

export default ProductsTableRow;
