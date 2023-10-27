import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>Назад</button>
      <ProductForm />
    </>
  );
};

export default AddProductPage;
