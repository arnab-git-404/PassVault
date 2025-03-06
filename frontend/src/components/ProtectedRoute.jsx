import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context'; 

const ProtectedRoute = ({ children }) => {

  const { userLoggedIn } = useGlobalContext(); 

  // if (!userLoggedIn || !localStorage.getItem('token')) {
  
  //   return <Navigate to="/signin" />;
  // }

  return children;  // Allow the child route to render if user is logged in
};

export default ProtectedRoute;
