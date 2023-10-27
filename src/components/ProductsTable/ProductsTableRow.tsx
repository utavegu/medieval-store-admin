import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../api/products-api';
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
  const [deleteUser] = useDeleteProductMutation();

  // TODO: Всплывашка "Вы действительно хотите удалить товар?"
  // TODO: Статусы удаления (загрузка, успех, ошибка)
  const handleDeleteProduct = async (id: IProduct['_id']) => {
    await deleteUser(id);
  };

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
        <Link to={`/products/${_id}/edit`}>
          <button title="Редактировать товар">
            <span className="visually-hidden">Редактировать товар</span>
          </button>
        </Link>
        <button
          className={styles.buttonRemove}
          title="Удалить товар"
          onClick={() => handleDeleteProduct(_id)}
        >
          <span className="visually-hidden">Удалить товар</span>
        </button>
      </td>
    </tr>
  );
};

export default ProductsTableRow;
