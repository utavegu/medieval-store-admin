import { useParams, useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      {id}
    </>
  );
};

export default ProductPage;
