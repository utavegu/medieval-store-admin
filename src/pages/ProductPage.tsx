import { useParams, useNavigate } from 'react-router-dom';
import { useGetTargetProductQuery } from '../api/products-api';
import { getErrorMessage } from '../utils/getErrorMessage';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // TODO: эсинк-эвэйт для data под капотом?
  const { data: product, error, isLoading } = useGetTargetProductQuery(id || '');

  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      {error && <div>{getErrorMessage(error)}</div>}
      {isLoading && <div>Загрузка данных о товаре...</div>}
      {product && JSON.stringify(product)}
    </>
  );
};

export default ProductPage;
