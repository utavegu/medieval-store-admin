import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

const PublicRoutesList = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
};

export default PublicRoutesList;
