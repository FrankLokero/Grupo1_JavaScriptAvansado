import { Link } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="container fade-in">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="fw-bold text-dark">Controlador de Inventario</h1>
        </div>
      </div>

      {/* TARJETAS DE RESUMEN (KPIs) */}
      <div className="row g-4">
        {/* KPI 1: EMPLEADOS */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 text-primary">
                <i className="bi bi-people-fill fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle text-muted mb-1">Empleados</h6>
                <h2 className="card-title mb-0 fw-bold">12</h2>
              </div>
            </div>
            <div className="card-footer bg-white border-0">
              <Link
                to="/Empleados-list"
                className="text-decoration-none small text-primary fw-bold"
              >
                Ver lista &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* KPI 2: PRODUCTOS */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3 text-success">
                <i className="bi bi-box-seam fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle text-muted mb-1">Productos</h6>
                <h2 className="card-title mb-0 fw-bold">845</h2>
              </div>
            </div>
            <div className="card-footer bg-white border-0">
              <Link
                to="/Productos-list"
                className="text-decoration-none small text-success fw-bold"
              >
                Ver lista &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* KPI 3: CLIENTES */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3 text-warning">
                <i className="bi bi-emoji-sunglasses fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle text-muted mb-1">Clientes</h6>
                <h2 className="card-title mb-0 fw-bold">1.2k</h2>
              </div>
            </div>
            <div className="card-footer bg-white border-0">
              <Link
                to="/Clientes-list"
                className="text-decoration-none small text-warning fw-bold"
              >
                Ver Lista &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* KPI 4: PROVEEDORES */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-flex align-items-center">
              <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3 text-info">
                <i className="bi bi-truck fs-4"></i>
              </div>
              <div>
                <h6 className="card-subtitle text-muted mb-1">Proveedores</h6>
                <h2 className="card-title mb-0 fw-bold">8</h2>
              </div>
            </div>
            <div className="card-footer bg-white border-0">
              <Link
                to="/Proveedor-list"
                className="text-decoration-none small text-info fw-bold"
              >
                Ver Lista &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ACCESOS RÁPIDOS */}
      <div className="row mt-5">
        <h4 className="fw-bold mb-3">Accesos Rápidos</h4>
        <div className="col-md-6">
          <div className="p-4 bg-light rounded-4 border d-flex justify-content-between align-items-center">
            <div>
              <h5>Registrar Venta</h5>
              <p className="text-muted small mb-0">
                Crear una nueva orden de venta rápida
              </p>
            </div>
            <button className="btn btn-dark rounded-pill px-4">
              <i className="bi bi-plus-lg"></i> Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
