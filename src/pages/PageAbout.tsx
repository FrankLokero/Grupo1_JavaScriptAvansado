const PageAbout = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="p-5 mb-4 bg-light rounded-4 shadow-sm border">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold text-primary">Sobre el Sistema</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted">
            Sistema de gestión integral para control de inventario, personal y
            ventas. Desarrollado con las últimas tecnologías web.
          </p>
          <hr className="my-4 w-25 mx-auto" />
          <p className="text-secondary">
            Version 1.0.0 | React + Vite + Bootstrap 5
          </p>
          <button className="btn btn-primary btn-lg" type="button">
            Ver documentación
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
