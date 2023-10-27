import { useParams, useNavigate } from 'react-router-dom';
import { useGetTargetProductQuery } from '../../api/products-api';
import { getErrorMessage } from '../../utils/getErrorMessage';
import ProductForm from '../../components/ProductForm/ProductForm';

const EditProductPage = () => {
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
      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;
