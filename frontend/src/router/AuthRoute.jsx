import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useSelector } from "react-redux";

const AuthRoute = () => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthRoute;
