import { useNavigate, useLocation, Link } from 'react-router-dom';
import { DetectEntityDictType } from '../typespaces/types/DetectEntityDictType';

interface ISuccessPageLocationState {
  sourcePage: string;
  isEdit: boolean;
}

const detectEntityDict: DetectEntityDictType = {
  products: 'Товар',
  users: 'Пользователь',
};

const SuccessPage = () => {
  const navigate = useNavigate();
  const { state: locationState }: { state: ISuccessPageLocationState } = useLocation();

  if (!locationState) {
    navigate('/');
    return <></>;
  } else {
    return (
      <div>
        <p>
          {detectEntityDict[locationState.sourcePage]} успешно {locationState.isEdit ? 'отредактирован' : 'добавлен'}!
        </p>
        {!locationState.isEdit && <Link to={`/${locationState.sourcePage}/add`}>Добавить ещё</Link>}
        <Link to={`/${locationState.sourcePage}`}>Вернуться на исходную страницу</Link>
      </div>
    );
  }
};

export default SuccessPage;
