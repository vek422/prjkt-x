/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
export default function ConditionalRoute({ condition, redirectTo, children }) {
  console.log(!condition && `Navigating to ${redirectTo}`);
  return condition ? <>{children}</> : <Navigate to={redirectTo} replace />;
}
