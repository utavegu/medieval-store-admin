import { useParams, useNavigate } from 'react-router-dom';
import { useGetTargetProductQuery } from '../../api/products-api';
import { getErrorMessage } from '../../utils/getErrorMessage';
// import { useLazyGetFileQuery } from '../../api/files-api';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, error, isLoading } = useGetTargetProductQuery(id || '');

  // const [getFile] = useLazyGetFileQuery();

  if (isLoading) {
    return <div>Загрузка данных о товаре...</div>;
  }

  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      {error && <div>Ошибка: {getErrorMessage(error)}</div>}
      <h1>{product?.productName}</h1>
      <p>{product?.description}</p>
      {/* Олд прайс и нью прайс. Нью - минус скидка. Но только если в скидке что-то есть или она больше 0 */}
      <p>Всего за {product?.price}</p>
      <p>
        {product?.category.productCategoryName} {product?.type.productTypeName} {product?.subtype?.productSubtypeName}
      </p>
      {!!product?.photos?.length && (
        <ul>
          {product.photos.map((photo, i) => (
            <li key={i}>
              <img
                src={`http://localhost:4000/uploads/img/${product._id}/${photo}`}
                alt={`Изображение товара ${i}`}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductPage;
