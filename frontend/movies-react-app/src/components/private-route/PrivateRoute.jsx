import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../user/User';

const PrivateRoute = ({ children, forUserAccount = false }) => {
  const { username } = useContext(UserContext);

  if (forUserAccount && !username) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/login" />;
  }

  // If we are protecting Login/Register routes and the user is logged in
  if (!forUserAccount && username) {
    // Redirect to home page if user is already logged in
    return <Navigate to="/" />;
  }

  // Otherwise, render the requested route
  return children;
};

export default PrivateRoute;
