import { useParams, useNavigate } from 'react-router-dom';
import { useGetTargetProductQuery } from '../../api/products-api';
import { getErrorMessage } from '../../utils/getErrorMessage';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, error, isLoading } = useGetTargetProductQuery(id || '');

  if (isLoading) {
    return <div>Загрузка данных о товаре...</div>;
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      {error && <div>Ошибка: {getErrorMessage(error)}</div>}
      {product && JSON.stringify(product)}
    </>
  );
};

export default ProductPage;
