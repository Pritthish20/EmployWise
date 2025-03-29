import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const expires = localStorage.getItem("expires");
 
  const isTokenValid = expires && new Date().getTime() < parseInt(expires);

  return userInfo && isTokenValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserRoute;
