import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getErrorMessage } from '../utils/getErrorMessage';
import { DetectEntityDictType } from '../typespaces/types/DetectEntityDictType';

interface IErrorPageLocationState {
  sourcePage: string;
  isEdit: boolean;
  error: Error;
}

const detectEntityDict: DetectEntityDictType = {
  products: 'товара',
  users: 'пользователя',
};

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state: locationState }: { state: IErrorPageLocationState } = useLocation();

  if (!locationState) {
    navigate('/');
    return <></>;
  } else {
    return (
      <div>
        <p>
          При {locationState.isEdit ? 'редактировании' : 'добавлении'} {detectEntityDict[locationState.sourcePage]}{' '}
          произошла ошибка: {getErrorMessage(locationState.error)}
        </p>
        <Link to={`/${locationState.sourcePage}/${locationState.isEdit ? 'edit' : 'add'}`}>Попробовать ещё раз</Link>
        <Link to={`/${locationState.sourcePage}`}>Вернуться на исходную страницу</Link>
      </div>
    );
  }
};

export default ErrorPage;
