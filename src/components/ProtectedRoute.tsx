import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // 1. Buscamos al usuario en el almacenamiento local
  const usuarioLogueado = localStorage.getItem("usuario");

  // 2. Si NO existe el usuario, lo mandamos al Login
  if (!usuarioLogueado) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si SÍ existe, dejamos que pase y vea el contenido (el Dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;