import { Link, useNavigate } from "react-router-dom";

function PageNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Borramos la "llave" de acceso
    localStorage.removeItem("usuario");
    // 2. Redirigimos al login reemplazando la historia (para que no puedan volver atrás)
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top w-100 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-box-seam-fill me-2 text-primary"></i>
          Control Inventario
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex gap-2 align-items-center">
            
            {/* DASHBOARD */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>

            {/* LISTAS (Apuntan a -list para ver las tablas primero) */}
            <li className="nav-item">
              <Link className="nav-link" to="/Empleados-list">
                Empleados
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Cargo-list">
                Cargos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Clientes-list">
                Clientes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Productos-list">
                Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Proveedor-list">
                Proveedores
              </Link>
            </li>

            {/* Categorías y Ventas (Si no tienen listas aún, las dejamos como estaban o ajustamos) */}
            <li className="nav-item">
              <Link className="nav-link" to="/Categorias">
                Categorías
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Ventas">
                Ventas
              </Link>
            </li>

            {/* DIVISOR */}
            <li className="nav-item mx-2 border-end border-secondary d-none d-lg-block" style={{ height: "24px" }}></li>

            {/* BOTÓN CERRAR SESIÓN (Reemplaza al Login) */}
            <li className="nav-item">
              <button 
                onClick={handleLogout} 
                className="btn btn-danger btn-sm fw-bold px-3"
              >
                <i className="bi bi-power me-2"></i>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PageNav;