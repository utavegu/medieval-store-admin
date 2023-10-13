import { Navigate } from 'react-router-dom';

const SuitableRoleWrapper = ({
  children,
  redirectPath,
  isSuitableRole,
}: {
  children: React.ReactNode;
  redirectPath: string;
  isSuitableRole: boolean;
}) => {
  if (!isSuitableRole) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

export default SuitableRoleWrapper;
